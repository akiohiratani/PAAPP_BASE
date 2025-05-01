module.exports = {
  productName: "ElectronFlaskApp",
  appId: "com.example.electronflask",
  directories: {
    output: "dist"
  },
  files: [
    "electron/**/*",
    "react-frontend/build/**/*",
    "flask-backend/dist/**/*"  // 明示的に追加
  ],
  extraResources: [
    {
      "from": "flask-backend/dist/flask-app.exe",
      "to": "flask-bin/flask-app.exe",
      "filter": ["**/*"]
    },
    {
      "from": "flask-backend/venv/Lib/site-packages",
      "to": "venv/Lib/site-packages",
      "filter": ["**/*"]
    }
  ],
  win: {
    target: "nsis",
    icon: "assets/icon.ico"
  },
  mac: {
    target: "dmg",
    icon: "assets/icon.icns"
  }
};
