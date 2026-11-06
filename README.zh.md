# Matt Pocock 智能体技能 — DeepSeek Harness (DSH) 移植版

[English](README.md) | **中文**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Unofficial adaptation](https://img.shields.io/badge/status-unofficial%20adaptation-orange.svg)](https://github.com/mattpocock/skills)
[![DSH plugin](https://img.shields.io/badge/DSH-plugin-8257D0.svg)](https://github.com/topics/dsh-plugin)
[![DSH runtime](https://img.shields.io/badge/DSH-0.2.2--rc.1-0A84FF.svg)](https://github.com/deepseek-ai/deepseek-harness)
[![Release v0.5.2](https://img.shields.io/badge/release-v0.5.2-0A84FF.svg)](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills/releases)
[![GitHub stars](https://img.shields.io/github/stars/xiaoxiaosrm/dsh-mattpocock-skills.svg)](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills)

> **⚠️ 非官方社区移植。** 本包是**移植版**，不是上游项目。技能正文由 **Matt Pocock** 撰写
> （[mattpocock/skills](https://github.com/mattpocock/skills)，MIT，© Matt Pocock），
> 我们**没有**参与创作，只把它们重新排列成 DSH 的技能目录结构，并包装成 DSH bundle 插件。
> 如果你觉得有用，请给**上游仓库**点星。许可与署名见 [LICENSE](./LICENSE)。

这是一个 DeepSeek Harness **bundle 插件**，把 Matt Pocock 的
[《Skills for Real Engineers》](https://github.com/mattpocock/skills) 技能集移植成 DSH 原生、可发现的技能。

这是**技能集移植**，不是 Claude Code 插件框架的 fork：`SKILL.md` 正文原样保留（同样的提示词、同样的流程），
只重新排列成 DSH 的单层技能发现规则（`<根目录>/<名称>/SKILL.md`）。上游按四个桶组织技能
（`engineering/`、`productivity/`、`misc/`、`in-progress/`）；本包把它们摊平到 `skills/`，
并在 [`upstream.json`](./upstream.json) 中记录每个技能的来源桶。

已与上游 **`mattpocock-skills` 1.3.2** 同步（commit
[`4ae2317`](https://github.com/mattpocock/skills/commit/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d)，
2026-10-31），并针对 **DSH 0.2.2-rc.1** 完成适配与验证。

## 内容 — 9 个启用技能

`enabled-skills.json` 决定本包发布哪些技能。上游其余技能默认关闭，需要时见下方「关闭的技能」小节恢复。

### 工程（Engineering，启用 2 个，共 20 个）

| 技能 | 作用 |
|---|---|
| `grill-with-docs` | 边拷问边把领域模型和文档建起来 |
| `research` | 针对一手资料做调研，产出带引用的 Markdown 文件 |

### 效率（Productivity，7 个全启用）

| 技能 | 作用 |
|---|---|
| `grill-me` | 通过不断追问，打磨你的方案或设计 |
| `grilling` | 就一个计划、决策或想法持续拷问，直到设计树收敛 |
| `handoff` | 把当前对话压缩成交接文档，交给另一个智能体 |
| `teach` | 在持久化工作区里，跨多次会话教你一项技能或概念 |
| `to-questionnaire` | 把需要别人回答的决策做成一份问卷 |
| `wait-what` | 某条消息没听懂时，用大白话重新讲一遍 |
| `writing-for-agents` | 写给智能体看的文档（技能、AGENTS.md、CLAUDE.md） |

每个启用的技能都是单层的 `skills/<名称>/` 目录，资源文件（`agents/openai.yaml`、`scripts/*`、参考 `.md`）
放在同一目录下。DSH 会把它们当成本地技能一样发现。

### 关闭的技能（30 个）

当前不随包发布，改一行即可恢复：

- **工程（18 个）：** `ask-matt`、`code-review`、`codebase-design`、`diagnosing-bugs`、`domain-modeling`、`implement`、`implement-spec`、`improve-codebase-architecture`、`pr`、`prototype`、`retro`、`setup-matt-pocock-skills`、`tdd`、`to-spec`、`to-tickets`、`triage`、`wayfinder`、`wizard`
- **杂项（4 个）：** `git-guardrails-claude-code`、`migrate-to-shoehorn`、`scaffold-exercises`、`setup-pre-commit`
- **内测（8 个）：** `chief-of-staff`、`claude-handoff`、`loop-me`、`setup-ts-deep-modules`、`software-factory`、`writing-beats`、`writing-fragments`、`writing-shape`

要恢复某个技能：把名字加回 `enabled-skills.json`，再运行
`npm run sync:upstream -- --prune`。`node scripts/sync-upstream.mjs --all`
会忽略这份清单、发布全部 39 个。

## 各技能的调用方式

DSH 按「谁可以加载」给技能分类。这 9 个启用技能分两组（已用真实的 `skill-filesystem` provider 验证）：

| 分组 | 技能 | 怎么用 |
|---|---|---|
| **模型 + 你**（3 个） | `grilling`、`research`、`writing-for-agents` | 任务匹配时模型可以自己加载；也会出现在 `/` 斜杠菜单里，由你手动触发。 |
| **仅你**（6 个） | `grill-with-docs`、`grill-me`、`handoff`、`teach`、`to-questionnaire`、`wait-what` | 只有**你**能发起：在 `/` 斜杠菜单里选，或在输入框输入 `/名称 <参数>`。多数在上游带 `disable-model-invocation: true`。 |

> **为什么大多是「仅你」：**上游把交互式辅导流程和工作录入流程标成「只能由人的手势触发」，
> 避免模型自作主张开启一个跨会话的长流程。如果想让模型自己用某个技能，
> 把那行 `disable-model-invocation: true` 从该技能的 `SKILL.md` 里删掉即可。

## 安装

需要 **DSH 0.2.2-rc.1**（本包固定依赖 `@deepseek-ai/dsh-skill-filesystem@0.2.2-rc.1`；
升级运行时请同步更新这个固定版本）。

```sh
# 从 GitHub Release 安装（最新发布的 tarball）
dsh plugin --profile web add https://github.com/xiaoxiaosrm/dsh-mattpocock-skills/releases/download/v0.5.2/mattpocock-community-dsh-engineering-skills-0.5.2.tgz

# 或者从本地 checkout / tarball 安装
dsh plugin --profile web add file:./mattpocock-dsh-engineering
```

**DSH 桌面版**：在 **Plugins** 页面安装同一个包（或者把它加进桌面 profile 的 `package.json`
依赖和 `dsh.profile.bundles`），然后重启应用。

安装后重启 profile，验证插件已加载、技能可见：

```sh
dsh --profile web --dump-config | grep -A5 'skill-filesystem-mattpocock'
```

技能会和你的本地技能一起出现在模型目录里，覆盖所有 DSH 界面（web、TUI、headless）。
「仅你」的技能在 profile 重启、会话重新打开后，还会出现在 `/` 斜杠菜单里。

> **关于 `agents/*.yaml` 资源文件。** `agents/*.yaml` 是 Claude Code 的接口描述文件，DSH **不解析**它们。
> 保留它们只是为了与上游保持原样，实际不起作用。另外，若干技能会引用 `docs/agents/issue-tracker.md`
> 这类由 `/setup-matt-pocock-skills` 在项目里生成的仓库级文件；在你项目里跑一次那个技能
> （或者提供 issue 跟踪器），依赖跟踪器的技能（`code-review`、`triage`、`to-tickets`、`to-spec`）才能解析规格来源。

## 从上游更新

上游变更频繁，本仓库把同步做成了机械、可复现的流程：

```sh
npm run check:upstream   # 下载上游、校验所有技能、报告新增/更新/删除（不写盘）
npm run sync:upstream    # 写入启用的技能、刷新 upstream.json
node scripts/sync-upstream.mjs --prune   # 同时删除未启用的技能
node scripts/sync-upstream.mjs --all     # 忽略 enabled-skills.json，发布全部 39 个
```

脚本会下载上游的压缩包，按 DSH 的 frontmatter 规则逐个校验 `SKILL.md`
（`name` 必须等于目录名且为 kebab-case、必须有 `description`、调用开关必须用 kebab-case 键），
并断言上游插件清单里的 promoted 技能全部覆盖，全部通过后才写盘。它只写
`enabled-skills.json` 里列出的技能。`upstream.json` 记录本次同步的上游提交、插件版本，
以及启用/关闭的划分。

## 为什么做成插件，而不是直接复制到 `~/.dsh/skills/`

- 一份交付物就能在多台机器、多个仓库之间分发并管理版本。
- 装在 profile 的 `node_modules` 下，`dsh plugin remove` 就能干净卸载。
- 一个 `cordis.patch.yml` 会**注册一个专属的 host `skill-filesystem` 实例**
  （`skill-filesystem-mattpocock`），落进 DSH 的**全局技能层**，所以在**所有**界面
  （web、TUI、headless）都能加载。本包**不**去 patch 共享的 `skill-filesystem` 那一行：
  web profile 默认把它设为 `disabled`（「preset 自己负责本地发现」），
  往它上面追加 `customSkillDirs` 会让整套技能在 web 上完全不可见。
  因此本包插入一个独立的实例，`providerName: mattpocock`、`includeDefaultRoots: false`，
  把自己的发现范围严格限制在本包的 `skills/` 目录。该路径规则已按 DSH 0.2.2-rc.1 的
  bundle patch `baseUrl`（profile 目录）验证过。

> **说明：**npm tarball 只发布运行所需文件（`skills/`、`enabled-skills.json`、`upstream.json`、
> `cordis.patch.yml`、`LICENSE`、`README.md`、`README.zh.md`）。完整变更历史在仓库的 `CHANGELOG.md`。

## 许可与署名

MIT。技能正文改编自 [mattpocock/skills](https://github.com/mattpocock/skills)
（MIT，© Matt Pocock）。详见 [LICENSE](./LICENSE)。如果你觉得原版有用，请给上游仓库点星；
本包只是社区分发移植。
