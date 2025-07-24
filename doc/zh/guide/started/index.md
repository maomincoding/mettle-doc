# 开始

## 什么是Mettle?

Mettle 是一个用于构建用户界面的 JavaScript 库。

- **更容易上手：** 只要你对 HTML、CSS 和 JavaScript 已经基本熟悉，就可以直接上手。

- **顺滑的用户体验：** 可以使用 JSX 语法编写 Mettle，大大提升用户开发体验。

- **声明式渲染：** 我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系，开发者可以更加专注于业务逻辑的开发，不需要过多地关心 DOM 操作的细节。

- **符合直觉：** 使用熟悉的原生 JavaScript 语法，不改变 JavaScript 语义，回归原生 JavaScript 的纯净。

- **性能出色：** 采用了虚拟 DOM 的模式，虚拟 DOM 使用 diff 算法的方法来计算出真正需要更新的节点，最大限度地减少了 DOM 操作以及 DOM 操作带来的排版与重绘损耗，从而显著提高了性能。另外，我们的 JavaScript 库在全球知名的[测评榜单](https://github.com/krausest/js-framework-benchmark)上赢得了优秀的成绩。

- **组件化：** 一个函数就是一个组件，可以根据应用规模任意组合。并且组件特有的 **“孤岛特性”**，使得将虚拟 DOM 树计算的级别控制在组件级别。

- **灵活的应用场景：** 有无构建工具都可以使用，并且可以适配到其他前端框架开发的应用项目中去。

- **轻量级：** 压缩后的文件大小不足 **12k**。另外，可以根据不同应用场景，选择[不同类型](https://www.jsdelivr.com/package/npm/mettle?tab=files&path=dist)的文件。

## 快速入手

想要快速体验 Mettle，你可以直接试试下面两种方式之一。

### 全局构建版本

该版本的所有顶层 API 都以属性的形式暴露在了全局的 Mettle 对象上。

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
              setData(() => {
                  count++;
              });
          }
          return () => html`<h1 onClick=${add}>${count}</h1>`;
      }

      createApp(html`<${App}/>`, '#app');
    </script>
  </body>
</html>
```

### ES 模块

现代浏览器大多都已支持 ES 模块，因此我们可以像这样通过 CDN 以及 ES 模块使用 Mettle。

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
              setData(() => {
                  count++;
              });
          }
          return () => html`<h1 onClick=${add}>${count}</h1>`;
      }

      createApp(html`<${App}/>`, '#app');
    </script>
  </body>
</html>
```

我们简单快速地了解 Mettle 的使用，那么我们在下一篇详细说明下 Mettle 有哪些安装方法。
