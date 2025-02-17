# Usage

::: tip
For a better reading experience, the following code examples are written using JSX syntax.
:::

## Data Binding

Mettle allows developers to declaratively bind the DOM to the underlying instance's data.

### Text

```jsx
defineComponent(() => {
  const state = {
    msg: 'Hello',
  };
  return () => h1>{state.msg}</h1>;
});
```

### Expression

```jsx
defineComponent(() => {
  const state = {
    a: 1,
    b: 2,
  };
  return () => <h1>{state.a + state.b}</h1>;
});
```

## Property Binding

```jsx
defineComponent(() => {
  const state = {
    msg: 'Hello',
  };
  return () => <input type='text' value={state.msg} />;
});
```

```jsx
defineComponent(() => {
  const state = {
    isRed: true,
    msg: 'Hello',
  };
  return () => <h1 class={state.isRed ? 'red' : ''}>{state.msg}</h1>;
});
```

```jsx
defineComponent(() => {
  const state = {
    msg: 'Hello',
    style: {
      color: 'red',
      fontSize: '40px',
    },
  };
  return () => <p style={state.style}>{state.msg}</p>;
});
```

## Conditional Rendering

The label is only displayed if the directive's expression returns a `true` value.

```jsx
defineComponent(({ setData }) => {
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
});
```

::: warning
When conditional rendering involves rendering custom components, the `onMounted` and `onUnmounted` APIs in the component will not be triggered. You can adjust it according to the following methods:
:::

```jsx
import { defineComponent } from 'mettle';
import Button from '../components/button/index';

defineComponent(({ setData }) => {
  const ButtonC = Button();
  let isShow = false;
  ButtonC.getShow(isShow);

  function show() {
    setData(() => {
      isShow = !isShow;
      if (!isShow) {
        ButtonC.onUnmount();
      } else {
        ButtonC.getShow(isShow);
      }
    });
  }

  return () => (
    <fragment>
      <button onClick={show}>show</button>
      <div>
        {isShow ? (
          <div>
            <component $is={ButtonC}></component>
          </div>
        ) : (
          <null></null>
        )}
      </div>
    </fragment>
  );
});
```

```jsx
import { defineComponent } from 'mettle';

const Button = () =>
  defineComponent(({ setData, content }) => {
    let timer = null;
    let count = 0;

    content.getShow = (val) => {
      if (val) {
        timer = setInterval(() => {
          setData(() => {
            count++;
          });
        }, 1000);
      }
    };
    content.onUnmount = () => {
      console.log('clearInterval');
      clearInterval(timer);
    };

    return () => <button>{count}</button>;
  });

export default Button;
```

## List Rendering

To render an array-based list, use the array's map method to return an array.

```jsx
defineComponent(({ setData }) => {
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
});
```

::: warning
Child elements under the same parent element must have unique keys. Duplicate keys will cause rendering exceptions. The special attribute key is mainly used as a hint for Mettle's virtual DOM algorithm, and is used to identify vnode when comparing the old and new node lists.
:::

## Event Handling

We can use the `on` directive to listen to DOM events and execute some JavaScript when the event fires. We recommend using this camelCase naming method, such as `onClick`.

```jsx
defineComponent(() => {
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
});
```

## Componentization

Mettle applications are composed of components. A component is a part of a UI (user interface) that has its own logic and appearance. Components can be as small as a button or as large as an entire page.

In Mettle, a component is a function.

```jsx
const MyComponent = defineComponent(({ setData }) => {
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
});

defineComponent(
  {
    mount: '#app',
  },
  ({ setData }) => {
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
        <component $is={MyComponent} />
      </div>
    );
  }
);
```

The internal rendering system of Mettle is built based on virtual DOM. Virtual DOM (Virtual DOM, referred to as VDOM) is a programming concept, which means to "virtually" represent the UI required by the target through a data structure and save it in memory. Then use the Diff algorithm to compare the old and new data and synchronize the real DOM with it.

If the virtual DOM tree is too large and the Diff calculation time is greater than 16.6ms, it may cause performance lag. One characteristic of components is "isolated islands". What is an "isolated island"? An isolated island can be understood as an independent module in the Mettle application. Decompose a huge virtual DOM tree into many independent modules, so that the Diff calculation time will be controlled at the module level, greatly reducing the calculation time and improving performance.

## Built-in Properties

### $is

This attribute needs to be used on the built-in tag `component` to render the component.

```jsx
const MyComponent = defineComponent(({ setData }) => {
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
});

defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => (
      <div class='App'>
        <component $is={MyComponent} />
      </div>
    );
  }
);
```

### $ref

Used with API `domInfo` to get DOM information.

```jsx
defineComponent(() => {
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
});
```

## Built-in Tags

### component

Component tag, used to render components.

```jsx
defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => (
      <div class='App'>
        <component $is={MyComponent} />
      </div>
    );
  }
);
```

### null

Empty tags will not be displayed on the page.

```jsx
defineComponent(({ setData }) => {
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
});
```

### fragment

Create a document fragment tag. It is not part of the real DOM tree, its changes will not trigger a re-rendering of the DOM tree, and will not have an impact on performance.

::: warning
There is only one root component, so you will see it used as the root component in many places in the documentation.
:::

```jsx
defineComponent(() => {
  const state = {
    x: 0,
    y: 0,
  };

  return () => (
    <fragment>
      <h1>
        Mouse position is at: {state.x}, {state.y}
      </h1>
      <h2>Hello!</h2>
    </fragment>
  );
});
```
