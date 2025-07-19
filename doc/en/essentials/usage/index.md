# Usage

## Data Binding

Mettle allows developers to declaratively bind the DOM to the underlying instance's data.

### Text

```jsx
function App() {
  const state = {
    msg: 'Hello',
  };
  return () => <h1>{state.msg}</h1>;
}
```

### Expression

```jsx
function App() {
  const state = {
    a: 1,
    b: 2,
  };
  return () => <h1>{state.a + state.b}</h1>;
}
```

## Property Binding

```jsx
function App() {
  const state = {
    msg: 'Hello',
  };
  return () => <input type='text' value={state.msg} />;
}
```

```jsx
function App() {
  const state = {
    isRed: true,
    msg: 'Hello',
  };
  return () => <h1 class={state.isRed ? 'red' : ''}>{state.msg}</h1>;
}
```

```jsx
function App() {
  const state = {
    msg: 'Hello',
    style: {
      color: 'red',
      fontSize: '40px',
    },
  };
  return () => <p style={state.style}>{state.msg}</p>;
}
```

## Conditional Rendering

The label is only displayed if the directive's expression returns a `true` value.

```jsx
function App({ setData }) {
  const state = {
    isShow: true,
  };

  function useShow() {
    setData(() => {
      state.isShow = !state.isShow;
    });
  }
  return () => (
    <fragment>
      <button onClick={useShow}>show</button>
      <div>{state.isShow ? <p>Mettle.js</p> : <null></null>}</div>
    </fragment>
  );
}
```

## List Rendering

To render an array-based list, use the array's map method to return an array.

```jsx
function App({ setData }) {
  const state = {
    arr: [1, 2],
  };

  function usePush() {
    setData(() => {
      state.arr.push(3);
    });
  }
  return () => (
    <fragment>
      <button onClick={usePush}>push</button>
      <ul>
        {state.arr.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </fragment>
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
  const state = {
    msg: 'sayHello',
  };

  function useClick() {
    alert('hello');
  }
  return () => (
    <fragment>
      <button onClick={useClick}>{state.msg}</button>
    </fragment>
  );
}
```

## Componentization

Mettle applications are composed of components. A component is a part of a UI (user interface) that has its own logic and appearance. Components can be as small as a button or as large as an entire page.

In Mettle, a component is a function.

```jsx
function MyComponent({ setData }) {
  let count = 0;

  function add() {
    setData(() => {
      count++;
    });
  }

  return () => (
    <div class='MyComponent'>
      <p>{count}</p>
      <button onClick={add}>MyComponent</button>
    </div>
  );
}

function App({setData}) {
  let count = 0;

  const add = () => {
    setData(() => {
      count++;
    });
  };

  return () => (
    <div class='App'>
      <p>{count}</p>
      <button onClick={add}>App</button>
      <MyComponent />
    </div>
  );
}
```

The internal rendering system of Mettle is built based on virtual DOM. Virtual DOM (Virtual DOM, referred to as VDOM) is a programming concept, which means to "virtually" represent the UI required by the target through a data structure and save it in memory. Then use the Diff algorithm to compare the old and new data and synchronize the real DOM with it.

If the virtual DOM tree is too large and the Diff calculation time is greater than 16.6ms, it may cause performance lag. One characteristic of components is "isolated islands". What is an "isolated island"? An isolated island can be understood as an independent module in the Mettle application. Decompose a huge virtual DOM tree into many independent modules, so that the Diff calculation time will be controlled at the module level, greatly reducing the calculation time and improving performance.

In addition, we can use the predefined property `content` of the function component to define data for the component and use it when you need it.

```jsx
function Child({ content }) {
  content.id = 'ChildId';
  return () => <h1>Child</h1>;
}

function App() {
  function get() {
    console.log(Child.id); // ChildId
  }

  return () => (
    <fragment>
      <button onClick={get}>Get</button>
      <Child />
    </fragment>
  );
}
```

If we define a static property for a component, we can get it using the predefined property `props` of the function component.

```jsx
function Child({ props }) {
  function getAge(){
    console.log(props.age); // 11
  }

  return () => <h1 onClick={getAge}>Child</h1>;
}

function App() {
  return () => <Child age='11'/>
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

  return () => (
    <fragment>
      <h1 $ref={h1} onClick={getDomInfo}>
        Hello
      </h1>
    </fragment>
  );
}
```

### $once

Render the element only once, and skip future updates.

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
      <h1 $once>{count}</h1>
      <input value={count} />
    </fragment>
  );
}
```

### $memo

Cache a subtree of a template and skip the update of the subtree.

This property requires an array of fixed length. The value of the first item in the array is of type `Boolean`. If the value is `false`, the update of the entire subtree will be skipped. The value of the second item in the array is of type `Symbol`, which is used with `setData`.

```jsx
function App({ setData }) {
  const symbol1 = Symbol();
  let selected = 0;
  let arr = [
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
  ];

  function handle(event) {
    const el = event.target;
    const id = Number(el.dataset.id);
    setData(
      () => {
        selected = id;
      },
      null,
      symbol1
    );
    return false;
  }

  return () => (
    <fragment>
      <ul onClick={handle}>
        {arr.map((todo) => (
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
    </fragment>
  );
}
```

## Built-in Tags

### null

Empty tags will not be displayed on the page.

```jsx
function App({setData}) {
  const state = {
    isShow: true,
  };

  function useShow() {
    setData(() => {
      state.isShow = !state.isShow;
    });
  }
  return () => (
    <fragment>
      <button onClick={useShow}>show</button>
      <div>{state.isShow ? <p>Mettle.js</p> : <null></null>}</div>
    </fragment>
  );
}
```

### fragment

Create a document fragment tag. It is not part of the real DOM tree, its changes will not trigger a re-rendering of the DOM tree, and will not have an impact on performance.

::: warning
There is only one root component, so you will see it used as the root component in many places in the documentation.
:::

```jsx
function App() {
  const state = {
    x: 0,
    y: 0,
  };

  return () => (
    <fragment>
      <h1>Mettle</h1>
      <h2>Hello!</h2>
    </fragment>
  );
}
```
