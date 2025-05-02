import { Horse } from "../../../domain/models/Horse";

type Props = {
  open: boolean;
  onClose: () => void;
  horse: Horse;
};

export const HistoryDialog = ({ open, onClose, horse }: Props) => {
  if (!open) return null;

  const histories = horse.historys ?? [];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-[95vw] max-h-screen p-4 flex flex-col">
        {/* ヘッダー部 */}
        <div className="flex items-center justify-between mb-4">
          {/* 馬の情報 */}
          <div className="flex items-center space-x-4">
            <a
              href={horse.detailUrl}
              target="_blank"
              rel="noopener noreferrer">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 underline hover:text-blue-800 cursor-pointer">{horse.name}</span>
                <span className="text-sm text-white bg-blue-400 rounded px-2 py-0.5">{horse.sex}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <span>父: {horse.father}</span>
                <span className="mx-2">|</span>
                <span>母父: {horse.grandfather}</span>
              </div>
            </div>
            </a>
          </div>
          {/* 閉じるボタン */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-500 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-200"
            onClick={onClose}
            aria-label="閉じる"
            tabIndex={0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <title>閉じる</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* テーブル本体 */}
        <div className="overflow-y-auto max-h-[70vh] relative">
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 border-b text-xs text-left w-[15%]">日付・開催・天候</th>
                <th className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 border-b text-xs text-left w-[25%]">レース名・距離・馬場</th>
                <th className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 border-b text-xs text-center w-[10%]">着順</th>
                <th className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 border-b text-xs text-left w-[20%]">騎手・斤量</th>
                <th className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 border-b text-xs text-left w-[30%]">詳細情報</th>
              </tr>
            </thead>
            <tbody>
              {histories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-8">
                    戦歴データがありません
                  </td>
                </tr>
              ) : (
                histories.map((h, i) => (
                  <tr
                    key={h.race_name}
                    className={
                      i % 2 === 0
                        ? "bg-white hover:bg-blue-50"
                        : "bg-gray-50 hover:bg-blue-50"
                    }
                  >
                    {/* 日付・開催・天候 */}
                    <td className="px-4 py-2 text-sm text-gray-800 whitespace-pre-line leading-5">
                      {`${h.date}\n${h.venue}\n${h.weather}`}
                    </td>
                    {/* レース名・距離・馬場 */}
                    <td className="px-4 py-2 text-sm whitespace-pre-line leading-5">
                      <span className="font-bold text-indigo-700">{h.race_name}</span>
                      {"\n"}
                      <span className="text-indigo-600">{`${h.distance}・${h.track_condition}`}</span>
                    </td>
                    {/* 着順 */}
                    <td className="px-4 py-2 text-lg text-center font-extrabold text-red-600 drop-shadow-sm">
                      {h.finish_position}
                    </td>
                    {/* 騎手・斤量 */}
                    <td className="px-4 py-2 text-sm whitespace-pre-line leading-5">
                      <span className="font-semibold text-blue-700">{h.jockey}</span>
                      {"\n"}
                      <span className="text-blue-500">{`斤量 ${h.weight}`}</span>
                    </td>
                    {/* 詳細情報 */}
                    <td className="px-4 py-2 text-sm text-gray-600 whitespace-pre-line">
                      {`着差: ${h.margin}\nペース: ${h.pace}\n馬体重: ${h.horse_weight}\n上り: ${h.rise}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* 固定フッター */}
            <tfoot className="sticky bottom-0 z-10">
              <tr>
                <td colSpan={5} className="bg-gray-50 px-4 py-2 border-t">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>単位: 距離(m) / 斤量(kg)</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
