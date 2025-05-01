import { History } from "./History";

// 競走馬の型定義
export interface Horse {
    id: string;          // 馬ID
    name: string;        // 馬名
    sex: string; // 性別
    image: string;       // 馬の画像URL
    father: string;        // 父馬名
    grandfather: string;     // 母父馬名
    title: string;
    detailUrl: string;   // Netkeibaの馬のURL
    historys: History[]  // 戦歴
}