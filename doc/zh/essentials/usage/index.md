# 用法

## 数据绑定

Mettle 允许开发人员以声明方式将 DOM 绑定到底层实例的数据。

### 文本

```jsx
function App() {
  const state = {
    msg: 'Hello',
  };
  return () => <h1>{state.msg}</h1>;
}
```

### 表达式

```jsx
function App() {
  const state = {
    a: 1,
    b: 2,
  };
  return () => <h1>{state.a + state.b}</h1>;
}
```

### 属性

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

## 条件渲染

仅当指令的表达式返回 `true` 值时才会显示标签。

```jsx
function App({ setData }) {
  const state = {
    isShow: true,
  };

  function useShow() {
    state.isShow = !state.isShow;
    setData();
  }
  return () => (
    <fragment>
      <button onClick={useShow}>show</button>
      <div>{state.isShow ? <p>Mettle.js</p> : <null></null>}</div>
    </fragment>
  );
}
```

## 列表渲染

渲染基于数组的列表，使用数组的`map`方法来返回一个数组。

```jsx
function App({ setData }) {
  const state = {
    arr: [1, 2],
  };

  function usePush() {
    state.arr.push(3);
    setData();
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
同一个父元素下的子元素必须具有唯一的 key。重复的 key 将会导致渲染异常。key 这个特殊的 attribute 主要作为 Mettle 的虚拟 DOM 算法提示，在比较新旧节点列表时用于识别 vnode。
:::

## 事件处理

我们可以使用 `on` 指令来监听 DOM 事件并在事件触发时执行一些 JavaScript。 我们推荐使用这种驼峰式命名法，比如`onClick`。

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

## 组件化

Mettle 应用程序是由 组件 组成的。一个组件是 UI（用户界面）的一部分，它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。

在 Mettle 中，组件就是一个函数。

```jsx
function MyComponent({ setData }) {
  let count = 0;

  function add() {
    count++;
    setData();
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
    count++;
    setData();
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

Mettle 内部的渲染系统是基于虚拟 DOM 构建的，虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后利用 Diff 算法来比对新老数据，将真实的 DOM 与之保持同步。

如何虚拟 DOM 树过于庞大，使得 Diff 计算时间大于 16.6ms，那么就可能造成性能的卡顿。组件有一个特性就是 **”孤岛“**。何为“孤岛”，孤岛就是在 Mettle 应用中我们可以理解成一个独立的模块。将一个庞大的虚拟 DOM 树分解成很多独立的模块，这样 Diff 计算时间就会控制在模块级别，大大缩减了计算的时间，提高了性能。

另外，我们可以利用函数组件的预定义属性`content`给组件定义数据，并且在你需要的时候使用它。

```jsx
function Child({ content }) {
  content.msg = 'hello';
  return () => <h1>Child</h1>;
}

function App() {
  function get() {
    console.log(Child.msg); // hello
  }

  return () => (
    <fragment>
      <button onClick={get}>Get</button>
      <Child />
    </fragment>
  );
}
```

如果我们给组件定义一个静态属性，可以利用函数组件的预定义属性`props`获取到它。

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

## 内置属性

### $ref

配合 API`domInfo`使用，获取 DOM 信息。

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

仅渲染元素一次，并跳过之后的更新。

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
      <h1 $once>{count}</h1>
      <input value={count} />
    </fragment>
  );
}
```

### $memo

缓存一个模板的子树，跳过子树的更新。

该属性需要传入一个固定长度的数组。数组第一项的值的类型为 `Boolean`，如果值为`false`，那么整个子树的更新将被跳过。数组第二项值的类型为 `Symbol`，与 `setData` 搭配使用。

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
    selected = id;
    setData(null,symbol1);
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

因为被`$memo`标记命中的元素，默认不会更新其子元素，如果想使其更新，则将数组第三项显式定义为`true`，比如`$memo={[todo.id == selected, symbol1,true]}`。

## 内置标签

### null

空标签，不会显示在页面中。

```jsx
function App({setData}) {
  const state = {
    isShow: true,
  };

  function useShow() {
    state.isShow = !state.isShow;
    setData();
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

创建一个文档片段标签。它不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会对性能产生影响。

::: warning
根组件仅且只有一个，所以你会在文档中很多地方看到它，被用作根组件。
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
