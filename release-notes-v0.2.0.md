# v0.2.0 — Productivity skills added (25 skills total)

## ⚠️ Unofficial adaptation — not the upstream project

This is a **community adaptation** of [mattpocock/skills](https://github.com/mattpocock/skills)
(MIT, © Matt Pocock), re-packaged for **DeepSeek Harness (DSH)**.

- We did NOT write these skills. All skill bodies are preserved verbatim from
  the upstream repo. We only re-arranged them into DSH's skill layout and
  wrapped them in a DSH bundle plugin.
- If you like these skills, **star the upstream repo**:
  https://github.com/mattpocock/skills
- Full license & attribution: see LICENSE (upstream copyright retained).

## What's in this release

**25 skills** (74 files), installable as a DSH bundle plugin:

- **Engineering (18)**: ask-matt, code-review, codebase-design,
  diagnosing-bugs, domain-modeling, grill-with-docs, implement,
  improve-codebase-architecture, prototype, research, resolving-merge-conflicts,
  setup-matt-pocock-skills, tdd, to-spec, to-tickets, triage, wayfinder, wizard
- **Productivity (7)**: teach (user-invocable via `/teach`), grill-me, grilling,
  handoff, to-questionnaire, wait-what, writing-for-agents

## Install

```sh
dsh plugin --profile web add https://github.com/xiaoxiaosrm/dsh-mattpocock-skills/releases/download/v0.2.0/mattpocock-community-dsh-engineering-skills-0.2.0.tgz
# restart the profile, then:
#   model-invocable skills → auto-available in the agent's skill catalog
#   user-invocable skills  → pick from the / slash menu or type /name
```

Requires DeepSeek Harness (Node >= 20). See README for invocation details.

## Changes

- 0.2.0: added Productivity category (teach, grill-me, grilling, handoff,
  to-questionnaire, wait-what, writing-for-agents); README invocation guide;
  CHANGELOG added
- 0.1.0: initial Engineering 18-skill bundle

## Assets

- `mattpocock-community-dsh-engineering-skills-0.2.0.tgz` — the distributable
  bundle (upload to this release)
