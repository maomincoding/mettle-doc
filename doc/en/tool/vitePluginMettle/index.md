# vitePluginMettle

`vitePluginMettle` is a Mettle integration plugin for Vite.

## Install

```bash
npm install vite-plugin-mettle
```

::: tip
[createMettleApp](/tool/createMettleApp/) The project scaffolding tool is installed by default.
:::

## Usage

In your vite config file (`vite.config.js` or `vite.config.ts`):

```js
import { defineConfig } from 'vite';
import mettle from 'vite-plugin-mettle';

export default defineConfig({
  plugins: [mettle()],
});
```
