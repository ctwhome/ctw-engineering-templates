# CRUD with optimistic UI and realtime changes
Crafting CRUD operations can be made with different strategies. Decoupling models and design is consider the best practice, some of then involve more boilerplate than others, but they offer future profing and better testability. It keeps business logic away from the view and maintain the **separation of concerns**.

**There are 3 main strategies or patterns**
1. ❌ Embedded in the component.
2. ✅ Plain JSON Object.
3. ✅ Use a Store like Vuex and Redux (for local state) + ✅ Plain JSON Object for API requests.

Opinion from [Marty Friedel](https://www.martyfriedel.com/blog/restructuring-my-spa-and-why-i-kept-my-crud-calls-out-of-vuex)
> CRUD views needs state – but state that is local to that component only. So why complicate it with Vuex actions, mutations, getters and explicit computed get and set methods?

> In the end, I settled on a bit of a combination of Service + Store approach.
> I still am using Vuex – but only for the application’s state – not for every component’s state for the sole reason of “just because”.
> The source of truth here is **the API endpoint**, not the store on each client – when a table needs to be loaded, the API endpoints handle >filtering and pagination. When an object needs to be edited, the latest data is pulled from the API as needed. It makes sense for a CRUD app to rely on the API to get data when it is needed – that way, the complications of needing to consider how to refreshing the store are removed.

Articles: 
 - [Herd those API calls! Transitioning to VueX](https://medium.com/@fadingdust/herd-those-api-calls-transitioning-to-vuex-53525a0249d4)
 - 

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
The main reason I dislike this is because a list of products is not state in your application. It is just a list that probably represents some items that the website sells or something like that. You have api endpoints that give you this list when you need it, but it is not really application state. This is more obvious is we expand this example a little.

Imagine we need to display a list of products on multiple pages. The home page shows a list of products, a user’s personal profile page lists their products but filtered by their favorite ones, the listing for a single product shows a list of related products, etc. Each of these pages is going to use the same getProducts() api endpoint. Do you really want to manage sharing that “products” store between all these pages? What if you fetch two separate lists of products at the same time and show them both on the screen? It makes no sense to have a store for every resource that your api exposes.

Let’s take a look at an example where a store is really good - a shopping cart. This is similar, in that it is a list of products. But you want to show those currently selected products that represent the cart in a sidebar, or show the total amount in the header. This is application state and deserves a store. Multiple components that are otherwise unrelated all need to know about this state.
![image](https://user-images.githubusercontent.com/4195550/110245351-f8a4bb00-7f62-11eb-97db-8bffad883245.png)

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

![image](https://user-images.githubusercontent.com/4195550/110245206-8502ae00-7f62-11eb-89c9-f7f05f5d7d63.png)

