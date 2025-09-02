# API

## createApp

创建应用。

第一个参数为根组件，必传。第二个参数为用于挂载根组件。接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串。

```jsx
function App() {
  return <h1>Hello</h1>;
}

createApp(<App />, '#app');
```

## signal

以给定参数为初始值创建一个新的信号。

```jsx
function App() {
  const count = signal(0);

  function add() {
    count.value++;
  }

  return (
    <>
      <button onClick={add}>add</button>
      <p>{count}</p>
    </>
  );
}
```

## computed

创建一个根据其他信号的值计算的新信号。返回的计算信号是只读的，当回调函数内访问的任何信号发生变化时，其值会自动更新。

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
      <p>{count}</p>
      <p>{double}</p>
    </>
  );
}
```

## effect

要根据信号变化运行任意代码，可以使用`effect(fn)`。与`computed`类似，`effect` 会跟踪哪些信号被访问，并在这些信号发生变化时重新运行其回调。与`computed`不同的是，`effect()`不返回信号。

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
      <p>{name}</p>
    </>
  );
}
```

## batch

`batch(fn)`函数可用于在提供的回调结束时将多个值更新合并为一个“提交”。

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
      <p>{name}</p>
      <p>{surname}</p>
    </>
  );
}
```

## untracked

`untracked(fn)`可用于访问多个信号的值而无需订阅它们。

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
      <p>{name}</p>
      <p>{surname}</p>
    </>
  );
}
```

## produce

提供了复杂对象的响应式管理能力。

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
        {arr.map((item) => (
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
      <p>{obj.name}</p>
    </>
  );
}
```

## onMounted

注册一个回调函数，在组件挂载完成后执行。

```jsx
function App() {
  onMounted(() => {
    console.log('onMounted', 'about');
  });

  return <h1>About</h1>
}
```

## onUnmounted

注册一个回调函数，在组件实例被卸载之后调用。

```jsx
function App() {
  onUnmounted(() => {
    console.log('onUnmounted', 'about');
  });

  return <h1>About</h1>
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

  return (
    <h1 $ref={h1} onClick={getDomInfo}>
      Hello
    </h1>
  );
}
```

## html

` html`` `是一个标签函数，标签函数的语法是直接在函数名后跟一个模板字符串。 例如，您可以直接在模板字符串中编写 HTML 标签。

::: warning
此 API 仅在无构建版本下使用。
:::

```js
function App() {
  const count = 0;
  return () => html`<p>${count}</p>`;
}
```

::: tip
如果您使用的是 VSCode 编辑器，您可以去商店下载 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 插件，
这个插件可以使 HTML 模板字符串高亮显示。
:::
