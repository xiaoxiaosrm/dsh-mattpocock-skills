# Matt Pocock Engineering Skills — for DeepSeek Harness (DSH)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Unofficial adaptation](https://img.shields.io/badge/status-unofficial%20adaptation-orange.svg)](https://github.com/mattpocock/skills)
[![DSH plugin](https://img.shields.io/badge/DSH-plugin-8257D0.svg)](https://github.com/topics/dsh-plugin)
[![Release v0.3.0](https://img.shields.io/badge/release-v0.3.0-0A84FF.svg)](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills/releases/tag/v0.3.0)
[![GitHub stars](https://img.shields.io/github/stars/xiaoxiaosrm/dsh-mattpocock-skills.svg)](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills)

> **⚠️ Unofficial community adaptation.** This package is an **adaptation**, not
> the upstream project. The skill bodies were **written by Matt Pocock**
> ([mattpocock/skills](https://github.com/mattpocock/skills), MIT, © Matt Pocock)
> — we did **not** author them. We only re-arranged them into DSH's skill layout
> and wrapped them in a DSH bundle plugin. If you find them useful, **star the
> upstream repo**. License & attribution: [LICENSE](./LICENSE).

A DeepSeek Harness **bundle plugin** that ports Matt Pocock's
[_"Skills for Real Engineers" / Engineering — straight from my `.agents` directory_](https://github.com/mattpocock/skills)
skill set into native, discoverable DSH skills.

This is a **skill-set adaptation**, not a fork of the Claude Code plugin harness:
the `SKILL.md` bodies are preserved as-is (same prompts, same process),
re-arranged so DSH's one-level skill discovery (`<root>/<name>/SKILL.md`) finds them.

## Contents — 18 Engineering skills + 7 Productivity skills

### Engineering (18)

| Skill | What it does |
|---|---|
| `ask-matt` | Route a request to the right skill/workflow and phase boundaries |
| `code-review` | Two-axis review (Standards + Spec) of a diff, `HEAD` vs a fixed point, via parallel sub-agents |
| `codebase-design` | Design-then-implement codebase architecture (DEEPENING.md, DESIGN-IT-TWICE.md) |
| `diagnosing-bugs` | Systematic bug diagnosis with a human-in-the-loop template |
| `domain-modeling` | Model a domain via ADRs + CONTEXT format |
| `grill-with-docs` | Quick documentation-focused Q&A |
| `implement` | Focused implementation brief |
| `improve-codebase-architecture` | Refactor with an HTML report of findings |
| `prototype` | Prototype with LOGIC.md / UI.md companions |
| `research` | Research a topic as a structured task |
| `resolving-merge-conflicts` | Guided merge-conflict resolution |
| `setup-matt-pocock-skills` | Install-time setup: issue-tracker provider, triage labels, domain.md |
| `tdd` | Red/green/refactor discipline with mocking.md + tests.md guides |
| `to-spec` | Implement exactly to a written spec |
| `to-tickets` | Break work into tickets |
| `triage` | Triage incoming work against scope (AGENT-BRIEF, OUT-OF-SCOPE) |
| `wayfinder` | Navigation/decision skill when you don't know the next step |
| `wizard` | Multi-step guided workflow driven by `template.sh` |

### Productivity (7)

| Skill | What it does |
|---|---|
| `teach` | **User-invocable only.** Teach the user a new skill or concept inside a persistent teaching workspace (MISSION.md, lessons/, learning-records/, reference/). Pick it from the `/` slash menu or type `/teach <topic>` — the model cannot self-invoke it. |
| `grill-me` | The user gets grilled to sharpen their own plan |
| `grilling` | Grill a plan/design with relentless questioning |
| `handoff` | Produce a clean handoff summary for another agent or human |
| `to-questionnaire` | Turn the conversation into a structured questionnaire |
| `wait-what` | The "wait, what?" second look at a claim or plan |
| `writing-for-agents` | Write docs/instructions optimized for agents (SKILL-MECHANICS.md) |

> **About `teach`:** it ships with `disable-model-invocation: true` (upstream
> design) — the model cannot load it on its own, so it does **not** appear in
> the model's skill catalog. It is a *user-invocable* skill: it shows up in the
> `/` slash menu, and the pre-step gesture boundary also recognizes a hand-typed
> `/teach ...` token in a message.

Each skill is a single-level `skills/<name>/SKILL.md` directory with its resources
(`agents/openai.yaml`, `scripts/*`, reference `.md`) kept alongside. DSH discovers
them exactly like any local skill.

## How to invoke each skill

DSH classifies skills by who may load them. This bundle's 25 skills fall into
two groups (verified against the real `skill-filesystem` provider):

| Group | Skills | How to use |
|---|---|---|
| **Model + user** (11) | `code-review`, `codebase-design`, `diagnosing-bugs`, `domain-modeling`, `grilling`, `prototype`, `research`, `resolving-merge-conflicts`, `tdd`, `wizard`, `writing-for-agents` | The model may load them on its own when a task matches; they also appear in the `/` slash menu for you to force-invoke. |
| **User only** (14) | `teach`, `ask-matt`, `grill-me`, `grill-with-docs`, `handoff`, `implement`, `improve-codebase-architecture`, `setup-matt-pocock-skills`, `to-questionnaire`, `to-spec`, `to-tickets`, `triage`, `wait-what`, `wayfinder` | Only *you* can start them — pick them in the `/` slash menu, or type `/name <args>` in the composer. The model will not self-invoke these (several are `disable-model-invocation` upstream). |

> **Why so many are user-only:** upstream marks interactive coaching flows
> (`teach`, `grill-me`, `wait-what`, `to-questionnaire`) and work-intake flows
> (`to-spec`, `to-tickets`, `triage`, `wayfinder`) as user-gesture-only so the
> model does not start a multi-session process unprompted. If you want the model
> to be able to pick one up by itself, copy that skill's `SKILL.md` and drop the
> `disable-model-invocation: true` line.

## Productivity skills in detail

The seven productivity skills are workflow helpers around *your* working style,
not coding tasks. They are best invoked from the `/` menu or by naming the flow
in your message.

- **`/teach <topic>`** — the flagship. Creates a *teaching workspace* in the
  current directory: `MISSION.md` (why you want to learn), `RESOURCES.md`
  (high-trust sources), `lessons/*.html` (one tightly-scoped lesson each),
  `learning-records/*.md` (numbered ADR-style records of what you learned),
  `reference/*.html` (printable cheat sheets), `NOTES.md` (preferences).
  Teaching is *stateful across sessions*: the files persist, so the next
  `/teach` session continues from your learning records and computes your zone
  of proximal development.
- **`/grill-me`** — the agent interviews *you* to sharpen your plan before you
  commit to it. Use when you have a half-formed idea.
- **`/grilling`** — the inverse: you (or your spec) get interrogated relentlessly
  to find holes in a plan or design.
- **`/handoff`** — writes a clean handoff summary (state, decisions, next steps)
  for another agent or a human teammate.
- **`/to-questionnaire`** — distills the current conversation into a structured
  questionnaire (useful for requirements gathering or user research).
- **`/wait-what`** — forces a skeptical second look at a claim, estimate, or
  plan before you accept it.
- **`/writing-for-agents`** — guides writing docs/instructions that agents can
  actually follow; ships `SKILL-MECHANICS.md` explaining the mechanics.

### Typical first-run sequence for a new project

1. Run `/setup-matt-pocock-skills` once to configure your issue tracker
   (GitHub/GitLab/local) and triage vocabulary.
2. Use `/to-spec` or `/to-tickets` to capture incoming work.
3. Use `/triage` and `/wayfinder` to route and plan large chunks of work.
4. Use `/code-review`, `/tdd`, `/diagnosing-bugs`, `/resolving-merge-conflicts`
   during implementation.
5. Use `/teach`, `/grill-me`, `/writing-for-agents` for your own learning and
   documentation.

## Install

Requires a DeepSeek Harness install (`dsh` on PATH or the repo's `pnpm dsh`).

```sh
# from the GitHub release (latest published tarball)
dsh plugin --profile web add https://github.com/xiaoxiaosrm/dsh-mattpocock-skills/releases/download/v0.3.0/mattpocock-community-dsh-engineering-skills-0.3.0.tgz

# or from a local checkout / tarball
dsh plugin --profile web add file:./mattpocock-dsh-engineering
```

Then restart the profile. Verify the bundle loaded and its skills are visible:

```sh
dsh --profile web --dump-config | grep -A5 'skill-filesystem-mattpocock'
```

The skills appear in the model's catalog alongside your normal local skills —
on every DSH surface (web, TUI, headless). User-only skills additionally appear
in the `/` slash menu after the profile restarts and a session (re)opens.

> **Note on `agent` resource files.** The `agents/*.yaml` companions are Claude
> Code interface descriptors and are **not** interpreted by DSH. They ship only
> for fidelity to the source set and are inert. Several skills also reference a
> `/setup-matt-pocock-skills` slash command and `docs/agents/issue-tracker.md`
> that live in the original repository root; run that skill (or provide an
> issue-tracker) once in your project for the tracking-dependent skills
> (`code-review`, `triage`, `to-tickets`) to resolve a spec source.

## Why a plugin vs. just copying to `~/.dsh/skills/`

- Distributes and version-skills from one deliverable across machines/repos.
- Lives under your profile's `node_modules`, so a `dsh plugin remove` cleans it.
- A single `cordis.patch.yml` **registers its own dedicated host
  `skill-filesystem` instance** (`skill-filesystem-mattpocock`) into DSH's
  **global skill layer** — so the set loads in **every** surface (web, TUI,
  headless). v0.3.0 intentionally does **not** patch the shared
  `skill-filesystem` row: the web profile ships that row `disabled` ("presets
  own local discovery"), so appending `customSkillDirs` to it made the whole
  set invisible on web. Instead this bundle inserts a distinct instance with
  `providerName: mattpocock` and `includeDefaultRoots: false`, isolating its
  discovery to exactly this bundle's `skills/` directory.

> **Note:** the npm tarball intentionally ships only the runtime files
> (`skills/`, `cordis.patch.yml`, `LICENSE`, `README.md`). The full change
> history lives in the repository's `CHANGELOG.md` on GitHub.

## License & attribution

MIT. The skill bodies are adapted from
[mattpocock/skills](https://github.com/mattpocock/skills) (MIT, © Matt Pocock).
See [LICENSE](./LICENSE). If you find the originals useful, star the upstream
repo; this package is a community distribution adaptation only.
