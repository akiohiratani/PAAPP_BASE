'use client';

import { useState} from 'react';
import { Horse } from '../domain/models/Horse';
import { searchHorsesByHorseName, searchHorsesByRace, exportHorseCSVData} from '../infrastructure/api/HorseApiClient';
import SearchForm from '../components/features/horse/SearchForm';
import HorseList from '../components/features/horse/HorseList';
import { SearchDialog } from '../components/features/horse/SearchDialog';
import { SearchType } from '../components/features/horse/type/SearchType';
import { AlertDialog } from '../components/features/horse/AlertDialog';
import { FavoriteHorseService } from '../infrastructure/holder/FavoriteHorseService';
import { CsvExportDialog } from '../components/features/horse/CsvExportDialog';
import { BulkOperationButtons } from '../components/features/horse/BulkOperationButtons';

export default function HorseSearchPage() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState({open:false, message:""});
  const [isAlertDialog, SetIsAlertDialog] = useState({open:false, message:""})
  const [isCsvExportDialog, setCsvExportDialog] = useState(false)

  const handleSearch = async (keyword: SearchType) => {
    // 検索をダイアログの表示する
    setLoading({open:true, message:"競走馬検索中・・・"});
    let isSuccess = true;
    try {
      switch(keyword.type){
        case "horceName":{
            // 検索ワードから馬を抽出
            if(keyword.value == null || keyword.value === "") return;
            
            const horseNameSearchResult = await searchHorsesByHorseName(keyword.value);
            setHorses(horseNameSearchResult);
            break;
        }
        case "raceId":{
            // レース名から馬を抽出
            if(keyword.value == null || keyword.value === "") return;
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
      isSuccess = false;
    } finally {
      // 進捗ダイアログを閉じる
      setLoading({open:false,message:""});

      // 結果に応じて警告ダイアログを表示する
      if(!isSuccess){
        SetIsAlertDialog({"open": true, "message": "検索に失敗しました。"})
      }
    }
  };

  const OnFavariteHorseUpdate = () => {
    const favoriteService = FavoriteHorseService.getInstance();
    const favariteSearchResult = favoriteService.getAllFavorites();
    setHorses(favariteSearchResult);
  }

  const handleSetCsvExportDialog = () =>{
    const favoriteService = FavoriteHorseService.getInstance();
    const favariteSearchResult = favoriteService.getAllFavorites();
    if(favariteSearchResult == null || favariteSearchResult.length === 0){
      SetIsAlertDialog({"open": true, "message": "お気に入りに登録してから実行してください。"})
      return;
    }
    setCsvExportDialog(true);
  }

  // CSV出力ボタンのクリック処理例
  const onExportCSVFile = async () => {

    // 進捗ダイアログを表示する
    setCsvExportDialog(false);
    setLoading({open:true,message:"CSVファイル出力中・・・"});
    let isSuccess = true;
    try{
      // 出力実行！！
      await exportHorseCSVData();
    }catch (error) {
      isSuccess = false;
      console.error('出力エラー:', error);
    } finally {

      // 進捗ダイアログを閉じる
      setLoading({open:false,message:""});

      // 結果に応じて警告ダイアログを表示する
      let message = isSuccess ? "出力に成功しました。":"出力に失敗しました。";
      SetIsAlertDialog({"open": true, "message": message})
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">競走馬検索</h1>
        <button
          onClick={() => {handleSetCsvExportDialog()}}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          CSV出力
        </button>
      </div>
      <SearchForm onSearch={handleSearch} />
      <SearchDialog isOpen={loading.open} message={loading.message}/>
      <AlertDialog
        open={isAlertDialog.open} 
        message={isAlertDialog.message} 
        onClose={()=> SetIsAlertDialog({"open": false, "message": ""})}/>
      <HorseList horses={horses} />
      <BulkOperationButtons horses={horses} onUpdate={OnFavariteHorseUpdate}/>
      <CsvExportDialog 
        open={isCsvExportDialog}
        onClose={() => {setCsvExportDialog(false)}}
        onExport={() => onExportCSVFile()}/>
    </div>
  );
}
