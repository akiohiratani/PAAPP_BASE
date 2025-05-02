type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
};

export const AlertDialog = ({ open, onClose, message }: Props) => {
  if (!open) return null;

  return (
    <>
      {/* オーバーレイ */}
      <div className="fixed inset-0 bg-white/80 z-40" />
      {/* モーダル本体 */}
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-80 p-6 pointer-events-auto">
        <div className="mb-6 text-center text-lg">{message}</div>
        <div className="flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </>
  );
};
