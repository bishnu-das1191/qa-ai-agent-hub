import React from 'react';
import { NavTab } from '../types';

interface SideNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onRunQuickSuite: () => void;
  defectsCount?: number;
  pinsCount?: number;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeTab,
  onTabChange,
  onRunQuickSuite,
  defectsCount = 18,
  pinsCount = 3
}) => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col bg-[#010f1f] border-r border-[#464554]/30 z-30 select-none">
      <div className="h-full flex flex-col justify-between p-3">
        {/* Top Section */}
        <div className="space-y-4">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded bg-[#8083ff] text-[#0d0096] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[#e1e0ff]">bug_report</span>
            </div>
            <div>
              <div className="font-headline-md text-headline-md font-bold text-[#d4e4fa] tracking-tight">
                QA Agent Hub
              </div>
              <div className="font-code-sm text-code-sm text-[#4cd7f6] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] inline-block animate-pulse"></span>
                Connected: local.db
              </div>
            </div>
          </div>

          {/* Suite Quick Run CTA */}
          <button
            onClick={onRunQuickSuite}
            className="w-full bg-[#c0c1ff] text-[#1000a9] py-2 px-3 rounded text-center font-headline-md font-medium flex items-center justify-center gap-2 hover:bg-[#8083ff] hover:text-white active:scale-[0.99] transition-all duration-100 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>Run Quick Suite</span>
          </button>

          {/* Main Navigation Tabs */}
          <nav className="space-y-1">
            {/* Dashboard */}
            <button
              onClick={() => onTabChange('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-150 cursor-pointer active:scale-[0.99] ${
                activeTab === 'dashboard'
                  ? 'bg-[#1c2b3c]/60 text-[#c0c1ff] font-medium border-l-2 border-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#d4e4fa] hover:bg-[#122131]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span>Dashboard</span>
            </button>

            {/* Content Scraper */}
            <button
              onClick={() => onTabChange('scraper')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-150 cursor-pointer active:scale-[0.99] ${
                activeTab === 'scraper'
                  ? 'bg-[#1c2b3c]/60 text-[#c0c1ff] font-medium border-l-2 border-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#d4e4fa] hover:bg-[#122131]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">dataset</span>
              <span>Content Scraper</span>
              <span className="ml-auto font-code-sm text-code-sm px-1.5 py-0.5 rounded bg-[#03b5d3]/20 text-[#4cd7f6]">
                11
              </span>
            </button>

            {/* Issues Registry */}
            <button
              onClick={() => onTabChange('issues')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-150 cursor-pointer active:scale-[0.99] ${
                activeTab === 'issues'
                  ? 'bg-[#1c2b3c]/60 text-[#c0c1ff] font-medium border-l-2 border-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#d4e4fa] hover:bg-[#122131]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">bug_report</span>
              <span>Issues Registry</span>
              <span className="ml-auto font-code-sm text-code-sm px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffdad6]">
                {defectsCount}
              </span>
            </button>

            {/* Functional Tests */}
            <button
              onClick={() => onTabChange('tests')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-150 cursor-pointer active:scale-[0.99] ${
                activeTab === 'tests'
                  ? 'bg-[#1c2b3c]/60 text-[#c0c1ff] font-medium border-l-2 border-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#d4e4fa] hover:bg-[#122131]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
              <span>Functional Tests</span>
            </button>

            {/* Review Pins */}
            <button
              onClick={() => onTabChange('pins')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-150 cursor-pointer active:scale-[0.99] ${
                activeTab === 'pins'
                  ? 'bg-[#1c2b3c]/60 text-[#c0c1ff] font-medium border-l-2 border-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#d4e4fa] hover:bg-[#122131]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">push_pin</span>
              <span>Review Pins</span>
              <span className="ml-auto font-code-sm text-[10px] bg-[#03b5d3]/20 text-[#4cd7f6] border border-[#4cd7f6]/30 px-1.5 py-0.2 rounded">
                {pinsCount} Active
              </span>
            </button>
          </nav>
        </div>

        {/* Footer User & Settings */}
        <div className="pt-3 border-t border-[#464554]/20 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#c7c4d7] hover:text-[#d4e4fa] hover:bg-[#122131] transition-colors duration-150 cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-[#4edea3]">account_circle</span>
            <div className="flex flex-col truncate">
              <span className="truncate font-code-sm text-code-sm text-[#d4e4fa] font-medium">standard_user</span>
              <span className="text-[10px] text-[#908fa0]">Active Profile</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#4edea3] ml-auto"></span>
          </div>
          <button
            onClick={() => alert('QA Agent Hub Settings:\n• Persistence: SQLite (local.db)\n• Browser Engine: Chromium (Headless)\n• Telemetry Port: 4422\n• Jira Target: JIRA-STAG-DEMO')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#c7c4d7] hover:text-[#d4e4fa] hover:bg-[#122131] transition-colors duration-150 cursor-pointer text-left"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
