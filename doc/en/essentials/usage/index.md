# Usage

## Data Binding

Mettle allows developers to declaratively bind the DOM to the underlying instance's data.

### Text

```jsx
function App() {
  const msg = signal('Hello');

  return <h1>{msg}</h1>;
}
```

### Property

```jsx
function App() {
  const msg = signal('Hello');

  return <input type='text' value={msg} />;
}
```

## Conditional Rendering

The label is only displayed if the directive's expression returns a `true` value.

```jsx
function App() {
  const isShow = signal(true);

  function useShow() {
    isShow.value = !isShow.value;
  }

  const showHtm = computed(() => (isShow.value ? <p>Mettle.js</p> : <null></null>));

  return (
    <>
      <button onClick={useShow}>show</button>
      <div>{showHtm}</div>
    </>
  );
}
```

## List Rendering

To render an array-based list, use the array's map method to return an array.

```jsx
function handleArr() {
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

::: warning
Child elements under the same parent element must have unique keys. Duplicate keys will cause rendering exceptions. The special attribute key is mainly used as a hint for Mettle's virtual DOM algorithm, and is used to identify vnode when comparing the old and new node lists.
:::

## Event Handling

We can use the `on` directive to listen to DOM events and execute some JavaScript when the event fires. We recommend using this camelCase naming method, such as `onClick`.

```jsx
function App() {
  return <button onClick={() => alert('hello')}>alert</button>;
}
```

## Componentization

Mettle applications are composed of components. A component is a part of a UI (user interface) that has its own logic and appearance. Components can be as small as a button or as large as an entire page.

In Mettle, a component is a function.

```jsx
function MyComponent() {
  const count = signal(0);

  function add() {
    count.value++;
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={add}>MyComponent</button>
    </>
  );
}

function App() {
  const count = signal(0);

  function add() {
    count.value++;
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={add}>App</button>
      <MyComponent />
    </>
  );
}
```

The internal rendering system of Mettle is built based on virtual DOM. Virtual DOM (Virtual DOM, referred to as VDOM) is a programming concept, which means to "virtually" represent the UI required by the target through a data structure and save it in memory. Then use the Diff algorithm to compare the old and new data and synchronize the real DOM with it.

If the virtual DOM tree is too large and the Diff calculation time is greater than 16.6ms, it may cause performance lag. One characteristic of components is "isolated islands". What is an "isolated island"? An isolated island can be understood as an independent module in the Mettle application. Decompose a huge virtual DOM tree into many independent modules, so that the Diff calculation time will be controlled at the module level, greatly reducing the calculation time and improving performance.

In addition, we can use the predefined property `content` of the function component to define data for the component and use it when you need it.

```jsx
function Child({ content }) {
  content.getName = () => {
    console.log('child');
  };

  return (
    <>
      <button onClick={post}>Post</button>
      <Child />
    </>
  );
}

function App() {
  function get() {
    Child.getName(); // child
  }

  return (
    <>
      <button onClick={get}>Get</button>
      <Child />
    </>
  );
}
```

If we define a static property for a component, we can get it using the predefined property `props` of the function component.

```jsx
function Child({ props }) {
  function getCount() {
    console.log(props.count.value); // 1
  }

  return <h1 onClick={getCount}>Child</h1>;
}

function App() {
  const count = signal(1);

  return <Child count={count} />;
}
```

## Built-in Properties

### $ref

Used with API `domInfo` to get DOM information.

```jsx
function App() {
  const h1 = {};

  function getDomInfo() {
    console.log('domInfo', domInfo.get(h1));
  }

  return (
    <>
      <h1 $ref={h1} onClick={getDomInfo}>
        Hello
      </h1>
    </>
  );
}
```

### $once

Render the element only once, and skip future updates.

```jsx
function App() {
  const count = signal(1);

  function add() {
    count.value++;
  }

  return (
    <>
      <button onClick={add}>Add</button>
      <h1 $once>{count}</h1>
      <h2>{count}</h2>
    </>
  );
}
```

### $memo

Caches a template subtree, skipping updates to the subtree.

This property requires a fixed-length array. The first item in the array is of type `Boolean`; if the value is `false`, updates to the entire subtree are skipped. The second item in the array is of type `Symbol` and is used in conjunction with `memo`.

```jsx
function App({ memo }) {
  const symbol1 = Symbol();
  let selected = signal(0);
  const arr = signal([
    {
      id: '1',
      val: 'A',
    },
    {
      id: '2',
      val: 'B',
    },
    {
      id: '3',
      val: 'C',
    },
  ]);

  function handle(event) {
    memo(() => {
      const el = event.target;
      const id = Number(el.dataset.id);
      selected.value = id;
    }, symbol1);
  }

  return (
    <>
      <ul onClick={handle}>
        {arr.value.map((todo) => (
          <li
            $memo={[todo.id == selected, symbol1]}
            class={todo.id == selected ? 'danger' : ''}
            key={todo.id}
            data-id={todo.id}
          >
            {todo.val}
          </li>
        ))}
      </ul>
    </>
  );
}
```

Because the element hit by the `$memo` tag will not update its child elements by default, if you want to update it, explicitly define the third item of the array as `true`, such as `$memo={[todo.id == selected, symbol1,true]}`.

## Built-in Tags

### null

Empty tags will not be displayed on the page.

```jsx
function App() {
  const isShow = signal(true);

  function useShow() {
    isShow.value = !isShow.value;
  }

  return (
    <>
      <button onClick={useShow}>show</button>
      <div>{isShow.value ? <p>Mettle.js</p> : <null></null>}</div>
    </>
  );
}
```

### fragment

Create a document fragment tag. It is not part of the real DOM tree, its changes will not trigger a re-rendering of the DOM tree, and will not have an impact on performance.

Typically `<></>` is used instead.

::: warning
There is only one root component, so you will see it used as the root component in many places in the documentation.
:::

```jsx
function App() {
  return (
    <>
      <h1>Mettle</h1>
      <h2>Hello!</h2>
    </>
  );
}
```
