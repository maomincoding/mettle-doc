# vitePluginMettle

[vitePluginMettle](https://www.npmjs.com/package/vite-plugin-mettle) 是 Vite 的 Mettle 集成插件。

## 安装

```bash
npm install vite-plugin-mettle
```

::: tip
[createMettleApp](/zh/tool/createMettleApp/) 项目脚手架工具已默认安装。
:::

## 用法

在你的 vite 配置文件中（`vite.config.js`或`vite.config.ts`）：

```js
import { defineConfig } from 'vite';
import mettle from 'vite-plugin-mettle';

export default defineConfig({
  plugins: [mettle()],
});
```
