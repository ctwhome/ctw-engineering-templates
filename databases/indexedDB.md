Dump indexed db
```js
const dump = {};
const dbRequest = indexedDB.open("firebaseLocalStorageDb");
dbRequest.onsuccess = () => {
  const db = dbRequest.result;
  const stores = ['firebaseLocalStorage'];

  const tx = db.transaction(stores);
  asyncForEach(
    stores,
    (store, next) => {
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => {
        dump[store] = req.result;
        next();
      };
    },
    () => {
      user.value = dump.firebaseLocalStorage[0].value
      console.log('⚡️',dump.firebaseLocalStorage[0].value);
    }
  );
};
```
