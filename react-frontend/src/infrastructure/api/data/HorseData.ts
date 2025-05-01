export interface HorseData {
  data: {
    id: string;
    name: string;
    sex: string;
    image: string;
    father: string;
    grandfather: string;
    title: string;
    race_historys:{
      date: string;
      venue: string;
      weather: string;
      race_number: string;
      race_name: string;
      horses_count: string;
      gate_number: string;
      horse_number: string;
      odds: string;
      popularity: string;
      finish_position: string;
      jockey: string;
      weight: string;
      distance: string;
      track_condition: string;
      time: string;
      margin: string;
      pace: string;
      horse_weight: string;
      winner: string;
      rise: string;
    }[]
  }[];
}