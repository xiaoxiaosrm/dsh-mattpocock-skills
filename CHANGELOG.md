# Changelog

All notable changes to `@mattpocock-community/dsh-engineering-skills` are
documented here. This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and uses calendar-ish versions (`0.x.0`).

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
