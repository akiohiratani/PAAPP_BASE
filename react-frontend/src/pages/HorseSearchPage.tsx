'use client';

import React, { useState} from 'react';
import { Horse } from '../domain/models/Horse';
import { searchHorsesByHorseName, searchHorsesByRace, exportHorseCSVData} from '../infrastructure/api/HorseApiClient';
import SearchForm from '../components/features/horse/SearchForm';
import HorseList from '../components/features/horse/HorseList';
import { SearchDialog } from '../components/features/horse/SearchDialog';
import { SearchType } from '../components/features/horse/type/SearchType';
import { FavoriteHorseService } from '../infrastructure/holder/FavoriteHorseService';
import { CsvExportDialog } from '../components/features/horse/CsvExportDialog';

export default function HorseSearchPage() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCsvExportDialog, setCsvExportDialog] = useState(false)

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

  // CSV出力ボタンのクリック処理例
  const onExportCSVFile = async () => {
    setCsvExportDialog(false);
    
    await exportHorseCSVData();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">競走馬検索</h1>
        <button
          onClick={() => {setCsvExportDialog(true)}}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          CSV出力
        </button>
      </div>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <SearchDialog isOpen={loading} message="検索中..."/>
      ) : (
        <HorseList horses={horses} />
      )}
      <CsvExportDialog 
        open={isCsvExportDialog}
        onClose={() => {setCsvExportDialog(false)}}
        onExport={() => onExportCSVFile()}/>
    </div>
  );
}
