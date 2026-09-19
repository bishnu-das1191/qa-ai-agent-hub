import React, { useState } from 'react';
import { TestSuite } from '../types';
import { TEST_SUITES } from '../data/mockData';

interface FunctionalTestsViewProps {
  onTriggerToast: (msg: string) => void;
}

export const FunctionalTestsView: React.FC<FunctionalTestsViewProps> = ({ onTriggerToast }) => {
  const [suites, setSuites] = useState<TestSuite[]>(TEST_SUITES);
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>('suite-3');
  const [engine, setEngine] = useState<'Chromium' | 'Firefox' | 'WebKit'>('Chromium');
  const [isHeadless, setIsHeadless] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const activeSuite = suites.find((s) => s.id === selectedSuiteId) || suites[0];

  const handleRunSuite = () => {
    setIsRunning(true);
    onTriggerToast(`Executing ${activeSuite.title} on ${engine} (Headless: ${isHeadless})...`);

    setTimeout(() => {
      setIsRunning(false);
      onTriggerToast(`Completed trace for ${activeSuite.title}. Trace logged to local.db.`);
    }, 1500);
  };

  return (
    <main className="flex-1 p-4 lg:p-5 space-y-4 overflow-y-auto">
      {/* Header & Engine / Headless Controls */}
      <section className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8083ff]">play_circle</span>
            <h1 className="font-headline-lg font-bold text-[#d4e4fa]">
              Functional Tests &amp; Execution Traces
            </h1>
          </div>
          <p className="font-body-sm text-[#908fa0] mt-1">
            Deterministic Playwright test suites inspecting multi-step user workflows and assertion locators.
          </p>
        </div>

        {/* Engine, Headless & Run CTA */}
        <div className="flex flex-wrap items-center gap-2 font-code-sm text-xs">
          {/* Browser Engine */}
          <div className="flex items-center bg-[#010f1f] rounded border border-[#464554]/40 p-0.5">
            {(['Chromium', 'Firefox', 'WebKit'] as const).map((eng) => (
              <button
                key={eng}
                onClick={() => setEngine(eng)}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  engine === eng ? 'bg-[#1c2b3c] text-[#c0c1ff] font-bold' : 'text-[#908fa0]'
                }`}
              >
                {eng}
              </button>
            ))}
          </div>

          {/* Headless Toggle */}
          <button
            onClick={() => setIsHeadless(!isHeadless)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#010f1f] border border-[#464554]/40 text-[#d4e4fa] hover:border-[#c0c1ff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs text-[#4edea3]">
              {isHeadless ? 'visibility_off' : 'visibility'}
            </span>
            <span>Headless: {isHeadless ? 'true' : 'false'}</span>
          </button>

          {/* Persona Target */}
          <div className="px-2.5 py-1.5 rounded bg-[#1c2b3c] border border-[#464554]/40 text-[#4cd7f6] font-semibold">
            Target: problem_user
          </div>

          {/* Run Suite Button */}
          <button
            onClick={handleRunSuite}
            disabled={isRunning}
            className="px-3.5 py-1.5 rounded bg-[#c0c1ff] text-[#1000a9] font-headline-md font-semibold hover:bg-white transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-sm ${isRunning ? 'animate-spin' : ''}`}>
              {isRunning ? 'autorenew' : 'play_arrow'}
            </span>
            <span>{isRunning ? 'Running Trace...' : 'Run Suite'}</span>
          </button>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (4 cols): Test Suites List */}
        <div className="lg:col-span-4 bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 space-y-2 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-[#464554]/20">
            <span className="font-label-caps text-label-caps uppercase text-[#908fa0]">
              Playwright Test Suites (5)
            </span>
            <span className="font-code-sm text-xs text-[#4edea3]">3 Pass • 2 Fail</span>
          </div>

          <div className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar">
            {suites.map((suite) => {
              const isSelected = selectedSuiteId === suite.id;
              return (
                <div
                  key={suite.id}
                  onClick={() => setSelectedSuiteId(suite.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#1c2b3c] border-[#c0c1ff] shadow-sm'
                      : 'bg-[#010f1f]/80 border-[#464554]/30 hover:border-[#464554]/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="font-semibold text-xs text-[#d4e4fa]">{suite.title}</div>
                    <span
                      className={`px-1.5 py-0.2 rounded font-code-sm text-[10px] font-bold shrink-0 ${
                        suite.status === 'pass'
                          ? 'bg-[#00885d]/30 text-[#4edea3] border border-[#4edea3]/30'
                          : 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30'
                      }`}
                    >
                      {suite.passRatio}
                    </span>
                  </div>

                  <div className="flex items-center justify-between font-code-sm text-[11px] text-[#908fa0]">
                    <code className="text-[#c0c1ff] truncate">{suite.specPath}</code>
                    <span className="shrink-0">{suite.duration}</span>
                  </div>

                  {suite.subtitle && (
                    <div className="mt-1.5 text-[11px] text-[#ffb4ab] font-code-sm truncate">
                      ⚠️ {suite.subtitle}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#464554]/20 flex items-center justify-between font-code-sm text-xs text-[#908fa0]">
            <span>Chromium v122.0.6261.29</span>
            <button
              onClick={() => onTriggerToast('Running all 5 test suites in parallel...')}
              className="text-[#c0c1ff] hover:text-white"
            >
              Run All Specs
            </button>
          </div>
        </div>

        {/* Right Column (8 cols): Step-by-Step Execution Trace & Diagnostics */}
        <div className="lg:col-span-8 bg-[#0d1c2d] border border-[#464554]/30 rounded p-4 space-y-4">
          {/* Header of Active Suite Trace */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#464554]/20">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    activeSuite.status === 'pass' ? 'bg-[#4edea3]' : 'bg-[#ffb4ab]'
                  }`}
                ></span>
                <h2 className="font-headline-md font-bold text-[#d4e4fa] text-base">
                  {activeSuite.title}
                </h2>
              </div>
              <div className="font-code-sm text-xs text-[#908fa0] mt-0.5">
                Spec: <code className="text-[#4cd7f6]">{activeSuite.specPath}</code> • Total duration:{' '}
                <strong className="text-[#d4e4fa]">{activeSuite.duration}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2 font-code-sm text-xs">
              <span
                className={`px-2 py-0.5 rounded font-bold ${
                  activeSuite.status === 'pass'
                    ? 'bg-[#00885d]/30 text-[#4edea3]'
                    : 'bg-[#93000a]/40 text-[#ffb4ab]'
                }`}
              >
                {activeSuite.status === 'pass' ? 'SUITE PASSED' : 'SUITE FAILED (Step 6/7)'}
              </span>
            </div>
          </div>

          {/* 7-Step Timeline Trace List */}
          <div className="space-y-1.5 font-code-sm text-xs">
            <div className="text-[#908fa0] text-[11px] uppercase tracking-wider font-semibold mb-1">
              Deterministic Step Execution Timeline
            </div>

            {activeSuite.steps.map((st) => (
              <div
                key={st.stepNumber}
                className={`p-2 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  st.status === 'PASS'
                    ? 'bg-[#010f1f]/80 border-[#4edea3]/20'
                    : st.status === 'ERROR'
                    ? 'bg-[#93000a]/20 border-[#ffb4ab]/40'
                    : 'bg-[#93000a]/30 border-[#ffb4ab]/60'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      st.status === 'PASS'
                        ? 'bg-[#00885d] text-white'
                        : st.status === 'ERROR'
                        ? 'bg-[#03b5d3] text-[#001f26]'
                        : 'bg-[#93000a] text-[#ffdad6]'
                    }`}
                  >
                    {st.stepNumber}
                  </span>

                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      st.status === 'PASS'
                        ? 'bg-[#00885d]/30 text-[#4edea3]'
                        : st.status === 'ERROR'
                        ? 'bg-[#03b5d3]/30 text-[#4cd7f6]'
                        : 'bg-[#93000a]/50 text-[#ffb4ab]'
                    }`}
                  >
                    {st.status}
                  </span>

                  <code className="text-[#d4e4fa] truncate">
                    {st.command}
                  </code>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-[#908fa0] text-[11px]">
                  {st.note && (
                    <span className="text-[#ffb4ab] text-[11px] truncate max-w-xs">
                      {st.note}
                    </span>
                  )}
                  <span>{st.durationMs}ms</span>
                </div>
              </div>
            ))}
          </div>

          {/* Diagnostic Sections for Failing Suites */}
          {activeSuite.stackTrace && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-code-sm text-[#ffb4ab]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  Playwright Error Call Log &amp; Stacktrace
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(activeSuite.stackTrace || '');
                    onTriggerToast('Stacktrace copied!');
                  }}
                  className="text-[#4cd7f6] hover:text-white"
                >
                  Copy Log
                </button>
              </div>
              <pre className="p-3 rounded bg-[#010f1f] border border-[#ffb4ab]/40 font-code-sm text-xs text-[#ffb4ab] overflow-x-auto max-h-44 custom-scrollbar leading-relaxed">
                {activeSuite.stackTrace}
              </pre>
            </div>
          )}

          {/* Captured DOM State at Failure */}
          {activeSuite.domSnapshot && (
            <div className="space-y-1.5">
              <div className="text-xs font-code-sm text-[#908fa0]">
                Captured DOM Snapshot: <code className="text-[#4cd7f6]">#checkout_info_container</code>
              </div>
              <pre className="p-2.5 rounded bg-[#010f1f] border border-[#464554]/40 font-code-sm text-xs text-[#d4e4fa] overflow-x-auto">
                {activeSuite.domSnapshot}
              </pre>
            </div>
          )}

          {/* Failure Screenshot with Hotspot Overlay */}
          {activeSuite.screenshotUrl && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-code-sm text-[#908fa0]">
                <span>Failure Artifact Screenshot (With Detected Locator Hotspot)</span>
                <span className="text-[#4cd7f6]">Captured at Step 6</span>
              </div>
              <div className="relative rounded overflow-hidden border border-[#ffb4ab]/40 bg-[#010f1f] max-h-60 flex items-center justify-center">
                <img
                  src={activeSuite.screenshotUrl}
                  alt="Failure screenshot"
                  className="w-full h-auto object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                {/* Hotspot Box Overlay */}
                <div className="absolute top-1/3 left-1/4 px-3 py-1.5 bg-[#93000a]/80 border-2 border-[#ffb4ab] rounded text-[#ffdad6] font-code-sm text-xs font-bold shadow-lg flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab] animate-ping"></span>
                  <span>{activeSuite.hotspotLabel || 'Assertion Failure Hotspot'}</span>
                </div>
              </div>
            </div>
          )}

          {/* SQLite Telemetry Storage status */}
          <div className="p-2.5 rounded bg-[#010f1f] border border-[#464554]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-code-sm text-xs text-[#908fa0]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-sm">database</span>
              <span>
                Stored in <code className="text-[#d4e4fa]">/var/data/local.db</code> • Table: <code className="text-[#c0c1ff]">playwright_traces</code> (Row #4812)
              </span>
            </div>
            <button
              onClick={() => onTriggerToast('Synced trace telemetry to SQLite.')}
              className="text-[#4cd7f6] hover:text-white"
            >
              Re-sync SQLite WAL
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
