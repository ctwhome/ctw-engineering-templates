Composition API allows to create  reactive primitives (Arrays, Objects, string...) outside the Vue application. 

## Big Gotchas
- Setup function is the main entry data. 
- It can replace methods, computed and state properties from the option Api. 
- 


## Reactive and Ref 

```js
// Now Vue is listening for the const title changes. and it converts 
// the const title into an object with a getter and a setter.
const title = ref("Hello world") 
// For that reason, it is needed for value changes to calling with 
title.value = "newValue"
```

## Vuex and Composition API
Vuex is inspired by react Flux, composition API not. There is no need for creating actions, mutations or getter is the same manner. 
