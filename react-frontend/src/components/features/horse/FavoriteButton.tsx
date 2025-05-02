import { useState, useEffect } from 'react';
import { Horse } from '../../../domain/models/Horse';
import { FavoriteHorseService } from '../../../infrastructure/holder/FavoriteHorseService';

type Props = {
  horse: Horse;
}

export const FavoriteButton = ({ horse }: Props) => {
  const favoriteService = FavoriteHorseService.getInstance();
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    setIsFavorite(favoriteService.isFavorite(horse.id));
  }, [horse.id]);
  
  const toggleFavorite = () => {
    if (isFavorite) {
      favoriteService.removeFavorite(horse.id);
    } else {
      favoriteService.addFavorite(horse);
    }
    setIsFavorite(!isFavorite);
  };
  
  return (
    <button
      onClick={toggleFavorite}
      aria-label={isFavorite ? 'お気に入り解除' : 'お気に入り追加'}
      title={isFavorite ? 'お気に入り解除' : 'お気に入り追加'}
      className="flex items-center justify-center rounded-full bg-white border border-gray-300 shadow hover:bg-gray-100 transition p-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`w-8 h-8 transition-colors duration-200 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        style={{ overflow: 'visible' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
      <span className="ml-2 text-sm">{isFavorite ? 'お気に入り解除' : 'お気に入り登録'}</span>
    </button>
  );
}
