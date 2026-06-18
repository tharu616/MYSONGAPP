const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAudioUrl: (videoId) =>
    ipcRenderer.invoke('get-audio-url', videoId)
});