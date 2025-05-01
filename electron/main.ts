import treeKill from 'tree-kill';
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { spawn } from 'child_process';

let win: BrowserWindow;
let flaskProcess: ReturnType<typeof spawn>;

const getPythonPath = () => {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'flask-bin/flask-app.exe')
    : path.join(__dirname, '../../flask-backend/dist/flask-app.exe');
};

const startFlaskServer = () => {
  flaskProcess = spawn(
    getPythonPath(),
    [app.isPackaged ? '../flask-bin/flask-app.exe' : 'app.py'],
    { cwd: app.isPackaged ? process.resourcesPath : __dirname }
  );
};

const killFlaskProcess = () => {
  if (flaskProcess && flaskProcess.pid) {
    treeKill(flaskProcess.pid, 'SIGTERM', (err) => {
      if (err) console.error('プロセス終了エラー:', err);
    });
  }
};

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: true,
      devTools: process.env.NODE_ENV === 'development'
    }
  });

  const reactUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `file://${path.join(app.getAppPath(), 'react-frontend/build/index.html')}`;

  win.loadURL(reactUrl).catch(err => {
    console.error('URL読み込み失敗:', err);
    win.loadFile(path.join(__dirname, 'fallback.html'));
  });

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools({ mode: 'detach' });
  }
};

app.whenReady().then(() => {
  startFlaskServer();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    killFlaskProcess();
    app.quit();
  }
});

// アプリ終了直前処理
app.on('before-quit', () => {
  killFlaskProcess();
});

// 開発者による明示的終了時
ipcMain.on('force-quit', () => {
  killFlaskProcess();
  app.quit();
});