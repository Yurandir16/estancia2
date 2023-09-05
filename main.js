  const { app, BrowserWindow, ipcMain } = require('electron');

  let mainWindow;

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1100,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    mainWindow.setMenu(null);
    mainWindow.loadFile('views/login.html');
  }

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
  });

