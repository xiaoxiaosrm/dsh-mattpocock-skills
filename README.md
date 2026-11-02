# Matt Pocock Agent Skills — for DeepSeek Harness (DSH)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Unofficial adaptation](https://img.shields.io/badge/status-unofficial%20adaptation-orange.svg)](https://github.com/mattpocock/skills)
[![DSH plugin](https://img.shields.io/badge/DSH-plugin-8257D0.svg)](https://github.com/topics/dsh-plugin)
[![DSH runtime](https://img.shields.io/badge/DSH-0.2.1--rc.5-0A84FF.svg)](https://github.com/deepseek-ai/deepseek-harness)
[![Release v0.5.0](https://img.shields.io/badge/release-v0.5.0-0A84FF.svg)](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills/releases/tag/v0.5.0)
[![GitHub stars](https://img.shields.io/github/stars/xiaoxiaosrm/dsh-mattpocock-skills.svg)](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills)

> **⚠️ Unofficial community adaptation.** This package is an **adaptation**, not
> the upstream project. The skill bodies were **written by Matt Pocock**
> ([mattpocock/skills](https://github.com/mattpocock/skills), MIT, © Matt Pocock)
> — we did **not** author them. We only re-arranged them into DSH's skill layout
> and wrapped them in a DSH bundle plugin. If you find them useful, **star the
> upstream repo**. License & attribution: [LICENSE](./LICENSE).

A DeepSeek Harness **bundle plugin** that ports Matt Pocock's
[_"Skills for Real Engineers"_](https://github.com/mattpocock/skills) set into
native, discoverable DSH skills.

This is a **skill-set adaptation**, not a fork of the Claude Code plugin harness:
the `SKILL.md` bodies are preserved as-is (same prompts, same process),
re-arranged so DSH's one-level skill discovery (`<root>/<name>/SKILL.md`) finds
them. Upstream keeps its skills in four buckets (`engineering/`, `productivity/`,
`misc/`, `in-progress/`); this package flattens them into `skills/` and records
each skill's upstream bucket in [`upstream.json`](./upstream.json).

Synced with upstream **`mattpocock-skills` 1.3.2** (commit
[`4ae2317`](https://github.com/mattpocock/skills/commit/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d),
2026-10-31). Adapted and verified against **DSH 0.2.1-rc.5**.

## Contents — 39 skills

### Engineering (20)

| Skill | What it does |
|---|---|
| `ask-matt` | Router: which skill or flow fits your situation |
| `code-review` | Two-axis review (Standards + Spec) of a diff from a fixed point, via parallel sub-agents |
| `codebase-design` | Shared vocabulary and discipline for designing deep modules |
| `diagnosing-bugs` | Disciplined diagnosis loop for hard bugs and performance regressions |
| `domain-modeling` | Build and sharpen the project's domain model, glossary, and ADRs |
| `grill-with-docs` | Grilling session that also builds the domain model and docs as it goes |
| `implement` | Implement a spec or tickets, driving TDD at pre-agreed seams |
| `implement-spec` | Implement a whole spec on one integration branch, ticket by ticket |
| `improve-codebase-architecture` | Scan for deepening opportunities, report as HTML, then grill one |
| `pr` | Write the PR body from a fixed template (summary, evidence, merge danger) |
| `prototype` | Throwaway prototype to answer a design question (logic or UI) |
| `research` | Research a question against primary sources into a cited Markdown file |
| `retro` | Retrospective on a coding session, with environment improvements |
| `setup-matt-pocock-skills` | Per-repo setup: issue tracker, triage labels, domain doc layout |
| `tdd` | Red-green-refactor discipline with mocking and test guides |
| `to-spec` | Turn the current conversation into a spec on the issue tracker |
| `to-tickets` | Break a plan or spec into tracer-bullet tickets with blocking edges |
| `triage` | Move issues and external PRs through a triage state machine |
| `wayfinder` | Plan work too large for one session as a shared map of decision tickets |
| `wizard` | Generate an interactive bash wizard for steps only a human can perform |

### Productivity (7)

| Skill | What it does |
|---|---|
| `grill-me` | Relentless interview to sharpen a plan or design |
| `grilling` | Grill a plan, decision, or idea until the design tree is resolved |
| `handoff` | Compact the conversation into a handoff document for another agent |
| `teach` | Teach a skill or concept across sessions in a stateful workspace |
| `to-questionnaire` | Turn a decision into a questionnaire for someone else to fill in |
| `wait-what` | Re-pitch a message that did not land, in plain language |
| `writing-for-agents` | Write documents (skills, AGENTS.md) that agents can actually follow |

### Misc (4, rarely used upstream, not promoted in their plugin)

| Skill | What it does |
|---|---|
| `git-guardrails-claude-code` | Claude Code hooks that block dangerous git commands before they run |
| `migrate-to-shoehorn` | Migrate test files from `as` assertions to `@total-typescript/shoehorn` |
| `scaffold-exercises` | Create exercise directory structures that pass linting |
| `setup-pre-commit` | Set up Husky + lint-staged + type checking + tests |

### In-progress (8, upstream beta: public on purpose, feedback wanted, content may change)

| Skill | What it does |
|---|---|
| `chief-of-staff` | Pursue a long-running goal in one session by coordinating sub-agents |
| `claude-handoff` | Hand the conversation off to a fresh background agent |
| `loop-me` | Grill the user about specs for the workflows they want to build |
| `setup-ts-deep-modules` | Wire dependency-cruiser so each TypeScript package is a deep module |
| `software-factory` | Shared language for designing a software factory |
| `writing-beats` | Writing, exploit: assemble raw material into a journey of beats |
| `writing-fragments` | Writing, explore: mine raw fragments, no structure yet |
| `writing-shape` | Writing, exploit: shape raw material into an article, paragraph by paragraph |

Each skill is a single-level `skills/<name>/` directory with its resources
(`agents/openai.yaml`, `scripts/*`, reference `.md`) kept alongside. DSH discovers
them exactly like any local skill.

## How to invoke each skill

DSH classifies skills by who may load them. This bundle's 39 skills fall into
two groups (verified against the real `skill-filesystem` provider):

| Group | Skills | How to use |
|---|---|---|
| **Model + user** (15) | `code-review`, `codebase-design`, `diagnosing-bugs`, `domain-modeling`, `pr`, `prototype`, `research`, `tdd`, `wizard`, `grilling`, `writing-for-agents`, `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit` | The model may load them on its own when a task matches; they also appear in the `/` slash menu for you to force-invoke. |
| **User only** (24) | `ask-matt`, `grill-with-docs`, `implement`, `implement-spec`, `improve-codebase-architecture`, `retro`, `setup-matt-pocock-skills`, `to-spec`, `to-tickets`, `triage`, `wayfinder`, `grill-me`, `handoff`, `teach`, `to-questionnaire`, `wait-what`, `chief-of-staff`, `claude-handoff`, `loop-me`, `setup-ts-deep-modules`, `software-factory`, `writing-beats`, `writing-fragments`, `writing-shape` | Only *you* can start them — pick them in the `/` slash menu, or type `/name <args>` in the composer. Most carry `disable-model-invocation: true` upstream. |

> **Why so many are user-only:** upstream marks interactive coaching flows and
> work-intake flows as user-gesture-only so the model does not start a
> multi-session process unprompted. To let the model pick one up by itself,
> remove the `disable-model-invocation: true` line from that skill's `SKILL.md`.

## Install

Requires **DSH 0.2.1-rc.5** (the bundle pins
`@deepseek-ai/dsh-skill-filesystem@0.2.1-rc.5`; bump the pin when you upgrade
the runtime).

```sh
# from the GitHub release (latest published tarball)
dsh plugin --profile web add https://github.com/xiaoxiaosrm/dsh-mattpocock-skills/releases/download/v0.5.0/mattpocock-community-dsh-engineering-skills-0.5.0.tgz

# or from a local checkout / tarball
dsh plugin --profile web add file:./mattpocock-dsh-engineering
```

In **DSH Desktop**, install the same package from the **Plugins** view (or add
it to the Desktop profile's `package.json` dependencies and
`dsh.profile.bundles`) and restart the app.

Then restart the profile. Verify the bundle loaded and its skills are visible:

```sh
dsh --profile web --dump-config | grep -A5 'skill-filesystem-mattpocock'
```

The skills appear in the model's catalog alongside your normal local skills —
on every DSH surface (web, TUI, headless). User-only skills additionally appear
in the `/` slash menu after the profile restarts and a session (re)opens.

> **Note on `agents/*.yaml` resource files.** The `agents/*.yaml` companions are
> Claude Code interface descriptors and are **not** interpreted by DSH. They ship
> only for fidelity to the source set and are inert. Several skills also reference
> `docs/agents/issue-tracker.md` and similar per-repo files created by
> `/setup-matt-pocock-skills`; run that skill (or provide an issue tracker) once
> in your project for the tracker-dependent skills (`code-review`, `triage`,
> `to-tickets`, `to-spec`) to resolve a spec source.

## Updating from upstream

Upstream changes often; this repo keeps the sync mechanical and reproducible:

```sh
npm run check:upstream   # download upstream, validate all skills, report adds/updates/removes (no writes)
npm run sync:upstream    # write skills/, refresh upstream.json
node scripts/sync-upstream.mjs --prune   # also delete skills upstream removed
```

The script downloads the upstream tarball, validates every `SKILL.md` against the
DSH frontmatter contract (`name` equal to the directory and kebab-case,
`description` present, kebab-case invocation keys), asserts the upstream plugin
manifest's promoted set is covered, and only then writes. `upstream.json`
records the synced commit and plugin version.

## Why a plugin vs. just copying to `~/.dsh/skills/`

- Distributes and version-skills from one deliverable across machines/repos.
- Lives under your profile's `node_modules`, so `dsh plugin remove` cleans it.
- A single `cordis.patch.yml` **registers its own dedicated host
  `skill-filesystem` instance** (`skill-filesystem-mattpocock`) into DSH's
  **global skill layer** — so the set loads in **every** surface (web, TUI,
  headless). The bundle does **not** patch the shared `skill-filesystem` row:
  the web profile ships that row `disabled` ("presets own local discovery"), so
  appending `customSkillDirs` to it made the whole set invisible on web. Instead
  this bundle inserts a distinct instance with `providerName: mattpocock` and
  `includeDefaultRoots: false`, isolating its discovery to exactly this bundle's
  `skills/` directory. Verified against DSH 0.2.1-rc.5's bundle patch `baseUrl`
  (the profile directory).

> **Note:** the npm tarball intentionally ships only the runtime files
> (`skills/`, `upstream.json`, `cordis.patch.yml`, `LICENSE`, `README.md`). The
> full change history lives in the repository's `CHANGELOG.md` on GitHub.

## License & attribution

MIT. The skill bodies are adapted from
[mattpocock/skills](https://github.com/mattpocock/skills) (MIT, © Matt Pocock).
See [LICENSE](./LICENSE). If you find the originals useful, star the upstream
repo; this package is a community distribution adaptation only.
