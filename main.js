const { app, BrowserWindow, shell, ipcMain, Menu } = require('electron');
const path = require('path');

app.setName('Animecix');
process.title = 'Animecix';

function createWindow() {
  const win = new BrowserWindow({
    title: 'Animecix',
    width: 1280,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#0a0a0a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
    icon: path.join(__dirname, 'animecix.png'),
  });

  Menu.setApplicationMenu(null);
  win.loadURL('https://animecix.tv');

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith('https://animecix.tv')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  ipcMain.on('window-minimize', () => win.minimize());
  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  });
  ipcMain.on('window-close', () => win.close());

  win.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      event.preventDefault();
    }
    if (input.key === 'Escape') {
      if (win.isFullScreen()) {
        win.setFullScreen(false);
        event.preventDefault();
      } else if (win.webContents.canGoBack()) {
        win.webContents.goBack();
        event.preventDefault();
      }
    }
  });
}
app.commandLine.appendSwitch('disable-vulkan');
app.commandLine.appendSwitch('use-gl', 'angle');
app.commandLine.appendSwitch('use-angle', 'gl');
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder,VaapiVideoEncoder');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('in-process-gpu');

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
