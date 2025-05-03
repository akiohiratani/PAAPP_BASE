module.exports = {
  productName: "AkioHorseSearcher",
  appId: "com.example.electronflask",
  directories: {
    output: "dist"
  },
  files: [
    "electron/**/*",
    "react-frontend/build/**/*",
    "flask-backend/dist/**/*"
  ],
  extraResources: [
    {
      "from": "flask-backend/dist/flask-app.exe",
      "to": "flask-bin/flask-app.exe",
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
