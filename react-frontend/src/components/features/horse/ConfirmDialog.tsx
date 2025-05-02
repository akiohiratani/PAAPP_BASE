import { ExecuteType } from "./type/ExecuteType";

type Props = {
  open: boolean;
  onClose: () => void;
  onExecute: () => void;
  exeuteType: ExecuteType;
};

export const ConfirmDialog = ({ open, onClose, onExecute, exeuteType }: Props) => {
  

  let title;
  let message;
  switch(exeuteType.bulkType){
    case "BulkRegistration":
      title = "一括登録";
      message = "表示されている競走馬を全てお気に入り登録します。";
      break;
    case "BulkCancellation":
      title = "クリア";
      message = "検索結果・お気に入り登録を全て削除します。";
      break;
    default:
      return null;
  }
  if (!open) return null;
  return (
    <>
      {/* オーバーレイ: 白ベース透明・背面操作不可 */}
      <div className="fixed inset-0 bg-white/80 z-40" />
      {/* モーダル本体: 既存デザインはそのまま */}
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] max-w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-4 text-base font-semibold text-gray-900">{title}</div>
        <div className="mb-6">
          <div className="text-sm text-gray-700">
            {message}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            onClick={onExecute}
          >
            実行
          </button>
        </div>
      </div>
    </>
  );
};
