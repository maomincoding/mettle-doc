# Started

## What is Mettle?

Mettle is a JavaScript library for building user interfaces.

- **Easier to Get Started:** As long as you're already familiar with HTML, CSS, and JavaScript, you can get started right away.

- **Smooth User Experience:** Mettle can be written using JSX syntax, significantly improving the user development experience.

- **Declarative Rendering:** We can declaratively describe the relationship between the final HTML output and JavaScript state, allowing developers to focus on business logic development without worrying too much about the details of DOM operations.

- **Signaling:** State changes automatically update components and the UI for the most efficient operation.

- **Excellent Performance:** We utilize a virtual DOM model that uses a diff algorithm to calculate the nodes that actually need to be updated, minimizing DOM operations and the layout and repainting overhead caused by DOM operations, significantly improving performance. Furthermore, our JavaScript library has achieved excellent results on the globally renowned [benchmark](https://github.com/krausest/js-framework-benchmark).

- **Componentization:** Each function is a component, which can be combined arbitrarily to meet the scale of the application. The component's unique **"island feature** allows virtual DOM tree calculations to be controlled at the component level.

- **Flexible application scenarios:** It can be used with or without a build tool. Furthermore, you can choose different file types based on different application scenarios.

## A Brief Introduction to Mettle

Let's develop a simple counter application using just one function.

1. Create a reactive variable named `count` with an initial value of `0` that can be updated at any time via `signal`.

2. Return a button that displays the current value of `count`.

3. When the button is clicked, the value of `count` increases by `1`.

```jsx
function Counter() {
  const count = signal(0);

  return <button onClick={() => count.value++}>{count}</button>;
}
```
