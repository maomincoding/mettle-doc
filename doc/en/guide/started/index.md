# Started

Mettle is a JavaScript library for building user interfaces.

- **Easier to get started:** As long as you are basically familiar with HTML, CSS and JavaScript, you can get started directly.

- **Declarative rendering:** We can declaratively describe the relationship between the final output HTML and JavaScript states. Developers can focus more on the development of business logic and do not need to care too much about the details of DOM operations.

- **Smooth user experience:** Template strings are used to write templates. In some scenarios, code intelligent prompts and code formatting are not particularly friendly. Therefore, we provide a new coding method. We can use JSX syntax to write Mettle to improve user development experience.

- **Excellent performance:** Adopts the virtual DOM mode. The virtual DOM uses the diff algorithm to calculate the nodes that really need to be updated, minimizing DOM operations and the typesetting and redrawing losses caused by DOM operations. This significantly improves performance. In addition, our JavaScript library has won excellent results on the world-renowned [benchmark list](https://github.com/krausest/js-framework-benchmark).

- **Componentization:** A function is a component, which can be arbitrarily combined according to the size of the application. And the unique "island feature" of the component allows the level of virtual DOM tree calculation to be controlled at the component level.

- **Flexible application scenarios:** It can be used with or without build tools, and can be adapted to application projects developed by other front-end frameworks.

- **Lightweight:** The compressed file size is less than **10k**. In addition, you can choose [different types](https://www.jsdelivr.com/package/npm/mettle?tab=files&path=dist) files according to different application scenarios.

## ES Module

Most modern browsers already support ES modules, so we can use Mettle through CDN and ES modules like this:

::: warning
If you open the above index.html directly in the browser, you will find that it throws an error because ES modules cannot work through the `file://` protocol. In order for this to work, you need to use a local HTTP server to serve index.html via the `http://` protocol.
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Mettle.js</title>
  </head>
  <body>
    <script type="module">
      import {
        html,
        defineComponent,
      } from 'https://cdn.jsdelivr.net/npm/mettle@latest/dist/mettle.full-esm.js';

      defineComponent(
        {
          mount: '#app',
        },
        ({ setData }) => {
          let count = 0;

          function add() {
            setData(() => {
              count++;
            });
          }

          return () => html`<h1 onClick=${add}>${count}</h1>`;
        }
      );
    </script>
  </body>
</html>
```

## Global Build Version

You can also choose to use the `<script>` tag to import it, so that it can be opened directly in the browser.

::: warning
All top-level APIs of this version are exposed as properties on the global Mettle object.
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Mettle.js</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/mettle@latest/dist/mettle.full.prod.js"></script>
    <script>
      const { html, defineComponent } = Mettle;

      defineComponent(
        {
          mount: '#app',
        },
        ({ setData }) => {
          let count = 0;

          function add() {
            setData(() => {
              count++;
            });
          }

          return () => html`<h1 onClick=${add}>${count}</h1>`;
        }
      );
    </script>
  </body>
</html>
```
