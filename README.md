# staging-release-update-action

<a href="https://github.com/mackerelio/staging-release-update-action/actions"><img alt="javscript-action status" src="https://github.com/mackerelio/staging-release-update-action/workflows/units-test/badge.svg"></a>

This repository is used for this organization's release flow and is subject to change without notice.

## Code in Main

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test
...
```

## Usage

```yaml
uses: mackerelio/staging-release-update-action@main
with:
  directory: artifacts/
  github-token: ${{ secrets.GITHUB_TOKEN }}
  tag: staging
```

