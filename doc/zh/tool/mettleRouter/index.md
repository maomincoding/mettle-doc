# mettleRouter

`mettleRouter` 是 Mettle 的官方路由管理器。 它与 Mettle 的核心深度集成，轻松构建单页应用程序。

## 开始

我们可以根据以下步骤来初步学习。

### 创建 home 页面

```jsx
// home.jsx
import { linkTo } from 'mettle-router';

export default function Home({ setData }) {
  const state = {
    msg: 'hello',
    arr: [1, 2],
    count: 3,
  };

  function goAbout() {
    linkTo({
      path: '/about',
      query: {
        id: 1,
        name: 'maomin',
      },
    });
  }

  function useChange() {
    setData(() => {
      state.msg = 'world';
      state.count++;
      state.arr.unshift(state.count);
    });
  }

  return () => (
    <fragment>
      <button onClick={goAbout}>goAbout</button>
      <h1>Home</h1>
      <p onClick={useChange}>{state.msg}</p>
      <ul>
        {state.arr.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </fragment>
  );
}

```

### 创建 about 页面

```jsx
// about.jsx
import { linkTo, toParse } from 'mettle-router';

export default function About() {
  function goHome() {
    linkTo({
      path: '/',
    });
  }

  function getOption() {
    console.log(toParse());
  }

  return () => (
    <fragment>
      <button onClick={goHome}>goHome</button>
      <h1 onClick={getOption}>About</h1>
    </fragment>
  );
}
```

### 配置路由信息

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
  resetView
);

export default router;
```

### 挂载页面

```jsx
// main.jsx
import { createApp } from 'mettle';
import Router from './router/index';

function App() {
  return () => <Router></Router>;
}

createApp(<App />, '#app');
```

## 安装

```bash
npm install mettle-router
```

## 使用

你可以使用[createMettleApp](/zh/tool/createMettleApp/)，选择带有`apps`标识的模板。

## API

### initRouter()

第一个参数是一个数组对象，即需要注册的路由组件，`path`属性表示组件的路径，`template`属性是导入的组件。

第二个参数需要传递给`resetView` API，匹配到对应路径的页面会相应更新。

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
  resetView
);

export default router;
```

路由匹配的组件会被渲染到`<Router>`组件所在的地方。

```jsx
// main.jsx
import { createApp } from 'mettle';
import Router from './router/index';

function App() {
  return () => <Router></Router>;
}

createApp(<App />, '#app');
```

### linkTo()

如果需要跳转到对应的页面，使用`linkTo()`方法，可以传递对应的路径和要传递的参数，也可以直接传递路径字符串。

```jsx
import { linkTo, toParse } from 'mettle-router';

export default function About() {
  function goHome() {
    linkTo({
      path: '/',
    });
  }

  function getOption() {
    console.log(toParse());
  }

  return () => (
    <fragment>
      <button onClick={goHome}>goHome</button>
      <h1 onClick={getOption}>About</h1>
    </fragment>
  );
}
```

### toParse

如果执行路由参数的操作，则要获取参数对象。 直接执行`toParse()`方法可以获取对象信息。

### routerVersion

可以获取 `mettleRouter` 的版本信息。
