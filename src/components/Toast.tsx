import React from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  visible: boolean;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', visible, onClose }) => {
  if (!visible) return null;

  const iconName = type === 'error' ? 'error' : type === 'info' ? 'info' : 'check_circle';
  const iconColor = type === 'error' ? 'text-[#ffb4ab]' : type === 'info' ? 'text-[#4cd7f6]' : 'text-[#4edea3]';
  const borderColor = type === 'error' ? 'border-[#ffb4ab]/40' : type === 'info' ? 'border-[#4cd7f6]/40' : 'border-[#4edea3]/40';

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-[#1c2b3c] border ${borderColor} text-[#d4e4fa] rounded-lg shadow-2xl transition-all duration-300 transform translate-y-0`}>
      <span className={`material-symbols-outlined text-[20px] ${iconColor}`}>
        {iconName}
      </span>
      <span className="font-body-md text-xs font-medium max-w-sm">{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2 text-[#908fa0] hover:text-[#d4e4fa]">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      )}
    </div>
  );
};
