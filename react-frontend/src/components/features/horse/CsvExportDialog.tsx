type Props = {
  open: boolean;
  onClose: () => void;
  onExport: () => void;
};

export const CsvExportDialog = ({ open, onClose, onExport }: Props) => {
  if (!open) return null;

  return (
    <>
      {/* オーバーレイ: 白ベース透明・背面操作不可 */}
      <div className="fixed inset-0 bg-white/80 z-40" />
      {/* モーダル本体: 既存デザインはそのまま */}
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] max-w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-4 text-base font-semibold text-gray-900">出力先</div>
        <div className="mb-6">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
              ローカルPCに保存（ダウンロード）
            </span>
          </div>
          <div className="text-sm text-gray-700">
            お気に入りに登録した競走馬の情報をCSVファイルとして保存できます。<br />
            ダウンロードしたCSVはExcelなどで自由に集計・グラフ化できますので、ご自身の予想や研究にぜひご活用ください。
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
            onClick={onExport}
          >
            エクスポート
          </button>
        </div>
      </div>
    </>
  );
};
