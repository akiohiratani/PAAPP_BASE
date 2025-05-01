// 戦歴の型定義
export interface History {
    date: string;               // 開催日
    venue: string;              // 場所
    weather: string;            // 天気
    race_number: string;        // 第Nレース
    race_name: string;          // レース名
    horses_count: string;       // 出走頭数
    gate_number: string;        // 枠番号
    horse_number: string;       // 馬番号
    odds: string;               // オッズ
    popularity: string;         //N番人気
    finish_position: string;    // 着順
    jockey: string;             // 鞍上
    weight: string;             // 斤量
    distance: string;           // 距離
    track_condition: string;    //馬場状態
    time: string;               // タイム
    margin: string;             // 着差
    pace: string;               //ペース
    horse_weight: string;       //馬体重
    winner: string;             // 勝ち馬
    rise: string;               //上がり
}