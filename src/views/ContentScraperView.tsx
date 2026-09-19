import React, { useState } from 'react';
import { PersonaId, ScraperDetectionRules, ScrapedProduct } from '../types';
import { SCRAPED_PRODUCTS } from '../data/mockData';

interface ContentScraperViewProps {
  onTriggerToast: (msg: string) => void;
  onNavigateToIssues: () => void;
  onPinDefect: (defect: { title: string; area: string; persona: string; severity: 'Critical' | 'Major' | 'Minor' }) => void;
}

export const ContentScraperView: React.FC<ContentScraperViewProps> = ({
  onTriggerToast,
  onNavigateToIssues,
  onPinDefect
}) => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaId>('problem_user');
  const [crawlDepth, setCrawlDepth] = useState<'PLP' | 'PDP' | 'Deep'>('PLP');
  const [isScraping, setIsScraping] = useState(false);
  const [productFilter, setProductFilter] = useState<'all' | 'flagged' | 'clean'>('all');
  const [inspectingProduct, setInspectingProduct] = useState<ScrapedProduct | null>(null);

  const [rules, setRules] = useState<ScraperDetectionRules>({
    brokenImages: true,
    duplicateImageHash: true,
    zeroPrices: true,
    missingTitlesOrDescriptions: true,
    deadLinks: true
  });

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] [INIT] Headless Chromium launched with viewport 1440x900`,
    `[${new Date().toLocaleTimeString()}] [AUTH] Navigating to https://www.saucedemo.com/`,
    `[${new Date().toLocaleTimeString()}] [AUTH] Injected credentials for user: problem_user`,
    `[${new Date().toLocaleTimeString()}] [NAV] Intercepted 25 network requests. Reached /inventory.html`,
    `[${new Date().toLocaleTimeString()}] [DOM] Found 6 .inventory_item nodes on page`,
    `[${new Date().toLocaleTimeString()}] [WARN] Item 4 (Sauce Labs Backpack) img src returns 404: /static/media/sl-404.168b1cce.jpg`,
    `[${new Date().toLocaleTimeString()}] [WARN] Item 0 (Sauce Labs Bike Light) duplicate pHash collision with Item 1 & 4`,
    `[${new Date().toLocaleTimeString()}] [WARN] Item 5 (Sauce Labs Fleece Jacket) price is 0.00 (assertion: price > 0.00 FAIL)`,
    `[${new Date().toLocaleTimeString()}] [SQLITE] Batch committed 4 telemetry anomalies to local.db`
  ]);

  const handleRunScrape = () => {
    setIsScraping(true);
    setTerminalLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [USER TRIGGER] Running comprehensive scrape with persona: ${selectedPersona}...`,
      `[${new Date().toLocaleTimeString()}] [AGENT] Extracting DOM nodes via page.evaluate()...`
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [COMPLETE] Scrape finished: 6 items verified, 4 anomalies flagged, 2 clean.`
      ]);
      setIsScraping(false);
      onTriggerToast(`Scrape completed for ${selectedPersona}. 4 issues flagged.`);
    }, 1800);
  };

  const filteredProducts = SCRAPED_PRODUCTS.filter((p) => {
    if (productFilter === 'flagged') return p.flagged;
    if (productFilter === 'clean') return !p.flagged;
    return true;
  });

  const handlePinAll = () => {
    onTriggerToast('4 Scraped anomalies pinned and synced to Issues Registry.');
    onNavigateToIssues();
  };

  return (
    <main className="flex-1 p-4 lg:p-5 space-y-4 overflow-y-auto">
      {/* Top Banner / Scraper Header */}
      <section className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6]">dataset</span>
            <h1 className="font-headline-lg font-bold text-[#d4e4fa]">
              Content Scraper &amp; Persona Runner
            </h1>
          </div>
          <p className="font-body-sm text-[#908fa0] mt-1">
            Simulate personas on SauceDemo to extract DOM assets, inventory listings, and visual discrepancies.
          </p>
        </div>

        {/* Target URL, Crawl Depth & Run CTA */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Target URL */}
          <div className="flex items-center bg-[#010f1f] px-2.5 py-1.5 rounded border border-[#464554]/40 font-code-sm text-code-sm text-[#4cd7f6]">
            <span className="material-symbols-outlined text-xs mr-1 text-[#4edea3]">lock</span>
            <span>https://www.saucedemo.com/</span>
          </div>

          {/* Crawl Depth */}
          <div className="flex items-center bg-[#010f1f] rounded border border-[#464554]/40 p-0.5 font-code-sm text-xs">
            <button
              onClick={() => setCrawlDepth('PLP')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                crawlDepth === 'PLP' ? 'bg-[#1c2b3c] text-[#d4e4fa] font-semibold' : 'text-[#908fa0]'
              }`}
            >
              Level 1: PLP
            </button>
            <button
              onClick={() => setCrawlDepth('PDP')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                crawlDepth === 'PDP' ? 'bg-[#1c2b3c] text-[#d4e4fa] font-semibold' : 'text-[#908fa0]'
              }`}
            >
              Level 2: PDP
            </button>
            <button
              onClick={() => setCrawlDepth('Deep')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                crawlDepth === 'Deep' ? 'bg-[#1c2b3c] text-[#d4e4fa] font-semibold' : 'text-[#908fa0]'
              }`}
            >
              Deep: Checkout
            </button>
          </div>

          {/* Run Scrape CTA */}
          <button
            onClick={handleRunScrape}
            disabled={isScraping}
            className="px-3.5 py-1.5 rounded bg-[#c0c1ff] text-[#1000a9] font-headline-md font-semibold hover:bg-[#8083ff] hover:text-white transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-sm ${isScraping ? 'animate-spin' : ''}`}>
              {isScraping ? 'autorenew' : 'bolt'}
            </span>
            <span>{isScraping ? 'Scraping DOM...' : 'Run Content Scrape'}</span>
          </button>
        </div>
      </section>

      {/* Configuration Ribbon: Persona Matrix & Detection Rules */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left: Persona Matrix Selector (7 cols) */}
        <div className="lg:col-span-7 bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-code-sm">
            <span className="font-label-caps text-label-caps text-[#4cd7f6] uppercase tracking-wider">
              1. Select Test Persona Archetype
            </span>
            <span className="text-[#908fa0]">Changes injected session token</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {[
              { id: 'standard_user', label: 'standard_user', badge: 'Normal' },
              { id: 'problem_user', label: 'problem_user', badge: '404/Buggy' },
              { id: 'locked_out_user', label: 'locked_out_user', badge: 'Auth Lock' },
              { id: 'performance_glitch_user', label: 'glitch_user', badge: 'Laggy' },
              { id: 'error_user', label: 'error_user', badge: 'Crash' }
            ].map((p) => {
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPersona(p.id as PersonaId);
                    onTriggerToast(`Persona switched to: ${p.id}`);
                  }}
                  className={`p-2 rounded text-left transition-all border font-code-sm text-xs cursor-pointer ${
                    isSelected
                      ? 'bg-[#1c2b3c] border-[#c0c1ff] text-[#d4e4fa] shadow-sm'
                      : 'bg-[#010f1f] border-[#464554]/30 text-[#908fa0] hover:text-[#d4e4fa] hover:border-[#464554]/60'
                  }`}
                >
                  <div className="font-semibold truncate">{p.label}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#4cd7f6]' : 'text-[#908fa0]'}`}>
                    {p.badge}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Persona Credentials Bar */}
          <div className="bg-[#010f1f] p-2 rounded border border-[#464554]/20 flex flex-wrap items-center justify-between gap-2 font-code-sm text-xs text-[#c7c4d7]">
            <div className="flex items-center gap-3">
              <span>
                #user-name: <span className="text-[#4cd7f6] font-semibold">{selectedPersona}</span>
              </span>
              <span>
                #password: <span className="text-[#4edea3]">secret_sauce</span>
              </span>
            </div>
            <span className="text-[11px] text-[#908fa0] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">cookie</span> Session: Ephemeral Cookie
            </span>
          </div>
        </div>

        {/* Right: Heuristic Detection Rules (5 cols) */}
        <div className="lg:col-span-5 bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-code-sm">
            <span className="font-label-caps text-label-caps text-[#c0c1ff] uppercase tracking-wider">
              2. Heuristic Detection Rules
            </span>
            <span className="text-[#4edea3]">5 Active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-code-sm">
            <label className="flex items-center gap-2 p-1.5 rounded bg-[#010f1f] border border-[#464554]/20 text-[#d4e4fa] cursor-pointer hover:border-[#4cd7f6]/40">
              <input
                type="checkbox"
                checked={rules.brokenImages}
                onChange={(e) => setRules({ ...rules, brokenImages: e.target.checked })}
                className="accent-[#8083ff] rounded"
              />
              <span className="truncate">Broken Images (404/Empty)</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 rounded bg-[#010f1f] border border-[#464554]/20 text-[#d4e4fa] cursor-pointer hover:border-[#4cd7f6]/40">
              <input
                type="checkbox"
                checked={rules.duplicateImageHash}
                onChange={(e) => setRules({ ...rules, duplicateImageHash: e.target.checked })}
                className="accent-[#8083ff] rounded"
              />
              <span className="truncate">Duplicate pHash Assets</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 rounded bg-[#010f1f] border border-[#464554]/20 text-[#d4e4fa] cursor-pointer hover:border-[#4cd7f6]/40">
              <input
                type="checkbox"
                checked={rules.zeroPrices}
                onChange={(e) => setRules({ ...rules, zeroPrices: e.target.checked })}
                className="accent-[#8083ff] rounded"
              />
              <span className="truncate">Zero / Corrupted Prices</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 rounded bg-[#010f1f] border border-[#464554]/20 text-[#d4e4fa] cursor-pointer hover:border-[#4cd7f6]/40">
              <input
                type="checkbox"
                checked={rules.missingTitlesOrDescriptions}
                onChange={(e) => setRules({ ...rules, missingTitlesOrDescriptions: e.target.checked })}
                className="accent-[#8083ff] rounded"
              />
              <span className="truncate">Missing Title/Desc</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 rounded bg-[#010f1f] border border-[#464554]/20 text-[#d4e4fa] cursor-pointer hover:border-[#4cd7f6]/40 sm:col-span-2">
              <input
                type="checkbox"
                checked={rules.deadLinks}
                onChange={(e) => setRules({ ...rules, deadLinks: e.target.checked })}
                className="accent-[#8083ff] rounded"
              />
              <span className="truncate">Dead Links (404 / Loop navigation)</span>
            </label>
          </div>
        </div>
      </section>

      {/* Dual-Column Inspection Console: Real-Time Terminal (Left) & Scraped Bento (Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (4 cols): Real-time Terminal Log */}
        <div className="lg:col-span-4 bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-[#464554]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3]">terminal</span>
              <h2 className="font-headline-md font-semibold text-[#d4e4fa]">Real-Time Agent Console</h2>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
          </div>

          {/* Terminal log messages */}
          <div className="bg-[#010f1f] p-3 rounded my-2 flex-1 font-code-sm text-xs text-[#c7c4d7] space-y-1.5 overflow-y-auto max-h-[500px] custom-scrollbar border border-[#464554]/30">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="leading-relaxed break-words">
                {log.includes('[WARN]') ? (
                  <span className="text-[#ffb4ab]">{log}</span>
                ) : log.includes('[COMPLETE]') || log.includes('[SQLITE]') ? (
                  <span className="text-[#4edea3]">{log}</span>
                ) : log.includes('[USER TRIGGER]') ? (
                  <span className="text-[#4cd7f6]">{log}</span>
                ) : (
                  <span>{log}</span>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#464554]/20 flex items-center justify-between font-code-sm text-code-sm text-[#908fa0]">
            <span>Channel: /dev/ttyS0</span>
            <button
              onClick={() => setTerminalLogs([`[${new Date().toLocaleTimeString()}] Console logs cleared.`])}
              className="text-[#c0c1ff] hover:text-white"
            >
              Clear Buffer
            </button>
          </div>
        </div>

        {/* Right Column (8 cols): Scraped Products Grid */}
        <div className="lg:col-span-8 bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 space-y-3">
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#464554]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff]">grid_view</span>
              <h2 className="font-headline-md font-semibold text-[#d4e4fa]">
                Scraped Inventory Items (SauceDemo Catalog)
              </h2>
            </div>

            <div className="flex items-center gap-2 font-code-sm text-code-sm">
              {/* Filter pills */}
              <div className="flex items-center bg-[#010f1f] p-0.5 rounded border border-[#464554]/30">
                <button
                  onClick={() => setProductFilter('all')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    productFilter === 'all' ? 'bg-[#1c2b3c] text-[#d4e4fa] font-semibold' : 'text-[#908fa0]'
                  }`}
                >
                  All (6)
                </button>
                <button
                  onClick={() => setProductFilter('flagged')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    productFilter === 'flagged' ? 'bg-[#93000a]/40 text-[#ffb4ab] font-semibold' : 'text-[#908fa0]'
                  }`}
                >
                  Flagged (4)
                </button>
                <button
                  onClick={() => setProductFilter('clean')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    productFilter === 'clean' ? 'bg-[#00885d]/30 text-[#4edea3] font-semibold' : 'text-[#908fa0]'
                  }`}
                >
                  Clean (2)
                </button>
              </div>

              {/* Pin All Issues button */}
              <button
                onClick={handlePinAll}
                className="px-2.5 py-1 rounded bg-[#93000a] text-[#ffdad6] hover:bg-[#ffb4ab] hover:text-[#690005] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">push_pin</span>
                <span>Pin All Issues to Registry</span>
              </button>
            </div>
          </div>

          {/* Product Items Bento Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
                  prod.flagged
                    ? 'bg-[#010f1f]/80 border-[#ffb4ab]/30 hover:border-[#ffb4ab]/60'
                    : 'bg-[#010f1f]/60 border-[#4edea3]/30 hover:border-[#4edea3]/60'
                }`}
              >
                <div>
                  {/* Top Bar: Title & Price */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="font-headline-md font-semibold text-[#d4e4fa] text-sm">
                        {prod.name}
                      </div>
                      <div className="font-code-sm text-[11px] text-[#908fa0]">
                        Locator: <code className="text-[#c0c1ff]">#item_{prod.itemId}_title_link</code>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-code-sm">
                      <span
                        className={`text-sm font-bold ${
                          prod.isPriceStriked ? 'line-through text-[#ffb4ab]' : 'text-[#4edea3]'
                        }`}
                      >
                        {prod.priceFormatted}
                      </span>
                      {prod.statusText && (
                        <div
                          className={`text-[10px] font-bold ${
                            prod.flagged ? 'text-[#ffb4ab]' : 'text-[#4edea3]'
                          }`}
                        >
                          {prod.statusText}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail & Description */}
                  <div className="flex gap-3 mb-2.5">
                    <div className="w-20 h-20 rounded bg-[#122131] border border-[#464554]/40 overflow-hidden shrink-0 relative flex items-center justify-center">
                      <img
                        src={prod.imageUrl}
                        alt={prod.imageAlt}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      {prod.flagged && (
                        <span className="absolute top-1 right-1 px-1 bg-[#93000a] text-[#ffdad6] text-[9px] rounded font-bold font-code-sm">
                          ERR
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-xs text-[#c7c4d7] line-clamp-3 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Flagged Badges */}
                  <div className="space-y-1 mb-2">
                    {prod.badges.map((b, bIdx) => (
                      <div
                        key={bIdx}
                        className={`px-2 py-0.5 rounded text-[10px] font-code-sm flex items-center gap-1.5 ${
                          b.type === 'pass'
                            ? 'bg-[#00885d]/20 text-[#4edea3] border border-[#4edea3]/30'
                            : 'bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs">
                          {b.type === 'pass' ? 'check_circle' : 'report'}
                        </span>
                        <span className="truncate font-medium">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-[#464554]/20 flex items-center justify-between font-code-sm text-xs">
                  <button
                    onClick={() => setInspectingProduct(prod)}
                    className="text-[#4cd7f6] hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">data_object</span>
                    <span>Inspect DOM</span>
                  </button>
                  {prod.flagged && (
                    <button
                      onClick={() => {
                        onPinDefect({
                          title: `Asset failure on ${prod.name}`,
                          area: 'PLP Catalog',
                          persona: selectedPersona,
                          severity: prod.price === 0 ? 'Major' : 'Critical'
                        });
                        onTriggerToast(`Created defect ticket for ${prod.name}`);
                      }}
                      className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#c0c1ff] hover:bg-[#8083ff] hover:text-white transition-colors cursor-pointer"
                    >
                      + Create Defect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOM Node Inspect Modal */}
      {inspectingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d1c2d] border border-[#464554]/50 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#464554]/30 bg-[#122131] flex items-center justify-between">
              <h3 className="font-headline-md font-bold text-[#d4e4fa]">
                DOM Node Snapshot: {inspectingProduct.name}
              </h3>
              <button
                onClick={() => setInspectingProduct(null)}
                className="text-[#908fa0] hover:text-[#d4e4fa]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <div className="p-4 space-y-3 font-code-sm text-xs text-[#c7c4d7] bg-[#010f1f]">
              <div>
                <span className="text-[#908fa0]">Selector:</span>{' '}
                <code className="text-[#4cd7f6]">.inventory_item:has-text("{inspectingProduct.name}")</code>
              </div>
              <div>
                <span className="text-[#908fa0]">Image Source:</span>{' '}
                <code className="text-[#ffb4ab] break-all">{inspectingProduct.imageUrl}</code>
              </div>
              <div>
                <span className="text-[#908fa0]">Price element:</span>{' '}
                <code className="text-[#4edea3]">.inventory_item_price =&gt; {inspectingProduct.priceFormatted}</code>
              </div>
              <div className="pt-2 border-t border-[#464554]/30 text-[#908fa0]">
                Playwright Assertion Test Code:
              </div>
              <pre className="p-2 rounded bg-[#122131] text-[#c0c1ff] overflow-x-auto">
{`const card = page.locator('#item_${inspectingProduct.itemId}_title_link');
await expect(card).toBeVisible();
const img = card.locator('xpath=ancestor::div[@class="inventory_item"]//img');
await expect(img).toHaveAttribute('src', /.*\\.jpg/);`}
              </pre>
            </div>
            <div className="p-3 border-t border-[#464554]/30 bg-[#122131] flex justify-end">
              <button
                onClick={() => setInspectingProduct(null)}
                className="px-3 py-1 bg-[#c0c1ff] text-[#1000a9] font-semibold text-xs rounded hover:bg-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
