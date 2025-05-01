import React, { useState } from 'react';
import { RaceListDialog } from './RaceListDialog';
import { SearchType } from './type/SearchType';

type Props = {
  onSearch: (keyword: SearchType) => void;
};

export default function SearchForm({ onSearch }: Props) {
  const [horseName, setHorseName] = useState('');
  const [isRaceListDialogOpen, setIsRaceListDialog] = useState(false)

  const handleSetIsRaceListDialog = (value:boolean) =>{
    setIsRaceListDialog(value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      "type":"horceName",
      "value":horseName
    });
  };

  const handleRaceSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setHorseName(''); // テキストボックスをクリア
    setIsRaceListDialog(true); // レースから取得
  };

  const handleFavoriteSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    onSearch({
      "type":"favorite",
      "value":""
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full"
    >
      <input
        type="text"
        value={horseName}
        onChange={e => setHorseName(e.target.value)}
        placeholder="馬名を入力"
        className="border rounded px-3 py-2 flex-1"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
      >
        検索
      </button>
      <button
        type="button"
        onClick={handleRaceSearch}
        className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 transition"
      >
        レースから
      </button>
      <button
        type="button"
        onClick={handleFavoriteSearch}
        className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 transition"
      >
        お気に入り
      </button>
      <RaceListDialog
        isOpen = {isRaceListDialogOpen}
        onClose={() => setIsRaceListDialog(false)}
        onSearch={onSearch}
        handleDialog={handleSetIsRaceListDialog}></RaceListDialog>
    </form>
  );
}
