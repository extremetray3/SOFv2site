---
title: "CMM Assessment"
layout: default
nav_order: 14
---

# <iconify-icon icon="fluent-emoji-flat:bar-chart" width="36" height="36" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> SOF AI-Enabled SOC — Capability Maturity Model
{: .no_toc }

An interactive maturity assessment aligned to the SOF 2026 AI-Enabled SOC framework. For each capability, select the **current level** (0–400), review how it maps to the four maturity bands, and capture discussion notes. All responses are saved locally in your browser.
{: .fs-5 .fw-300 }

---

<div class="cmm-legend">
  <span class="cmm-legend-item cmm-band-1">0–50: Not Started / Starting</span>
  <span class="cmm-legend-item cmm-band-2">100–150: Planning / Developing</span>
  <span class="cmm-legend-item cmm-band-3">200–250: Rolling Out / Standardizing</span>
  <span class="cmm-legend-item cmm-band-4">300–400: Operating / Optimizing</span>
</div>

<div id="cmm-toolbar" class="qs-toolbar">
  <div class="qs-toolbar-row">
    <label class="qs-customer-label">
      <iconify-icon icon="fluent-emoji-flat:office-building" width="18" height="18"></iconify-icon>
      Customer:
      <input type="text" id="cmm-customer-input" class="qs-customer-input" placeholder="Customer name…" />
    </label>
    <button class="notes-toolbar-btn notes-save-session-btn" onclick="CMM.saveSession()">💾 Save Session</button>
    <button class="notes-toolbar-btn notes-load-session-btn" onclick="CMM.loadSession()">📂 Load Session</button>
    <button class="notes-toolbar-btn notes-clear-btn" onclick="CMM.newSession()">🔄 New</button>
    <button class="notes-toolbar-btn" onclick="CMM.expandAll()">⬇️ Expand All</button>
    <button class="notes-toolbar-btn" onclick="CMM.collapseAll()">⬆️ Collapse All</button>
    <button class="notes-toolbar-btn notes-export-btn" onclick="CMM.exportMarkdown()">📋 Export</button>
  </div>
</div>

<div id="cmm-progress" class="qs-progress-bar">
  <div class="qs-progress-stats">
    <span id="cmm-progress-count">0 / 33 assessed</span>
    <span id="cmm-progress-pct">0%</span>
  </div>
  <div class="qs-progress-track"><div id="cmm-progress-fill" class="qs-progress-fill"></div></div>
</div>

<div id="cmm-container"></div>

<script src="{{ '/assets/js/cmm.js' | relative_url }}"></script>
