import React, { useState } from 'react';
import { ReviewPin } from '../types';
import { REVIEW_PINS, HOTLINKED_IMAGES } from '../data/mockData';

interface ReviewPinsViewProps {
  onTriggerToast: (msg: string) => void;
}

export const ReviewPinsView: React.FC<ReviewPinsViewProps> = ({ onTriggerToast }) => {
  const [pins, setPins] = useState<ReviewPin[]>(REVIEW_PINS);
  const [selectedPinId, setSelectedPinId] = useState<number>(1);
  const [showSetupGuide, setShowSetupGuide] = useState<boolean>(true);
  const [isAddingPin, setIsAddingPin] = useState<boolean>(false);

  const activePin = pins.find((p) => p.id === selectedPinId) || pins[0];

  const handleCopySelector = (selector: string) => {
    navigator.clipboard?.writeText(selector);
    onTriggerToast(`Copied Playwright selector: ${selector}`);
  };

  const handleDropPin = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingPin) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    const newPin: ReviewPin = {
      id: pins.length + 1,
      title: `Custom Visual Pin #${pins.length + 1}`,
      description: `DOM element tagged at offset (${x}px, ${y}px) on inventory viewport.`,
      severity: 'HIGH',
      severityClass: 'bg-[#facc15]/15 text-[#facc15] border-[#facc15]/30',
      badgeBg: 'bg-[#facc15] text-[#051424]',
      selector: `.inventory_item:nth-child(${Math.floor(y / 150) + 1}) .pricebar`,
      targetUrl: '/inventory.html',
      author: 'QA Engineer - You',
      timestamp: 'Just now',
      tag: '<DOM ELEMENT> (INSPECTED)',
      page: 'inventory'
    };

    setPins([...pins, newPin]);
    setSelectedPinId(newPin.id);
    setIsAddingPin(false);
    onTriggerToast(`Created Pin #${newPin.id} at (${x}, ${y})!`);
  };

  return (
    <main className="flex-1 p-4 lg:p-5 space-y-4 overflow-y-auto">
      {/* Top Hero Section: Visual Bug Bookmarklet */}
      <section className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4cd7f6]">push_pin</span>
              <h1 className="font-headline-lg font-bold text-[#d4e4fa]">
                Visual Bug Bookmarklet &amp; Review Pins
              </h1>
            </div>
            <p className="font-body-sm text-[#908fa0] mt-1">
              Drag the bookmarklet below into your browser bookmark bar to review, inspect, and pin defects live on any SauceDemo page directly into this local QA hub.
            </p>
          </div>

          {/* Draggable Bookmarklet Pill */}
          <div className="flex items-center gap-3">
            <a
              href="javascript:(function(){alert('QA Pin Agent loaded! Click any element on SauceDemo to capture locator and pin defect.');})();"
              onClick={(e) => {
                e.preventDefault();
                onTriggerToast('Drag this button to your Browser Bookmarks Bar, then click it on SauceDemo!');
              }}
              draggable
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#c0c1ff] to-[#4cd7f6] text-[#1000a9] font-headline-md font-bold hover:opacity-95 shadow-md flex items-center gap-2 cursor-grab active:cursor-grabbing select-none"
              title="Drag this button into your browser bookmarks bar!"
            >
              <span>📌</span>
              <span>QA Pin Agent</span>
            </a>
            <button
              onClick={() => setShowSetupGuide(!showSetupGuide)}
              className="px-3 py-1.5 rounded bg-[#1c2b3c] text-[#d4e4fa] hover:bg-[#273647] font-code-sm text-xs border border-[#464554]/40 flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">help</span>
              <span>{showSetupGuide ? 'Hide Guide' : 'Setup Guide'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Setup Guide */}
        {showSetupGuide && (
          <div className="bg-[#010f1f] p-3.5 rounded-lg border border-[#464554]/30 font-code-sm text-xs text-[#c7c4d7] space-y-2">
            <div className="font-semibold text-[#4cd7f6] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              How It Works:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px] text-[#908fa0]">
              <div className="p-2 rounded bg-[#0d1c2d] border border-[#464554]/20">
                <strong className="text-[#d4e4fa] block mb-0.5">1. Drag Button</strong>
                Drag the <code className="text-[#c0c1ff]">📌 QA Pin Agent</code> button above into your Chrome/Firefox bookmarks bar.
              </div>
              <div className="p-2 rounded bg-[#0d1c2d] border border-[#464554]/20">
                <strong className="text-[#d4e4fa] block mb-0.5">2. Open SauceDemo</strong>
                Navigate to any SauceDemo page (e.g. <code className="text-[#4cd7f6]">saucedemo.com/inventory.html</code>).
              </div>
              <div className="p-2 rounded bg-[#0d1c2d] border border-[#464554]/20">
                <strong className="text-[#d4e4fa] block mb-0.5">3. Click to Pin</strong>
                Click the bookmarklet: hover over any broken asset or locator and click to drop a pin.
              </div>
              <div className="p-2 rounded bg-[#0d1c2d] border border-[#464554]/20">
                <strong className="text-[#d4e4fa] block mb-0.5">4. Auto SQLite Sync</strong>
                Pins automatically persist to <code className="text-[#4edea3]">local.db</code> with precise Playwright CSS selectors.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Workspace: Simulated SauceDemo Viewport (Left 8 cols) & Inspector (Right 4 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (8 cols): Simulated Browser Viewport with Interactive Pins */}
        <div className="lg:col-span-8 bg-[#0d1c2d] border border-[#464554]/30 rounded overflow-hidden flex flex-col">
          {/* Simulated Browser URL Bar */}
          <div className="p-2.5 bg-[#010f1f] border-b border-[#464554]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
            </div>

            <div className="flex-1 max-w-md bg-[#0d1c2d] px-3 py-1 rounded border border-[#464554]/40 font-code-sm text-xs text-[#d4e4fa] flex items-center gap-2">
              <span className="material-symbols-outlined text-xs text-[#4edea3]">lock</span>
              <span className="truncate">https://www.saucedemo.com/inventory.html</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsAddingPin(!isAddingPin);
                  if (!isAddingPin) {
                    onTriggerToast('Click anywhere on the preview frame below to drop a new pin!');
                  }
                }}
                className={`px-2.5 py-1 rounded font-code-sm text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                  isAddingPin
                    ? 'bg-[#ffb4ab] text-[#690005] font-bold'
                    : 'bg-[#1c2b3c] text-[#c0c1ff] hover:bg-[#273647]'
                }`}
              >
                <span className="material-symbols-outlined text-xs">add_location</span>
                <span>{isAddingPin ? 'Click to Place Pin' : '+ Drop Pin'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Simulated Page Viewport */}
          <div
            onClick={handleDropPin}
            className={`p-4 bg-[#051424] flex-1 overflow-y-auto relative ${
              isAddingPin ? 'cursor-crosshair' : 'cursor-default'
            }`}
          >
            {/* SauceDemo Header Banner */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#464554]/30">
              <div className="font-bold text-lg text-[#d4e4fa] tracking-tight">Swag Labs</div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg text-[#908fa0]">shopping_cart</span>
              </div>
            </div>

            {/* Product Grid Mock inside Viewport */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {/* Product 1: Backpack with Pin #1 */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPinId(1);
                }}
                className={`p-3 rounded bg-[#0d1c2d] border relative transition-all ${
                  selectedPinId === 1 ? 'border-[#ffb4ab] ring-1 ring-[#ffb4ab]' : 'border-[#464554]/30'
                }`}
              >
                {/* Pin #1 Badge */}
                <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                  <div className="w-7 h-7 rounded-full bg-[#e11d48] text-white flex items-center justify-center font-bold font-code-sm text-xs shadow-lg pin-pulse cursor-pointer">
                    #1
                  </div>
                </div>

                <div className="w-full h-32 bg-[#122131] rounded flex items-center justify-center relative overflow-hidden mb-2">
                  <img
                    src={HOTLINKED_IMAGES.reviewBackpack}
                    alt="Sauce Labs Backpack"
                    className="w-full h-full object-cover opacity-70"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-red-950/40 border-2 border-dashed border-[#ffb4ab] flex items-center justify-center">
                    <span className="bg-[#93000a] text-[#ffdad6] text-[10px] font-bold font-code-sm px-2 py-0.5 rounded">
                      404 NOT FOUND
                    </span>
                  </div>
                </div>
                <div className="font-semibold text-xs text-[#d4e4fa]">Sauce Labs Backpack</div>
                <div className="text-[11px] text-[#908fa0] line-clamp-2 mt-0.5">
                  carry.allTheThings() with the sleek, streamlined Sly Pack...
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#464554]/20 font-code-sm text-xs">
                  <span className="text-[#4edea3] font-bold">$29.99</span>
                  <button className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#d4e4fa] text-[11px]">
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Product 2: Bolt T-Shirt with Pin #2 */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPinId(2);
                }}
                className={`p-3 rounded bg-[#0d1c2d] border relative transition-all ${
                  selectedPinId === 2 ? 'border-[#facc15] ring-1 ring-[#facc15]' : 'border-[#464554]/30'
                }`}
              >
                {/* Pin #2 Badge */}
                <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                  <div className="w-7 h-7 rounded-full bg-[#facc15] text-[#051424] flex items-center justify-center font-bold font-code-sm text-xs shadow-lg pin-pulse cursor-pointer">
                    #2
                  </div>
                </div>

                <div className="w-full h-32 bg-[#122131] rounded flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={HOTLINKED_IMAGES.reviewBolt}
                    alt="Bolt T-Shirt"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="font-semibold text-xs text-[#d4e4fa]">Sauce Labs Bolt T-Shirt</div>
                <div className="text-[11px] text-[#908fa0] line-clamp-2 mt-0.5">
                  Get your testing superhero on with the bolt t-shirt...
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#464554]/20 font-code-sm text-xs">
                  {/* Highlighted Corrupted Price */}
                  <span className="text-[#facc15] font-bold px-1.5 py-0.5 bg-[#facc15]/20 rounded border border-[#facc15]/40 animate-pulse">
                    $0.00 [BUG]
                  </span>
                  <button className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#d4e4fa] text-[11px]">
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Product 3: Fleece Jacket with Pin #3 */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPinId(3);
                }}
                className={`p-3 rounded bg-[#0d1c2d] border relative transition-all ${
                  selectedPinId === 3 ? 'border-[#c0c1ff] ring-1 ring-[#c0c1ff]' : 'border-[#464554]/30'
                }`}
              >
                {/* Pin #3 Badge */}
                <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                  <div className="w-7 h-7 rounded-full bg-[#8083ff] text-white flex items-center justify-center font-bold font-code-sm text-xs shadow-lg pin-pulse cursor-pointer">
                    #3
                  </div>
                </div>

                <div className="w-full h-32 bg-[#122131] rounded flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={HOTLINKED_IMAGES.reviewJacket}
                    alt="Fleece Jacket"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="font-semibold text-xs text-[#d4e4fa]">Sauce Labs Fleece Jacket</div>
                <div className="text-[11px] text-[#908fa0] line-clamp-2 mt-0.5">
                  Midweight quarter-zip fleece jacket capable of handling...
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#464554]/20 font-code-sm text-xs relative">
                  <span className="text-[#4edea3] font-bold">$49.99</span>
                  {/* Misaligned button with visual overflow */}
                  <button className="px-2.5 py-1 rounded bg-[#c0c1ff] text-[#1000a9] font-bold text-[11px] transform translate-x-2 translate-y-1 shadow-md border border-dashed border-[#8083ff]">
                    Add to cart ⤹
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 bg-[#010f1f] border-t border-[#464554]/30 flex items-center justify-between font-code-sm text-xs text-[#908fa0]">
            <span>Active Frame: 1440x900 Staging DOM</span>
            <span className="text-[#4cd7f6]">Click pin on screen to view Playwright selector</span>
          </div>
        </div>

        {/* Right Column (4 cols): Pin Metadata Inspector */}
        <div className="lg:col-span-4 bg-[#0d1c2d] border border-[#464554]/30 rounded p-4 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#464554]/20">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-bold font-code-sm text-xs ${activePin.badgeBg}`}>
                  Pin #{activePin.id}
                </span>
                <span className="font-headline-md font-semibold text-[#d4e4fa] text-sm">
                  Pin Metadata Inspector
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${activePin.severityClass}`}>
                {activePin.severity}
              </span>
            </div>

            {/* Title & Tag */}
            <div>
              <h3 className="font-headline-md font-bold text-[#d4e4fa] text-sm">
                {activePin.title}
              </h3>
              <div className="font-code-sm text-xs text-[#4cd7f6] mt-0.5">
                {activePin.tag}
              </div>
              <p className="font-body-sm text-xs text-[#c7c4d7] mt-2 leading-relaxed">
                {activePin.description}
              </p>
            </div>

            {/* Playwright-Compatible Selector Path */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-code-sm text-[#908fa0]">
                <span>Playwright Selector Path</span>
                <button
                  onClick={() => handleCopySelector(activePin.selector)}
                  className="text-[#4cd7f6] hover:text-white"
                >
                  Copy Path
                </button>
              </div>
              <pre className="p-2.5 rounded bg-[#010f1f] border border-[#464554]/40 font-code-sm text-xs text-[#4edea3] overflow-x-auto break-all">
                {activePin.selector}
              </pre>
            </div>

            {/* Target URL & Author Telemetry */}
            <div className="bg-[#010f1f] p-3 rounded border border-[#464554]/30 font-code-sm text-xs text-[#908fa0] space-y-1.5">
              <div className="flex justify-between">
                <span>Page:</span>
                <span className="text-[#d4e4fa]">{activePin.targetUrl}</span>
              </div>
              <div className="flex justify-between">
                <span>Author:</span>
                <span className="text-[#d4e4fa]">{activePin.author}</span>
              </div>
              <div className="flex justify-between">
                <span>Timestamp:</span>
                <span className="text-[#c0c1ff]">{activePin.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span>Persistence:</span>
                <span className="text-[#4edea3]">local.db [Table: review_pins]</span>
              </div>
            </div>

            {/* Quick List of All Pins */}
            <div className="space-y-1.5">
              <div className="text-xs font-code-sm text-[#908fa0] uppercase tracking-wider">
                All Review Pins ({pins.length})
              </div>
              <div className="space-y-1">
                {pins.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPinId(p.id)}
                    className={`w-full p-2 rounded text-left flex items-center justify-between font-code-sm text-xs border transition-colors cursor-pointer ${
                      selectedPinId === p.id
                        ? 'bg-[#1c2b3c] border-[#c0c1ff] text-[#d4e4fa]'
                        : 'bg-[#010f1f] border-[#464554]/20 text-[#908fa0] hover:text-[#d4e4fa]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-[#c0c1ff]">#{p.id}</span>
                      <span className="truncate">{p.title}</span>
                    </div>
                    <span className="text-[10px] shrink-0 text-[#908fa0]">{p.severity}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-[#464554]/20 flex items-center justify-between gap-2 font-code-sm text-xs">
            <button
              onClick={() => handleCopySelector(activePin.selector)}
              className="flex-1 py-1.5 rounded bg-[#1c2b3c] text-[#d4e4fa] hover:bg-[#273647] border border-[#464554]/40 font-semibold cursor-pointer text-center"
            >
              Copy Selector
            </button>
            <button
              onClick={() => onTriggerToast(`Synced Pin #${activePin.id} to SQLite & Jira Queue`)}
              className="flex-1 py-1.5 rounded bg-[#8083ff] text-[#1000a9] hover:bg-white font-bold cursor-pointer text-center"
            >
              Sync to SQLite
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
