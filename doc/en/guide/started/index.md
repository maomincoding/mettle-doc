# Started

## What is Mettle?

Mettle is a JavaScript library for building user interfaces.

- **Easier to get started:** As long as you are familiar with HTML, CSS and JavaScript, you can get started directly.

- **Smooth user experience:** You can use JSX syntax to write Mettle, which greatly improves the user development experience.

- **Declarative rendering:** We can declaratively describe the relationship between the final output HTML and JavaScript status, so that developers can focus more on the development of business logic without worrying too much about the details of DOM operations.

- **Intuitive:** Use familiar native JavaScript syntax, do not change JavaScript semantics, and return to the purity of native JavaScript.

- **Excellent performance:** The virtual DOM mode is adopted. The virtual DOM uses the diff algorithm to calculate the nodes that really need to be updated, which minimizes DOM operations and the layout and redrawing losses caused by DOM operations, thereby significantly improving performance. In addition, our JavaScript library has won excellent results on the world-renowned [evaluation list](https://github.com/krausest/js-framework-benchmark).

- **Componentization:** A function is a component, which can be combined arbitrarily according to the application scale. And the unique **"island feature"** of the component makes the level of virtual DOM tree calculation controlled at the component level.

- **Flexible application scenarios:** It can be used with or without build tools, and can be adapted to application projects developed by other front-end frameworks.

- **Lightweight:** The compressed file size is less than **12k**. In addition, you can choose [different types](https://www.jsdelivr.com/package/npm/mettle?tab=files&path=dist) of files according to different application scenarios.

## Quick Start

To quickly experience Mettle, you can try one of the following two methods.

### Global Build Version

All top-level APIs in this version are exposed as properties on the global Mettle object.

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
      const { html, createApp } = Mettle;

      function App({ setData }) {
          let count = 0;

          function add() {
              count++;
              setData();
          }
          return () => html`<h1 onClick=${add}>${count}</h1>`;
      }

      createApp(html`<${App}/>`, '#app');
    </script>
  </body>
</html>
```

### ES Module

Most modern browsers already support ES modules, so we can use Mettle with CDN and ES modules like this.

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
        createApp,
      } from 'https://cdn.jsdelivr.net/npm/mettle@latest/dist/mettle.full-esm.js';

      function App({ setData }) {
          let count = 0;

          function add() {
              count++;
              setData();
          }
          return () => html`<h1 onClick=${add}>${count}</h1>`;
      }

      createApp(html`<${App}/>`, '#app');
    </script>
  </body>
</html>
```

We have a quick and simple introduction to the use of Mettle. In the next article, we will explain in detail how to install Mettle.
