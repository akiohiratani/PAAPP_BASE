import { Horse } from "../../domain/models/Horse";

// シングルトンサービス
export class FavoriteHorseService {
  private static instance: FavoriteHorseService | null = null;
  private favoriteHorses: Map<string, Horse>;
  
  // プライベートコンストラクタでインスタンスの直接生成を防ぐ
  private constructor() {
    this.favoriteHorses = new Map<string, Horse>();
    this.loadFromLocalStorage();
  }
  
  // シングルトンインスタンスの取得メソッド
  public static getInstance(): FavoriteHorseService {
    // Next.jsの環境では、サーバーサイドレンダリング時にglobalオブジェクトを使用する
    if (typeof window !== 'undefined') {
      // クライアントサイド
      if (!FavoriteHorseService.instance) {
        FavoriteHorseService.instance = new FavoriteHorseService();
      }
    } else {
      // サーバーサイド - 毎回新しいインスタンスを作成
      return new FavoriteHorseService();
    }
    
    return FavoriteHorseService.instance!;
  }
  
  // お気に入り馬の追加
  public addFavorite(horse: Horse): void {
    this.favoriteHorses.set(horse.id, horse);
    this.saveToLocalStorage();
  }
  
  // お気に入り馬の削除
  public removeFavorite(horseId: string): void {
    this.favoriteHorses.delete(horseId);
    this.saveToLocalStorage();
  }
  
  // 特定のお気に入り馬の取得
  public getFavorite(horseId: string): Horse | undefined {
    return this.favoriteHorses.get(horseId);
  }
  
  // すべてのお気に入り馬の取得
  public getAllFavorites(): Horse[] {
    return Array.from(this.favoriteHorses.values());
  }
  
  // お気に入りかどうかのチェック
  public isFavorite(horseId: string): boolean {
    return this.favoriteHorses.has(horseId);
  }
  
  // お気に入り数の取得
  public getFavoriteCount(): number {
    return this.favoriteHorses.size;
  }
  
  // ローカルストレージへの保存
  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const serialized = JSON.stringify(Array.from(this.favoriteHorses.entries()));
        localStorage.setItem('favoriteHorses', serialized);
      } catch (error) {
        console.error('Failed to save favorite horses to localStorage:', error);
      }
    }
  }
  
  // ローカルストレージからの読み込み
  private loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const serialized = localStorage.getItem('favoriteHorses');
        if (serialized) {
          const entries = JSON.parse(serialized) as [string, Horse][];
          this.favoriteHorses = new Map(entries);
        }
      } catch (error) {
        console.error('Failed to load favorite horses from localStorage:', error);
      }
    }
  }
  
  // お気に入りのクリア
  public clearAllFavorites(): void {
    this.favoriteHorses.clear();
    this.saveToLocalStorage();
  }
}
