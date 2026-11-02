# Matt Pocock 智能体技能 — DeepSeek Harness (DSH) 移植版

[English](README.md) | **中文**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Unofficial adaptation](https://img.shields.io/badge/status-unofficial%20adaptation-orange.svg)](https://github.com/mattpocock/skills)
[![DSH plugin](https://img.shields.io/badge/DSH-plugin-8257D0.svg)](https://github.com/topics/dsh-plugin)
[![DSH runtime](https://img.shields.io/badge/DSH-0.2.1--rc.5-0A84FF.svg)](https://github.com/deepseek-ai/deepseek-harness)
[![Release v0.5.0](https://img.shields.io/badge/release-v0.5.0-0A84FF.svg)](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills/releases/tag/v0.5.0)
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
2026-10-31），并针对 **DSH 0.2.1-rc.5** 完成适配与验证。

## 内容 — 39 个技能

### 工程（Engineering，20 个）

| 技能 | 作用 |
|---|---|
| `ask-matt` | 路由：根据你当前的处境，推荐该用哪个技能或流程 |
| `code-review` | 从固定基点（commit、分支、tag 或 merge-base）出发，按「标准 + 规格」两轴并行子代理评审 diff，最后并排汇总 |
| `codebase-design` | 设计深模块的共享词汇与纪律 |
| `diagnosing-bugs` | 难查的 bug 与性能回归的诊断闭环 |
| `domain-modeling` | 构建并打磨项目的领域模型、术语表（GLOSSARY.md）与 ADR |
| `grill-with-docs` | 边拷问边把领域模型和文档建起来 |
| `implement` | 按规格或工单实现，在事先约定的接缝处走 TDD |
| `implement-spec` | 在一个集成分支上，逐工单实现整份规格 |
| `improve-codebase-architecture` | 扫描可「加深」的模块机会，产出 HTML 报告，再挑一个进行拷问 |
| `pr` | 按固定模板写 PR 正文（摘要、证据、合并风险） |
| `prototype` | 用一次性原型回答设计问题（状态/逻辑，或 UI 形态） |
| `research` | 针对一手资料做调研，产出带引用的 Markdown 文件 |
| `retro` | 对一次编码会话做复盘，给出改进智能体环境的建议 |
| `setup-matt-pocock-skills` | 仓库级初始化：issue 跟踪器、triage 标签、领域文档布局 |
| `tdd` | 红-绿-重构纪律，附 mocking 与测试指南 |
| `to-spec` | 把当前对话整理成规格，发布到项目 issue 跟踪器 |
| `to-tickets` | 把计划或规格拆成「曳光弹」工单，并标明阻塞关系 |
| `triage` | 让 issue 与外部 PR 走一遍 triage 状态机 |
| `wayfinder` | 把超出单会话规模的工作规划成「决策工单地图」，逐个解决 |
| `wizard` | 生成交互式 bash 向导，引导人完成只有人能做的步骤 |

### 效率（Productivity，7 个）

| 技能 | 作用 |
|---|---|
| `grill-me` | 通过不断追问，打磨你的方案或设计 |
| `grilling` | 就一个计划、决策或想法持续拷问，直到设计树收敛 |
| `handoff` | 把当前对话压缩成交接文档，交给另一个智能体 |
| `teach` | 在持久化工作区里，跨多次会话教你一项技能或概念 |
| `to-questionnaire` | 把需要别人回答的决策做成一份问卷 |
| `wait-what` | 某条消息没听懂时，用大白话重新讲一遍 |
| `writing-for-agents` | 写给智能体看的文档（技能、AGENTS.md、CLAUDE.md） |

### 杂项（Misc，4 个，上游很少用，未进上游官方插件清单）

| 技能 | 作用 |
|---|---|
| `git-guardrails-claude-code` | 配置 Claude Code 钩子，在执行前拦截危险 git 命令 |
| `migrate-to-shoehorn` | 把测试里的 `as` 断言迁移到 `@total-typescript/shoehorn` |
| `scaffold-exercises` | 生成能过 lint 的练习目录结构（分节、题目、答案、讲解） |
| `setup-pre-commit` | 配置 Husky + lint-staged + 类型检查 + 测试 |

### 内测（In-progress，8 个，上游 beta：公开征集反馈，内容可能变化）

| 技能 | 作用 |
|---|---|
| `chief-of-staff` | 在一个会话里协调子代理，推进一个长期目标 |
| `claude-handoff` | 把当前对话交给一个新的后台代理立即接手 |
| `loop-me` | 就你想构建的工作流规格拷问你 |
| `setup-ts-deep-modules` | 给 TypeScript 仓库接上 dependency-cruiser，让每个包成为深模块 |
| `software-factory` | 设计「软件工厂」的共享语言（它跑哪些任务、接哪些服务） |
| `writing-beats` | 写作（利用）：把素材编成一段段「节拍」 |
| `writing-fragments` | 写作（探索）：挖掘原始片段，先不搭结构 |
| `writing-shape` | 写作（利用）：把素材逐段塑造成一篇文章 |

每个技能都是单层的 `skills/<名称>/` 目录，资源文件（`agents/openai.yaml`、`scripts/*`、参考 `.md`）
放在同一目录下。DSH 会把它们当成本地技能一样发现。

## 各技能的调用方式

DSH 按「谁可以加载」给技能分类。本包的 39 个技能分两组（已用真实的 `skill-filesystem` provider 验证）：

| 分组 | 技能 | 怎么用 |
|---|---|---|
| **模型 + 你**（15 个） | `code-review`、`codebase-design`、`diagnosing-bugs`、`domain-modeling`、`pr`、`prototype`、`research`、`tdd`、`wizard`、`grilling`、`writing-for-agents`、`git-guardrails-claude-code`、`migrate-to-shoehorn`、`scaffold-exercises`、`setup-pre-commit` | 任务匹配时模型可以自己加载；也会出现在 `/` 斜杠菜单里，由你手动触发。 |
| **仅你**（24 个） | `ask-matt`、`grill-with-docs`、`implement`、`implement-spec`、`improve-codebase-architecture`、`retro`、`setup-matt-pocock-skills`、`to-spec`、`to-tickets`、`triage`、`wayfinder`、`grill-me`、`handoff`、`teach`、`to-questionnaire`、`wait-what`、`chief-of-staff`、`claude-handoff`、`loop-me`、`setup-ts-deep-modules`、`software-factory`、`writing-beats`、`writing-fragments`、`writing-shape` | 只有**你**能发起：在 `/` 斜杠菜单里选，或在输入框输入 `/名称 <参数>`。多数在上游带 `disable-model-invocation: true`。 |

> **为什么这么多是「仅你」：**上游把交互式辅导流程和工作录入流程标成「只能由人的手势触发」，
> 避免模型自作主张开启一个跨会话的长流程。如果想让模型自己用某个技能，
> 把那行 `disable-model-invocation: true` 从该技能的 `SKILL.md` 里删掉即可。

## 安装

需要 **DSH 0.2.1-rc.5**（本包固定依赖 `@deepseek-ai/dsh-skill-filesystem@0.2.1-rc.5`；
升级运行时请同步更新这个固定版本）。

```sh
# 从 GitHub Release 安装（最新发布的 tarball）
dsh plugin --profile web add https://github.com/xiaoxiaosrm/dsh-mattpocock-skills/releases/download/v0.5.0/mattpocock-community-dsh-engineering-skills-0.5.0.tgz

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
npm run sync:upstream    # 写入 skills/、刷新 upstream.json
node scripts/sync-upstream.mjs --prune   # 同时删除上游已移除的技能
```

脚本会下载上游的压缩包，按 DSH 的 frontmatter 规则逐个校验 `SKILL.md`
（`name` 必须等于目录名且为 kebab-case、必须有 `description`、调用开关必须用 kebab-case 键），
并断言上游插件清单里的 promoted 技能全部覆盖，全部通过后才写盘。
`upstream.json` 记录本次同步的上游提交与插件版本。

## 为什么做成插件，而不是直接复制到 `~/.dsh/skills/`

- 一份交付物就能在多台机器、多个仓库之间分发并管理版本。
- 装在 profile 的 `node_modules` 下，`dsh plugin remove` 就能干净卸载。
- 一个 `cordis.patch.yml` 会**注册一个专属的 host `skill-filesystem` 实例**
  （`skill-filesystem-mattpocock`），落进 DSH 的**全局技能层**，所以在**所有**界面
  （web、TUI、headless）都能加载。本包**不**去 patch 共享的 `skill-filesystem` 那一行：
  web profile 默认把它设为 `disabled`（「preset 自己负责本地发现」），
  往它上面追加 `customSkillDirs` 会让整套技能在 web 上完全不可见。
  因此本包插入一个独立的实例，`providerName: mattpocock`、`includeDefaultRoots: false`，
  把自己的发现范围严格限制在本包的 `skills/` 目录。该路径规则已按 DSH 0.2.1-rc.5 的
  bundle patch `baseUrl`（profile 目录）验证过。

> **说明：**npm tarball 只发布运行所需文件（`skills/`、`upstream.json`、`cordis.patch.yml`、
> `LICENSE`、`README.md`、`README.zh.md`）。完整变更历史在仓库的 `CHANGELOG.md`。

## 许可与署名

MIT。技能正文改编自 [mattpocock/skills](https://github.com/mattpocock/skills)
（MIT，© Matt Pocock）。详见 [LICENSE](./LICENSE)。如果你觉得原版有用，请给上游仓库点星；
本包只是社区分发移植。
