# 安装

## 无构建版本

如果你想使用 ES 模块。

::: warning
如果直接在浏览器中打开了上面的 index.html，你会发现它抛出了一个错误，因为 ES 模块不能通过 `file://` 协议工作。为了使其工作，你需要使用本地 HTTP 服务器通过 `http://` 协议提供 index.html。
:::

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

另外，也可以直接在 `<script>` 标签中导入。

::: tip
该版本的所有顶层 API 都以属性的形式暴露在了全局的 Mettle 对象上。
:::

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
上面两种方式，默认都使用了生产版本。如果你想在开发中获得更精准的代码定位，那么可以用开发版本，只需要把文件后缀`*.prod.js`中`prod`字段删除即可。
:::

::: tip
无构建的优势伴随着权衡：

- 无法使用 JSX 语法
- 需要`return () =>`
- 无法自动解包，必须手动`.value`

:::

## 包管理器

在用 Mettle 构建大型应用时，推荐使用包管理器安装。

```bash
> npm install mettle
```

## 命令行工具

当你构建大型应用时，推荐使用 Mettle 提供的官方项目脚手架 [createMettleApp](/zh/tool/createMettleApp/) 来搭建项目。为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了开箱即用的构建设置。

## 对不同构建版本的解释

在 NPM 包的 `dist/` 目录你将会找到很多不同的 Mettle 构建版本。这里列出了它们之间的差别：

|                    | ES Module (基于构建工具使用) | ES Module (直接用于浏览器) | UMD                 |
| ------------------ | ---------------------------- | -------------------------- | ------------------- |
| 完整版             | -                            | mettle.full-esm.js         | mettle.full.js      |
| 完整版(生产环境)   | -                            | mettle.full-esm.prod.js    | mettle.full.prod.js |
| 运行时版           | mettle.runtime-esm.js        | -                          | -                   |
| 运行时版(生产环境) | mettle.runtime-esm.prod.js   | -                          | -                   |

不同的版本：

- **完整版本：** 包括编译器(用于将模板字符串编译为 JavaScript 呈现函数的代码)和运行时版本。

- **运行时版：** 用于创建实例、渲染和处理虚拟 DOM 的代码。基本上，它是从编译器中删除所有其他内容。
