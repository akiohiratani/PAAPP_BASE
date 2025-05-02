import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onExport: () => void;
};

export const CsvExportDialog = ({ open, onClose, onExport }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-700 bg-opacity-40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">CSV出力</h2>
          <button className="text-gray-400 hover:text-gray-700" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              出力先
            </label>
            <div className="flex items-center">
              <input type="radio" checked readOnly className="mr-2" />
              <span>ローカルPCに保存（ダウンロード）</span>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
            <span className="text-blue-700 text-sm">
                お気に入りに登録した競走馬の情報をCSVファイルとして保存できます。<br />
                ダウンロードしたCSVはExcelなどで自由に集計・グラフ化できますので、ご自身の予想や研究にぜひご活用ください。
            </span>
            </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={onClose}>
            キャンセル
          </button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={onExport}>
            CSV出力
          </button>
        </div>
      </div>
    </div>
  );
};
