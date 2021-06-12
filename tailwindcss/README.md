## Dropdown in Vue!!

```
 <div ref="dropdown" tabindex="0">
    <div class="dropdown">
      <div tabindex="0" class="btn" @click="openMenu">
        Menu
      </div>
      <div class="shadow menu dropdown-content bg-base-100  w-72 h-72 overflow-y-auto">
        <div
          v-for="item in itmes"
          :key="i"
          tabindex="0"        
          class="flex mb-2 p-2 hover:bg-gray-100 transition cursor-pointer"
          @click="$emit('on-row-selected', exchange); $refs.dropdown.focus()"
        >
          <img :src="logo">
          {{ name }}
        </div>
      </div>
    </div>
```
