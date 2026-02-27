# setup-terragrunt-cli

A GitHub Actions composite action that installs a specific version of the Terragrunt CLI into a GitHub Actions runner. Published as `docktape/setup-terragrunt-cli`. Default Terragrunt version: `v0.58.9`.

## Tech Stack

- Language: TypeScript (compiled to `dist/index.js` via `@vercel/ncc`)
- Runtime: Node 20 (GitHub Actions `node20`)
- Testing: Jest + ts-jest
- Linter: ESLint
- Formatter: Prettier
- Package manager: npm

## Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests (CI mode)
npm run ci-test

# Lint
npm run lint

# Format (write)
npm run format:write

# Format (check)
npm run format:check

# Bundle action (compile TypeScript → dist/)
npm run package

# Run everything: format, lint, test, coverage, package
npm run all
```

## Project Structure

- `src/index.ts` - Action entry point
- `src/setup-terragrunt.ts` - Core logic: downloads Terragrunt binary, caches it, adds to PATH
- `dist/index.js` - Compiled bundle (committed to repo, used at action runtime)
- `action.yml` - Action metadata: input `version` (default `v0.58.9`), uses `node20`
- `script/release` - Release helper script
- `.github/workflows/` - CI, dist check, linter, CodeQL workflows

## Key Notes

- The `dist/` directory must be committed after every source change — run `npm run package` to regenerate, then commit `dist/index.js` and `dist/index.js.map`
- Terraform CLI must be installed separately (e.g., `hashicorp/setup-terraform@v3` with `terraform_wrapper: false`) before using this action
- Supports `ubuntu-latest`, `windows-latest`, and `macos-latest`; on Windows, the shell must be set to Bash
