# Changelog

All notable changes to `@mattpocock-community/dsh-engineering-skills` are
documented here. This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and uses calendar-ish versions (`0.x.0`).

## [Unreleased]

### Docs

- README is now bilingual: English in [`README.md`](./README.md), Simplified
  Chinese in [`README.zh.md`](./README.zh.md), cross-linked at the top. The npm
  tarball ships both.

## [0.5.0] - 2026-11-02

### Added

- **`pr`** (engineering, model-invoked): write a PR body from the fixed
  Summary / Evidence / Merge Danger template.
- **8 in-progress skills** from upstream's `in-progress/` beta bucket:
  `chief-of-staff`, `claude-handoff`, `loop-me`, `setup-ts-deep-modules`,
  `software-factory`, `writing-beats`, `writing-fragments`, `writing-shape`
  (user-invoked; upstream marks them beta and may change them).
- **4 misc skills** from upstream's `misc/` bucket: `git-guardrails-claude-code`,
  `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit`.
- `scripts/sync-upstream.mjs` with `npm run sync:upstream` / `check:upstream`:
  reproducible upstream sync that validates every `SKILL.md` against DSH's
  frontmatter contract before writing anything.
- `upstream.json`: synced upstream commit, plugin version, and the per-skill
  bucket map.
- `.gitattributes`: text files normalized to LF.

### Changed

- **Re-synced every skill with upstream `mattpocock-skills` 1.3.2** (commit
  `4ae2317`, 2026-10-31). Skill bodies, descriptions, and resource files now
  match upstream, including the `domain-modeling` glossary rename
  (`CONTEXT-FORMAT.md` → `GLOSSARY-FORMAT.md`), the refreshed
  `setup-matt-pocock-skills` tracker templates, and the new `wizard`
  `template.sh`.
- **Adapted to DSH 0.2.1-rc.5.** `@deepseek-ai/dsh-skill-filesystem` is pinned
  to `0.2.1-rc.5`: the npm `latest` dist-tag still points at `0.0.1-rc.3`, so
  the previous `*` range installed a pre-0.2 module whose peer requirements a
  0.2.1 runtime denies at boot. `@deepseek-ai/cordis ~4.0.5` is now a declared
  peer. Re-verified the bundle patch contract (`baseUrl` is the profile
  directory; `!!js` scalars still supported).
- Plugin now ships **39 skills** (was 27): 20 engineering + 7 productivity +
  4 misc + 8 in-progress.
- README rewritten for the 39-skill set, the DSH 0.2.1 requirement, and the
  upstream sync workflow; invocation table is now 15 model+user / 24 user-only.
- CONTRIBUTING: the layout rule now covers the four upstream buckets and the
  validation the sync script performs.
- `package.json` `files` now includes `upstream.json`; sync scripts added.

### Removed

- **`resolving-merge-conflicts`**: upstream no longer ships it, and
  `sync-upstream.mjs --prune` removed it from `skills/`.

### Packaging

- `package.json` version `0.4.0` → `0.5.0`.
- Republished tarball `mattpocock-community-dsh-engineering-skills-0.5.0.tgz`
  on the GitHub release.

## [0.4.0] - 2026-09-05

### Changed

- **Re-synced all 25 shipped skills with upstream `mattpocock/skills` main
  (`3cca18b3`, 2026-09-04).** Content now matches the upstream official set
  (Engineering 18 + Productivity 7):
  - Punctuation reform: upstream removed every em-dash repo-wide; bodies now
    use colons, commas, and parentheses instead.
  - `SKILL.md` descriptions containing colons are now double-quoted in the
    YAML frontmatter (upstream frontmatter fix).
  - User-invoked wording corrected repo-wide ("run `/skill`" → "Call the
    Skill tool with \"skill\"", "run X if missing" → "tell the user to run X").
  - `grilling`: questions in a round are now separated with an `---` rule.
    `grill-with-docs`: dropped the "assumes one writer" rationale section.
    `code-review`: clarified the implementation-step wording.
  - Reference docs/scripts refreshed to match upstream (e.g. `teach` format
    docs, `setup-matt-pocock-skills` tracker docs, `diagnosing-bugs`
    `hitl-loop.template.sh`, `wizard` `template.sh`).
- Imported files are normalized to LF (upstream ships CRLF).

### Added

- **`retro`** (experimental, user-invoked) — conduct a retrospective on a
  coding session and suggest improvements to the agent's environment.
- **`implement-spec`** (experimental, user-invoked) — implement a written
  spec as a single PR by working its ticket task-graph frontier.
- Plugin now ships **27 skills / 78 files** (was 25 / 74). Both new skills
  come from upstream's `skills/in-progress/` beta channel and are marked
  experimental in the README.

### Changed (packaging)

- `package.json` version `0.3.0` → `0.4.0`.
- README: 27-skill contents table (with the two experimental skills), updated
  invocation table (model+user 11 / user-only 16), v0.4.0 release badge and
  tarball install URL.

## [0.3.0] - 2026-08-14

### Fixed

- **Skills were invisible on the DSH web surface.** The bundle's
  `cordis.patch.yml` appended `customSkillDirs` to the shared host
  `skill-filesystem` row, but the web profile ships that row
  `disabled: true` ("presets own local discovery"), so none of the 25 skills
  loaded in the web UI. This release instead **registers a dedicated host
  `skill-filesystem` instance** (`skill-filesystem-mattpocock`, `providerName:
  mattpocock`, `includeDefaultRoots: false`) into DSH's global skill layer, so
  the set loads in every surface (web, TUI, headless). Verified with
  `dsh --profile web --dump-config`.

### Added

- `CONTRIBUTING.md` — contribution guidelines (layout rules, frontmatter
  requirements, what we accept/decline).
- GitHub issue templates (`bug_report.yml`, `feature_request.yml`, `config.yml`)
  and pull-request template (`.github/PULL_REQUEST_TEMPLATE.md`).

### Changed

- `package.json` version `0.2.0` → `0.3.0`.
- README: install/verify commands now reference `skill-filesystem-mattpocock`
  and the v0.3.0 tarball; "Why a plugin" explains the new global-layer insert.

## [0.2.0] - 2026-08-14

### Added

- **Productivity category (7 skills)** — the full `productivity` set from
  mattpocock/skills is now bundled alongside Engineering:
  - `teach` (user-invocable, `disable-model-invocation: true` — appears in the
    `/` slash menu; the model cannot self-invoke it)
  - `grill-me`, `grilling`, `handoff`, `to-questionnaire`, `wait-what`,
    `writing-for-agents` (+ `SKILL-MECHANICS.md`)
- Plugin now ships **25 skills / 74 files** (was 18 / 55).
- README: full invocation-strategy table (model+user vs user-only), a
  "Productivity skills in detail" section, and a first-run sequence.
- `CHANGELOG.md` (this file).

### Changed

- `package.json` version `0.1.0` → `0.2.0`; description now mentions the
  Productivity set; keywords updated (dropped a stray `micro-3d-renderer`
  keyword).

## [0.1.0] - 2026-08-14

### Added

- Initial release: the **Engineering (18 skills)** category from
  [mattpocock/skills](https://github.com/mattpocock/skills), adapted to DSH
  skill discovery:
  - Re-arranged the upstream `skills/engineering/<name>/` hierarchy into DSH's
    one-level `<root>/<name>/SKILL.md` layout.
  - Packaged as a DSH bundle plugin (`package.json` `dsh.bundle.patch` +
    `cordis.patch.yml`) that appends the bundled `skills/` root to the host
    `skill-filesystem` provider via `customSkillDirs` (self-locating off the
    profile `baseUrl`).
  - Skill bodies preserved as-is; `agents/*.yaml` shipped inert for fidelity.
- Verified: bundle patch applies cleanly on `web`/`headless` profiles; all 18
  SKILL.md frontmatters valid (`name` + `description`, kebab-case); runtime
  discovery probe lists all skills; `npm pack` produces a distributable
  tarball.
