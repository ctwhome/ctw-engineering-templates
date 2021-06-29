## DaisyUI themes with Nuxt

```javascript
head: {
    ...
     htmlAttrs: {
      'data-theme': 'light' // https://daisyui.com/docs/default-themes
    }
    ...
}
```

## Modal with closing from outside

```html
<label for="my-modal-2" class="btn btn-primary modal-button">open modal</label> 

<input type="checkbox" id="my-modal-2" class="modal-toggle"> 
<label class="modal" for="my-modal-2">
  <label class="modal-box">
    <p>Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla ea quasi eligendi. Saepe velit autem minima.</p> 
    <div class="modal-action">
      <label for="my-modal-2" class="btn btn-primary">Accept</label> 
      <label for="my-modal-2" class="btn">Close</label>
    </div>
  </label>
</label>
```

## Dropdown with DaisyUI and no Js!!

```
 <div ref="dropdown" tabindex="0">
    <div class="dropdown">
      <div tabindex="0" class="btn" @click="openMenu">
        Menu
      </div>
      <div class="shadow menu dropdown-content bg-base-100 w-72 h-72 overflow-y-auto">
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

## Responsive Layout

[https://play.tailwindcss.com/YfboyLNqvM?size=538x287](https://play.tailwindcss.com/YfboyLNqvM?size=538x287)

![](https://user-images.githubusercontent.com/4195550/123655917-b95eea80-d82f-11eb-9cc1-1f6513949343.png)

```html

<div class="flex flex-col w-screen h-screen bg-gray-100">
  <!-- Top -->
  <div class="bg-gray-400 p-2">Toolbar</div>

  <!-- Middle -->
  <div class="flex h-full overflow-auto">
    <!-- Sidebar -->
    <div class="w-60 bg-gray-500 text-white">Sidebar</div>
    <!-- Content -->
    <div class="w-full overflow-auto">
      <img class="object-contain w-auto h-full max-w-full max-h-full" src="https://images.ctfassets.net/lzny33ho1g45/T5qqQQVznbZaNyxmHybDT/b76e0ff25a495e00647fa9fa6193a3c2/best-url-shorteners-00-hero.png" alt="" />
    </div>
  </div>

  <!-- Bottom -->
  <div class="bg-gray-400 p-2">Footer</div>
</div>
```
