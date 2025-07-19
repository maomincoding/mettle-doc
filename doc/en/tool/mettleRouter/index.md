# mettleRouter

`mettleRouter` is the official routing manager for Mettle. It is deeply integrated with the core of Mettle and makes it easy to build single-page applications.

## Start

We can learn it initially according to the following steps.

### Creating the home page

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

### Creating an about page

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

### Configuring routing information

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

### Mounting page

```jsx
// main.jsx
import { createApp } from 'mettle';
import Router from './router/index';

function App() {
  return () => <Router></Router>;
}

createApp(<App />, '#app');
```

## Install

```bash
npm install mettle-router
```

## Use

You can use [createMettleApp](/tool/createMettleApp/) and select the template with the `apps` tag.

## API

### initRouter()

The first parameter is an array object, which is the routing component to be registered. The `path` property indicates the path of the component, and the `template` property is the imported component.

The second parameter needs to be passed to the `resetView` API, and the page matching the corresponding path will be updated accordingly.

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

Components matching the route will be rendered where the `<Router>` component is located.

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

If you need to jump to the corresponding page, use the `linkTo()` method, you can pass the corresponding path and parameters to be passed, or you can directly pass the path string.

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

If you perform a route parameter operation, you need to obtain the parameter object. You can directly execute the `toParse()` method to obtain the object information.

### routerVersion

You can get the version information of `mettleRouter`.
