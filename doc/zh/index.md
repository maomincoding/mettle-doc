---
layout: home

title: Mettle
titleTemplate: 易用、快速、灵活的JavaScript库

hero:
  name: Mettle
  text: 易用、快速、灵活的JavaScript库
  tagline: 用于构建用户界面
  actions:
    - theme: brand
      text: 开始使用
      link: /zh/guide/started/
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/maomincoding/mettle
  image:
    src: /logo.svg
    alt: Mettle
---

```jsx
function App() {
  const count = signal(0);

  return <button onClick={() => count.value++}>{count}</button>;
}
```
