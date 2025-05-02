type Props = {
  isOpen: boolean;
  message: string;
};

export const SearchDialog = ({isOpen, message}: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs mx-4 flex flex-col items-center overflow-hidden">
        {/* ヘッダー */}
        <div
          className="w-full flex justify-center items-center p-4"
          style={{
            backgroundColor: 'rgba(128, 151, 228, 0.85)',
            backdropFilter: 'saturate(180%) blur(10px)',
            WebkitBackdropFilter: 'saturate(180%) blur(10px)',
          }}
        >
          <h3 className="text-base font-semibold text-gray-900">進捗</h3>
        </div>
        {/* 本文 */}
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div className="text-gray-700 text-center text-base">{message}</div>
        </div>
      </div>
    </div>
  );
};
