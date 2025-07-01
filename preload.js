const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('wallet', {
  getBalance: () => ipcRenderer.invoke('wallet:getBalance'),
  deposit: (amount) => ipcRenderer.invoke('wallet:deposit', amount),
  withdraw: (amount) => ipcRenderer.invoke('wallet:withdraw', amount),
});
