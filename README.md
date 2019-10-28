# memo-storage

Storage based cache service

### API

- `configure(options: ConfigureOptions): void` - set initial options for the instance

### Types

```typescript
type Data {
  method: Function; // method the results of which will be cached
  params?: Array<any>; // list of method arguments
  key?: string; // default method name
  expire?: number; // time in milliseconds after which the cache will be cleared
  invalidate?: boolean; // flag to delete data from cache
}

type ConfigureOptions = {
  onSave?: (key: string, value: any) => any;
  onReceive?: (key: string) => any;
  onInvalidate?: (key: string) => any;
  responseParser?: (response: any) => any;
  logger?: Function;
};

type Result {
  data: any;
  expire: number;
}

```

### Quick start

```js
// storage.js

export default {
  set: function(key, value) {
    this.data[key] = value;
  },
  get: function(key) {
    return this.data[key];
  },
  remove: function(key) {
    delete this.data[key];
  },
  data: {},
};
```

```js
// example.js
import Storage from 'storage';
import ms, { configure } from 'memo-storage';

configure({
  onSave: Storage.set,
  onReceive: Storage.get,
  onInvalidate: Storage.remove,
});

const foo = params =>
  ms({
    method: v => Promise.resolve(v),
    params: [params],
    expire: 1000,
  });

foo(1).then(console.log); // { data: 1, expire: 1572288209544 } from promise
foo(1).then(console.log); // { data: 1, expire: 1572288209544 } from cache
```
