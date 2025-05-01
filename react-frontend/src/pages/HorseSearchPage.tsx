'use client';

import React, { useState} from 'react';
import { Horse } from '../domain/models/Horse';
import { searchHorsesByHorseName, searchHorsesByRace } from '../infrastructure/api/HorseApiClient';
import SearchForm from '../components/features/horse/SearchForm';
import HorseList from '../components/features/horse/HorseList';
import { SearchDialog } from '../components/features/horse/SearchDialog';
import { SearchType } from '../components/features/horse/type/SearchType';
import { FavoriteHorseService } from '../infrastructure/holder/FavoriteHorseService';

export default function HorseSearchPage() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (keyword: SearchType) => {
    setLoading(true);
    try {
      switch(keyword.type){
        case "horceName":{
            // 検索ワードから馬を抽出
            if(keyword.value == null || keyword.value == "") return;
            const horseNameSearchResult = await searchHorsesByHorseName(keyword.value);
            setHorses(horseNameSearchResult);
            break;
        }
        case "raceId":{
            // レース名から馬を抽出
            if(keyword.value == null || keyword.value == "") return;
            const raceIdSearchResult = await searchHorsesByRace(keyword.value);
            setHorses(raceIdSearchResult);
            break;
        }
        case "favorite":{
            // お気に入りした馬から抽出
            const favoriteService = FavoriteHorseService.getInstance();
            const favariteSearchResult = favoriteService.getAllFavorites();
            setHorses(favariteSearchResult);
            break
        }
        default:{
            return;
        }
      }
    } catch (error) {
      console.error('検索エラー:', error);
      alert('検索に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">競走馬検索</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <SearchDialog isOpen={loading} message="検索中..."/>
      ) : (
        <HorseList horses={horses} />
      )}
    </div>
  );
}
