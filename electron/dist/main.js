"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
let win;
let flaskProcess;
const getPythonPath = () => {
    return electron_1.app.isPackaged
        ? path_1.default.join(process.resourcesPath, 'flask-bin/flask-app.exe')
        : path_1.default.join(__dirname, '../../flask-backend/dist/flask-app.exe');
};
const startFlaskServer = () => {
    flaskProcess = (0, child_process_1.spawn)(getPythonPath(), [electron_1.app.isPackaged ? '../flask-bin/flask-app.exe' : 'app.py'], { cwd: electron_1.app.isPackaged ? process.resourcesPath : __dirname });
};
const createWindow = () => {
    win = new electron_1.BrowserWindow({
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
        : `file://${path_1.default.join(electron_1.app.getAppPath(), 'react-frontend/build/index.html')}`;
    win.loadURL(reactUrl).catch(err => {
        console.error('URL読み込み失敗:', err);
        win.loadFile(path_1.default.join(__dirname, 'fallback.html'));
    });
    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools({ mode: 'detach' });
    }
};
electron_1.app.whenReady().then(() => {
    startFlaskServer();
    createWindow();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        flaskProcess.kill();
        electron_1.app.quit();
    }
});
