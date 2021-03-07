# CRUD with optimistic UI and realtime changes
Crafting CRUD operations can be made with different strategies. Decoupling models and design is consider the best practice, some of then involve more boilerplate than others, but they offer future profing and better testability. 

**There are 3 main strategies or patterns**
1. Embedded in the component.
2. Plain JSON Object.
3. Use a Store like Vuex and Redux.


## Embedded in the component (Nuxt example)

Using component helpers like [Apollo Client](https://github.com/nuxt-community/apollo-module), [Firebase](https://firebase.google.com/docs/web/setup) of [Supabase](https://github.com/supabase/supabase-js)
```js
 async asyncData({ $supabase }) {
    const data = await $supabase.from('todos').select('*')
    return {
      todos: data.data,
    }
  },

  // Lisen for real-time changes:
  supabase.from('*').on('*', (payload) => {
    this.todos = payload.data
  })
  .subscribe()
```

## Plain JSON Object
```js
```


## Store like VUEX
```js
import Vuex from 'vuex'
import { supabase } from '~/plugins/supabase'

//
// Subscriptions
//
supabase
  .from('*')
  .on('*', (payload) => {
    const todos = window.$nuxt.$store.state.todos.todos // TODO: access from window.$nuxt? arg...
    const idx = todos.findIndex((todo) => todo.id === payload.new.id)
    console.log('🎹', payload.new)
    window.$nuxt.$store.commit('todos/updateTodoText', {
      idx,
      todo: payload.new.text,
    })
  })
  .subscribe()

//
// State
//
export const state = {
  todos: [],
}

export const getters = {
  getTodoText(/* Context */state, /* Params */ id ) {
    return state.todos[id].text
  },
}

export const actions = {
  async fetchTodos({ commit } /* Context */ /* Params */) {
    const todos = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true })
    commit('addTodos', todos.data)
  },
}

export const mutations = {
  addTodos(state, payload) {
    state.todos = payload
  },
  updateTodoText(state, { idx, todo }) {
    state.todos[idx] = todo
  },
}

```
