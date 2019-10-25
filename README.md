# cache-storage

Storage based cache service

### API

- `configure(options: ConfigureOptions): void` - set initial options for the instance

### Types

```typescript
type InstanceData {
  method: Promise<any>; // method the results of which will be cached
  params?: Array<any>; // list of method arguments
  key?: string; // default method name
  expire?: number; // time in milliseconds after which the cache will be cleared
  invalidate?: boolean; // flag to delete data from cache
}

type ConfigureOptions = {
  onSave?: (key: string, value: any) => any;
  onReceive?: (key: string) => any;
  onInvalidate?: (key: string) => any;
  logger?: (message: string) => any;
  responseParser?: (response: any) => any;
};
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
import cache, { configure } from 'cache-storage';

configure({
  onSave: Storage.set,
  onReceive: Storage.get,
  onInvalidate: Storage.remove,
});

const foo = value =>
  cache({
    method: Promise.resolve,
    params: [value],
    expire: 10000,
  });

foo(1).then(console.log); // 1 from promise
foo(1).then(console.log); // 1 from cache
```
