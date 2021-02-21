Using slots

```vue
<template>
  <v-select :items="items" solo :value="value" @change="change">
    <template #selection="data">
      <div class="flex">
        <v-list-item-avatar tile width="30">
          <v-img
            style="border-radius: 2px"
            :transition="false"
            :src="
              data.item.value === 'personal'
                ? $store.state.userData.user.photoURL
                : data.item.option.imageUrl
                ? data.item.option.imageUrl
                : require('@/assets/image-placeholder.svg')
            "
          ></v-img>
        </v-list-item-avatar>
        {{ data.item.option.name }}
      </div>
    </template>

    <template #item="data">
      <v-list-item-avatar tile width="30">
        <v-img
          style="border-radius: 2px"
          :transition="false"
          :src="
            data.item.value === 'personal'
              ? $store.state.userData.user.photoURL
              : data.item.option.imageUrl
              ? data.item.option.imageUrl
              : require('@/assets/image-placeholder.svg')
          "
        />
      </v-list-item-avatar>
      <v-list-item-title>{{ data.item.option.name }}</v-list-item-title>
    </template>
  </v-select>
</template>

<script>
import _map from 'lodash/map'

export default {
  name: 'SelectWithImage',
  props: {
    options: { type: Object, default: () => {} },
    value: { type: String },
  },
  computed: {
    items() {
      return _map(this.options, option => ({
        option: option,
        value: option.organizationId,
      }))
    },
  },
  methods: {
    change(item) {
      this.$emit('change', item)
    },
  },
}
</script>

<style scoped>
.image-selector {
  object-fit: cover;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin-right: 8px;
}
</style>

```
