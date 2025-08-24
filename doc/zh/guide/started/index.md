# 开始

## 什么是 Mettle?

Mettle 是一个用于构建用户界面的 JavaScript 库。

- **更容易上手：** 只要您对 HTML、CSS 和 JavaScript 已经基本熟悉，就可以直接上手。

- **顺滑的用户体验：** 可以使用 JSX 语法编写 Mettle，大大提升用户开发体验。

- **声明式渲染：** 我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系，开发者可以更加专注于业务逻辑的开发，不需要过多地关心 DOM 操作的细节。

- **信号机制：** 状态变化会自动更新组件和 UI，以实现尽可能高效的操作。

- **性能出色：** 采用了虚拟 DOM 的模式，虚拟 DOM 使用 diff 算法的方法来计算出真正需要更新的节点，最大限度地减少了 DOM 操作以及 DOM 操作带来的排版与重绘损耗，从而显著提高了性能。另外，我们的 JavaScript 库在全球知名的[测评榜单](https://github.com/krausest/js-framework-benchmark)上赢得了优秀的成绩。

- **组件化：** 一个函数就是一个组件，可以根据应用规模任意组合。并且组件特有的 **“孤岛特性”**，使得将虚拟 DOM 树计算的级别控制在组件级别。

- **灵活的应用场景：** 有无构建工具都可以使用。另外，可以根据不同应用场景，选择[不同类型](https://www.jsdelivr.com/package/npm/mettle?tab=files&path=dist)的文件。

## 简单了解 Mettle

我们开发一个简单的计数器应用，仅仅一个函数即可。

1. 创建一个名为 `count` 的响应式变量，初始值为 `0`，可以通过 `signal` 随时更新。
2. 返回一个按钮，按钮上显示 `count` 的当前值。
3. 当点击按钮时，`count` 的值会加 `1`。

```jsx
function Counter() {
  const count = signal(0);

  return <button onClick={() => count.value++}>{count}</button>;
}
```
