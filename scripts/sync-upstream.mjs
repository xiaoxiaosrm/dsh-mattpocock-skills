#!/usr/bin/env node
/**
 * Re-sync this DSH skill bundle from upstream mattpocock/skills.
 *
 * Upstream layout: skills/<bucket>/<skill-name>/...
 * This package's install layout: skills/<skill-name>/... (DSH scans one level)
 *
 * The script downloads the upstream tarball into memory, validates every
 * skill's frontmatter against the rules enforced by
 * @deepseek-ai/dsh-skill-filesystem (name = directory, kebab-case,
 * description present, kebab-case invocation keys), and only then writes.
 *
 * The package ships only the skills listed in `<repo>/enabled-skills.json`;
 * delete that file (or pass --all) to ship every upstream skill.
 *
 * Usage:
 *   node scripts/sync-upstream.mjs --check    validate and report without writing
 *   node scripts/sync-upstream.mjs --prune    write, and delete skills not enabled
 *   node scripts/sync-upstream.mjs --all      ignore enabled-skills.json, ship all
 *   node scripts/sync-upstream.mjs            write, keep skills not enabled
 */

import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { gunzipSync } from 'node:zlib'

const REPOSITORY = 'https://github.com/mattpocock/skills'
const TARBALL_URL = 'https://codeload.github.com/mattpocock/skills/tar.gz/refs/heads/main'
const BUCKETS = ['engineering', 'productivity', 'misc', 'in-progress']
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const LEGACY_INVOCATION_KEYS = ['disableModelInvocation', 'modelInvocable', 'userInvocable']
const TEXT_EXTENSIONS = new Set(['.md', '.yaml', '.yml', '.sh', '.txt', '.json', '.js', '.mjs', '.ts', '.py', '.toml', '.csv'])

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const skillsDir = path.join(root, 'skills')
const args = new Set(process.argv.slice(2))
const check = args.has('--check')
const prune = args.has('--prune')

function fail(message) {
  console.error(`sync-upstream: ${message}`)
  process.exit(1)
}

function warn(message) {
  console.warn(`sync-upstream: ${message}`)
}

/** Parse a gzipped ustar/PAX tar into { path: Buffer } (regular files only). */
function untar(gz) {
  const tar = gunzipSync(gz)
  const files = new Map()
  let offset = 0
  let pendingPath = null

  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512)
    const name = header.subarray(0, 100).toString('utf8').replace(/\0.*$/, '')
    if (name === '') break
    const prefix = header.subarray(345, 500).toString('utf8').replace(/\0.*$/, '')
    const size = Number.parseInt(header.subarray(124, 136).toString('utf8').replace(/\0.*$/, '').trim() || '0', 8)
    const type = header.subarray(156, 157).toString('utf8')
    const data = tar.subarray(offset + 512, offset + 512 + size)

    if (type === 'x' || type === 'L') {
      // PAX / GNU long name: next entry's path is overridden.
      const text = data.toString('utf8')
      if (type === 'L') pendingPath = text.replace(/\0.*$/, '').trim()
      else {
        const match = /(?:^|\n)\d+ path=([^\n]+)\n/.exec(text)
        if (match) pendingPath = match[1]
      }
    } else if (type === '0' || type === '\0' || type === '') {
      const entryPath = pendingPath ?? (prefix === '' ? name : `${prefix}/${name}`)
      files.set(entryPath, data)
      pendingPath = null
    } else if (type === 'g') {
      // Global PAX header: ignore.
    } else {
      pendingPath = null
    }

    offset += 512 + Math.ceil(size / 512) * 512
  }
  return files
}

/** Read `---` frontmatter into { scalar map, raw lines } with a YAML-subset parser. */
function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(text)
  if (!match) return null
  const lines = match[1].split(/\r?\n/)
  const values = new Map()
  let current
  for (const line of lines) {
    const top = /^([A-Za-z0-9_-]+):[ \t]*(.*)$/.exec(line)
    if (top) {
      current = top[1]
      let value = top[2].trim()
      if (value === '|' || value === '>' || value === '|-' || value === '>-') value = ''
      values.set(current, value)
      continue
    }
    if (current !== undefined && /^[ \t]+/.test(line)) {
      values.set(current, `${values.get(current)} ${line.trim()}`.trim())
    }
  }
  return { values, raw: match[1] }
}

function unquote(value) {
  if (value === undefined) return undefined
  const trimmed = value.trim()
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) return trimmed.slice(1, -1).replace(/\\"/g, '"')
  if (trimmed.length >= 2 && trimmed.startsWith("'") && trimmed.endsWith("'")) return trimmed.slice(1, -1).replace(/''/g, "'")
  return trimmed
}

/** Validate one skill directory against the DSH frontmatter contract. */
function validateSkill(bucket, name, files) {
  const skillFile = files.get('SKILL.md')
  const problems = []
  if (!skillFile) problems.push('missing SKILL.md')
  else {
    const text = skillFile.toString('utf8')
    const frontmatter = parseFrontmatter(text)
    if (!frontmatter) problems.push('missing YAML frontmatter')
    else {
      const raw = frontmatter.raw
      const declaredName = unquote(frontmatter.values.get('name'))
      if (!declaredName) problems.push('missing frontmatter "name"')
      else if (declaredName !== name) problems.push(`frontmatter name "${declaredName}" does not match directory "${name}"`)
      else if (!KEBAB.test(declaredName)) problems.push(`frontmatter name "${declaredName}" is not kebab-case`)

      const description = unquote(frontmatter.values.get('description'))
      if (!description) problems.push('missing frontmatter "description"')

      for (const legacy of LEGACY_INVOCATION_KEYS) {
        if (new RegExp(`^${legacy}:`, 'm').test(raw)) problems.push(`legacy camelCase key "${legacy}" is rejected by DSH`)
      }
      for (const key of ['disable-model-invocation', 'user-invocable']) {
        if (!frontmatter.values.has(key)) continue
        const value = unquote(frontmatter.values.get(key))
        if (!/^(true|false|yes|no|on|off|1|0)$/i.test(value)) problems.push(`"${key}" has invalid boolean value "${value}"`)
      }
    }
  }
  return problems
}

function normalizeText(filePath, buffer) {
  if (!TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase())) return buffer
  return Buffer.from(buffer.toString('utf8').replace(/\r\n/g, '\n'), 'utf8')
}

async function readExisting() {
  const existing = new Map()
  let entries
  try {
    entries = await fs.readdir(skillsDir, { withFileTypes: true })
  } catch {
    return existing
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const dir = path.join(skillsDir, entry.name)
    const files = new Map()
    for (const file of await walk(dir)) files.set(path.relative(dir, file).split(path.sep).join('/'), await fs.readFile(file))
    existing.set(entry.name, files)
  }
  return existing
}

async function walk(dir) {
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (entry.isFile()) out.push(full)
  }
  return out
}

async function fetchCommit() {
  try {
    const response = await fetch('https://api.github.com/repos/mattpocock/skills/commits/main', {
      headers: { 'User-Agent': 'dsh-sync-upstream', Accept: 'application/vnd.github+json' },
    })
    if (!response.ok) return undefined
    const body = await response.json()
    return body.sha
  } catch {
    return undefined
  }
}

async function main() {
  console.log(`sync-upstream: downloading ${TARBALL_URL}`)
  const response = await fetch(TARBALL_URL, { headers: { 'User-Agent': 'dsh-sync-upstream' } })
  if (!response.ok) fail(`download failed with HTTP ${response.status}`)
  const archive = Buffer.from(await response.arrayBuffer())
  const files = untar(archive)
  console.log(`sync-upstream: ${files.size} files, sha256 ${createHash('sha256').update(archive).digest('hex').slice(0, 12)}`)

  const manifestFile = [...files.keys()].find((file) => file.endsWith('/.claude-plugin/plugin.json'))
  if (!manifestFile) fail('upstream .claude-plugin/plugin.json not found')
  const manifest = JSON.parse(files.get(manifestFile).toString('utf8'))
  const promoted = new Set((manifest.skills ?? []).map((entry) => entry.split('/').pop()))
  console.log(`sync-upstream: upstream plugin ${manifest.name}@${manifest.version} promotes ${promoted.size} skills`)

  const upstream = new Map()
  for (const bucket of BUCKETS) {
    const names = new Set()
    for (const file of files.keys()) {
      const match = new RegExp(`/skills/${bucket}/([^/]+)/`).exec(file)
      if (match) names.add(match[1])
    }
    for (const name of [...names].sort()) {
      const marker = `/skills/${bucket}/${name}/`
      const entry = { bucket, files: new Map() }
      for (const file of files.keys()) {
        const at = file.indexOf(marker)
        if (at >= 0) entry.files.set(file.slice(at + marker.length), files.get(file))
      }
      upstream.set(name, entry)
    }
  }

  if (upstream.size !== 39) fail(`expected 39 skills, found ${upstream.size}`)
  let problems = 0
  for (const [name, entry] of upstream) {
    const found = validateSkill(entry.bucket, name, entry.files)
    if (found.length > 0) {
      problems += 1
      for (const problem of found) console.error(`  INVALID ${entry.bucket}/${name}: ${problem}`)
    }
    if (!promoted.has(name) && (entry.bucket === 'engineering' || entry.bucket === 'productivity')) {
      problems += 1
      console.error(`  INVALID ${entry.bucket}/${name}: missing from upstream plugin manifest`)
    }
  }
  for (const name of promoted) {
    if (!upstream.has(name)) {
      problems += 1
      console.error(`  INVALID ${name}: promoted in plugin manifest but missing from skills tree`)
    }
  }
  if (problems > 0) fail(`${problems} validation problems; nothing written`)

  const enabledFile = path.join(root, 'enabled-skills.json')
  const shipAll = args.has('--all')
  const config = shipAll ? undefined : await readJson(enabledFile).catch(() => undefined)
  if (!shipAll && config === undefined) warn('enabled-skills.json not found; shipping every upstream skill')
  const enabled = config === undefined ? undefined : new Set(config.enabled ?? [])
  if (enabled !== undefined) {
    if (enabled.size === 0) fail('enabled-skills.json lists no skills')
    for (const name of enabled) {
      if (!upstream.has(name)) fail(`enabled-skills.json names an unknown upstream skill: "${name}"`)
    }
  }
  const selected = new Map([...upstream].filter(([name]) => enabled === undefined || enabled.has(name)))
  const disabled = [...upstream.keys()].filter((name) => !selected.has(name)).sort()
  console.log(
    `sync-upstream: ${upstream.size} skills upstream, shipping ${selected.size}` +
      (enabled === undefined ? ' (all)' : ' (enabled-skills.json)'),
  )
  if (disabled.length > 0) console.log(`  disabled: ${disabled.join(', ')}`)

  const existing = await readExisting()
  const added = [...selected.keys()].filter((name) => !existing.has(name)).sort()
  const updated = [...selected.keys()].filter((name) => existing.has(name) && !sameFiles(existing.get(name), selected.get(name).files)).sort()
  const removed = [...existing.keys()].filter((name) => !selected.has(name)).sort()

  console.log(`sync-upstream: added ${added.length}, updated ${updated.length}, removed ${removed.length}`)
  if (added.length) console.log(`  added: ${added.join(', ')}`)
  if (updated.length) console.log(`  updated: ${updated.join(', ')}`)
  if (removed.length) console.log(`  removed: ${removed.join(', ')}`)

  if (check) {
    if (removed.length > 0) warn('--check: removed skills listed above would be deleted by --prune')
    console.log('sync-upstream: check complete, nothing written')
    return
  }

  for (const name of [...selected.keys()].sort()) {
    const entry = selected.get(name)
    const dir = path.join(skillsDir, name)
    await fs.rm(dir, { recursive: true, force: true })
    for (const [relative, buffer] of entry.files) {
      const target = path.join(dir, ...relative.split('/'))
      if (!target.startsWith(dir + path.sep)) fail(`refusing unsafe path ${relative}`)
      await fs.mkdir(path.dirname(target), { recursive: true })
      await fs.writeFile(target, normalizeText(relative, buffer))
    }
  }

  if (removed.length > 0) {
    if (!prune) warn(`kept ${removed.length} skills that are not enabled; run with --prune to delete them`)
    else for (const name of removed) await fs.rm(path.join(skillsDir, name), { recursive: true, force: true })
  }

  const commit = await fetchCommit()
  if (commit === undefined) warn('could not resolve upstream commit; upstream.json keeps the previous value')
  const buckets = Object.fromEntries(BUCKETS.map((bucket) => [bucket, [...upstream].filter(([, entry]) => entry.bucket === bucket).map(([name]) => name).sort()]))
  const previous = await readJson(path.join(root, 'upstream.json')).catch(() => ({}))
  const record = {
    repository: REPOSITORY,
    ref: 'main',
    commit: commit ?? previous.commit ?? null,
    pluginVersion: manifest.version,
    availableSkillCount: upstream.size,
    skillCount: selected.size,
    enabledSkills: enabled === undefined ? [...upstream.keys()].sort() : [...enabled].sort(),
    disabledSkills: disabled,
    buckets,
    syncedAt: new Date().toISOString(),
  }
  await fs.writeFile(path.join(root, 'upstream.json'), `${JSON.stringify(record, null, 2)}\n`)
  console.log(
    `sync-upstream: wrote ${selected.size} of ${upstream.size} skills and upstream.json (${REPOSITORY}@${record.commit ?? 'unknown'})`,
  )
}

function sameFiles(left, right) {
  if (left.size !== right.size) return false
  for (const [name, buffer] of right) {
    const current = left.get(name)
    if (current === undefined || !current.equals(normalizeText(name, buffer))) return false
  }
  return true
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'))
}

main().catch((error) => fail(error.stack ?? String(error)))
