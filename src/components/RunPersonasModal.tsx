import React, { useState, useEffect } from 'react';

interface RunPersonasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

export const RunPersonasModal: React.FC<RunPersonasModalProps> = ({
  isOpen,
  onClose,
  onCompleted
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activePersonaIdx, setActivePersonaIdx] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const personas = [
    { id: 'standard_user', name: 'standard_user', expected: 'PASS (100%)', latency: '640ms' },
    { id: 'problem_user', name: 'problem_user', expected: 'DEGRADED (42%)', latency: '820ms' },
    { id: 'locked_out_user', name: 'locked_out_user', expected: 'PASS (100% auth lock)', latency: '180ms' },
    { id: 'performance_glitch_user', name: 'performance_glitch_user', expected: 'LATENCY WARN (88%)', latency: '3842ms' },
    { id: 'error_user', name: 'error_user', expected: 'FAIL (21% type error)', latency: 'Timeout' },
  ];

  useEffect(() => {
    if (isOpen) {
      setIsRunning(true);
      setProgress(15);
      setActivePersonaIdx(0);
      setLogs([
        `[${new Date().toLocaleTimeString()}] Initializing Playwright Chromium parallel worker pool (4 workers)...`,
        `[${new Date().toLocaleTimeString()}] Authenticating persona: standard_user -> assertion verified 100% OK.`
      ]);

      const t1 = setTimeout(() => {
        setProgress(40);
        setActivePersonaIdx(1);
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Worker #2 -> problem_user: Broken dog image (404) & #last-name input lock detected!`
        ]);
      }, 1200);

      const t2 = setTimeout(() => {
        setProgress(70);
        setActivePersonaIdx(2);
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Worker #3 -> locked_out_user: "Epic sadface" banner assertion satisfied.`,
          `[${new Date().toLocaleTimeString()}] Worker #4 -> performance_glitch_user: Nav latency 3842ms recorded.`
        ]);
      }, 2400);

      const t3 = setTimeout(() => {
        setProgress(100);
        setActivePersonaIdx(4);
        setIsRunning(false);
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Worker #1 -> error_user: Uncaught TypeError on finish button dispatched.`,
          `[${new Date().toLocaleTimeString()}] Run completed: 3 Passing, 2 Failing personas staged to SQLite local.db.`
        ]);
        if (onCompleted) onCompleted();
      }, 3800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#0d1c2d] border border-[#464554]/50 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#464554]/30 bg-[#122131] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#c0c1ff]">group</span>
            <div>
              <h2 className="font-headline-md font-bold text-[#d4e4fa]">
                SauceDemo Persona Matrix Runner
              </h2>
              <p className="text-xs text-[#908fa0]">
                Autonomous multi-worker Playwright session running 5 distinct user archetypes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#908fa0] hover:text-[#d4e4fa] p-1 rounded hover:bg-[#1c2b3c] cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-code-sm">
              <span className="text-[#c7c4d7]">
                {isRunning ? `Testing Persona ${activePersonaIdx + 1} of 5...` : 'Execution Complete!'}
              </span>
              <span className="text-[#4cd7f6] font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-[#010f1f] h-2 rounded-full overflow-hidden border border-[#464554]/30">
              <div
                className="bg-gradient-to-r from-[#8083ff] to-[#4cd7f6] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Persona Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-code-sm">
            {personas.map((p, idx) => {
              const isCurrent = isRunning && activePersonaIdx === idx;
              const isDone = progress > ((idx + 1) / 5) * 100 - 10;
              const isFailed = p.id === 'error_user' || p.id === 'problem_user';

              return (
                <div
                  key={p.id}
                  className={`p-2.5 rounded border transition-colors flex items-center justify-between ${
                    isCurrent
                      ? 'border-[#c0c1ff] bg-[#1c2b3c]'
                      : isDone
                      ? isFailed
                        ? 'border-[#ffb4ab]/30 bg-[#93000a]/10'
                        : 'border-[#4edea3]/30 bg-[#00885d]/10'
                      : 'border-[#464554]/20 bg-[#010f1f]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-ping"></span>
                    ) : isDone ? (
                      isFailed ? (
                        <span className="material-symbols-outlined text-[#ffb4ab] text-sm">cancel</span>
                      ) : (
                        <span className="material-symbols-outlined text-[#4edea3] text-sm">check_circle</span>
                      )
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#464554]"></span>
                    )}
                    <span className="text-[#d4e4fa] font-medium">{p.name}</span>
                  </div>
                  <span className="text-[10px] text-[#908fa0]">{p.expected}</span>
                </div>
              );
            })}
          </div>

          {/* Real-time terminal log window */}
          <div className="bg-[#010f1f] p-3 rounded-lg border border-[#464554]/40 font-code-sm text-xs text-[#c7c4d7] space-y-1.5 h-36 overflow-y-auto custom-scrollbar">
            {logs.map((log, i) => (
              <div key={i} className="leading-relaxed">
                {log.includes('Broken') || log.includes('TypeError') ? (
                  <span className="text-[#ffb4ab]">{log}</span>
                ) : log.includes('satisfied') || log.includes('100%') ? (
                  <span className="text-[#4edea3]">{log}</span>
                ) : (
                  <span>{log}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#464554]/30 bg-[#122131] flex items-center justify-between text-xs font-code-sm">
          <span className="text-[#908fa0]">SQLite Target: /var/data/local.db [Active WAL]</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#c0c1ff] text-[#1000a9] hover:bg-white font-semibold cursor-pointer transition-colors"
          >
            {isRunning ? 'Close in Background' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
