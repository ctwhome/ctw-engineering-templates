<template>
  <div style="width: 100%">
    <div>
      <h3>
        <v-btn
          class="btn btn-secondary mb-4"
          :color="
            localIvyList && Object.values(localIvyList).length > 6
              ? 'red'
              : '#00D2FF'
          "
          :ripple="false"
          depressed
          tile
          dark
          @click="add(0, true)"
        >
          <v-icon left>mdi-plus</v-icon>
          IvyList
          {{ localIvyList ? Object.values(localIvyList).length : '' }}
        </v-btn>
      </h3>
      <draggable
        handle=".handle"
        v-bind="dragOptions"
        :list="localIvyList"
        :disabled="!enabled"
        @start="dragging = true"
        @change="endDragging"
      >
        <!--        @end="endDragging"-->
        <v-card
          v-for="(element, idx) in localIvyList"
          :key="idx"
          tile
          elevation="0"
          class="d-flex item"
        >
          <v-icon class="handle" style="width: 40px">mdi-drag-vertical</v-icon>
          <input
            :ref="'item' + idx"
            v-model="element.text"
            type="text"
            class="form-control"
            style="flex-grow: 1"
            placeholder="task"
            @change="updateRemoteList"
            @keydown="inputKeydown($event, idx, element.text)"
          />
          <v-btn icon>
            <v-icon color="#ccc" @click="removeAt(idx, '', true)"
              >mdi-close
            </v-icon>
          </v-btn>
        </v-card>
      </draggable>
      <span class="keys">⌘+↓</span>
      <span class="keys">⌘+↑</span>
      <span class="keys">⌘+⌫</span>

      <v-row>
        <v-col>
          <h4>Local</h4>
          <pre>{{ localIvyList }}</pre>
        </v-col>
        <v-col>
          <h4>Remote</h4>
          <pre>{{ ivyList }}</pre>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('ivyList')

export default {
  data() {
    return {
      enabled: true,
      dragging: false,
      localIvyList: [
        {
          createdAt: 1609145142079,
          text: 'a',
        },
        {
          createdAt: 1609145142218,
          text: 'b',
        },
        {
          createdAt: 1609145141925,
          text: 'c',
        },
      ],
      dragOptions: {
        animation: 300,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
    }
  },

  computed: {
    ...mapState({
      ivyList: ({ data }) => (data.list ? Object.values(data.list) : []),
    }),
  },
  watch: {
    ivyList(data) {
      console.log('⚽️ valued changed', data)
    },
    localIvyList(data) {
      // console.log('🎓 Local', data)
    },
  },
  created() {
    this.$store.dispatch('ivyList/openDBChannel')
  },
  methods: {
    // add it in the correct position!!
    add(idx = 0, start = false) {
      this.localIvyList.splice(start ? idx : idx + 1, 0, {
        createdAt: new Date().getTime(),
        text: '',
      })
      this.moveCursor(start ? idx : idx + 1)
    },

    swap(direction, idx) {
      if (direction === 'up' && idx === 0) {
        return
      }
      if (direction === 'down' && idx === this.localIvyList.length - 1) {
        return
      }
      const nextIdx = direction === 'up' ? idx - 1 : idx + 1
      const tmp = this.localIvyList[nextIdx]
      this.localIvyList.splice(nextIdx, 1, this.localIvyList[idx])
      this.localIvyList.splice(idx, 1, tmp)
    },

    // Handle keyboard shortcuts
    inputKeydown(event, idx, text) {
      switch (event.key) {
        case 'Backspace':
          console.log('🎹', event.metaKey)
          this.removeAt(idx, event.metaKey ? '' : text, event.metaKey)
          break
        case 'Enter':
          this.add(idx)
          break
        case 'ArrowUp':
          ;(event.ctrlKey || event.altKey || event.metaKey) &&
            this.swap('up', idx)
          this.moveCursor(idx - 1)
          break
        case 'ArrowDown':
          ;(event.ctrlKey || event.altKey || event.metaKey) &&
            this.swap('down', idx)
          this.moveCursor(idx + 1)
          break
      }
    },

    moveCursor(toIdx) {
      // Wait for the DOM to create the element
      setTimeout(() => {
        this.$refs['item' + toIdx]?.[0]?.focus()
      }, 20)
    },

    removeAt(idx, text, click = false) {
      if (!text || text === '') {
        this.localIvyList.splice(idx, 1)
        this.moveCursor(idx - 1)
      }
    },

    endDragging() {
      this.dragging = false
      console.log('end dragging', this.localIvyList)
      this.updateRemoteList()
    },

    draggingInfo() {
      return this.dragging ? 'under drag' : ''
    },

    write(idx, text) {
    },

    updateRemoteList() {
      // this.$store.dispatch('ivyList/set', {
      //   list: { ...this.localIvyList },
      // })
    },
  },
}
</script>
<style scoped>
.keys {
  border: 1px solid currentColor;
  color: #ccc;
  border-radius: 3px;
}
.button {
  margin-top: 35px;
}
.handle {
  /*float: left;*/
  padding-top: 8px;
  padding-bottom: 8px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
  border: none;
}
input:focus {
  outline: none;
}
::placeholder {
  color: darkgrey;
  opacity: 1;
}
.text {
  margin: 20px;
}
.buttons {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}

.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.ghost {
  opacity: 0;
  background: #c8ebfb;
}
</style>

