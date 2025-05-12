const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')
console.log('fs', fs)
contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome
})

contextBridge.exposeInMainWorld('electron', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  writeFile: (content) => ipcRenderer.invoke('write-file', content),
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  readFile: fs.promises.readFile
})

contextBridge.exposeInMainWorld('require', require)