# createMettleApp

A set of command line tools for quickly building Mettle projects. createMettleApp is built using [Vite](https://vitejs.dev/), a new front-end building tool that significantly improves the front-end development experience.

## Scaffolding Your First Mettle Project

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

## Choose a template

You can choose the corresponding template according to your needs.

- mettle

Only contains the basic functions of Mettle. This template is suitable for applications that only have a single page in the project and do not jump to other pages.

- mettle-apps

Not only includes the basic functions of Mettle, but also includes mettleRouter, which is suitable for jumping multiple pages and slightly more complex applications.

- mettle-jsx

Mettle is developed using JSX syntax.

- mettle-jsx-apps

Use JSX syntax to develop Mettle + mettleRouter, which is suitable for jumping multiple pages and slightly more complex applications.
