# mettleRouter

`mettleRouter` 是 Mettle 的官方路由管理器。 它与 Mettle 的核心深度集成，轻松构建单页应用程序。

## 安装

```bash
npm install mettle-router
```

## 使用

您可以使用[createMettleApp](/zh/tool/createMettleApp/)，选择带有`apps`标识的模板。

## API

### initRouter()

第一个参数是一个数组对象，即需要注册的路由组件，`path`属性表示组件的路径，`template`属性是导入的组件。

第二个参数需要传递给`resetView` API，匹配到对应路径的页面会相应更新。

前两个参数是必须要传的，第三个参数是可选的，用于配置路由页面根节点的选择器。

```js
// router/index.js
import { resetView } from 'mettle';
import { initRouter } from 'mettle-router';

import Home from '../template/home';
import About from '../template/about';

const router = initRouter(
  [
    {
      path: '/',
      template: Home,
    },
    {
      path: '/about',
      template: About,
    },
  ],
  resetView,
  '#router',
);

export default router;
```

路由匹配的组件会被渲染到`<Router>`组件所在的地方。

```jsx
// main.jsx
import { createApp } from 'mettle';
import Router from './router/index';

function App() {
  return <Router></Router>;
}

createApp(<App />, '#app');
```

如果你配置了第三个参数，那么`<Router>`组件必须设置一个父节点。

```jsx
// main.jsx
import { createApp } from 'mettle';
import Router from './router/index';

function App() {
  return (
    <div id='router'>
      <Router></Router>
    </div>
  );
}
createApp(<App />, '#app');
```

### linkTo()

如果需要跳转到对应的页面，使用`linkTo()`方法，可以传递对应的路径和要传递的参数，也可以直接传递路径字符串。

```jsx
import { linkTo, toParse } from 'mettle-router';

function About() {
  function goHome() {
    linkTo({
      path: '/',
    });
  }

  function getOption() {
    console.log(toParse());
  }

  return (
    <>
      <button onClick={goHome}>goHome</button>
      <h1 onClick={getOption}>About</h1>
    </>
  );
}
```

### toParse

如果执行路由参数的操作，则要获取参数对象。 直接执行`toParse()`方法可以获取对象信息。

```jsx
console.log(toParse());
```

### hashChange

当路由发生变化时，会触发`hashChange`事件。 您可以监听该事件，执行自定义操作。

```jsx
import { hashChange } from 'mettle-router';

hashChange(() => {
  if (location.hash === '#/login') {
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
});
```

返回取消监听的函数。

```jsx
const removeListener = hashchange(() => {
  console.log('Hash变化:', location.hash);
});

// removeListener();
```

### routerVersion

可以获取 `mettleRouter` 的版本信息。
