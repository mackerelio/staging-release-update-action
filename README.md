# m-g-r-staging

<a href="https://github.com/yseto/m-g-r-staging/actions"><img alt="javscript-action status" src="https://github.com/yseto/m-g-r-staging/workflows/units-test/badge.svg"></a>

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
uses: yseto/m-g-r-staging
with:
  directory: artifacts/
  github-token: ${{ secrets.GITHUB_TOKEN }}
  tag: staging
```

