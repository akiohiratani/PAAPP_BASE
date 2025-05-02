## 構成
```
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
```
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
npx electron-packager . AkioHorseSearcher --platform=win32 --icon=assets/icon.ico


# 本番環境向けビルド手順
```
rmdir /s /q dist
rmdir /s /q flask-backend\dist
rmdir /s /q react-frontend\build

npm run build:flask
npm run build:react
npm run build:electron

npx electron-builder --win --config electron-builder.config.js

```
# 競馬データ出力ファイルのマニュアル

このドキュメントは、Pythonスクリプトで出力される3種類のCSVファイルの内容と用途について解説します。  
各ファイルの特徴を理解し、予想・分析・管理にご活用ください。

---

## 1. horses_basic.csv

**概要**  
出走馬ごとの基本情報をまとめた一覧表です。

**主な内容**
- 馬ID
- 馬名
- 性別・年齢
- 父・祖父（血統）
- 直近レース名・着順など

**用途例**
- 出走馬リストの確認
- 血統や年齢構成の把握
- 直近の成績による出走馬の調子判定

**サンプルカラム**
| id         | name           | sex   | father     | grandfather     | title                 | latest_race         | latest_position |
|------------|----------------|-------|------------|-----------------|-----------------------|---------------------|-----------------|
| 2021105195 | ショウナンラプンタ | 牡4歳 | キズナ     | ディープインパクト | 24'ゆきやなぎ賞(1勝クラス) | 阪神大賞典(GII)      | 4               |

---

## 2. horses_analysis.csv

**概要**  
予想家やデータ分析者向けの、各馬のパフォーマンス指標・特徴量を集約したデータです。

**主な内容**
- 直近レースの平均着順（3走・5走・全走）
- 芝・ダート別の成績
- 馬体重変化の平均
- 1～3着回数
- 直近成績の推移
- 上がり3Fタイムの平均 など

**用途例**
- 傾向分析や機械学習モデルの入力
- 調子や適性の可視化
- 距離・馬場・馬体重など多角的な比較

**サンプルカラム**
| id         | name           | avg_position_3 | avg_turf_position | wins | avg_weight_change | recent_results |
|------------|----------------|----------------|-------------------|------|-------------------|----------------|
| 2021105195 | ショウナンラプンタ | 3.33           | 4.0               | 2    | +2.5              | 4-2-4-3-15     |

---

## 3. race_history_details.csv

**概要**  
各馬の全レース履歴を詳細に記録したデータです。1行が1レースで、先頭に馬情報が付きます。

**主な内容**
- 馬ID・馬名・性別など（先頭カラム）
- レース日付・場所・天候
- レース名・クラス・距離
- 着順・タイム・騎手・馬体重・上がり3F
- オッズ・人気・勝ち馬名 など

**用途例**
- 時系列での成績推移分析
- コース・距離・馬場状態ごとの適性評価
- 騎手や斤量、馬体重変化の影響調査

**サンプルカラム**
| horse_id   | horse_name      | sex   | father     | grandfather     | date       | venue   | race_name           | finish_position | jockey | distance | odds | horse_weight | rise  |
|------------|-----------------|-------|------------|-----------------|------------|---------|---------------------|-----------------|--------|----------|------|--------------|-------|
| 2021105195 | ショウナンラプンタ | 牡4歳 | キズナ     | ディープインパクト | 2025/03/23 | 1阪神8  | 阪神大賞典(GII)      | 4               | 武豊   | 芝3000   | 2.9  | 542(+2)      | 35.2  |

---

## ファイルの使い分け提案

- **horses_basic.csv**  
  → 「出走馬の一覧やプロフィールを素早く確認したいとき」に最適

- **horses_analysis.csv**  
  → 「予想や統計分析、AIモデルの入力データとして使う場合」に最適

- **race_history_details.csv**  
  → 「個別レースごとの詳細分析や、時系列・条件別の傾向を深掘りしたい場合」に最適

---

各ファイルは用途に応じて使い分け、または組み合わせて活用することで、より精度の高い競馬予想やデータ分析が可能になります。
