# babelPluginMettle

[babelPluginMettle](https://www.npmjs.com/package/babel-plugin-mettle) is a babel plugin that converts HTML template strings into Virtual Dom. Dramatically improved rendering performance by moving from previous runtime to compile time.

## Install

```bash
npm install babel-plugin-mettle
```

::: tip
[createMettleApp](/tool/createMettleApp/) The project scaffolding tool is installed by default.
:::

## Usage

In your Babel configuration (`.babelrc`, `babel.config.js`, `babel` field in `package.json`, etc.), add the plugin:

```json
{
  "plugins": [["babel-plugin-mettle"]]
}
```

## Options

### tag=html

By default, [babelPluginMettle](https://www.npmjs.com/package/babel-plugin-mettle) will process all markup templates with a markup function named `html`. To use a different name, use the `tag` option in your `Babel` configuration:

```json
{
  "plugins": [
    [
      "babel-plugin-mettle",
      {
        "tag": "html"
      }
    ]
  ]
}
```

## Expression Pattern

By default, ` html`` ` will be used as a tag template mode. If there are other scenarios, you can choose to call the expression mode, there are two.

- The function name is `tem_h`, and the parameter is a template string.

```js
tem_h(`<p>hello</p>`);
```

- The function name is `str_h`, and the parameters are ordinary strings.

```js
str_h('<p>hello</p>');
```

::: tip
Regardless of whether you choose the default mode or call the expression mode, the final output structure is the same. In addition, we can use these modes at the same time.
:::
