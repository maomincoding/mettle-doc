# API

## createApp

Create an application.

The first parameter is the root component, which is required. The second parameter is used to mount the root component. Receive a "container" parameter, which can be an actual DOM element or a CSS selector string.

```jsx
function App() {
  return () => <h1>Hello</h1>;
}

createApp(<App />, '#app');
```

## setData

Modify page data.

The first parameter is a function, which must be passed. Execute the callback function to modify the associated page data.
The second parameter is the context, which must be passed in the outer scope and not in the inner scope.

**Internal scope:**

```jsx
function App({ setData }) {
  let count = 0;

  function add() {
    setData(() => {
      count++;
    });
  }

  return () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
    </fragment>
  );
}
```

**External scope:**

```jsx
import { setData } from 'mettle';

let count = 0;

function add() {
  setData(() => {
    count++;
  }, App);
}

function App() {
  return () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
    </fragment>
  );
}
```

The third parameter is optional. Its type is `Symbol` and is used with the built-in attribute `$memo` to indicate updated data.

## onMounted

Register a callback function to be executed after the component is mounted.

```jsx
function App() {
  onMounted(() => {
    console.log('onMounted', 'about');
  });

  return () => (
    <fragment>
      <h1>About</h1>
    </fragment>
  );
}
```

## onUnmounted

Registers a callback function to be called after the component instance is unmounted.

```jsx
function App() {
  onUnmounted(() => {
    console.log('onUnmounted', 'about');
  });

  return () => (
    <fragment>
      <h1>About</h1>
    </fragment>
  );
}
```

## domInfo

Get DOM information.

```jsx
function App() {
  const h1 = {};

  function getDomInfo() {
    console.log('domInfo', domInfo.get(h1));
  }

  return () => (
    <fragment>
      <h1 $ref={h1} onClick={getDomInfo}>
        Hello
      </h1>
    </fragment>
  );
}
```

## html

` html`` ` is a tag function. The syntax of the tag function is to directly follow the function name with a template string. For example, you can write HTML tags directly in the template string.

In the JSX syntax environment, this API will not be used.

```js
function App() {
  let count = 0;
  return () => html`<p>${count}</p>`;
}
```

::: tip
If you are using the VSCode editor, you can go to the store to download the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plug-in,
This plugin enables HTML template string highlighting.
:::
