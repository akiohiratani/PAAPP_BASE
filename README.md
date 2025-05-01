## 構成

electron-flask-app/
├── electron/              # Electronメインプロセス
│   ├── main.ts            # メインスクリプト
│   └── tsconfig.json      # TypeScript設定
├── flask-backend/         # Flaskバックエンド
│   ├── app.py             # Flaskアプリケーション
│   ├── requirements.txt   # Python依存関係
│   └── venv/              # Python仮想環境
├── react-frontend/        # Reactフロントエンド
│   ├── public/            # 静的リソース
│   ├── src/               # ソースコード
│   ├── tsconfig.json      # TypeScript設定
│   └── package.json       # フロントエンド依存関係
├── package.json           # ルートプロジェクト設定
└── .env                   # 環境変数設定

## 開発

### バックエンド
```
cd flask-backend 
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors pyinstaller
pip freeze > requirements.txt
pyinstaller --onefile app.py --name flask-app
python app.py
```

## フロントエンド
```
cd react-frontend
npm run start

```
## Electron
start:electron


# 本番環境向けビルド手順

rmdir /s /q dist
rmdir /s /q flask-backend\dist
rmdir /s /q react-frontend\build

npm run build:flask
npm run build:react
npm run build:electron
npx electron-builder --win --config electron-builder.config.js