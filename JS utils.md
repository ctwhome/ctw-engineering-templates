### [{},{}...] => {id:{}, id2:{}...} 
### Function to convert array of objects to Objects by key

```js
const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

// =====================
// Use
console.log(
  convertArrayToObject(
    [
      { id: 111, name: 'John', age: 29 },
      { id: 112, name: 'Sarah', age: 25 },
      ...
    ],
    'id',
  ),
);

// returns
{
  111:{ id: 111, name: 'John', age: 29 },
  112:{ id: 112, name: 'Sarah', age: 25 },
  ...
}

```
### Convert Reactive object to plain object
```js
const toPlainObject = (object) => {
  return JSON.parse(JSON.stringify(object))
}
```
