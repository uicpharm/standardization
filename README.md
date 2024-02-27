# Code Standardization for UIC Pharmacy Projects

This project houses the linters and their rules for the code standards of UIC Pharmacy
projects, including:

   - Editor configuration with [EditorConfig](https://editorconfig.org)
     ([extension][vsc-editorconfig])
   - Code spell checking with [CSpell](https://cspell.org)
     ([extension][vsc-cspell])
   - Commit message linting with [commitlint](https://commitlint.js.org)
     ([extension][vsc-commitlint])
   - Shell script linting with [ShellCheck](https://www.shellcheck.net)
     ([extension][vsc-shellcheck])
   - Stylesheet linting with [Stylelint](https://stylelint.io)
     ([extension][vsc-stylelint])
   - Markdown linting with [markdownlint](https://github.com/DavidAnson/markdownlint)
     ([extension][vsc-markdownlint])
   - JavaScript and Typescript linting with [eslint](https://eslint.org)
     ([extension][vsc-eslint])
   - YAML linting with [yamllint](https://github.com/rasshofer/yaml-lint)
   - Also includes [check-node-version](https://github.com/parshap/check-node-version)

[vsc-commitlint]: https://marketplace.visualstudio.com/items?itemName=joshbolduc.commitlint
[vsc-cspell]: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
[vsc-editorconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vsc-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vsc-markdownlint]: https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint
[vsc-shellcheck]: https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck
[vsc-stylelint]: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint

We use these tools by setting up simple scripts that run these tests, which are
correspondingly ran in our CI/CD pipelines, such as
[GitHub Actions](https://docs.github.com/en/actions). But installing the extensions in
VS Code will additionally help you get instant feedback from the linting in your editor!
You're welcome!

## Usage

Install this package as a dev dependency in your project:

```sh
npm install -D uicpharm/standardization
```

Then you can hook into as many of these tools as applicable. Typically this is done by
creating a local config file that uses the
[uicpharm/standardization](https://github.com/uicpharm/standardization) one, and setting
up a script in `package.json`.

### EditorConfig

[EditorConfig](https://editorconfig.org) provides editor configurations that are
compatible with a large variety of editors.

Create a symlink to the `.editorconfig` file in the root of your project:

```sh
ln -s ./node_modules/@uicpharm/standardization/.editorconfig
```

### Code Spell Checking

[CSpell](https://cspell.org) spell checks content in your code without getting tripped up
by programming expressions.

Create a file called `.cspell.json` in your project similar to this:

```json
{
   "import": [ "@uicpharm/standardization/.cspell.json" ],
   "useGitignore": true
}
```

Then add a script in `package.json` similar to this:

```json
"scripts": {
   "cspell": "cspell . --show-suggestions --no-progress"
}
```

### Commit Message Linting

Using [commitlint](https://commitlint.js.org) helps ensure we have well formed,
thought out, semantic commit messages.

Create a file called `.commitlintrc.json` in your project similar to this:

```json
{
   "extends": [ "@uicpharm/standardization/commitlint.config.js" ]
}
```

Then add a script in `package.json`, providing the first commit hash to begin linting
from. For example, if the commit hash was `a1b2c3d4e5`:

```json
"scripts": {
   "commitlint": "commitlint --from a1b2c3d4e5",
}
```

### Shell Script Linting

[ShellCheck](https://www.shellcheck.net) will lint your shell scripts! No additional
configuration is necessary.

Add a script in `package.json` similar to this:

```json
"scripts": {
   "shellcheck": "shellcheck **/*.sh"
}
```

### Stylesheet Linting

[Stylelint](https://stylelint.io) will lint both CSS and SCSS stylesheets.

Create a file called `.stylelintrc.json` in your project similar to this:

```json
{
   "extends": "./node_modules/@uicpharm/standardization/.stylelintrc.json"
}
```

Then add a script in `package.json` in your project similar to this:

```json
"scripts": {
   "stylelint": "stylelint **/*.css **/*.scss"
}
```

### Markdown Linting

Using [markdownlint](https://github.com/DavidAnson/markdownlint) helps ensure we have
consistent Markdown conventions.

Create a file called `.markdownlint.json` in your project similar to this:

```json
{
   "extends": "@uicpharm/standardization/.markdownlint.json"
}
```

Then add a script in `package.json` in your project similar to this:

```json
"scripts": {
   "markdownlint": "markdownlint **/*.md --ignore node_modules"
}
```

### JavaScript and TypeScript Linting

Using [eslint](https://eslint.org) is critical to catch programming errors and maintain
better coding conventions in JavaScript and TypeScript.

Create a file called `.eslintrc.json` in your project similar to this:

```json
{
   "extends": "./node_modules/@uicpharm/standardization/.eslintrc.js",
}
```

Then add a script in `package.json` in your project similar to this:

```json
"scripts": {
   "eslint": "eslint ."
}
```

### YAML Linting

It doesn't lint to specific YAML schemas by default, but even basic YAML linting with
[yamllint](https://github.com/rasshofer/yaml-lint) is helpful to catch errors. No
configuration is required, although you can make one if you want.

When you create the script in `package.json`, note that it will ignore dot-files and
dot-folders. So, if you want it to lint GitHub workflows, you may want something like
this:

```json
"scripts": {
   "yamllint": "yamllint **/*.yml .*/**/*.yml --ignore=node_modules",
}
```

### Checking the Node Version

Checking the Node version helps ensure that builds are not executed when the right Node
can't be set up for some reason. No configuration is needed, and usually the command is
added as a `test` script in `package.json`.

```json
"scripts": {
   "check-node": "check-node-version --node 20.10.0 --npm 10.2.3",
   "test": "npm run check-node"
}
```

## Putting it all together

Once you have all the desired configs and scripts for individual linting, combine them in
the `test` and `standards` scripts in `package.json`. These 2 scripts are executed by our
[linting and testing](https://github.com/uicpharm/workflows#lint-and-testyml) workflows by
convention.

For instance, if you're using all of the tools, your scripts may look like this:

```json
"scripts": {
   "standards": "npm run eslint && npm run stylelint && npm run shellcheck && npm run yamllint && npm run markdownlint && npm run cspell && npm run commitlint",
   "test": "npm run check-node"
}
```

These are just recommendations, or starting points, and you can add or subtract to these
as needed based on a specific project's needs. For instance, your `test` script will
likely include other code tests, and your `standards` script may also do TypeScript type
checking with a script like `tsc --noEmit` or similar.
