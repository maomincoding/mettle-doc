# Install

## No build

If you need or prefer to use `mettle` in a non-compiled environment, such as a plain `HTML` file.

If you want to use ES modules.

```html
<html>
  <body>
    <script type="module">
      import {
        html,
        createApp,
        signal
      } from 'https://cdn.jsdelivr.net/npm/mettle@latest/dist/mettle.full-esm.js';

      function App() {
          const count = signal(0);

          function add() {
              count.value++;
          }

          return () => html`<h1 onClick=${add}>${count.value}</h1>`;
      }

      createApp(html`<${App}/>`, '#app');
    </script>
  </body>
</html>
```

Alternatively, you can also import directly in the `<script>` tag.

```html
<html>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/mettle@latest/dist/mettle.full.prod.js"></script>
    <script>
      const { html, createApp, signal } = Mettle;

      function App() {
          const count = signal(0);

          function add() {
              count.value++;
          }

          return () => html`<h1 onClick=${add}>${count.value}</h1>`;
      }

      createApp(html`<${App}/>`, '#app');
    </script>
  </body>
</html>
```

::: tip
Both methods above use the production version by default. If you want more accurate code location during development, you can use the development version by removing the `prod` field from the `*.prod.js` file suffix.
:::

::: tip
The advantages of no builds come with tradeoffs:

- Unable to use `JSX` syntax
- Component functions must `return` a template function

:::

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
