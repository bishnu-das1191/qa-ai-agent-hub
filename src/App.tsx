import React, { useState } from 'react';
import { NavTab } from './types';
import { SideNavBar } from './components/SideNavBar';
import { TopNavBar } from './components/TopNavBar';
import { Toast } from './components/Toast';
import { RunPersonasModal } from './components/RunPersonasModal';
import { QuickSuiteModal } from './components/QuickSuiteModal';
import { DashboardView } from './views/DashboardView';
import { ContentScraperView } from './views/ContentScraperView';
import { IssuesRegistryView } from './views/IssuesRegistryView';
import { FunctionalTestsView } from './views/FunctionalTestsView';
import { ReviewPinsView } from './views/ReviewPinsView';
import { DEFECTS_DATA } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isPersonasModalOpen, setIsPersonasModalOpen] = useState<boolean>(false);
  const [isQuickSuiteModalOpen, setIsQuickSuiteModalOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [defectsCount, setDefectsCount] = useState<number>(18);

  const [toastState, setToastState] = useState<{
    visible: boolean;
    message: string;
    type?: 'success' | 'info' | 'error';
  }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastState({ visible: true, message, type });
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, visible: false }));
    }, 3800);
  };

  const handleExportExcel = () => {
    // Generate real CSV download for QA defects
    const headers = ['Defect ID', 'Title', 'Area', 'Persona', 'Severity', 'Status', 'First Seen', 'Locator Error'];
    const rows = DEFECTS_DATA.map((d) => [
      `"${d.id}"`,
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.area}"`,
      `"${d.persona}"`,
      `"${d.severity}"`,
      `"${d.status}"`,
      `"${d.firstSeen}"`,
      `"${d.locatorError.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `saucedemo_qa_telemetry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Exported 18 defect records to Excel CSV format!');
  };

  const handlePinDefect = (defect: { title: string; area: string; persona: string; severity: 'Critical' | 'Major' | 'Minor' }) => {
    setDefectsCount((prev) => prev + 1);
    showToast(`Registered new defect "${defect.title}" to local.db`);
  };

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] flex overflow-x-hidden selection:bg-[#c0c1ff] selection:text-[#1000a9]">
      {/* Left Sidebar Navigation */}
      <SideNavBar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onRunQuickSuite={() => setIsQuickSuiteModalOpen(true)}
        defectsCount={defectsCount}
        pinsCount={3}
      />

      {/* Main Content Area (Offset by sidebar width 256px) */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Navigation Bar */}
        <TopNavBar
          onExportExcel={handleExportExcel}
          onRunAllPersonas={() => setIsPersonasModalOpen(true)}
          onSyncDb={() => showToast('Synced local.db SQLite state. 18 rows updated.')}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* View Switcher based on Active Tab */}
        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigateTab={(tab) => setActiveTab(tab)}
            onRunAllPersonas={() => setIsPersonasModalOpen(true)}
            onTriggerToast={showToast}
          />
        )}

        {activeTab === 'scraper' && (
          <ContentScraperView
            onTriggerToast={showToast}
            onNavigateToIssues={() => setActiveTab('issues')}
            onPinDefect={handlePinDefect}
          />
        )}

        {activeTab === 'issues' && (
          <IssuesRegistryView
            onTriggerToast={showToast}
            onExportExcel={handleExportExcel}
          />
        )}

        {activeTab === 'tests' && (
          <FunctionalTestsView onTriggerToast={showToast} />
        )}

        {activeTab === 'pins' && (
          <ReviewPinsView onTriggerToast={showToast} />
        )}
      </div>

      {/* Interactive Run Personas Modal */}
      <RunPersonasModal
        isOpen={isPersonasModalOpen}
        onClose={() => setIsPersonasModalOpen(false)}
        onCompleted={() => showToast('All 5 SauceDemo personas completed evaluation.')}
      />

      {/* Quick Smoke Suite Modal */}
      <QuickSuiteModal
        isOpen={isQuickSuiteModalOpen}
        onClose={() => setIsQuickSuiteModalOpen(false)}
        onViewDetails={() => setActiveTab('tests')}
      />

      {/* Terminal Drawer / Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d1c2d] border border-[#464554]/50 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-3 bg-[#122131] border-b border-[#464554]/30 flex items-center justify-between">
              <div className="flex items-center gap-2 font-code-sm text-xs text-[#d4e4fa]">
                <span className="material-symbols-outlined text-sm text-[#4edea3]">terminal</span>
                <span className="font-bold">Playwright Headless Shell v1.42 (PID: 8192)</span>
              </div>
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="text-[#908fa0] hover:text-[#d4e4fa]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <div className="p-4 font-code-sm text-xs bg-[#010f1f] text-[#c7c4d7] space-y-1.5 h-64 overflow-y-auto custom-scrollbar">
              <div className="text-[#908fa0]">$ npx playwright test --project=chromium --headed=false</div>
              <div>Running 5 test files using 4 parallel workers...</div>
              <div className="text-[#4edea3]">✓ [chromium] › auth.spec.ts:12:5 › Standard Authentication (420ms)</div>
              <div className="text-[#4edea3]">✓ [chromium] › cart.spec.ts:8:5 › Add to Cart &amp; Inventory (310ms)</div>
              <div className="text-[#ffb4ab]">✘ [chromium] › checkout.spec.ts:15:5 › Multi-Step Checkout Journey (980ms)</div>
              <div className="text-[#ffb4ab] pl-4">Error: Last Name is required (problem_user input lock)</div>
              <div className="text-[#4edea3]">✓ [chromium] › edge_cases.spec.ts:6:5 › Error State &amp; Edge Cases (890ms)</div>
              <div className="text-[#ffb4ab]">✘ [chromium] › badge_sync.spec.ts:22:5 › Cart Badge Mutation (180ms)</div>
              <div className="text-[#4cd7f6] pt-2">Local SQLite database updated: /var/data/local.db (2 defects recorded)</div>
            </div>
            <div className="p-3 bg-[#122131] border-t border-[#464554]/30 flex justify-end">
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="px-3 py-1 bg-[#c0c1ff] text-[#1000a9] font-semibold text-xs rounded hover:bg-white cursor-pointer"
              >
                Close Shell
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <Toast
        message={toastState.message}
        type={toastState.type}
        visible={toastState.visible}
        onClose={() => setToastState((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}
