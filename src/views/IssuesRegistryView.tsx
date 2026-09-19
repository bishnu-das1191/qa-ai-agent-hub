import React, { useState } from 'react';
import { DefectItem, IssueSeverity, IssueStatus } from '../types';
import { DEFECTS_DATA } from '../data/mockData';

interface IssuesRegistryViewProps {
  onTriggerToast: (msg: string) => void;
  onExportExcel: () => void;
}

export const IssuesRegistryView: React.FC<IssuesRegistryViewProps> = ({
  onTriggerToast,
  onExportExcel
}) => {
  const [defects, setDefects] = useState<DefectItem[]>(DEFECTS_DATA);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'All' | 'Open' | 'In Progress' | 'Fixed'>('All');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDefectId, setSelectedDefectId] = useState<string>('DEF-404');
  const [checkedIds, setCheckedIds] = useState<string[]>(['DEF-404', 'DEF-LASTNAME']);

  const activeDefect = defects.find((d) => d.id === selectedDefectId) || defects[0];

  const filteredDefects = defects.filter((d) => {
    if (selectedStatusFilter !== 'All' && d.status !== selectedStatusFilter) return false;
    if (selectedSeverityFilter !== 'All' && d.severity !== selectedSeverityFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        d.id.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.area.toLowerCase().includes(q) ||
        d.persona.toLowerCase().includes(q) ||
        d.locatorError.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleToggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (checkedIds.length === filteredDefects.length) {
      setCheckedIds([]);
    } else {
      setCheckedIds(filteredDefects.map((d) => d.id));
    }
  };

  const handleStatusChange = (id: string, newStatus: IssueStatus) => {
    setDefects((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    onTriggerToast(`Updated ${id} status to ${newStatus}`);
  };

  const handleCopyJira = () => {
    const jiraMd = `h3. ${activeDefect.id}: ${activeDefect.title}
*Severity:* ${activeDefect.severity}
*Area:* ${activeDefect.area}
*Persona:* ${activeDefect.persona}
*Locator Error:* {code}${activeDefect.locatorError}{code}

h4. Steps to Reproduce:
${activeDefect.steps.join('\n')}

h4. Expected:
${activeDefect.expected}

h4. Actual:
${activeDefect.actual}

h4. Playwright Reproduction:
{code:typescript}
${activeDefect.playwrightCode}
{code}`;

    navigator.clipboard?.writeText(jiraMd);
    onTriggerToast('Jira Markdown copied to clipboard!');
  };

  return (
    <main className="flex-1 p-4 lg:p-5 space-y-4 overflow-y-auto">
      {/* Top 4 KPI Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-[#908fa0]">Total Defects</span>
            <div className="text-headline-xl font-headline-xl font-bold text-[#d4e4fa] mt-1">18</div>
          </div>
          <div className="w-10 h-10 rounded bg-[#c0c1ff]/10 border border-[#c0c1ff]/30 flex items-center justify-center text-[#c0c1ff]">
            <span className="material-symbols-outlined">bug_report</span>
          </div>
        </div>

        <div className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-[#ffb4ab]">Critical (24h SLA)</span>
            <div className="text-headline-xl font-headline-xl font-bold text-[#ffb4ab] mt-1">4</div>
          </div>
          <div className="w-10 h-10 rounded bg-[#93000a]/30 border border-[#ffb4ab]/30 flex items-center justify-center text-[#ffb4ab]">
            <span className="material-symbols-outlined">emergency</span>
          </div>
        </div>

        <div className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-[#4cd7f6]">Major Issues</span>
            <div className="text-headline-xl font-headline-xl font-bold text-[#4cd7f6] mt-1">8</div>
          </div>
          <div className="w-10 h-10 rounded bg-[#03b5d3]/20 border border-[#4cd7f6]/30 flex items-center justify-center text-[#4cd7f6]">
            <span className="material-symbols-outlined">warning</span>
          </div>
        </div>

        <div className="bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-[#4edea3]">Triage Rate</span>
            <div className="text-headline-xl font-headline-xl font-bold text-[#4edea3] mt-1">98.2%</div>
          </div>
          <div className="w-10 h-10 rounded bg-[#00885d]/20 border border-[#4edea3]/30 flex items-center justify-center text-[#4edea3]">
            <span className="material-symbols-outlined">task_alt</span>
          </div>
        </div>
      </section>

      {/* Filter & Batch Actions Bar */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#0d1c2d] border border-[#464554]/30 rounded p-3">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 font-code-sm text-xs">
          {(['All', 'Open', 'In Progress', 'Fixed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                selectedStatusFilter === st
                  ? 'bg-[#c0c1ff] text-[#1000a9] font-bold'
                  : 'bg-[#010f1f] text-[#c7c4d7] hover:text-white border border-[#464554]/30'
              }`}
            >
              {st} {st === 'All' ? '(18)' : st === 'Open' ? '(12)' : st === 'In Progress' ? '(4)' : '(2)'}
            </button>
          ))}
        </div>

        {/* Search, Severity & Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Severity Select */}
          <select
            value={selectedSeverityFilter}
            onChange={(e) => setSelectedSeverityFilter(e.target.value)}
            className="bg-[#010f1f] border border-[#464554]/40 text-[#d4e4fa] font-code-sm text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-[#c0c1ff]"
          >
            <option value="All">Severity: All</option>
            <option value="Critical">Critical</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
          </select>

          {/* Search Input */}
          <div className="flex items-center bg-[#010f1f] px-2 py-1 rounded border border-[#464554]/40">
            <span className="material-symbols-outlined text-[#908fa0] text-sm mr-1.5">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locators, messages..."
              className="bg-transparent text-xs text-[#d4e4fa] focus:outline-none placeholder:text-[#464554] w-36 sm:w-48"
            />
          </div>

          {/* Batch Actions */}
          <button
            onClick={() => onTriggerToast(`Exporting ${checkedIds.length} tickets to Jira markdown...`)}
            className="px-2.5 py-1.5 rounded bg-[#1c2b3c] hover:bg-[#273647] text-[#c0c1ff] font-code-sm text-xs border border-[#464554]/40 flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">share</span>
            <span>Export Jira</span>
          </button>

          <button
            onClick={onExportExcel}
            className="px-2.5 py-1.5 rounded bg-[#03b5d3]/20 hover:bg-[#03b5d3]/40 text-[#4cd7f6] font-code-sm text-xs border border-[#4cd7f6]/40 flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">file_download</span>
            <span>Excel (.xlsx)</span>
          </button>
        </div>
      </section>

      {/* Main Defect Table & Jira Export Inspector Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (7 cols): Full Defect Data Table */}
        <div className="lg:col-span-7 bg-[#0d1c2d] border border-[#464554]/30 rounded overflow-hidden flex flex-col">
          <div className="p-3 border-b border-[#464554]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab]">table_chart</span>
              <h2 className="font-headline-md font-semibold text-[#d4e4fa]">
                Registered Defects ({filteredDefects.length})
              </h2>
            </div>
            <span className="font-code-sm text-xs text-[#908fa0]">
              {checkedIds.length} of {filteredDefects.length} selected
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left font-code-sm text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#464554]/30 text-[#908fa0] uppercase bg-[#010f1f]/50">
                  <th className="py-2 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={checkedIds.length === filteredDefects.length && filteredDefects.length > 0}
                      onChange={handleSelectAll}
                      className="accent-[#8083ff] rounded"
                    />
                  </th>
                  <th className="py-2 px-2">Defect ID</th>
                  <th className="py-2 px-3">Title / Area / Persona</th>
                  <th className="py-2 px-2">Severity</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-3 text-right">Seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#464554]/20">
                {filteredDefects.map((defect) => {
                  const isSelected = selectedDefectId === defect.id;
                  const isChecked = checkedIds.includes(defect.id);

                  return (
                    <tr
                      key={defect.id}
                      onClick={() => setSelectedDefectId(defect.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#1c2b3c] border-l-2 border-[#c0c1ff]'
                          : 'hover:bg-[#122131]/60'
                      }`}
                    >
                      <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleCheck(defect.id)}
                          className="accent-[#8083ff] rounded"
                        />
                      </td>
                      <td className="py-2.5 px-2 font-bold text-[#c0c1ff] whitespace-nowrap">
                        {defect.id}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-[#d4e4fa] line-clamp-1">{defect.title}</div>
                        <div className="text-[11px] text-[#908fa0] flex items-center gap-2 mt-0.5">
                          <span className="text-[#4cd7f6]">{defect.area}</span>
                          <span>•</span>
                          <span>{defect.persona}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 whitespace-nowrap">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            defect.severity === 'Critical'
                              ? 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30'
                              : defect.severity === 'Major'
                              ? 'bg-[#03b5d3]/20 text-[#4cd7f6] border border-[#4cd7f6]/30'
                              : 'bg-[#1c2b3c] text-[#c0c1ff] border border-[#c0c1ff]/30'
                          }`}
                        >
                          {defect.severity}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={defect.status}
                          onChange={(e) => handleStatusChange(defect.id, e.target.value as IssueStatus)}
                          className={`bg-[#010f1f] border text-[11px] font-code-sm rounded px-1.5 py-0.5 focus:outline-none ${
                            defect.status === 'Open'
                              ? 'border-[#ffb4ab]/30 text-[#ffb4ab]'
                              : defect.status === 'In Progress'
                              ? 'border-[#4cd7f6]/30 text-[#4cd7f6]'
                              : 'border-[#4edea3]/30 text-[#4edea3]'
                          }`}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Fixed">Fixed</option>
                        </select>
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#908fa0] whitespace-nowrap text-[11px]">
                        {defect.seenTime}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 border-t border-[#464554]/20 bg-[#010f1f]/50 flex items-center justify-between font-code-sm text-xs text-[#908fa0]">
            <span>Showing {filteredDefects.length} defects</span>
            <span className="text-[#4edea3]">Sync status: Local SQLite WAL valid</span>
          </div>
        </div>

        {/* Right Column (5 cols): Jira Defect Export Inspector */}
        <div className="lg:col-span-5 bg-[#0d1c2d] border border-[#464554]/30 rounded p-3 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#464554]/20">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#c0c1ff]/20 text-[#c0c1ff] font-bold font-code-sm text-xs">
                  {activeDefect.id}
                </span>
                <span className="font-headline-md font-semibold text-[#d4e4fa] text-sm truncate">
                  Jira Defect Export Inspector
                </span>
              </div>
              <button
                onClick={handleCopyJira}
                className="px-2 py-1 rounded bg-[#c0c1ff] text-[#1000a9] font-bold text-xs hover:bg-white flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">content_copy</span>
                <span>Copy MD</span>
              </button>
            </div>

            {/* Title & metadata bar */}
            <div>
              <h3 className="font-headline-md font-bold text-[#d4e4fa] text-sm">
                {activeDefect.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 font-code-sm text-xs text-[#908fa0] mt-1">
                <span>
                  Area: <strong className="text-[#d4e4fa]">{activeDefect.area}</strong>
                </span>
                <span>•</span>
                <span>
                  Persona: <strong className="text-[#4cd7f6]">{activeDefect.persona}</strong>
                </span>
                <span>•</span>
                <span>
                  First Seen: <strong className="text-[#d4e4fa]">{activeDefect.firstSeen}</strong>
                </span>
              </div>
            </div>

            {/* Formatted Jira Markdown Preview Box */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-code-sm text-[#908fa0]">
                <span>Formatted Jira Markdown</span>
                <span className="text-[#4edea3]">Ready for Atlassian API</span>
              </div>
              <div className="bg-[#010f1f] p-3 rounded border border-[#464554]/40 font-code-sm text-xs text-[#c7c4d7] space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
                <div>
                  <strong className="text-[#c0c1ff]">*Expected:*</strong> {activeDefect.expected}
                </div>
                <div>
                  <strong className="text-[#ffb4ab]">*Actual:*</strong> {activeDefect.actual}
                </div>
                <div className="text-[#908fa0] pt-1 border-t border-[#464554]/20">
                  <strong className="text-[#d4e4fa]">*Steps to Reproduce:*</strong>
                </div>
                {activeDefect.steps.map((st, sIdx) => (
                  <div key={sIdx} className="text-[11px] pl-2 border-l border-[#8083ff]/40">
                    {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Playwright Repro Locator Code box */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-code-sm text-[#908fa0]">
                <span>Playwright Repro Locator</span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(activeDefect.playwrightCode);
                    onTriggerToast('Playwright snippet copied!');
                  }}
                  className="text-[#4cd7f6] hover:text-white"
                >
                  Copy Snippet
                </button>
              </div>
              <pre className="bg-[#010f1f] p-2.5 rounded border border-[#464554]/40 font-code-sm text-xs text-[#4edea3] overflow-x-auto">
                {activeDefect.playwrightCode}
              </pre>
            </div>

            {/* JSON Telemetry Payload */}
            <div className="space-y-1">
              <span className="text-xs font-code-sm text-[#908fa0]">JSON Telemetry Payload (SQLite)</span>
              <pre className="bg-[#010f1f] p-2 rounded border border-[#464554]/30 font-code-sm text-[11px] text-[#908fa0] max-h-24 overflow-y-auto custom-scrollbar">
                {JSON.stringify(activeDefect.jsonPayload, null, 2)}
              </pre>
            </div>
          </div>

          {/* Inspector Action Footer */}
          <div className="pt-2 border-t border-[#464554]/20 flex items-center justify-between font-code-sm text-xs">
            <button
              onClick={() => onTriggerToast(`Synced ${activeDefect.id} directly to Jira Project QA-DEMO`)}
              className="px-3 py-1.5 rounded bg-[#1c2b3c] text-[#d4e4fa] hover:bg-[#273647] border border-[#464554]/40 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">sync_alt</span>
              <span>Sync to Jira API</span>
            </button>
            <button
              onClick={() => onTriggerToast(`Defect ${activeDefect.id} telemetry saved to local.db`)}
              className="px-3 py-1.5 rounded bg-[#8083ff] text-[#1000a9] hover:bg-white font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">save</span>
              <span>Save Telemetry</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
