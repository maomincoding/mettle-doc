# Example

## TwoWay

```jsx
function TwoWay({ setData }) {
  let value = '';
  function useInput(e) {
    value = e.target.value;
    setData();
  }

  return () => (
    <fragment>
      <input onInput={useInput} value={value}></input>
      <p>{value}</p>
    </fragment>
  );
}
```

## FatherToSon

```jsx
function Son({ setData, content }) {
  const props = {
    list: [],
  };

  content.getList = function (val) {
    props.list = val;
    setData();
  };

  return () => (
    <fragment>
      <ul>
        {props.list.map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      </ul>
    </fragment>
  );
}

function Father() {
  const list = [
    {
      id: new Date().getTime(),
    },
  ];

  requestAnimationFrame(() => {
    Son.getList(list);
  });

  function add() {
    list.unshift({
      id: new Date().getTime(),
    });
    Son.getList(list);
  }

  return () => (
    <fragment>
      <button onClick={add}>add</button>
      <Son />
    </fragment>
  );
}
```

## SonToFather

```jsx
function Son({ content }) {
  function send() {
    content.getMsg('Hello!');
  }

  return () => (
    <fragment>
      <button onClick={send}>sendMsg</button>
    </fragment>
  );
}

function Father({ setData }) {
  let msg = '';

  Son.getMsg = function (val) {
    msg = val;
    setData();
  };

  return () => (
    <fragment>
      <Son />
      <h3>{msg}</h3>
    </fragment>
  );
}
```

## Timer

```jsx
function Timer({ setData }) {
  const data = {
    duration: 15 * 1000,
    elapsed: 0,
  };

  const lastTime = performance.now();

  function progressRate() {
    return Math.min(data.elapsed / data.duration, 1);
  }

  let handle = null;
  function update() {
    data.elapsed = performance.now() - lastTime;
    if (data.elapsed >= data.duration) {
      cancelAnimationFrame(handle);
    } else {
      handle = requestAnimationFrame(update);
    }
    setData();
  }

  update();

  return () => (
    <fragment>
      <label>
        <span>Elapsed Time:</span>
        <progress value={progressRate()}></progress>
      </label>
      <div>
        <span>{(data.elapsed / 1000).toFixed(1)}</span>
        <span>s</span>
      </div>
    </fragment>
  );
}
```

## Store

```jsx
import store from './store.js';

function Son({ content, setData }) {
  function send() {
    console.log(store.state.count);
  }

  content.update = function () {
    setData();
  };

  return () => (
    <fragment>
      <button onClick={send}>send</button>
      <p>{store.state.count}</p>
    </fragment>
  );
}

function Store({ setData }) {
  function getUserInfo() {
    store.dispatch('fetchUser').then(() => {
      console.log(store.state.user); // { name: 'John Doe', age: 30 }
    });
    setData();
  }

  function add() {
    store.commit('increment');
    Son.update();
    setData();
  }

  return () => (
    <fragment>
      <h1 onClick={getUserInfo}>getUserInfo</h1>
      <button onClick={add}>Add</button>
      <h1>{store.state.count}</h1>
      <Son />
    </fragment>
  );
}
```

```js
// createStateFlow.js

export default class createStateFlow {
  _mutations;
  _actions;
  _state;
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._state = new Proxy(options.state, {
      set: (target, key, value) => {
        if (this._mutations[key]) {
          this._mutations[key](target, value);
        }
        target[key] = value;
        return true;
      },
    });
  }
  commit(mutationName, payload) {
    if (this._mutations[mutationName]) {
      this._mutations[mutationName](this._state, payload);
    }
  }
  async dispatch(actionName, payload) {
    if (this._actions[actionName]) {
      await this._actions[actionName](this, payload);
    }
  }
  get state() {
    return this._state;
  }
}
```

```jsx
// store.js
import createStateFlow from './createStateFlow.js';

const store = new createStateFlow({
  state: {
    count: 0,
    user: '',
  },
  // for synchronization
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },
  // for asynchronous
  actions: {
    fetchUser: async (context) => {
      const user = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ name: 'John Doe', age: 30 });
        }, 1000);
      });
      context.commit('setUser', user);
    },
    increment: (context) => {
      context.commit('increment');
    },
    decrement(context) {
      context.commit('decrement');
    },
  },
});

export default store;
```

## Toast prompt component

```jsx
function Toast({ setData,content }) {
  let isShow = false;
  let timer = null;
  let msg = 'Toast';

  content.show = (val) => {
    clearTimeout(timer);
    isShow = true;
    msg = val;
    setData();
    timer = setTimeout(() => {
      isShow = false;
      setData();
    }, 2000);
  };

  function toastStyles() {
    return {
      position: 'fixed',
      padding: '8px 20px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      borderRadius: '4px',
      fontSize: '14px',
      zIndex: 9999,
      top: '20px',
      left: '50%',
      opacity: isShow ? 0.8 : 0,
      visibility: isShow ? 'visible' : 'hidden',
      transform: isShow ? 'translateY(0)' : 'translateY(-20px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      cursor: 'pointer',
    };
  }

  return () => <div style={toastStyles()}>{msg}</div>
}
```

```jsx
function App() {
  function handleShow() {
    Toast.show('show');
  }

  return () => (
    <fragment>
      <button onClick={handleShow}>show</button>
      <Toast/>
    </fragment>
  );
}
```

## Object to string

```jsx
function useObjToStyle(obj: any) {
  const needUnit = (key: any) => !/[0-9]$/.test(key) && typeof obj[key] === 'number';

  return Object.entries(obj)
    .map(([key, value]) => {
      const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      const cssValue = needUnit(key) ? `${value}px` : value;
      return `${cssKey}:${cssValue};`;
    })
    .join(' ');
}

let isShow = true;
function useShowStyle() {
  const style = {
    display: isShow ? 'block' : 'none',
  };

  return useObjToStyle(style);
}
```
