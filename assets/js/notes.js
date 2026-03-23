(function () {
  'use strict';

  var STORAGE_PREFIX = 'sof-notes-';
  var CUSTOMER_KEY = 'sof-notes-customer';
  var DEBOUNCE_MS = 400;

  // --- Utility ---

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function getPageId() {
    return document.location.pathname.replace(/\//g, '_').replace(/(^_|_$)/g, '') || 'home';
  }

  function storageKey(pageId, headingSlug) {
    return STORAGE_PREFIX + pageId + '/' + headingSlug;
  }

  function loadNote(pageId, headingSlug) {
    try { return localStorage.getItem(storageKey(pageId, headingSlug)) || ''; }
    catch (e) { return ''; }
  }

  function saveNote(pageId, headingSlug, value) {
    try { localStorage.setItem(storageKey(pageId, headingSlug), value); }
    catch (e) { /* storage full or unavailable */ }
  }

  function getCustomer() {
    try { return localStorage.getItem(CUSTOMER_KEY) || ''; }
    catch (e) { return ''; }
  }

  function setCustomer(name) {
    try { localStorage.setItem(CUSTOMER_KEY, name); }
    catch (e) { /* ignore */ }
  }

  // --- Debounce ---

  function debounce(fn, ms) {
    var timer;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, ms);
    };
  }

  // --- Build notes controls ---

  function createNoteControl(heading, pageId) {
    var headingText = heading.textContent.trim();
    var slug = heading.id || slugify(headingText);
    var level = heading.tagName; // H2 or H3

    // Container
    var wrapper = document.createElement('div');
    wrapper.className = 'notes-control notes-level-' + level.toLowerCase();

    // Toggle button
    var btn = document.createElement('button');
    btn.className = 'notes-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Toggle notes for ' + headingText);

    var savedNote = loadNote(pageId, slug);
    var hasContent = !!savedNote;
    btn.innerHTML = '<span class="notes-icon">' + (hasContent ? '📝' : '✏️') + '</span>'
      + '<span class="notes-label">' + (hasContent ? 'Notes ✓' : 'Add Notes') + '</span>';

    // Collapsible panel — open by default if notes exist
    var panel = document.createElement('div');
    panel.className = 'notes-panel';
    panel.style.display = hasContent ? 'block' : 'none';
    if (hasContent) { btn.setAttribute('aria-expanded', 'true'); }

    var textarea = document.createElement('textarea');
    textarea.className = 'notes-textarea';
    textarea.placeholder = 'Notes for: ' + headingText;
    textarea.rows = 3;
    textarea.value = savedNote;

    // Auto-save on input
    var debouncedSave = debounce(function () {
      saveNote(pageId, slug, textarea.value);
      if (textarea.value) {
        btn.innerHTML = '<span class="notes-icon">📝</span>'
          + '<span class="notes-label">Notes ✓</span>';
      } else {
        btn.innerHTML = '<span class="notes-icon">✏️</span>'
          + '<span class="notes-label">Add Notes</span>';
      }
    }, DEBOUNCE_MS);

    textarea.addEventListener('input', debouncedSave);

    panel.appendChild(textarea);

    // Toggle behavior
    btn.addEventListener('click', function () {
      var expanded = panel.style.display !== 'none';
      panel.style.display = expanded ? 'none' : 'block';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) { textarea.focus(); }
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(panel);

    // Insert after heading
    heading.parentNode.insertBefore(wrapper, heading.nextSibling);
  }

  // --- Global toolbar ---

  function createToolbar(pageId) {
    var toolbar = document.createElement('div');
    toolbar.className = 'notes-toolbar';
    toolbar.id = 'notes-toolbar';

    // Customer name
    var custLabel = document.createElement('label');
    custLabel.className = 'notes-customer-label';
    custLabel.textContent = 'Customer: ';
    var custInput = document.createElement('input');
    custInput.type = 'text';
    custInput.className = 'notes-customer-input';
    custInput.placeholder = 'Customer name';
    custInput.value = getCustomer();
    custInput.addEventListener('input', debounce(function () {
      setCustomer(custInput.value);
    }, DEBOUNCE_MS));
    custLabel.appendChild(custInput);

    // Expand/collapse all
    var expandBtn = document.createElement('button');
    expandBtn.className = 'notes-toolbar-btn';
    expandBtn.type = 'button';
    expandBtn.textContent = 'Expand All Notes';
    expandBtn.addEventListener('click', function () {
      var panels = document.querySelectorAll('.notes-panel');
      var allOpen = true;
      for (var i = 0; i < panels.length; i++) {
        if (panels[i].style.display === 'none') { allOpen = false; break; }
      }
      for (var j = 0; j < panels.length; j++) {
        panels[j].style.display = allOpen ? 'none' : 'block';
      }
      var toggles = document.querySelectorAll('.notes-toggle');
      for (var k = 0; k < toggles.length; k++) {
        toggles[k].setAttribute('aria-expanded', String(!allOpen));
      }
      expandBtn.textContent = allOpen ? 'Expand All Notes' : 'Collapse All Notes';
    });

    // Export button
    var exportBtn = document.createElement('button');
    exportBtn.className = 'notes-toolbar-btn notes-export-btn';
    exportBtn.type = 'button';
    exportBtn.textContent = 'Export All Notes';
    exportBtn.addEventListener('click', exportAllNotes);

    // Save Session button
    var saveSessionBtn = document.createElement('button');
    saveSessionBtn.className = 'notes-toolbar-btn notes-save-session-btn';
    saveSessionBtn.type = 'button';
    saveSessionBtn.textContent = 'Save Session';
    saveSessionBtn.addEventListener('click', saveSession);

    // Load Session button
    var loadSessionBtn = document.createElement('button');
    loadSessionBtn.className = 'notes-toolbar-btn notes-load-session-btn';
    loadSessionBtn.type = 'button';
    loadSessionBtn.textContent = 'Load Session';
    loadSessionBtn.addEventListener('click', loadSession);

    // New Session button (clear everything)
    var newSessionBtn = document.createElement('button');
    newSessionBtn.className = 'notes-toolbar-btn notes-clear-btn';
    newSessionBtn.type = 'button';
    newSessionBtn.textContent = 'New Session';
    newSessionBtn.addEventListener('click', function () {
      if (!confirm('Start a new session? This will clear ALL notes across ALL pages and the customer name.')) return;
      clearAllNotes();
      // Reset UI on current page
      var textareas = document.querySelectorAll('.notes-textarea');
      for (var i = 0; i < textareas.length; i++) {
        textareas[i].value = '';
        textareas[i].dispatchEvent(new Event('input'));
      }
      var panels = document.querySelectorAll('.notes-panel');
      for (var j = 0; j < panels.length; j++) {
        panels[j].style.display = 'none';
      }
      var toggles = document.querySelectorAll('.notes-toggle');
      for (var k = 0; k < toggles.length; k++) {
        toggles[k].setAttribute('aria-expanded', 'false');
        toggles[k].innerHTML = '<span class="notes-icon">✏️</span><span class="notes-label">Add Notes</span>';
      }
      custInput.value = '';
      setCustomer('');
    });

    // Row 1: customer + session management
    var row1 = document.createElement('div');
    row1.className = 'notes-toolbar-row';
    row1.appendChild(custLabel);
    row1.appendChild(saveSessionBtn);
    row1.appendChild(loadSessionBtn);
    row1.appendChild(newSessionBtn);

    // Row 2: notes controls
    var row2 = document.createElement('div');
    row2.className = 'notes-toolbar-row';
    row2.appendChild(expandBtn);
    row2.appendChild(exportBtn);

    toolbar.appendChild(row1);
    toolbar.appendChild(row2);

    return toolbar;
  }

  // --- Export all notes across all pages ---

  function exportAllNotes() {
    var customer = getCustomer() || 'Unknown Customer';
    var now = new Date();
    var dateStr = now.toISOString().slice(0, 10);
    var lines = [];

    lines.push('# Discussion Notes — ' + customer);
    lines.push('**Date:** ' + dateStr);
    lines.push('**Site:** SOF 2026 | AI-Enabled SOC Briefing');
    lines.push('');

    // Gather all keys from localStorage
    var keys = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(STORAGE_PREFIX) === 0 && k !== CUSTOMER_KEY) {
          keys.push(k);
        }
      }
    } catch (e) { /* ignore */ }

    keys.sort();

    // Group by page
    var pages = {};
    for (var j = 0; j < keys.length; j++) {
      var val = localStorage.getItem(keys[j]);
      if (!val || !val.trim()) continue;

      var path = keys[j].substring(STORAGE_PREFIX.length);
      var slashIdx = path.indexOf('/');
      var pageKey = slashIdx > -1 ? path.substring(0, slashIdx) : path;
      var sectionKey = slashIdx > -1 ? path.substring(slashIdx + 1) : '(general)';

      if (!pages[pageKey]) pages[pageKey] = [];
      pages[pageKey].push({ section: sectionKey, notes: val.trim() });
    }

    var pageNames = Object.keys(pages);
    if (pageNames.length === 0) {
      alert('No notes to export.');
      return;
    }

    for (var p = 0; p < pageNames.length; p++) {
      var pageName = pageNames[p].replace(/_/g, ' / ').replace(/(^ \/|\/  $)/g, '');
      lines.push('---');
      lines.push('## ' + pageName);
      lines.push('');

      var sections = pages[pageNames[p]];
      for (var s = 0; s < sections.length; s++) {
        lines.push('### ' + sections[s].section.replace(/-/g, ' '));
        lines.push(sections[s].notes);
        lines.push('');
      }
    }

    // Download as markdown
    var filename = 'notes-' + slugify(customer) + '-' + dateStr + '.md';
    var blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- Save session (download JSON backup) ---

  function saveSession() {
    var data = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(STORAGE_PREFIX) === 0) {
          data[k] = localStorage.getItem(k);
        }
      }
      // Include customer name
      var cust = localStorage.getItem(CUSTOMER_KEY);
      if (cust) data[CUSTOMER_KEY] = cust;
    } catch (e) { /* ignore */ }

    if (Object.keys(data).length === 0) {
      alert('No session data to save.');
      return;
    }

    var customer = getCustomer() || 'session';
    var dateStr = new Date().toISOString().slice(0, 10);
    var filename = 'session-' + slugify(customer) + '-' + dateStr + '.json';
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- Load session (upload JSON backup) ---

  function loadSession() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', function () {
      if (!input.files || !input.files[0]) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        try {
          var data = JSON.parse(e.target.result);
          // Validate it looks like our data
          var validKeys = 0;
          for (var k in data) {
            if (k.indexOf(STORAGE_PREFIX) === 0 || k === CUSTOMER_KEY) validKeys++;
          }
          if (validKeys === 0) {
            alert('This file does not contain valid session data.');
            return;
          }
          if (!confirm('Load session? This will replace any current notes.')) return;
          // Clear existing notes first
          clearAllNotes();
          // Load new data
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              localStorage.setItem(key, data[key]);
            }
          }
          // Reload page to reflect loaded notes
          location.reload();
        } catch (err) {
          alert('Error reading session file.');
        }
      };
      reader.readAsText(input.files[0]);
    });
    input.click();
  }

  // --- Clear all notes across all pages ---

  function clearAllNotes() {
    try {
      var keysToRemove = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && (k.indexOf(STORAGE_PREFIX) === 0 || k === CUSTOMER_KEY)) {
          keysToRemove.push(k);
        }
      }
      for (var j = 0; j < keysToRemove.length; j++) {
        localStorage.removeItem(keysToRemove[j]);
      }
    } catch (e) { /* ignore */ }
  }

  // --- Init ---

  function init() {
    var content = document.querySelector('.main-content') || document.querySelector('#main-content') || document.querySelector('main') || document.body;
    var headings = content.querySelectorAll('h2, h3');

    if (headings.length === 0) return;

    var pageId = getPageId();

    // Add notes control to each heading
    for (var i = 0; i < headings.length; i++) {
      // Skip headings inside the notes toolbar or references sections
      if (headings[i].closest('.notes-toolbar') || headings[i].closest('.notes-control')) continue;
      createNoteControl(headings[i], pageId);
    }

    // Insert toolbar at top of content
    var toolbar = createToolbar(pageId);
    var firstHeading = content.querySelector('h1');
    if (firstHeading && firstHeading.nextSibling) {
      firstHeading.parentNode.insertBefore(toolbar, firstHeading.nextSibling);
    } else {
      content.insertBefore(toolbar, content.firstChild);
    }
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
