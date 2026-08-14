# GitHub Release 草稿 — v0.2.0

以下内容直接复制进 GitHub Releases 页面的 "Write" 框即可。

---

## 英文版（推荐，面向开源社区）

```
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
dsh plugin --profile web add <tarball-url-or-file-path>
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
```

---

## 中文版（可选，如果你想加中文说明）

```
# v0.2.0 — 加入 Productivity 技能（共 25 个）

## ⚠️ 非官方适配 —— 这不是上游项目

本包是 [mattpocock/skills](https://github.com/mattpocock/skills)（MIT，© Matt Pocock）
的**社区适配**，重新打包为 **DeepSeek Harness (DSH)** 插件。

- 这些技能**并非我们编写**，全部 SKILL.md 正文原样保留自上游仓库。
  我们只做了两件事：把目录重排为 DSH 能识别的一层结构，并封装为 DSH
  bundle 插件。
- 喜欢这些技能请给上游仓库点星：https://github.com/mattpocock/skills
- 许可证与署名见 LICENSE（保留上游版权声明）。

## 本版本包含

**25 个技能**（74 个文件），可作为 DSH bundle 插件安装：

- Engineering（18 个）：ask-matt、code-review、codebase-design、diagnosing-bugs、
  domain-modeling、grill-with-docs、implement、improve-codebase-architecture、
  prototype、research、resolving-merge-conflicts、setup-matt-pocock-skills、
  tdd、to-spec、to-tickets、triage、wayfinder、wizard
- Productivity（7 个）：teach（仅用户调用，`/teach` 触发）、grill-me、grilling、
  handoff、to-questionnaire、wait-what、writing-for-agents

## 安装

```sh
dsh plugin --profile web add <tarball-url-or-file-path>
# 重启 profile 后：
#   模型可调用技能 → 自动出现在 agent 的技能目录
#   仅用户调用技能 → 从 / 斜杠菜单选，或手打 /名称
```

需要 DeepSeek Harness（Node >= 20）。调用细节见 README。

## 更新记录

- 0.2.0：新增 Productivity 分类（teach、grill-me、grilling、handoff、
  to-questionnaire、wait-what、writing-for-agents）；README 增加调用指南；
  新增 CHANGELOG
- 0.1.0：初始 Engineering 18 技能 bundle

## 附件

- `mattpocock-community-dsh-engineering-skills-0.2.0.tgz` — 可分发的 bundle
  （上传到本 Release）
```

---

## 发布时的检查清单

- [ ] 仓库 About 里写：`Unofficial DSH port of mattpocock/skills (MIT, © Matt Pocock)`
- [ ] 上传 `mattpocock-community-dsh-engineering-skills-0.2.0.tgz` 到 Release assets
- [ ] 确认 README 里已有上游链接和 "adaptation only" 声明（已有）
- [ ] 确认 LICENSE 保留上游版权（已有）
- [ ] 建议在 README 顶部加一个醒目 banner（可选，见下）

## 可选：README 顶部醒目声明（建议加）

在 README 第一行标题下加：

> **⚠️ Unofficial community adaptation of [mattpocock/skills](https://github.com/mattpocock/skills) (MIT, © Matt Pocock) for DeepSeek Harness. We did not write these skills — we only re-packaged them as a DSH plugin. Star the upstream repo!**
