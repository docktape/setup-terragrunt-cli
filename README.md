# setup-terragrunt

[![Continuous Integration](https://github.com/docktape/setup-terragrunt/actions/workflows/ci.yml/badge.svg)](https://github.com/docktape/setup-terragrunt/actions/workflows/ci.yml)

The `docktape/setup-terragrunt` action is a JavaScript action that sets up
Terragrunt CLI in your GitHub Actions workflow by downloading and installing a
specific version of Terragrunt CLI.

After the action has been executed, subsequent steps in the same job can use
Terragrunt CLI commands using
[the GitHub Actions `run` syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun).

## Usage

Since Terragrunt uses Terraform CLI behind the scenes, it has to be installed
prior to using Terragrunt CLI.

This action can be run on `ubuntu-latest`, `windows-latest`, and `macos-latest`
GitHub Actions runners.

When running on `windows-latest` the shell should be set to Bash.

When running on self-hosted GitHub Actions runners, NodeJS must be installed
with the version specified in the
[`action.yml`](https://github.com/docktape/setup-terragrunt/blob/master/action.yml).

The default configuration installs the `v0.58.9` version of Terragrunt CLI:

```yaml
steps:
  - name: Setup Terraform CLI
    uses: hashicorp/setup-terraform@v3
    with:
      terraform_wrapper: false
  - name: Setup Terragrunt CLI
    uses: docktape/setup-terragrunt@v1
```

A specific version of Terragrunt CLI can be installed:

```yaml
steps:
  - name: Setup Terraform CLI
    uses: hashicorp/setup-terraform@v3
    with:
      terraform_wrapper: false
  - name: Setup Terragrunt CLI
    uses: docktape/setup-terragrunt@v1
    with:
      version: 'v0.58.8'
```

## Inputs

The action supports the following inputs:

- `version` - (optional) The version of Terragrunt CLI to install. If no version
  is given, it will default to `v0.58.9`.

## Outputs

There are no outputs for this action.

## License

```text
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
