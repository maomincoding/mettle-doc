# Install

## CDN

If you want to use ES Module.

::: warning
If you open the above index.html directly in the browser, you will find that it throws an error because ES modules cannot work through the `file://` protocol. In order for this to work, you need to use a local HTTP server to serve index.html via the `http://` protocol.
:::

```html
<script type="module">
  import {
    html,
    createApp,
  } from 'https://cdn.jsdelivr.net/npm/mettle@latest/dist/mettle.full-esm.js';

  function App({ setData }) {
      let count = 0;

      function add() {
          setData(() => {
              count++;
          });
      }
      return () => html`<h1 onClick=${add}>${count}</h1>`;
  }

  createApp(html`<${App}/>`, '#app');
</script>
```

If you find the above method a bit troublesome, you can also import it directly in the `<script>` tag.

::: tip
All top-level APIs of this version are exposed as properties on the global Mettle object.
:::

```html
<script src="https://cdn.jsdelivr.net/npm/mettle@latest/dist/mettle.full.prod.js"></script>
<script>
  const { html, createApp } = Mettle;

  function App({ setData }) {
      let count = 0;

      function add() {
          setData(() => {
              count++;
          });
      }
      return () => html`<h1 onClick=${add}>${count}</h1>`;
  }

  createApp(html`<${App}/>`, '#app');
</script>
```

::: tip
The above two methods use the production version by default. If you want to get more accurate code positioning during development, you can use the development version. You only need to delete the `prod` field in the file suffix `*.prod.js`.
:::

## Package Manager

When building large applications with Mettle, it is recommended to install using a package manager.

```bash
> npm install mettle
```

## CLI

When you build a large-scale application, it is recommended to use the official project scaffolding [createMettleApp](/tool/createMettleApp/) provided by Mettle to build the project. Quickly build complex scaffolding for single page applications (SPA). It provides out-of-the-box build settings for modern front-end workflows.

## Explanation of the different builds

You'll find many different builds of Mettle in the `dist/` directory of the NPM package. Here are the differences between them:

|                                          | ES Module (used based on build tools) | ES Module (directly used in browsers) | UMD                 |
| ---------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------- |
| Full Version                             | -                                     | mettle.full-esm.js                    | mettle.full.js      |
| Full version (production environment)    | -                                     | mettle.full-esm.prod.js               | mettle.full.prod.js |
| Runtime version                          | mettle.runtime-esm.js                 | -                                     | -                   |
| Runtime version (production environment) | mettle.runtime-esm.prod.js            | -                                     | -                   |

Different versions:

- **Full version:** includes compiler (code for compiling template strings into JavaScript rendering functions) and runtime versions;

- **Runtime version:** Code for creating instances, rendering and manipulating the virtual DOM. Basically, it removes everything else from the compiler;
