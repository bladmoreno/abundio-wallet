const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

let balance = 0;

ipcMain.handle('wallet:getBalance', () => balance);
ipcMain.handle('wallet:deposit', (_event, amount) => {
  balance += amount;
  return balance;
});
ipcMain.handle('wallet:withdraw', (_event, amount) => {
  balance -= amount;
  return balance;
});
