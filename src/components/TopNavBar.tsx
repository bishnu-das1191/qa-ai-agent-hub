import React, { useState } from 'react';

interface TopNavBarProps {
  onExportExcel: () => void;
  onRunAllPersonas: () => void;
  onSyncDb?: () => void;
  onOpenTerminal?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  onExportExcel,
  onRunAllPersonas,
  onSyncDb,
  onOpenTerminal,
}) => {
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <header className="h-14 flex items-center justify-between px-4 w-full bg-[#0d1c2d] border-b border-[#464554]/30 sticky top-0 z-20">
      {/* Left: Search & Target Domain Breadcrumb */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#010f1f] px-2.5 py-1.5 rounded border border-[#464554]/40 focus-within:border-[#c0c1ff]">
          <span className="material-symbols-outlined text-[#908fa0] text-[18px] mr-2">search</span>
          <input
            className="bg-transparent border-none text-[#d4e4fa] text-body-sm focus:outline-none focus:ring-0 w-44 sm:w-60 placeholder:text-[#464554]"
            placeholder="Filter locators, assets, logs..."
            type="text"
          />
        </div>
        <div className="h-4 w-[1px] bg-[#464554]/40 hidden sm:block"></div>
        {/* Navigation Links from JSON */}
        <div className="hidden sm:flex items-center gap-2 font-code-sm text-code-sm">
          <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#d4e4fa] font-semibold flex items-center gap-1.5 border border-[#464554]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            SauceDemo Staging
          </span>
          <span className="text-[#c7c4d7] flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">database</span>
            local.db v1.4
          </span>
        </div>
      </div>

      {/* Right Trailing Actions & Persona Avatar */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Auto-save Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded bg-[#122131] text-[#4edea3] font-code-sm text-code-sm border border-[#4edea3]/20 mr-1">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          <span>SQLite: Auto-saved</span>
        </div>

        {/* Trailing Icon Actions */}
        <button
          onClick={onSyncDb}
          className="p-1.5 rounded hover:bg-[#273647]/40 text-[#d4e4fa] transition-colors cursor-pointer"
          title="Sync DB"
        >
          <span className="material-symbols-outlined text-[20px]">sync</span>
        </button>
        <button
          onClick={onOpenTerminal}
          className="p-1.5 rounded hover:bg-[#273647]/40 text-[#d4e4fa] transition-colors cursor-pointer"
          title="Open Terminal"
        >
          <span className="material-symbols-outlined text-[20px]">terminal</span>
        </button>
        <button
          onClick={() => setHasNotifications(false)}
          className="p-1.5 rounded hover:bg-[#273647]/40 text-[#d4e4fa] transition-colors cursor-pointer relative"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {hasNotifications && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
          )}
        </button>

        <div className="h-4 w-[1px] bg-[#464554]/40 mx-1 hidden sm:block"></div>

        {/* Trailing Secondary Action */}
        <button
          onClick={onExportExcel}
          className="px-2.5 py-1 rounded border border-[#464554]/40 hover:bg-[#273647]/40 text-[#d4e4fa] font-body-sm transition-colors cursor-pointer flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          <span className="hidden sm:inline">Export Excel</span>
        </button>

        {/* Trailing Primary Action */}
        <button
          onClick={onRunAllPersonas}
          className="px-3 py-1 rounded bg-[#c0c1ff] text-[#1000a9] font-headline-md font-medium hover:bg-[#8083ff] hover:text-white active:opacity-90 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">group</span>
          <span>Run All Personas</span>
        </button>

        {/* User avatar */}
        <div
          className="ml-1 w-7 h-7 rounded-full bg-[#1c2b3c] border border-[#c0c1ff]/40 flex items-center justify-center text-[#c0c1ff] font-bold text-xs"
          title="Active Persona standard_user avatar"
        >
          SU
        </div>
      </div>
    </header>
  );
};
