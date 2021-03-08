Composition API allows to create  reactive primitives (Arrays, Objects, string...) outside the Vue application. 

## Big Gotchas
- Setup function is the main entry data. 
- What it is returned in the setup function, it is accesible in the rest of the vue component. 
- It can replace methods, computed and state properties from the option Api. 
- Ref(<primitives>) converts primitives to reactive primitives, Reactive({}) converts Objects into reactive objects.
- Using `lodash.isequal` to compare object with reactive object, useful for refetching data or not when the getting realtime data. 

## Not solved yet: 
- The Vuex plugins like vuex-persist allows easily to keep the data in localstorage, without it, you have to do it manually either localstorage, or indexdb. 
- 


## Reactive() and Ref() 
### Ref (to use primitives)
```js
// Now Vue is listening for the const title changes. and it converts 
// the const title into an object with a getter and a setter.
const title = ref("Hello world") 
// For that reason, it is needed for value changes to calling with 
title.value = "newValue"
```
![image](https://user-images.githubusercontent.com/4195550/110325958-4fb89780-8018-11eb-806d-55c4d812dd44.png)

### Reactive (To use objects)
- Reactive expects an Object. And if an object is assign into ref({}), it will use reactive under the hood.

## Vuex and Composition API
Vuex is inspired by react Flux, composition API not. There is no need for creating actions, mutations or getter is the same manner. 


## Composable functions
 toRefs works to don't lose the reactivity of an object with it is deconstructed. 
 
 ![image](https://user-images.githubusercontent.com/4195550/110327510-5b0cc280-801a-11eb-9811-091f0cfbd206.png)
