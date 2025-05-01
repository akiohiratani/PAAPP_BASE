import { Race } from "../../domain/models/Race";
import { RaceData as RaceResponseData } from "./data/RaceData";
import { ErrorData } from "./data/ErrorData";

const API_BASE_URL = 'http://localhost:5000/api/races';
const transformItem = (item: RaceResponseData['data'][number]): Race =>{
  return {
    id: item.id,
    name: item.name,
    place: item.place,
    date: item.date,
    distance: item.distance
  };
}

export const searchRaces= async (): Promise<Race[]> => {
  const response = await fetch(`${API_BASE_URL}/g_race`);
  if (!response.ok){
    const { error } = await response.json() as ErrorData;
    throw new Error(`status_code:${error.status_code}\n message=${error.message}`);
  } 
  const { data } = await response.json() as RaceResponseData;
  return data.map(item => transformItem(item));
}
