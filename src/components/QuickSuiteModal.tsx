import React, { useState, useEffect } from 'react';

interface QuickSuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewDetails?: () => void;
}

export const QuickSuiteModal: React.FC<QuickSuiteModalProps> = ({
  isOpen,
  onClose,
  onViewDetails
}) => {
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);

  const tests = [
    { name: '1. Auth: Standard login handshake', duration: '140ms', status: 'PASS' },
    { name: '2. Inventory: 6 product DOM items present', duration: '210ms', status: 'PASS' },
    { name: '3. Cart: Add & badge mutation count', duration: '95ms', status: 'PASS' },
    { name: '4. Checkout: Multi-step form completion', duration: '320ms', status: 'WARN' },
  ];

  useEffect(() => {
    if (isOpen) {
      setRunning(true);
      setCompleted(false);
      setCurrentTest(0);

      const interval = setInterval(() => {
        setCurrentTest((prev) => {
          if (prev >= tests.length - 1) {
            clearInterval(interval);
            setRunning(false);
            setCompleted(true);
            return prev;
          }
          return prev + 1;
        });
      }, 700);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#0d1c2d] border border-[#464554]/50 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-[#464554]/30 bg-[#122131] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c0c1ff]">bolt</span>
            <h3 className="font-headline-md font-bold text-[#d4e4fa]">Quick Regression Suite</h3>
          </div>
          <button onClick={onClose} className="text-[#908fa0] hover:text-[#d4e4fa]">
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 font-code-sm text-xs">
          <div className="text-[#c7c4d7]">
            {running ? (
              <span className="flex items-center gap-1.5 text-[#4cd7f6]">
                <span className="material-symbols-outlined text-sm animate-spin">autorenew</span>
                Executing parallel smoke assertions on Chromium...
              </span>
            ) : (
              <span className="text-[#4edea3] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Suite finished in 765ms. All 4 smoke specs validated.
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            {tests.map((t, idx) => {
              const isPassed = completed || currentTest > idx;
              const isCurrent = running && currentTest === idx;

              return (
                <div
                  key={t.name}
                  className="p-2.5 rounded bg-[#010f1f] border border-[#464554]/30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-ping"></span>
                    ) : isPassed ? (
                      <span className="material-symbols-outlined text-[#4edea3] text-sm">check_circle</span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#464554]"></span>
                    )}
                    <span className="text-[#d4e4fa]">{t.name}</span>
                  </div>
                  <span className="text-[#908fa0] text-[11px]">{t.duration}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-3 border-t border-[#464554]/30 bg-[#122131] flex items-center justify-end gap-2">
          {onViewDetails && (
            <button
              onClick={() => {
                onClose();
                onViewDetails();
              }}
              className="px-3 py-1.5 rounded bg-[#1c2b3c] text-[#c0c1ff] hover:bg-[#273647] font-semibold text-xs cursor-pointer"
            >
              View Functional Tests →
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[#c0c1ff] text-[#1000a9] hover:bg-white font-semibold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
