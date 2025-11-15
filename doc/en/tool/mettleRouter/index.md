# mettleRouter

`mettleRouter` is the official routing manager for Mettle. It is deeply integrated with the core of Mettle and makes it easy to build single-page applications.

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

The first two parameters must be passed, and the third parameter is optional and is used to configure the selector of the root node of the routing page.

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

Components matching the route will be rendered where the `<Router>` component is located.

```jsx
// main.jsx
import { createApp } from 'mettle';
import Router from './router/index';

function App() {
  return <Router></Router>;
}

createApp(<App />, '#app');
```

If you configure the third parameter, the `<Router>` component must set a parent node.

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

If you need to jump to the corresponding page, use the `linkTo()` method, you can pass the corresponding path and parameters to be passed, or you can directly pass the path string.

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

If you perform a route parameter operation, you need to obtain the parameter object. You can directly execute the `toParse()` method to obtain the object information.

```jsx
console.log(toParse());
```

### hashChange

When the route changes, the `hashChange` event is triggered. You can listen to this event and perform custom actions.

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

Returns the function to cancel listening.

```jsx
const removeListener = hashchange(() => {
  console.log('Hash变化:', location.hash);
});

// removeListener();
```

### routerVersion

You can get the version information of `mettleRouter`.

```

```
