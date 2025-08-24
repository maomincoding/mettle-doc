---
layout: home

title: Mettle
titleTemplate: Approachable, fast, flexible  JavaScript library

hero:
  name: Mettle
  text: Approachable, fast, flexible  JavaScript library
  tagline: Building user interfaces
  actions:
    - theme: brand
      text: Get Started
      link: /guide/started/
    - theme: alt
      text: View on GitHub
      link: https://github.com/maomincoding/mettle
  image:
    src: /logo.svg
    alt: Mettle
---

```jsx
function Counter() {
  const count = signal(0);

  return <button onClick={() => count.value++}>{count}</button>;
}
```
