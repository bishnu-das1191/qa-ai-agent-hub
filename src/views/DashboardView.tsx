import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';

interface DashboardViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onRunAllPersonas: () => void;
  onTriggerToast: (msg: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
  onRunAllPersonas,
  onTriggerToast
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'open' | 'review' | 'fixed'>('all');
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [modalDetails, setModalDetails] = useState<{ title: string; content: string } | null>(null);

  const tickerEvents = [
    "page.goto('/inventory.html') — standard_user passed assertions [18ms ago]",
    "page.click('#add-to-cart-sauce-labs-onesie') — problem_user mismatched locator [42ms ago]",
    "expect(title).toBe('Swag Labs') — assertion verified across 5 workers [1m ago]",
    "SQLite telemetry write — committed 18 defects to local.db v1.4 [2m ago]"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerEvents.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [tickerEvents.length]);

  return (
    <main className="flex-1 p-4 lg:p-5 space-y-4 overflow-y-auto">
      {/* SUB-HEADER BAR: Live Execution Activity Ticker & Status Filters */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#0d1c2d] border border-[#464554]/30 rounded p-2.5">
        {/* Live Ticker */}
        <div className="flex items-center gap-3 overflow-hidden text-body-sm font-code-sm">
          <div className="flex items-center gap-1.5 text-[#4edea3] font-medium shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
            <span className="material-symbols-outlined text-sm">radar</span>
            <span>LIVE CRAWLER:</span>
          </div>
          <div className="text-[#c7c4d7] truncate font-code-sm">
            <span className="text-[#4cd7f6] font-medium">
              {tickerEvents[tickerIndex].split(' — ')[0]}
            </span>{' '}
            — {tickerEvents[tickerIndex].split(' — ')[1]}
          </div>
        </div>

        {/* Issues Status Filter Pills */}
        <div className="flex items-center gap-1.5 shrink-0 self-start lg:self-auto font-code-sm text-code-sm">
          <span className="text-[#908fa0] text-xs mr-1 font-label-caps">STATUS:</span>
          <button
            onClick={() => setSelectedStatusFilter('all')}
            className={`px-2 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
              selectedStatusFilter === 'all'
                ? 'bg-[#c0c1ff]/20 text-[#c0c1ff] border border-[#c0c1ff]/40'
                : 'bg-[#1c2b3c] text-[#c7c4d7] border border-[#464554]/40 hover:text-white'
            }`}
          >
            All <span className="ml-1 opacity-75">18</span>
          </button>
          <button
            onClick={() => setSelectedStatusFilter('open')}
            className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
              selectedStatusFilter === 'open'
                ? 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/40'
                : 'bg-[#1c2b3c] text-[#c7c4d7] border border-[#464554]/40 hover:text-white'
            }`}
          >
            Open <span className="ml-1 text-[#ffb4ab]">12</span>
          </button>
          <button
            onClick={() => setSelectedStatusFilter('review')}
            className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
              selectedStatusFilter === 'review'
                ? 'bg-[#03b5d3]/20 text-[#4cd7f6] border border-[#4cd7f6]/40'
                : 'bg-[#1c2b3c] text-[#c7c4d7] border border-[#464554]/40 hover:text-white'
            }`}
          >
            In Review <span className="ml-1 text-[#4cd7f6]">4</span>
          </button>
          <button
            onClick={() => setSelectedStatusFilter('fixed')}
            className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
              selectedStatusFilter === 'fixed'
                ? 'bg-[#00885d]/30 text-[#4edea3] border border-[#4edea3]/40'
                : 'bg-[#1c2b3c] text-[#c7c4d7] border border-[#464554]/40 hover:text-white'
            }`}
          >
            Fixed <span className="ml-1 text-[#4edea3]">2</span>
          </button>
        </div>
      </section>

      {/* KPI METRIC CARDS (Top Stats Bar) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* KPI 1: Overall Health Score */}
        <div className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#908fa0]">
            <span className="font-label-caps text-label-caps tracking-wider uppercase">Overall Health Score</span>
            <span className="material-symbols-outlined text-[#c0c1ff] text-base">monitor_heart</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-headline-xl font-headline-xl text-[#d4e4fa] font-semibold">84%</span>
            <span className="font-code-sm text-code-sm text-[#4edea3] flex items-center">
              <span className="material-symbols-outlined text-xs">arrow_upward</span> 2.4%
            </span>
          </div>
          <div className="w-full bg-[#122131] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#c0c1ff] h-full rounded-full" style={{ width: '84%' }}></div>
          </div>
        </div>

        {/* KPI 2: Playwright Pass Rate */}
        <div className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#908fa0]">
            <span className="font-label-caps text-label-caps tracking-wider uppercase">Playwright Pass Rate</span>
            <span className="material-symbols-outlined text-[#4edea3] text-base">task_alt</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-headline-xl font-headline-xl text-[#d4e4fa] font-semibold">92.4%</span>
            <span className="font-code-sm text-code-sm text-[#4edea3] flex items-center">
              <span className="material-symbols-outlined text-xs">arrow_upward</span> 1.1%
            </span>
          </div>
          <div className="w-full bg-[#122131] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#4edea3] h-full rounded-full" style={{ width: '92.4%' }}></div>
          </div>
        </div>

        {/* KPI 3: Content Integrity */}
        <div className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#908fa0]">
            <span className="font-label-caps text-label-caps tracking-wider uppercase">Content Integrity</span>
            <span className="material-symbols-outlined text-[#4cd7f6] text-base">image_search</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-headline-xl font-headline-xl text-[#d4e4fa] font-semibold">76%</span>
            <span className="font-code-sm text-code-sm text-[#ffb4ab] flex items-center">
              <span className="material-symbols-outlined text-xs">arrow_downward</span> 4.0%
            </span>
          </div>
          <div className="w-full bg-[#122131] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#4cd7f6] h-full rounded-full" style={{ width: '76%' }}></div>
          </div>
        </div>

        {/* KPI 4: Active Defects */}
        <div className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#908fa0]">
            <span className="font-label-caps text-label-caps tracking-wider uppercase">Active Defects</span>
            <span className="material-symbols-outlined text-[#ffb4ab] text-base">warning</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-headline-xl font-headline-xl text-[#ffb4ab] font-semibold">18</span>
            <span className="font-code-sm text-code-sm text-[#ffb4ab] px-1.5 py-0.2 bg-[#93000a]/30 rounded">
              Critical: 4
            </span>
          </div>
          <div className="w-full bg-[#122131] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#ffb4ab] h-full rounded-full" style={{ width: '48%' }}></div>
          </div>
        </div>
      </section>

      {/* BENTO GRID SECTION: Interactive SVG Charts & Severity Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Interactive Donut Breakdown: Issues by Type (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#464554]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4cd7f6]">donut_large</span>
              <h2 className="font-headline-md font-semibold text-[#d4e4fa]">Issue Telemetry by Type</h2>
            </div>
            <div className="flex items-center gap-2 font-code-sm text-code-sm">
              <span className="px-2 py-0.5 rounded bg-[#122131] text-[#4cd7f6] border border-[#4cd7f6]/30">
                11 Scraper
              </span>
              <span className="px-2 py-0.5 rounded bg-[#122131] text-[#c0c1ff] border border-[#c0c1ff]/30">
                7 Functional
              </span>
            </div>
          </div>

          {/* Chart + Legends Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-3">
            {/* SVG Donut Chart Canvas (5 cols) */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#122131" strokeWidth="18"></circle>
                {/* Broken Images: 5/18 (27.77%) -> 104.7 */}
                <circle
                  onMouseEnter={() => setHoveredSlice('Broken Images: 5')}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="transition-all hover:opacity-80 cursor-pointer"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="60"
                  stroke="#03b5d3"
                  strokeDasharray="104.7 272.3"
                  strokeDashoffset="0"
                  strokeWidth="18"
                ></circle>
                {/* Zero Prices: 3/18 (16.66%) -> 62.8 */}
                <circle
                  onMouseEnter={() => setHoveredSlice('Zero Prices: 3')}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="transition-all hover:opacity-80 cursor-pointer"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="60"
                  stroke="#4cd7f6"
                  strokeDasharray="62.8 314.2"
                  strokeDashoffset="-104.7"
                  strokeWidth="18"
                ></circle>
                {/* Dead Links: 2/18 (11.11%) -> 41.9 */}
                <circle
                  onMouseEnter={() => setHoveredSlice('Dead Links: 2')}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="transition-all hover:opacity-80 cursor-pointer"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="60"
                  stroke="#acedff"
                  strokeDasharray="41.9 335.1"
                  strokeDashoffset="-167.5"
                  strokeWidth="18"
                ></circle>
                {/* Duplicate Images: 1/18 (5.55%) -> 20.9 */}
                <circle
                  onMouseEnter={() => setHoveredSlice('Duplicate Images: 1')}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="transition-all hover:opacity-80 cursor-pointer"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="60"
                  stroke="#004e5c"
                  strokeDasharray="20.9 356.1"
                  strokeDashoffset="-209.4"
                  strokeWidth="18"
                ></circle>
                {/* Functional: Checkout Glitches: 3/18 (16.66%) -> 62.8 */}
                <circle
                  onMouseEnter={() => setHoveredSlice('Checkout Glitches: 3')}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="transition-all hover:opacity-80 cursor-pointer"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="60"
                  stroke="#8083ff"
                  strokeDasharray="62.8 314.2"
                  strokeDashoffset="-230.3"
                  strokeWidth="18"
                ></circle>
                {/* Functional: Login Timeout: 2/18 (11.11%) -> 41.9 */}
                <circle
                  onMouseEnter={() => setHoveredSlice('Login Timeout: 2')}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="transition-all hover:opacity-80 cursor-pointer"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="60"
                  stroke="#c0c1ff"
                  strokeDasharray="41.9 335.1"
                  strokeDashoffset="-293.1"
                  strokeWidth="18"
                ></circle>
                {/* Functional: Cart Badge Desync: 2/18 (11.11%) -> 41.9 */}
                <circle
                  onMouseEnter={() => setHoveredSlice('Cart Badge Desync: 2')}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="transition-all hover:opacity-80 cursor-pointer"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="60"
                  stroke="#494bd6"
                  strokeDasharray="41.9 335.1"
                  strokeDashoffset="-335.0"
                  strokeWidth="18"
                ></circle>
              </svg>
              {/* Center readout inside donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-headline-xl font-headline-xl font-bold text-[#d4e4fa] leading-none">
                  {hoveredSlice ? hoveredSlice.split(':')[1] : '18'}
                </span>
                <span className="font-code-sm text-code-sm text-[#908fa0] tracking-wider text-center">
                  {hoveredSlice ? hoveredSlice.split(':')[0] : 'DEFECTS'}
                </span>
              </div>
            </div>

            {/* Granular Slices Legend (7 cols) */}
            <div className="sm:col-span-7 space-y-2 font-code-sm text-code-sm">
              <div className="font-label-caps text-label-caps text-[#4cd7f6] tracking-wider uppercase mb-1">
                Content Scraper (11)
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div
                  onClick={() => onNavigateTab('scraper')}
                  className="flex items-center justify-between p-1.5 rounded bg-[#122131]/60 border border-[#464554]/20 hover:border-[#4cd7f6]/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#03b5d3]"></span>
                    <span className="text-[#d4e4fa] truncate">Broken Images</span>
                  </div>
                  <span className="font-semibold text-[#d4e4fa] ml-1">5</span>
                </div>
                <div
                  onClick={() => onNavigateTab('scraper')}
                  className="flex items-center justify-between p-1.5 rounded bg-[#122131]/60 border border-[#464554]/20 hover:border-[#4cd7f6]/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
                    <span className="text-[#d4e4fa] truncate">Zero Prices</span>
                  </div>
                  <span className="font-semibold text-[#d4e4fa] ml-1">3</span>
                </div>
                <div
                  onClick={() => onNavigateTab('scraper')}
                  className="flex items-center justify-between p-1.5 rounded bg-[#122131]/60 border border-[#464554]/20 hover:border-[#4cd7f6]/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#acedff]"></span>
                    <span className="text-[#d4e4fa] truncate">Dead Links</span>
                  </div>
                  <span className="font-semibold text-[#d4e4fa] ml-1">2</span>
                </div>
                <div
                  onClick={() => onNavigateTab('scraper')}
                  className="flex items-center justify-between p-1.5 rounded bg-[#122131]/60 border border-[#464554]/20 hover:border-[#4cd7f6]/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#004e5c]"></span>
                    <span className="text-[#d4e4fa] truncate">Duplicate Img</span>
                  </div>
                  <span className="font-semibold text-[#d4e4fa] ml-1">1</span>
                </div>
              </div>

              <div className="font-label-caps text-label-caps text-[#c0c1ff] tracking-wider uppercase mt-2 mb-1">
                Functional Failures (7)
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div
                  onClick={() => onNavigateTab('tests')}
                  className="flex items-center justify-between p-1.5 rounded bg-[#122131]/60 border border-[#464554]/20 hover:border-[#c0c1ff]/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#8083ff]"></span>
                    <span className="text-[#d4e4fa] truncate">Checkout Glitch</span>
                  </div>
                  <span className="font-semibold text-[#d4e4fa] ml-1">3</span>
                </div>
                <div
                  onClick={() => onNavigateTab('tests')}
                  className="flex items-center justify-between p-1.5 rounded bg-[#122131]/60 border border-[#464554]/20 hover:border-[#c0c1ff]/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#c0c1ff]"></span>
                    <span className="text-[#d4e4fa] truncate">Login Timeout</span>
                  </div>
                  <span className="font-semibold text-[#d4e4fa] ml-1">2</span>
                </div>
                <div
                  onClick={() => onNavigateTab('tests')}
                  className="flex items-center justify-between p-1.5 rounded bg-[#122131]/60 border border-[#464554]/20 hover:border-[#c0c1ff]/40 transition-colors col-span-2 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#494bd6]"></span>
                    <span className="text-[#d4e4fa] truncate">Cart Badge Desync</span>
                  </div>
                  <span className="font-semibold text-[#d4e4fa] ml-1">2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="pt-2 border-t border-[#464554]/20 flex items-center justify-between font-code-sm text-code-sm text-[#908fa0]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">filter_alt</span> Click slice to filter test matrix
            </span>
            <span className="text-[#4cd7f6] font-medium">Headless DOM v2 Parser Active</span>
          </div>
        </div>

        {/* Issues by Severity Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#464554]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab]">bar_chart</span>
              <h2 className="font-headline-md font-semibold text-[#d4e4fa]">Issues by Severity</h2>
            </div>
            <span className="font-code-sm text-code-sm text-[#908fa0]">18 Total Flagged</span>
          </div>

          {/* Severity Bars */}
          <div className="space-y-4 my-auto py-2">
            {/* Critical */}
            <div>
              <div className="flex justify-between items-center mb-1 font-code-sm text-code-sm">
                <span className="text-[#ffb4ab] font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span> Critical
                </span>
                <span className="text-[#d4e4fa] font-semibold">
                  4 <span className="text-[#908fa0] font-normal">/ 18 (22%)</span>
                </span>
              </div>
              <div className="w-full bg-[#122131] h-2 rounded-full overflow-hidden">
                <div className="bg-[#ffb4ab] h-full rounded-full transition-all duration-500" style={{ width: '22.2%' }}></div>
              </div>
              <span className="text-[#908fa0] text-[11px] font-code-sm mt-0.5 block">
                Blocks transaction funnel or drops session
              </span>
            </div>

            {/* Major */}
            <div>
              <div className="flex justify-between items-center mb-1 font-code-sm text-code-sm">
                <span className="text-[#4cd7f6] font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span> Major
                </span>
                <span className="text-[#d4e4fa] font-semibold">
                  8 <span className="text-[#908fa0] font-normal">/ 18 (44%)</span>
                </span>
              </div>
              <div className="w-full bg-[#122131] h-2 rounded-full overflow-hidden">
                <div className="bg-[#4cd7f6] h-full rounded-full transition-all duration-500" style={{ width: '44.4%' }}></div>
              </div>
              <span className="text-[#908fa0] text-[11px] font-code-sm mt-0.5 block">
                Corrupt DOM asset, zero values, or 3s+ latency
              </span>
            </div>

            {/* Minor */}
            <div>
              <div className="flex justify-between items-center mb-1 font-code-sm text-code-sm">
                <span className="text-[#c0c1ff] font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#c0c1ff]"></span> Minor
                </span>
                <span className="text-[#d4e4fa] font-semibold">
                  6 <span className="text-[#908fa0] font-normal">/ 18 (34%)</span>
                </span>
              </div>
              <div className="w-full bg-[#122131] h-2 rounded-full overflow-hidden">
                <div className="bg-[#c0c1ff] h-full rounded-full transition-all duration-500" style={{ width: '33.3%' }}></div>
              </div>
              <span className="text-[#908fa0] text-[11px] font-code-sm mt-0.5 block">
                Styling offset, duplicate hash, badge desync
              </span>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-2 border-t border-[#464554]/20 flex items-center justify-between font-code-sm text-code-sm">
            <span className="text-[#908fa0]">
              Triage SLA: <span className="text-[#4edea3]">98.2% on-time</span>
            </span>
            <button
              onClick={() => onNavigateTab('issues')}
              className="text-[#c0c1ff] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View Issue Registry</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* PERSONA RISK MATRIX GRID (SauceDemo Test Personas) */}
      <section className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 lg:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#464554]/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff]">group</span>
              <h2 className="font-headline-md font-semibold text-[#d4e4fa]">SauceDemo Persona Risk Matrix</h2>
            </div>
            <p className="font-body-sm text-body-sm text-[#908fa0] mt-0.5">
              Automated headless assertion validation across distinct simulated account archetypes
            </p>
          </div>
          <div className="flex items-center gap-2 font-code-sm text-code-sm">
            <span className="px-2 py-1 rounded bg-[#122131] text-[#908fa0] border border-[#464554]/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span> 5 Personas Tested
            </span>
            <button
              onClick={onRunAllPersonas}
              className="px-2.5 py-1 rounded bg-[#1c2b3c] text-[#d4e4fa] hover:bg-[#273647] transition-colors border border-[#464554]/40 flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">refresh</span> Re-run All
            </button>
          </div>
        </div>

        {/* Dense Data Grid */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left font-code-sm text-code-sm border-collapse">
            <thead>
              <tr className="border-b border-[#464554]/30 text-[#908fa0] font-label-caps uppercase text-[10px]">
                <th className="py-2 px-3">Persona Identifier</th>
                <th className="py-2 px-3">Pass Assertion Rate</th>
                <th className="py-2 px-3">Primary Anomaly / Behavior Signature</th>
                <th className="py-2 px-3">Telemetry Locator Trace</th>
                <th className="py-2 px-3">Execution SLA</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#464554]/20">
              {/* Persona 1: standard_user */}
              <tr className="hover:bg-[#122131]/70 transition-colors">
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                    <span className="font-semibold text-[#d4e4fa]">standard_user</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#4edea3]/10 text-[#4edea3] text-[10px] border border-[#4edea3]/20">
                      PASSING
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#4edea3]">100%</span>
                    <div className="w-16 bg-[#122131] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#4edea3] h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-[#c7c4d7]">
                  Baseline healthy workflow. Standard catalog & checkout operations.
                </td>
                <td className="py-2.5 px-3 text-[#908fa0]">
                  <code className="text-xs bg-[#122131] px-1 py-0.5 rounded text-[#d4e4fa]">
                    page.locator('.inventory_item')
                  </code>
                </td>
                <td className="py-2.5 px-3 text-[#4edea3]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span> 640ms
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() =>
                      setModalDetails({
                        title: 'Trace: standard_user (Baseline)',
                        content:
                          'All 6 inventory items parsed successfully.\nLocator .inventory_item resolved with zero 404 assets.\nCart checkout flow completed in 640ms.'
                      })
                    }
                    className="px-2 py-0.5 rounded bg-[#122131] text-[#c0c1ff] hover:bg-[#273647] transition-colors cursor-pointer"
                  >
                    Inspect Trace
                  </button>
                </td>
              </tr>

              {/* Persona 2: problem_user */}
              <tr className="hover:bg-[#122131]/70 transition-colors bg-[#93000a]/5">
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
                    <span className="font-semibold text-[#d4e4fa]">problem_user</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#93000a]/30 text-[#ffb4ab] text-[10px] border border-[#ffb4ab]/30">
                      DEGRADED
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#ffb4ab]">42%</span>
                    <div className="w-16 bg-[#122131] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#ffb4ab] h-full rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-[#ffb4ab]">
                  Image asset 404s (Broken dog pics) & Last Name input field lock.
                </td>
                <td className="py-2.5 px-3 text-[#908fa0]">
                  <code className="text-xs bg-[#122131] px-1 py-0.5 rounded text-[#ffb4ab]">
                    src="/static/media/sl-404.16f3cbf6.jpg"
                  </code>
                </td>
                <td className="py-2.5 px-3 text-[#c7c4d7]">
                  <span className="flex items-center gap-1">820ms</span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => onNavigateTab('tests')}
                    className="px-2 py-0.5 rounded bg-[#93000a]/40 text-[#ffb4ab] hover:bg-[#93000a]/60 transition-colors cursor-pointer"
                  >
                    Debug (5)
                  </button>
                </td>
              </tr>

              {/* Persona 3: locked_out_user */}
              <tr className="hover:bg-[#122131]/70 transition-colors">
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
                    <span className="font-semibold text-[#d4e4fa]">locked_out_user</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#03b5d3]/10 text-[#4cd7f6] text-[10px] border border-[#4cd7f6]/20">
                      EXPECTED AUTH
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#4cd7f6]">100%</span>
                    <div className="w-16 bg-[#122131] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#4cd7f6] h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-[#c7c4d7]">
                  Locked credential banner assertion matched (<span className="text-[#4cd7f6] font-medium">Epic sadface</span>).
                </td>
                <td className="py-2.5 px-3 text-[#908fa0]">
                  <code className="text-xs bg-[#122131] px-1 py-0.5 rounded text-[#d4e4fa]">
                    h3[data-test="error"]
                  </code>
                </td>
                <td className="py-2.5 px-3 text-[#4edea3]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span> 180ms
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() =>
                      setModalDetails({
                        title: 'Trace: locked_out_user (Auth Lockout)',
                        content:
                          'Target: /login-button -> Credentials locked.\nAssertion: expect(locator("h3[data-test=\'error\']")).toContainText("Epic sadface: Sorry, this user has been locked out.")\nMatched successfully in 180ms.'
                      })
                    }
                    className="px-2 py-0.5 rounded bg-[#122131] text-[#c0c1ff] hover:bg-[#273647] transition-colors cursor-pointer"
                  >
                    Inspect Trace
                  </button>
                </td>
              </tr>

              {/* Persona 4: performance_glitch_user */}
              <tr className="hover:bg-[#122131]/70 transition-colors">
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#acedff]"></span>
                    <span className="font-semibold text-[#d4e4fa]">performance_glitch_user</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#acedff]/10 text-[#acedff] text-[10px] border border-[#acedff]/30">
                      LATENCY WARN
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#acedff]">88%</span>
                    <div className="w-16 bg-[#122131] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#acedff] h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-[#acedff]">
                  3.8s simulated thread freeze on /inventory router navigation.
                </td>
                <td className="py-2.5 px-3 text-[#908fa0]">
                  <code className="text-xs bg-[#122131] px-1 py-0.5 rounded text-[#d4e4fa]">
                    page.waitForNavigation()
                  </code>
                </td>
                <td className="py-2.5 px-3 text-[#ffb4ab]">
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-xs">timer</span> 3,842ms
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() =>
                      setModalDetails({
                        title: 'Waterfall: performance_glitch_user',
                        content:
                          'Navigation waterfall analysis:\n• DNS resolution: 12ms\n• SSL Handshake: 24ms\n• DOM Interactive: 3,810ms (simulated sleep thread)\n• Final DOM Content Loaded: 3,842ms'
                      })
                    }
                    className="px-2 py-0.5 rounded bg-[#122131] text-[#c0c1ff] hover:bg-[#273647] transition-colors cursor-pointer"
                  >
                    Waterfall
                  </button>
                </td>
              </tr>

              {/* Persona 5: error_user */}
              <tr className="hover:bg-[#122131]/70 transition-colors bg-[#93000a]/5">
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
                    <span className="font-semibold text-[#d4e4fa]">error_user</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#93000a]/40 text-[#ffb4ab] text-[10px] border border-[#ffb4ab]/40 font-bold">
                      CRITICAL FAILURE
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#ffb4ab]">21%</span>
                    <div className="w-16 bg-[#122131] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#ffb4ab] h-full rounded-full" style={{ width: '21%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-[#ffb4ab]">
                  Checkout step 2 crash & dispatch unhandled TypeError in bundle.
                </td>
                <td className="py-2.5 px-3 text-[#908fa0]">
                  <code className="text-xs bg-[#122131] px-1 py-0.5 rounded text-[#ffb4ab]">
                    button[id="finish"] -&gt; 500 Uncaught
                  </code>
                </td>
                <td className="py-2.5 px-3 text-[#ffb4ab]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">cancel</span> Timeout
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => onNavigateTab('tests')}
                    className="px-2 py-0.5 rounded bg-[#93000a]/40 text-[#ffb4ab] hover:bg-[#93000a]/60 transition-colors cursor-pointer"
                  >
                    Stacktrace
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Matrix Footer summary */}
        <div className="mt-3 pt-2.5 border-t border-[#464554]/20 flex flex-col sm:flex-row sm:items-center justify-between text-[#908fa0] font-code-sm text-code-sm gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-sm">database</span>
            <span>
              SQLite Persona Sync Hash: <span className="text-[#d4e4fa]">0x8f3c7b2a</span> (Synced 3m ago)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#4edea3]">3 Passing</span>
            <span className="text-[#908fa0]">|</span>
            <span className="text-[#ffb4ab] font-medium">2 Failing Personas</span>
          </div>
        </div>
      </section>

      {/* PLAYWRIGHT QUICK RUN SUITE & LIVE RUNNER DOCK */}
      <section className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded bg-[#c0c1ff]/10 border border-[#c0c1ff]/30 flex items-center justify-center text-[#c0c1ff] shrink-0 glow-primary">
            <span className="material-symbols-outlined">play_circle</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline-md font-semibold text-[#d4e4fa]">Playwright Headless Test Runner</h3>
              <span className="px-1.5 py-0.2 rounded bg-[#4edea3]/10 text-[#4edea3] text-xs font-code-sm border border-[#4edea3]/20">
                Ready
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-[#908fa0]">
              Target: <code className="text-[#d4e4fa]">saucedemo.com/v1</code> • Chromium Engine • Parallel Threads: 4
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => onTriggerToast('CLI Flags: --headed=false --workers=4 --reporter=json,html')}
            className="px-3 py-1.5 rounded bg-[#122131] text-[#d4e4fa] hover:bg-[#1c2b3c] transition-colors font-code-sm text-code-sm border border-[#464554]/40 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">terminal</span>
            <span>CLI Flags</span>
          </button>
          <button
            onClick={onRunAllPersonas}
            className="px-4 py-1.5 rounded bg-[#8083ff] text-[#1000a9] font-headline-md text-body-md font-semibold hover:bg-white active:scale-[0.99] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span>Execute Full Regression Suite</span>
          </button>
        </div>
      </section>

      {/* Trace / Waterfall Detail Modal */}
      {modalDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d1c2d] border border-[#464554]/50 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#464554]/30 bg-[#122131] flex items-center justify-between">
              <h3 className="font-headline-md font-bold text-[#d4e4fa]">{modalDetails.title}</h3>
              <button
                onClick={() => setModalDetails(null)}
                className="text-[#908fa0] hover:text-[#d4e4fa]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <pre className="p-4 font-code-sm text-xs text-[#c7c4d7] bg-[#010f1f] whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
              {modalDetails.content}
            </pre>
            <div className="p-3 border-t border-[#464554]/30 bg-[#122131] flex justify-end">
              <button
                onClick={() => setModalDetails(null)}
                className="px-3 py-1 bg-[#c0c1ff] text-[#1000a9] font-semibold text-xs rounded hover:bg-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
