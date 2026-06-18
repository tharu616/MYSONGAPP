const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handler: get audio URL using yt-dlp
ipcMain.handle('get-audio-url', async (event, videoId) => {
  return new Promise((resolve) => {
    if (!videoId) {
      resolve(null);
      return;
    }

    const url = `https://www.youtube.com/watch?v=${videoId}`;

    // FULL PATH to yt-dlp.exe – change if your path is different
    const ytDlpPath = 'C:\\yt-dlp\\yt-dlp.exe';

    const child = spawn(ytDlpPath, [
      '-f',
      'bestaudio',
      '--get-url',
      url
    ]);

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0 && output.trim().length > 0) {
        const firstLine = output.trim().split('\n')[0];
        resolve(firstLine.trim());
      } else {
        console.error('yt-dlp error:', errorOutput);
        resolve(null);
      }
    });

    child.on('error', (err) => {
      console.error('Failed to start yt-dlp:', err);
      resolve(null);
    });
  });
});