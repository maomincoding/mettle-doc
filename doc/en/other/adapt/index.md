# Adapt

If you want to use Mettle in an application project developed with another front-end framework, that's fine too. Mettle is very flexible and can be easily adapted.

## Vue

**main.js**

```js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import mettle from './mettle-plugin';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');

app.use(mettle);
```

**App.vue**

```vue
<script setup>
import { ref,h } from 'vue'
import { useCounterStore } from './store';

const counterStore = useCounterStore()
const add = ()=>{
    counterStore.increment()
}
</script>

<template>
  <div>
    <button @click="add">add</button>
    <div id="mettle-inner"></div>
  </div>
</template>

```

**mettle-plugin.jsx**

```jsx
import { createApp } from 'mettle';
import App from '@/mettle/App.jsx';

export default {
  install: () => {
    createApp(<App />, '#mettle-inner');
  },
};
```

**mettle/App.jsx**

```jsx
import { watch } from 'vue';
import { useCounterStore } from '@/store';

function App({ setData }) {
  const counterStore = useCounterStore();

  watch(
    () => counterStore.count,
    (newVal) => {
      console.log(newVal);
      setData();
    }
  );

  return () => (
    <fragment>
      <h1>{counterStore.count}</h1>
      <h2>{counterStore.doubleCount}</h2>
    </fragment>
  );
}

export default App;
```

**store/index.js**

```js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const name = ref('Eduardo');
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
```
