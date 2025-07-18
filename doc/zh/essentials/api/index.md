# API

## createApp

创建应用。

第一个参数为根组件，必传。第二个参数为用于挂载根组件。接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串。

```jsx
function App() {
  return () => <h1>Hello</h1>;
}

createApp(<App />, '#app');
```

## setData

修改页面数据。

第一个参数为函数，必传。执行回调函数，进而修改关联的页面数据。
第二个参数为上下文环境，在外部作用域必传，在内部作用域不传。

**内部作用域：**

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

**外部作用域：**

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

第三个参数非必传，参数的类型是`Symbol`，与内置属性`$memo`搭配使用，用于标明更新的数据。

## onMounted

注册一个回调函数，在组件挂载完成后执行。

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

注册一个回调函数，在组件实例被卸载之后调用。

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

获取 DOM 信息。

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

` html`` `是一个标签函数，标签函数的语法是直接在函数名后跟一个模板字符串。 例如，你可以直接在模板字符串中编写 HTML 标签。

在 JSX 语法环境下，不会用到此 API。

```js
function App() {
  let count = 0;
  return () => html`<p>${count}</p>`;
}
```

::: tip
如果你使用的是 VSCode 编辑器，你可以去商店下载 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 插件，
这个插件可以使 HTML 模板字符串高亮显示。
:::
