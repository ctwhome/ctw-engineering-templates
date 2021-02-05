<template>
  <div>
    <video ref="video1" width="350" controls></video>
    <br />
    <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
    <div
      class="container"
      :style="{ 'background-color': color }"
      @dragleave="fileDragOut"
      @dragover="fileDragIn"
      @drop="handleFileDrop"
    >
      Add your files here:
      <br />
      <div class="file-wrapper">
        <input type="file" name="file-input" multiple="True" @change="handleFileInput" /> Click or drag to insert.
      </div>
      <ul>
        <li v-for="(file, index) in files" :key="index">
          {{ file.name }} ({{ file.size }} b)
          <button title="Remove" @click="removeFile(index)">X</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { sha256 } from 'js-sha256'

export default {
  data() {
    return {
      files: [],
      color: '#EEE',
      loading: false,
    }
  },
  methods: {
    async calculateSha256(blobUrl, callback) {
      const blob = await fetch(blobUrl).then((r) => r.blob())
      const reader = new FileReader()
      const sizeMB = 1 // Size in MB
      reader.readAsArrayBuffer(blob.slice(0, sizeMB * 1024 * 1024))
      reader.onloadend = function () {
        const hash = sha256(reader.result)
        console.log('sha256 Checksum', hash)
        callback(hash)
      }
    },
    async handleFileDrop(e) {
      this.loading = true
      const droppedFiles = e.dataTransfer.files
      const blobUrl = URL.createObjectURL(droppedFiles[0])
      this.$refs.video1.src = blobUrl

      try {
        const entry = await droppedFiles[0].getAsFileSystemHandle()
        if (entry.kind === 'file') {
          // run code for if entry is a file
        } else if (entry.kind === 'directory') {
          // run code for is entry is a directory
        }
      } catch (e) {}

      this.calculateSha256(blobUrl, (x) => {
        console.log('3 🔥', x)
        this.loading = false
      })
      if (!droppedFiles)
        return // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      ;[...droppedFiles].forEach((f) => {
        this.files.push(f)
      })
      this.color = '#EEE'
    },

    fileHash(file, hasher, callback) {
      // Instantiate a reader
      const reader = new FileReader()

      // What to do when we gets data?
      reader.onload = function (e) {
        const hash = hasher(e.target.result)
        callback(hash)
      }

      reader.readAsBinaryString(file)
    },

    handleFileInput(e) {
      let files = e.target.files
      files = e.target.files
      if (!files)
        return // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      ;[...files].forEach((f) => {
        this.files.push(f)
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
