# Guide: Purrpose

> Host and manage the Purrpose packages and tools, and their planning artefacts.

Monorepo containing the Purrpose roadmap, utility libraries, and their backlogs.

Uses Workflow: Planning Work with one backlog per package.

## Recommended Reading

Agents SHOULD scan these files for relevant clarifications when faced with ambiguity or omissions that may result from missing definitions.

- `_guide.md` — this file: system overview, layout, setup, verification.
- `_records/project.art` — the project record.
- `_records/repository.art` — the repository record.

## Repository Layout

```
_backlog/           — plans, instructions, reports
_records/           — project, repository, namespace, scaffolders, scripts, and license records
libs/               — library packages
```

## Projects

| Project                     | Guide                                        | Backlog |
| --------------------------- | -------------------------------------------- | ------- |
| Purrpose (root)             | `_guide.md`                                  | `NONE`  |
| Client Babel                | `libs/client-babel/_guide.md`                | `NONE`  |
| Client Babel Preset Solidjs | `libs/client-babel-preset-solidjs/_guide.md` | `NONE`  |
| Solid Shiki Service         | `libs/solid-shiki-service/_guide.md`         | `NONE`  |

## Records Management

Records are co-located with the resources they describe in `_records/` directories:

- **Project:** `_records/project.art`
- **Repository:** `_records/repository.art`
- **Namespace:** `_records/namespace.art`
- **License:** `_records/license.art`
- **Scaffolders:** `_records/scaffolders/`
- **Scripts:** `_records/scripts/`

## Conventions

This repository follows strict conventions.

Read the convention indexes listed below and follow them when planning and executing work.

The following conventions apply to all packages in this repository:

::READ `./node_modules/@noodlestan/conventions-typescript/art/index.md` — TypeScript conventions.
::READ `./node_modules/@noodlestan/conventions-unit-tests/art/index.md` — Unit Test conventions.

In case of ambiguity or conflict applying conventions, follow links from the convention indexes to extended convention files and read the examples there for what to follow and what to avoid.

## Workflows

Projects in this repository use the following workflows:

| Workflow / Path                                                        | Purpose                                                                                           |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Planning Work** `$DOMAINS/work/workflows/planning-work/workflow.art` | Create and manage work item lifecycles, collecting operational instructions according to context. |

### Planning Work

- The backlog lives at `_backlog/` with subdirectories such as `/3-now` and `/4-next/`.

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```
