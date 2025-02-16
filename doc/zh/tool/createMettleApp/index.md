# createMettleApp

一套用于快速构建 Mettle 项目的命令行工具。 `createMettleApp` 是使用 [Vite](https://vitejs.dev/) 构建的，这是一个新的前端构建工具，可以显着提升前端开发体验。

## 搭建你的第一个 Mettle 应用

::: code-group

```bash [npm]
npm create mettle-app@latest
```

```bash [pnpm]
pnpm create mettle-app
```

```bash [yarn]
yarn create mettle-app
```

:::

## 选择一个模板

你可以根据需要选择相应的模板：

- mettle

仅包含 Mettle 的基本功能。 该模板适用于项目中只有一个页面且不跳转到其他页面的应用。

- mettle-apps

不仅包含了 Mettle 的基本功能，还包含了 mettleRouter，适用于跳转多个页面以及稍微复杂一些的应用。

- mettle-jsx

使用 JSX 语法开发 Mettle 应用。

- mettle-jsx-apps

使用 JSX 语法开发 Mettle + mettleRouter，适用于跳转多个页面以及稍微复杂一些的应用。

- mettle-tsx

使用 TSX 语法开发 Mettle 应用。

- mettle-tsx-apps

使用 TSX 语法开发 Mettle + mettleRouter，适用于跳转多个页面以及稍微复杂一些的应用。
