# Contributing

Thanks for considering contributing to `@mattpocock-community/dsh-engineering-skills`!

This project is a **community adaptation** of
[mattpocock/skills](https://github.com/mattpocock/skills) (MIT, © Matt Pocock).
Please keep that provenance in mind when you contribute: the skill bodies are
upstream-authored and are preserved verbatim by design.

## What we welcome

- **Bug reports** for the DSH packaging/installation layer (the bundle,
  `cordis.patch.yml`, skill discovery, this repo's docs).
- **Suggestions** for better DSH integration (invocation policy, layout,
  packaging).
- **Docs improvements** to README/CHANGELOG/release notes.
- **New skills from upstream**: if a skill exists in
  [mattpocock/skills](https://github.com/mattpocock/skills) but is missing here,
  open an issue or PR that adds it in the same one-level layout.

## What we usually decline

- **Rewrites of skill bodies.** The upstream `SKILL.md` content is intentionally
  preserved as-is. If you believe an upstream skill is wrong, take it upstream.
- **Adding unrelated skills** that are not part of mattpocock/skills — this
  package is a scoped adaptation, not a general skill dump.
- **Removing upstream attribution** from LICENSE or README (MIT requires the
  copyright notice to remain).

## Development setup

```sh
# The plugin is a plain npm package — no build step.
# Repack the distributable tarball:
npm pack

# Install into a local DSH profile for testing:
dsh plugin --profile web add file:./mattpocock-dsh-engineering
```

### Skill layout rule

DSH discovers skills one level deep: `<root>/<name>/SKILL.md` (or `<name>.md`).
Keep every skill at exactly one level under `skills/`:

```
skills/
  code-review/
    SKILL.md
    agents/openai.yaml   # inert in DSH, kept for upstream fidelity
```

### Frontmatter requirements

Each `SKILL.md` must have at least:

```yaml
---
name: kebab-case-name
description: One-line routing description.
---
```

Optional keys DSH understands: `whenToUse`, `metadata`,
`disable-model-invocation`, `user-invocable`.

## Before opening a PR

1. Run `npm pack` and confirm the tarball contains the expected files
   (`skills/`, `cordis.patch.yml`, `LICENSE`, `README.md`, `package.json`).
2. If you changed skills or frontmatter, verify discovery with the runtime
   probe approach documented in the repo (mount `skill-filesystem` with
   `customSkillDirs` pointing at `skills/` and list results).
3. Update `CHANGELOG.md` under an `Unreleased` section.

## Commit style

Keep commits small and focused. Conventional-commit prefixes are preferred
(`feat:`, `fix:`, `docs:`, `chore:`).

## License

By contributing you agree that your contributions are licensed under the
same MIT license as the project (see [LICENSE](LICENSE)), with upstream
attribution to mattpocock/skills preserved.
