# babelPluginJsxToMettle

[babelPluginJsxToMettle](https://www.npmjs.com/package/babel-plugin-jsx-to-mettle) is a babel plugin that converts JSX for use with Mettle tag template.

## Install

```bash
npm install babel-plugin-jsx-to-mettle
```

::: tip
[createMettleApp](/tool/createMettleApp/) The project scaffolding tool has been installed by default. Select the `mettle-jsx` or `mettle-jsx-apps` template.
:::

## Usage

In your Babel configuration (`.babelrc`, `babel.config.js`, `babel` field in `package.json`, etc.), add the plugin:

```js
{
  "plugins": [
    ["babel-plugin-jsx-to-mettle"]
  ]
}
```

## Options

### `tag=html`

By default, [babelPluginJsxToMettle](https://www.npmjs.com/package/babel-plugin-jsx-to-mettle) will handle all functions tagged with the name `html` markup template. To use a different name, use the `tag` option in the Babel configuration:

```js
{"plugins":[
  ["babel-plugin-jsx-to-mettle", {
    "tag": "html"
  }]
]}
```
