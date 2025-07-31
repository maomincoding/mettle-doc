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

Modifying page data is best performed at the end of the logic.

The first parameter is the context, which is required in the outer scope but not in the inner scope. In the inner scope, it can be referenced directly in the function component.

**Internal scope:**

```jsx
function App({ setData }) {
  let count = 0;

  function add() {
    count++;
    setData();
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
  count++;
  setData(App);
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

The second parameter is optional and is of type `Symbol`. It is used with the built-in property `$memo` to indicate updated data.

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
