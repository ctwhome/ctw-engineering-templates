## Custom v-select with slots

```vue
 <v-select
      v-model="category"
      :items="categories_enum"
      item-text="value"
      item-value="value"
      label="Category"
      @change="filterCategory"
    ></v-select>
    
    ...
    
     <v-select
          v-model="category"
          :items="categories_enum"
          item-text="value"
          item-value="value"
          label="Category"
          @change="filterCategory"
        >
          <template #selection="data">
            <!-- HTML that describe how select should render selected items -->
            {{ data }}
          </template>
          <template #item="data">
            <!-- HTML that describe how select should render items when the select is open -->
            {{ data }}
          </template>
        </v-select>

```
```js
computed: {
    category: {
      get() {
        return this.$store.state.cards.selected_category
      },
      set(value) {
        this.$store.commit('cards/SELECTED_CATEGORY', value)
      },
    },
    
```
