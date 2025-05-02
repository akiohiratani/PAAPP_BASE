import { HorseData as HorseResponseData } from "./data/HorseData";
import { ErrorData } from "./data/ErrorData";
import { Horse } from "../../domain/models/Horse";
import { ExportResultData } from "./data/ExportResultData";
import { FavoriteHorseService } from "../holder/FavoriteHorseService";

const API_BASE_URL = 'http://localhost:5000/api/horses';

const transformItem = (item: HorseResponseData['data'][number]): Horse =>{
  return {
    id: item.id,
    name: item.name,
    sex: item.sex,
    image: item.image,
    father: item.father,
    grandfather: item.grandfather,
    title: item.title,
    detailUrl: `https://db.netkeiba.com/horse/${item.id}`, // IDを基にURLを生成
    historys: item.race_historys
  };
}

export const searchHorsesByHorseName = async (value: string): Promise<Horse[]> => {
  const response = await fetch(`${API_BASE_URL}/name?word=${encodeURIComponent(value)}`);
  
  if (!response.ok) {
    const { error } = await response.json() as ErrorData;
    throw new Error(`status_code:${error.status_code}\n message=${error.message}`);
  }

  const { data } = await response.json() as HorseResponseData;
  return data.map(item => transformItem(item));
}

export const searchHorsesByRace = async (raceId: string): Promise<Horse[]> => {
  const response = await fetch(`${API_BASE_URL}/race?id=${encodeURIComponent(raceId)}`);
  
  if (!response.ok) {
    const { error } = await response.json() as ErrorData;
    throw new Error(`status_code:${error.status_code}\n message=${error.message}`);
  }

  const { data } = await response.json() as HorseResponseData;
  return data.map(item => transformItem(item));
}

export const exportHorseCSVData = async (): Promise<string>=>{
  // お気に入りした馬から抽出
  const favoriteService = FavoriteHorseService.getInstance();
  const favariteSearchResult = favoriteService.getAllFavorites();
  const ids = favariteSearchResult.map(x => x.id);

  const response = await fetch(`${API_BASE_URL}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: ids })
  })
  
  if (!response.ok) {
    const { error } = await response.json() as ErrorData;
    throw new Error(`status_code:${error.status_code}\n message=${error.message}`);
  }

  const { data } = await response.json() as ExportResultData;
  return data;
}