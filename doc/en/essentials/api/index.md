# API

## createApp

Create an application.

The first parameter is the root component, required. The second parameter is used to mount the root component. Receives a "container" parameter, which can be an actual DOM element or a CSS selector string.

```jsx
function App() {
  return <h1>Hello</h1>;
}

createApp(<App />, '#app');
```

## signal

Creates a new signal with the given parameters as the initial value.

```jsx
function App() {
  const count = signal(0);

  function add() {
    count.value++;
  }

  return (
    <>
      <button onClick={add}>add</button>
      <p>{count.value}</p>
    </>
  );
}
```

## computed

Creates a new signal that is computed based on the value of another signal. The returned computed signal is read-only and its value is automatically updated when any signal accessed within the callback function changes.

```jsx
function App() {
  const count = signal(0);
  const double = computed(() => count.value * 2);

  function add() {
    count.value++;
  }

  return (
    <>
      <button onClick={add}>add</button>
      <p>{count.value}</p>
      <p>{double.value}</p>
    </>
  );
}
```

## effect

To run arbitrary code based on a signal change, use `effect(fn)`. Similar to `computed`, `effect` keeps track of which signals are accessed and reruns its callback when those signals change. Unlike `computed`, `effect()` does not return a signal.

```jsx
function App() {
  const name = signal('Hello');

  effect(() => console.log('Hello', name.value)); // Hello -> hello111

  function change() {
    name.value = 'hello111';
  }

  return (
    <>
      <button onClick={change}>change</button>
      <p>{name.value}</p>
    </>
  );
}
```

## batch

The `batch(fn)` function can be used to combine multiple value updates into a single "commit" at the end of the provided callback.

```jsx
function App() {
  const name = signal('hello');
  const surname = signal('dog');

  function change() {
    batch(() => {
      name.value = 'Hello';
      surname.value = 'cat';
    });
  }

  return (
    <>
      <button onClick={change}>change</button>
      <p>{name.value}</p>
      <p>{surname.value}</p>
    </>
  );
}
```

## untracked

`untracked(fn)` can be used to access the values ​​of multiple signals without subscribing to them.

```jsx
function App() {
  const name = signal('hello');
  const surname = signal('dog');

  effect(() => {
    untracked(() => {
      console.log(`${name.value} ${surname.value}`);
    });
  });

  function change() {
    surname.value = 'cat';
  }

  return (
    <>
      <button onClick={change}>change</button>
      <p>{name.value}</p>
      <p>{surname.value}</p>
    </>
  );
}
```

## produce

Provides responsive management of complex objects.

```jsx
function HandleArr() {
  const arr = signal([1]);

  function push() {
    arr.value = produce(arr.value, (item) => {
      item.push(new Date().getTime());
    });
  }

  return (
    <>
      <button onClick={push}>push</button>
      <ul>
        {arr.value.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

```jsx
function HandleObj() {
  const obj = signal({
    name: 'hello',
  });

  function change() {
    obj.value = produce(obj.value, (item) => {
      item.name = 'world';
    });
  }

  return (
    <>
      <button onClick={change}>change</button>
      <p>{obj.value.name}</p>
    </>
  );
}
```

## onMounted

Registers a callback function to be executed after the component is mounted.

```jsx
function App() {
  onMounted(() => {
    console.log('onMounted', 'about');
  });

  return <h1>About</h1>
}
```

## onUnmounted

Registers a callback function to be called after the component instance is unmounted.

```jsx
function App() {
  onUnmounted(() => {
    console.log('onUnmounted', 'about');
  });

  return <h1>About</h1>
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

  return (
    <h1 $ref={h1} onClick={getDomInfo}>
      Hello
    </h1>
  );
}
```

## resetView

Integrate [mettleRouter](/tool/mettleRouter/) to reset the current routing view.

## html

` html`` ` is a tag function. The syntax for a tag function is to directly follow the function name with a template string. For example, you can write HTML tags directly in the template string.

::: warning
This API is only used in the unbuilt version.
:::

```js
function App() {
  const count = 0;
  return () => html`<p>${count.value}</p>`;
}
```

::: tip
If you're using the VS Code editor, you can download the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plugin from the store.
This plugin will highlight HTML template strings.
:::
