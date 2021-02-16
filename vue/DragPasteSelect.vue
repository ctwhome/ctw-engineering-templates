<template>
  <v-content @dragover.prevent @drop.prevent>
    <a
      target="_blank"
      href="https://console.firebase.google.com/project/supertaal/storage/supertaal.appspot.com/files~2Fcards"
      >Firebase console</a
    >
    |
    <a
      target="_blank"
      href="https://docs.google.com/spreadsheets/d/13WalqaDS_RWnyYDzd16j5BnlczYczoBA8ywFnesLUFg/edit#gid=0"
      >Word list</a
    >
    <div @dragover.prevent @drop.prevent>
      <div
        class="container"
        :style="{ 'background-color': color }"
        @click="$refs.inputUpload.click()"
        @dragleave="fileDragOut"
        @dragover="fileDragIn"
        @drop="handleFileDrop"
      >
        <h1>Drag, Paste or Upload an image</h1>
        <p>It will be compressed and upload to firebase storage.</p>
        <v-icon>mdi-paperclip</v-icon>
        <v-icon>mdi-content-paste</v-icon>
        <v-icon>mdi-select-drag</v-icon>
        <ul>
          <li v-for="(file, index) in files" :key="index">
            {{ file.name }} ({{ file.size }} b)
            <button title="Remove" @click="removeFile(index)">X</button>
          </li>
        </ul>
      </div>
    </div>
    <input
      v-show="false"
      ref="inputUpload"
      type="file"
      accept="image/x-png, image/gif, image/jpeg"
      @change="uploadImage($refs.inputUpload.files[0])"
    />

    <div v-if="from">from: {{ from }} to {{ to }}</div>
    <v-row align-items="center">
      <v-col>
        <v-text-field
          v-model="codedUrl"
          dense
          solo
          label="fileName ? apikey"
          readonly
          class="mt-6"
        />
        <v-btn
          :disabled="!codedUrl"
          depressed
          color="primary"
          @click="copyUrl(codedUrl)"
        >
          <v-icon left>mdi-code-array</v-icon>
          Copy Code for the list
        </v-btn>
      </v-col>
      <v-col>
        <v-text-field
          v-model="imageUrl"
          dense
          solo
          label="https://"
          readonly
          class="mt-6"
        />
        <v-btn :disabled="!imageUrl" depressed @click="copyUrl(imageUrl)">
          <v-icon left>mdi-content-copy</v-icon>
          Copy URL
        </v-btn>
      </v-col>
    </v-row>

    <v-img v-if="imageUrl" :src="imageUrl" style="width: 512px; height: auto" />
    <v-snackbar v-model="snackbar" :timeout="2000">
      Image copied to clipboard
      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-content>
</template>

<script>
import Compressor from 'compressorjs'

export default {
  name: 'ImageEdit',
  data() {
    return {
      from: null,
      to: null,
      files: [],
      color: 'white',
      codedUrl: null,
      imageUrl: null,
      snackbar: false,
    }
  },

  mounted() {
    document.onpaste = (pasteEvent) => {
      // consider the first item (can be easily extended for multiple items)
      const item = pasteEvent.clipboardData.items[0]
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile()
        this.uploadImage(blob)
      }
    }
  },
  methods: {
    uploadImage(file) {
      console.log(
        '🕐 file size uncompressed: ',
        Math.round(file.size / 1024) + ' KB'
      )
      this.from = Math.round(file.size / 1024) + ' KB'
      new Compressor(file, {
        quality: 0.8,
        maxWidth: 512,
        success: async (result) => {
          console.log(
            '📂 file size compressed: ',
            Math.round(result.size / 1024) + ' KB'
          )
          this.to = Math.round(result.size / 1024) + ' KB'
          const response = await this.$fire.storage
            .ref('cards/' + new Date().getTime() + result.name)
            .put(result)

          response.ref
            .getDownloadURL()
            .then((downloadURL) => {
              const fileName = response.ref.name
              const regexApiKey = downloadURL.match(/(?<=token\=).*/g)
              // the coded URL separated by '?'
              this.codedUrl = fileName + '?' + regexApiKey

              const path = `https://firebasestorage.googleapis.com/v0/b/supertaal.appspot.com/o/cards%2F${fileName}?alt=media&token=${regexApiKey}`

              this.imageUrl = downloadURL
              console.log('🎹', downloadURL)
              console.log('🔥', path)
            })
            .catch((err) => console.error(err))
        },
        error(err) {
          console.error(err.message)
        },
      })
    },

    copyUrl(url) {
      navigator.clipboard.writeText(url).then(
        () => {
          console.log('Async: Copying to clipboard was successful!')
          this.snackbar = true
        },
        function (err) {
          console.error('Async: Could not copy text: ', err)
        }
      )
    },

    handleFileDrop(e) {
      const droppedFiles = e.dataTransfer.files
      if (!droppedFiles)
        return // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      ;[...droppedFiles].forEach((file) => {
        // this.files.push(f);

        this.uploadImage(file)
      })
      this.color = '#EEE'
    },

    handleFileInput(e) {
      let files = e.target.files
      files = e.target.files
      if (!files)
        return // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      ;[...files].forEach((file) => {
        this.uploadImage(file)
      })
    },
    removeFile(fileKey) {
      this.files.splice(fileKey, 1)
    },
    fileDragIn() {
      this.color = '#42A0EC'
    },
    fileDragOut() {
      this.color = '#EEE'
    },
  },
}
</script>
<style scoped>
.container {
  border: 2px dashed pink;
  min-height: 150px;
}
#app {
  border: 1px solid yellow;
}
.file-wrapper {
  text-align: center;
  width: 300px;
  height: 5em;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  overflow: hidden;
}
.file-wrapper input {
  position: absolute;
  top: 0;
  right: 0; /* not left, because only the right part of the input seems to
                 be clickable in some browser I can't remember */
  cursor: pointer;
  opacity: 0;
  filter: alpha(
    opacity=0
  ); /* and all the other old opacity stuff you
                                 want to support */
  font-size: 300px; /* wtf, but apparently the most reliable way to make
                         a large part of the input clickable in most browsers */
  height: 200px;
}
</style>
