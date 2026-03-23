// ===========================================
// SOF AI-Enabled SOC CMM — Interactive Assessment
// ===========================================
(function () {
  'use strict';

  var STORAGE_KEY = 'sof-cmm-assessment';
  var SESSION_PREFIX = 'sof-cmm-session-';
  var CUSTOMER_KEY = 'sof-notes-customer'; // shared with notes panel

  // Level value → maturity band (0-indexed into states[])
  // 0,50 → 0 (Not started / Starting)
  // 100,150 → 1 (Planning / Developing)
  // 200,250 → 2 (Rolling out / Standardizing)
  // 300,350,400 → 3 (Operating / Optimizing)
  var LEVEL_OPTIONS = [0, 50, 100, 150, 200, 250, 300, 350, 400];
  var BAND_LABELS = [
    'Not Started / Starting',
    'Planning / Developing',
    'Rolling Out / Standardizing',
    'Operating / Optimizing'
  ];
  var BAND_CSS = ['cmm-band-1', 'cmm-band-2', 'cmm-band-3', 'cmm-band-4'];

  function levelToBand(v) {
    if (v === null || v === undefined || v === '') return -1;
    v = parseInt(v, 10);
    if (v <= 50) return 0;
    if (v <= 150) return 1;
    if (v <= 250) return 2;
    return 3;
  }

  // Category icon map
  var CAT_ICONS = {
    'People': 'fluent-emoji-flat:busts-in-silhouette',
    'Process': 'fluent-emoji-flat:gear',
    'Technology / Platform': 'fluent-emoji-flat:desktop-computer',
    'Data / Telemetry & TI': 'fluent-emoji-flat:bar-chart',
    'Governance / Compliance': 'fluent-emoji-flat:classical-building',
    'Ops Model & Services': 'fluent-emoji-flat:hammer-and-wrench',
    'Metrics / Outcomes': 'fluent-emoji-flat:bullseye'
  };

  // ---- Verbatim data from SOF-AI-Enabled SOC CMM.xlsx ----
  var DATA = [
    {
      cat: 'People',
      items: [
        { id: 1, sub: 'Multi-skilled SOC analysts', desc: 'Tiered SOC roles are blended to reduce handoffs; analysts are cross-trained to handle incidents end-to-end in a pod model.', target: 250, states: ['Roles unclear; SOC tiers work in silos.', 'Skills matrix defined; cross-training plan in place.', 'Majority of analysts cross-trained; fewer handoffs across incident lifecycle.', 'Full pod model implemented for investigations; workload balancing largely automated.'] },
        { id: 2, sub: 'Embedded security engineering', desc: 'Dedicated \u201Cbehind the glass\u201D security engineering team exists to manage SOC tooling, content, and automation (platform integration, analytics tuning, etc.).', target: 250, states: ['No dedicated security engineering function (reactive or ad-hoc only).', 'Part-time or ad-hoc engineering support assigned to the SOC.', 'Dedicated SecEng team in place managing integrations, detection content, etc.', 'Proactive SecEng function fully integrated; backlog handled with metrics-driven improvements.'] },
        { id: 3, sub: 'Analyst augmentation with GenAI', desc: 'SOC analysts leverage generative AI (e.g. Security Copilot) to accelerate data gathering, triage, and investigation steps, appropriate to their roles.', target: 250, states: ['No access to generative AI tools for SOC analysts.', 'Initial pilots of Copilot/GenAI assistants with a limited subset of analysts.', 'GenAI assistants broadly available; all analysts trained on AI-driven workflows.', 'GenAI embedded in daily operations for triage/investigation; measurable gains in analyst efficiency and insights.'] },
        { id: 4, sub: 'AI & automation skills development', desc: 'The organization develops new skills for managing AI-driven and autonomous operations \u2013 e.g. prompt engineering, agent orchestration, AI ethics and reliability oversight.', target: 250, states: ['Necessary AI/automation skills are absent in the team.', 'Training plans established to build AI and autonomous operations skills.', 'Core team trained in AI governance, agent orchestration, and related skills.', 'AI and autonomy skills adopted SOC-wide; staff proficient in overseeing and co-working with AI agents.'] }
      ]
    },
    {
      cat: 'Process',
      items: [
        { id: 5, sub: 'Standardized & streamlined processes', desc: 'Key SOC processes (monitoring, investigation, response, etc.) are documented as SOPs with clear entry/exit criteria, roles (RACI), and escalation paths.', target: 250, states: ['Processes ad hoc and inconsistent; roles & handoffs unclear.', 'Core SOC procedures drafted and roles/responsibilities defined (SOPs in development).', 'Standard operating procedures approved and in use; workflows clearly defined and enforced.', 'Processes routinely reviewed and optimized (metrics-driven improvements, minimal friction).'] },
        { id: 6, sub: 'Proactive exposure & posture management', desc: 'The SOC actively monitors and reduces the organization\u2019s attack surface (vulnerability management, cloud configuration, etc.), not just reacting to incidents.', target: 250, states: ['Exposure management is purely reactive (patching after incidents).', 'Vulnerability scanning tools selected and basic remediation runbooks drafted.', 'Regular scans and attack surface reviews in place; remediation SLAs defined and tracked.', 'Continuous exposure management with risk-based prioritization; configuration drift promptly addressed.'] },
        { id: 7, sub: 'AI-assisted investigation & response', desc: 'Analysts use natural-language interfaces and AI suggestions to handle incidents (e.g. \u201Cexplain this alert\u201D or timeline generation); prompt books ensure consistency.', target: 250, states: ['No AI assistance in investigations or response (all steps manual).', 'Initial use of AI in investigations (some prompt patterns/assistants piloted).', 'Defined prompt playbooks and AI-driven suggestions integrated into SOPs for triage/response.', 'Predominantly AI-driven workflows: analysts interact via Copilot/AI for most steps, with humans validating high-impact actions.'] },
        { id: 8, sub: 'Agentic workflows & continuous learning', desc: 'Autonomous \u201Csecurity agent\u201D workflows execute complex tasks (threat hunts, IR actions) based on goals, and improve over time by learning from outcomes.', target: 250, states: ['All investigation and response tasks executed manually (no autonomous workflows).', 'Candidate use cases for autonomous agents identified (design of agent workflows in progress).', 'Autonomous agent-driven workflows operating for specific tasks (goal-driven sequences with supervised self-evaluation).', 'Agents continuously learn from each engagement, improving efficacy with minimal human intervention.'] },
        { id: 32, sub: 'Automated Incident Response & Containment', desc: 'XDR platforms can automatically contain threats: predictive shielding anticipates attacker moves; automatic attack disruption extends containment to third-party systems.', target: 250, states: ['All incident containment actions are manual (no automation).', 'Basic automated scripts for containment exist for a few scenarios but usage is limited.', 'Autonomous containment enabled for common threats including some third-party integrations; analysts supervise.', 'Predominantly AI-driven, preemptive containment in place \u2013 the SOC auto-hardens assets and disrupts attacks with minimal human intervention.'] },
        { id: 33, sub: 'DevSecOps & Supply Chain Security', desc: 'The SOC extends into development: security tools integrate with code repositories and CI/CD pipelines to catch vulnerabilities early and tie them to runtime incidents.', target: 250, states: ['Development vulnerabilities handled separately by developers (SOC not involved in code security).', 'Initial coordination between SOC and development teams established but no formal integration.', 'Security scanning in CI/CD connected to SOC monitoring \u2013 critical code flaws trigger alerts; supply chain risks incorporated into workflows.', 'Fully integrated DevSecOps workflow: code and pipeline security is a standard part of SOC operations with AI-assisted remediation.'] }
      ]
    },
    {
      cat: 'Technology / Platform',
      items: [
        { id: 9, sub: 'Unified SOC platform (XDR + SIEM)', desc: 'A unified security operations platform integrates XDR and SIEM capabilities, providing a single console for detection, investigation, and response across environments.', target: 250, states: ['Disparate security tools (XDR, SIEM, etc.) with no unified interface.', 'Core XDR and SIEM platforms deployed; initial integration in progress.', 'Mostly unified SOC interface achieved (cross-product incident views and shared workspaces).', 'Fully integrated \u201Csingle pane of glass\u201D SOC platform (seamless interface, cross-tool actions in one place).'] },
        { id: 10, sub: 'Cloud Security Posture Management', desc: 'Visibility and security configuration management across multi-cloud assets (Azure, AWS, GCP) are unified in the SOC, including serverless and cloud workloads.', target: 250, states: ['No centralized visibility into cloud asset posture (cloud security handled in silos).', 'Cloud asset inventory being planned; basic posture assessment processes defined.', 'Asset inventory and risk scoring in place for primary clouds; misconfigurations identified routinely.', 'Unified multi-cloud posture management operational, with continuous monitoring and risk scoring of all cloud resources.'] },
        { id: 11, sub: 'Identity Security & Phishing Defense', desc: 'Strong identity-focused security practices: enterprise-wide phishing-resistant MFA, user behavior analytics, and training to counter advanced phishing (including deepfakes).', target: 250, states: ['MFA not implemented (or only basic); phishing training ad-hoc.', 'Organization planning broad MFA rollout and formal phishing awareness training.', 'MFA enforced for most users; phishing defenses include training and anomaly detection.', 'Phishing-resistant MFA deployed enterprise-wide; AI-driven detection of impersonation actively protecting users.'] },
        { id: 12, sub: 'AI-assisted analysis & threat hunting', desc: 'The SOC employs generative AI agents to sift logs, identify patterns, and assist in threat hunting and detection engineering.', target: 250, states: ['No AI assistance in log analysis or threat hunting (fully manual).', 'Pilot projects using AI for basic alert triage or log analysis in development.', 'Copilot/AI agents being rolled out to aid threat hunting and analysis.', 'AI agents fully integrated into detection and hunting workflows; non-expert analysts launch complex hunts via natural language.'] }
      ]
    },
    {
      cat: 'Data / Telemetry & TI',
      items: [
        { id: 13, sub: 'End-to-end telemetry coverage', desc: 'Comprehensive telemetry collection across endpoints, identities, email, network, and cloud (and OT/ICS where applicable) to ensure no blind spots.', target: 275, states: ['Only minimal security logs/sources are collected.', 'Coverage plan established to onboard all critical telemetry sources.', '~80\u201390% of required data sources sending telemetry; remaining gaps identified.', '>90% of environments covered by telemetry; gaps automatically flagged for remediation.'] },
        { id: 14, sub: 'Normalization & correlation', desc: 'Security data is normalized to common schemas and correlated, enabling entity-centric and incident-centric views with context attached to alerts.', target: 275, states: ['Logs are siloed and unnormalized (raw data only, difficult to cross-correlate).', 'Basic normalization in place for some data sources.', 'Unified schema adopted; events from multiple sources correlated into incidents and entity profiles.', 'Richly correlated incidents with entity graphs and context provide high-fidelity alerts.'] },
        { id: 15, sub: 'Threat Intelligence & Adversary Tracking', desc: 'Threat intelligence feeds (IOCs, actor TTPs) are integrated, and the SOC tracks adversary campaigns to detect and proactively hunt threats.', target: 275, states: ['No threat intelligence integrated into SOC monitoring.', 'One threat feed/source piloted in SOC tools.', 'Multiple threat intel sources actively integrated (indicators matched, actor profiles available).', 'Threat intel fully operationalized \u2013 feeds from many sources inform detections; adversary campaigns tracked and used to adapt defenses.'] },
        { id: 16, sub: 'Knowledge capture', desc: 'The SOC captures investigation context, summaries, and rationales in case records. Knowledge is indexed for future retrieval, aiding in learning from past incidents.', target: 275, states: ['Lessons and investigation details are not systematically captured.', 'Templates defined for capturing key findings and decisions in incident reports.', 'Investigation summaries and analyst reasoning automatically captured for each case.', 'Past case knowledge leveraged in new investigations (similar cases retrieved; institutional memory informs ops).'] },
        { id: 17, sub: 'Continuous learning from telemetry', desc: 'Machine learning models continuously analyze telemetry to detect anomalies across users, endpoints, and environments; models retrain and improve.', target: 275, states: ['No machine-learning-based anomaly detection on SOC data.', 'Plan in development to deploy anomaly detection pipelines (ML models) on security data.', 'Initial ML jobs running, detecting anomalies across entities and environments.', 'Continuous ML analytics tuned and improving over time (drift monitored; models adapt to new patterns).'] }
      ]
    },
    {
      cat: 'Governance / Compliance',
      items: [
        { id: 18, sub: 'Cyber governance & compliance', desc: 'Cybersecurity managed as a business risk: regular board/executive oversight, tracked via key metrics and aligned with major frameworks/regulations (NIST CSF 2.0, EU AI Act).', target: 300, states: ['Cyber risk is not discussed at board level; minimal executive reporting.', 'Planning to report cybersecurity posture to executives and align with emerging standards.', 'Standardized cyber metrics reported to leadership; partial adoption of new frameworks.', 'Full integration of cyber risk into governance (board-level dashboards, compliance with NIST CSF 2.0, EU AI Act; AI risk management included).'] },
        { id: 19, sub: 'Operational governance & auditability', desc: 'Day-to-day SOC operations have governance controls: changes to detection content or playbooks follow change control, and evidence is captured for audits.', target: 300, states: ['No formal change control for SOC content; evidence collection ad hoc.', 'Change management process defined (CAB for analytics/automation changes) and evidence templates introduced.', 'Change control enforced for SOC updates (approval gates for rules, runbooks); investigation evidence captured by default.', 'Fully auditable operations: change decisions metrics-driven with rollback plans; evidence and activity logs automatically collected.'] },
        { id: 20, sub: 'Generative AI governance & oversight', desc: 'Policies and guardrails for SOC use of generative AI: prompt content reviewed, outputs logged and validated, human oversight mandated for high-impact decisions.', target: 300, states: ['No specific policies or logging for AI assistance usage in the SOC.', 'Draft AI usage policy in place; partial logging of AI outputs.', 'GenAI usage governed with defined approval checkpoints and full logging of prompts and AI-generated content.', 'Regular audits of AI assistance outputs and decisions; prompt policies and validation checks continuously refined.'] },
        { id: 21, sub: 'AI agent governance & lifecycle', desc: 'Autonomous AI agents are treated as managed identities: each agent inventoried, given appropriate access, and subject to lifecycle controls and monitoring.', target: 300, states: ['No framework to govern AI agents; bots/agents operate without oversight.', 'Inventory of AI agents and their access is being planned (defining ownership and controls).', 'Rolling out Entra Agent ID or equivalent: agents registered with access policies and lifecycle procedures.', 'Full governance in place for AI agents as first-class identities \u2013 managed and reviewed like human admins.'] }
      ]
    },
    {
      cat: 'Ops Model & Services',
      items: [
        { id: 22, sub: 'Resilience & recovery preparedness', desc: 'Robust incident response extends to recovery: DR plans, backups, and business continuity well-established and regularly drilled, including AI-driven scenarios.', target: 250, states: ['No formal disaster recovery (DR) or business continuity plans in place.', 'DR plan development underway; initial tabletop exercises planned.', 'Standard DR/BC procedures documented and tested regularly (e.g. annual DR drills).', 'Mature resilience program with continuous improvement; sophisticated scenarios (including AI-driven incidents) tested.'] },
        { id: 23, sub: 'SOC service catalog', desc: 'The SOC has a defined catalog of services (monitoring, threat hunting, IR, etc.), with associated SLAs/OLAs for internal customers.', target: 250, states: ['No formal definition of SOC services (capabilities not clearly communicated).', 'Draft SOC service catalog created (key services identified with basic descriptions).', 'Service catalog published, including SLAs/OLAs for services.', 'Service offerings reviewed regularly and adjusted based on usage and feedback; performance tracked.'] },
        { id: 24, sub: 'SOC operating model clarity', desc: 'The SOC operating model (staffing, shifts, on-call rotations, handoff to incident/crisis teams) is clearly defined and practiced.', target: 250, states: ['Roles/responsibilities and handoff points in SOC operations are unclear.', 'Staffing model and on-call rotations drafted (roles and escalation paths defined on paper).', 'Roster and shift schedule implemented; handoffs to incident management are predictable and smooth.', 'Well-tuned operating model with data-driven adjustments (staffing analytics, proven surge playbooks).'] },
        { id: 25, sub: 'AI integration program & norms', desc: 'A structured program exists to adopt Copilot/AI in SOC workflows (use-case selection, training) alongside defined norms for when to trust AI output vs. escalate.', target: 250, states: ['No formal plan for integrating AI tools into SOC processes.', 'Roadmap created for Copilot/AI adoption; initial training and AI usage guidelines drafted.', 'Active AI adoption program: analysts trained by role; clear norms for how AI suggestions are verified or escalated.', 'Benefits of AI integration tracked and program expanded; AI usage policies continuously calibrated.'] },
        { id: 26, sub: 'Autonomous SOC operations planning', desc: 'The organization has a roadmap from supervised-AI to fully autonomous SOC operations, with defined milestones, guardrails, and human-override provisions at each stage.', target: 250, states: ['No vision or plan for autonomy in SOC operations.', 'Conceptual roadmap toward greater SOC autonomy drafted (stages from manual to fully autonomous identified).', 'Detailed plan in place with milestones and guardrails for each autonomy stage (pilot autonomous tasks underway).', 'Autonomous SOC operations progressing per plan; guardrails and overrides proven, with metrics tracking the journey from assisted to fully autonomous.'] }
      ]
    },
    {
      cat: 'Metrics / Outcomes',
      items: [
        { id: 27, sub: 'Efficiency metrics (MTTD/MTTR)', desc: 'Standard efficiency metrics are tracked: Mean Time to Detect, Mean Time to Respond, alert volumes, and false positive rates, with improvement targets.', target: 250, states: ['No formal tracking of MTTD, MTTR, or alert metrics.', 'Selected metrics identified and initial baselines being measured.', 'MTTD, MTTR, and other metrics tracked regularly with defined improvement targets.', 'Metrics actively drive operational improvements; automated dashboards with trend analysis and alerts on regressions.'] },
        { id: 28, sub: 'Coverage & quality metrics', desc: 'Metrics for detection coverage (% of MITRE ATT&CK techniques covered) and detection quality (signal-to-noise ratio, analytic tuning) are maintained.', target: 250, states: ['No measurement of detection coverage or quality.', 'Initial mapping of detections to ATT&CK (or similar); baseline quality metrics being defined.', 'Detection coverage metrics tracked (e.g. % ATT&CK coverage); analytics tuned to improve signal-to-noise.', 'Comprehensive coverage and quality dashboards; detection gaps automatically identified and addressed in engineering sprints.'] },
        { id: 29, sub: 'Business outcome metrics', desc: 'SOC effectiveness is measured in business terms: incidents prevented or contained before impact, risk reduction, and cost savings reported to leadership.', target: 250, states: ['SOC outcomes not translated into business metrics.', 'Framework for business outcome reporting defined (linking SOC activity to risk reduction).', 'Business outcome metrics captured and reported periodically (e.g. incidents contained before customer impact, cost of breaches).', 'SOC directly demonstrates business value through quantified risk reduction, operational efficiency gains, and executive-facing dashboards.'] },
        { id: 30, sub: 'Analyst performance metrics', desc: 'Individual and team performance of SOC analysts is measured (cases handled, quality of investigations) to inform training and recognize excellence.', target: 250, states: ['No formal measurement of analyst performance or case quality.', 'Performance criteria and quality benchmarks for analysts defined.', 'Analyst metrics tracked (caseload, quality reviews) and used to inform training plans.', 'Data-driven performance management: analyst dashboards, peer reviews, and gamification/recognition programs in place.'] },
        { id: 31, sub: 'Autonomous operations metrics', desc: 'Metrics specific to AI/autonomous operations maturity: e.g. % of incidents handled fully by automation, accuracy/confidence of AI decisions, human override rates.', target: 250, states: ['No metrics to measure AI or autonomous actions in SOC.', 'KPIs for autonomous operations defined (e.g. % auto-resolved incidents, AI accuracy).', 'Autonomous operations metrics being collected; baselines established for AI-driven actions.', 'Autonomous ops metrics integrated into SOC reporting; continuous optimization based on AI confidence, override rates, and auto-resolved percentages.'] }
      ]
    }
  ];

  // Flatten count
  var TOTAL = 0;
  DATA.forEach(function (g) { TOTAL += g.items.length; });

  // ---- State ----
  var state = { responses: {} };

  function responseKey(gi, ii) { return gi + '-' + ii; }

  function getCustomer() {
    try { return localStorage.getItem(CUSTOMER_KEY) || ''; } catch (e) { return ''; }
  }
  function setCustomer(name) {
    try { localStorage.setItem(CUSTOMER_KEY, name); } catch (e) { /* ignore */ }
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) state = JSON.parse(raw);
    } catch (e) { /* ignore */ }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
    updateProgress();
  }

  // ---- Progress ----
  function updateProgress() {
    var count = 0;
    for (var k in state.responses) {
      if (state.responses[k] && state.responses[k].level !== '' && state.responses[k].level !== undefined) count++;
    }
    var pct = Math.round((count / TOTAL) * 100);
    var countEl = document.getElementById('cmm-progress-count');
    var pctEl = document.getElementById('cmm-progress-pct');
    var fillEl = document.getElementById('cmm-progress-fill');
    if (countEl) countEl.textContent = count + ' / ' + TOTAL + ' assessed';
    if (pctEl) pctEl.textContent = pct + '%';
    if (fillEl) fillEl.style.width = pct + '%';
  }

  // ---- Render ----
  function render() {
    var container = document.getElementById('cmm-container');
    if (!container) return;
    container.innerHTML = '';

    DATA.forEach(function (group, gi) {
      var icon = CAT_ICONS[group.cat] || 'fluent-emoji-flat:clipboard';

      // Section wrapper
      var section = document.createElement('div');
      section.className = 'cmm-section';

      // Header button (collapsible — starts collapsed)
      var header = document.createElement('button');
      header.className = 'cmm-cat-header';
      header.setAttribute('aria-expanded', 'false');

      // Count assessed in this group
      var assessedCount = 0;
      group.items.forEach(function (_, ii) {
        var k = responseKey(gi, ii);
        if (state.responses[k] && state.responses[k].level !== '' && state.responses[k].level !== undefined) assessedCount++;
      });

      header.innerHTML =
        '<span class="cmm-cat-chevron">\u25B8</span>' +
        '<iconify-icon icon="' + icon + '" width="28" height="28" style="vertical-align:middle"></iconify-icon> ' +
        '<span class="cmm-cat-title">' + group.cat + '</span>' +
        '<span class="cmm-cat-count">' + assessedCount + ' / ' + group.items.length + '</span>';

      var body = document.createElement('div');
      body.className = 'cmm-cat-body';
      body.style.display = 'none'; // start collapsed

      header.addEventListener('click', (function (b, h) {
        return function () {
          var open = b.style.display !== 'none';
          b.style.display = open ? 'none' : '';
          h.setAttribute('aria-expanded', String(!open));
          h.querySelector('.cmm-cat-chevron').textContent = open ? '\u25B8' : '\u25BE';
        };
      })(body, header));

      // Render each capability card
      group.items.forEach(function (item, ii) {
        var key = responseKey(gi, ii);
        var resp = state.responses[key] || { level: '', notes: '' };
        var currentBand = levelToBand(resp.level);
        var targetBand = levelToBand(item.target);
        var isAssessed = (resp.level !== '' && resp.level !== undefined);

        var card = document.createElement('div');
        card.className = 'cmm-card' + (isAssessed ? ' cmm-card--assessed' : '');

        // Build level select options
        var selectOpts = '<option value="">\u2014 Select \u2014</option>';
        LEVEL_OPTIONS.forEach(function (lv) {
          var sel = (isAssessed && parseInt(resp.level, 10) === lv) ? ' selected' : '';
          selectOpts += '<option value="' + lv + '"' + sel + '>' + lv + '</option>';
        });

        // Gap info
        var gapHtml = '';
        if (isAssessed) {
          var gap = parseInt(resp.level, 10) - item.target;
          if (gap >= 0) {
            gapHtml = '<span class="cmm-badge cmm-badge-met">\u2713 On/Above Target</span>';
          } else {
            gapHtml = '<span class="cmm-badge cmm-badge-gap">Gap: ' + gap + '</span>';
          }
        }

        // Build the 4 maturity band boxes
        var bandsHtml = '<div class="cmm-bands">';
        var bandRanges = ['0\u201350', '100\u2013150', '200\u2013250', '300\u2013400'];
        for (var si = 0; si < 4; si++) {
          var isActive = (currentBand === si);
          var isTarget = (targetBand === si);
          var cls = 'cmm-band cmm-band-' + (si + 1) + (isActive ? ' cmm-band--active' : '') + (isTarget ? ' cmm-band--target' : '');
          bandsHtml +=
            '<div class="' + cls + '">' +
              '<div class="cmm-band-header">' +
                '<span class="cmm-band-range">' + bandRanges[si] + '</span>' +
                '<span class="cmm-band-name">' + BAND_LABELS[si] + '</span>' +
              '</div>' +
              '<div class="cmm-band-desc">' + escapeHtml(item.states[si]) + '</div>' +
              (isTarget ? '<div class="cmm-band-target-tag">\u25C6 TARGET</div>' : '') +
            '</div>';
        }
        bandsHtml += '</div>';

        card.innerHTML =
          '<div class="cmm-card-top">' +
            '<div class="cmm-card-title">' +
              '<span class="cmm-card-name">' + escapeHtml(item.sub) + '</span>' +
            '</div>' +
            '<div class="cmm-card-controls">' +
              '<select class="cmm-level-select" data-key="' + key + '">' + selectOpts + '</select>' +
              gapHtml +
            '</div>' +
          '</div>' +
          '<p class="cmm-card-desc">' + escapeHtml(item.desc) + '</p>' +
          bandsHtml +
          '<textarea class="cmm-card-notes" data-key="' + key + '" placeholder="Discussion notes\u2026" rows="2">' + escapeHtml(resp.notes) + '</textarea>';

        body.appendChild(card);
      });

      section.appendChild(header);
      section.appendChild(body);
      container.appendChild(section);
    });

    // Wire up events via delegation
    container.addEventListener('change', function (e) {
      if (e.target.classList.contains('cmm-level-select')) {
        var key = e.target.getAttribute('data-key');
        if (!state.responses[key]) state.responses[key] = { level: '', notes: '' };
        state.responses[key].level = e.target.value;
        saveState();
        render();
      }
    });

    container.addEventListener('input', function (e) {
      if (e.target.classList.contains('cmm-card-notes')) {
        var key = e.target.getAttribute('data-key');
        if (!state.responses[key]) state.responses[key] = { level: '', notes: '' };
        state.responses[key].notes = e.target.value;
        saveState();
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ---- Session Management ----
  function saveSession() {
    saveState();
    var name = prompt('Session name:', getCustomer() || 'CMM ' + new Date().toLocaleDateString());
    if (!name) return;
    try {
      localStorage.setItem(SESSION_PREFIX + name, JSON.stringify(state));
      alert('Session "' + name + '" saved.');
    } catch (e) { alert('Save failed: ' + e.message); }
  }

  function loadSession() {
    var sessions = [];
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k.indexOf(SESSION_PREFIX) === 0) sessions.push(k.substring(SESSION_PREFIX.length));
    }
    if (!sessions.length) { alert('No saved sessions found.'); return; }
    var choice = prompt('Available sessions:\n\n' + sessions.map(function (s, i) { return (i + 1) + '. ' + s; }).join('\n') + '\n\nEnter session name or number:');
    if (!choice) return;
    var name = choice;
    var idx = parseInt(choice, 10);
    if (!isNaN(idx) && idx >= 1 && idx <= sessions.length) name = sessions[idx - 1];
    var raw = localStorage.getItem(SESSION_PREFIX + name);
    if (!raw) { alert('Session "' + name + '" not found.'); return; }
    state = JSON.parse(raw);
    var custInput = document.getElementById('cmm-customer-input');
    if (custInput) custInput.value = getCustomer();
    render();
    updateProgress();
  }

  function newSession() {
    if (!confirm('Start a new assessment? Current unsaved data will be lost.')) return;
    state = { responses: {} };
    localStorage.removeItem(STORAGE_KEY);
    var custInput = document.getElementById('cmm-customer-input');
    if (custInput) custInput.value = getCustomer();
    render();
    updateProgress();
  }

  function expandAll() {
    var bodies = document.querySelectorAll('#cmm-container .cmm-cat-body');
    var headers = document.querySelectorAll('#cmm-container .cmm-cat-header');
    for (var i = 0; i < bodies.length; i++) {
      bodies[i].style.display = '';
      headers[i].setAttribute('aria-expanded', 'true');
      headers[i].querySelector('.cmm-cat-chevron').textContent = '\u25BE';
    }
  }

  function collapseAll() {
    var bodies = document.querySelectorAll('#cmm-container .cmm-cat-body');
    var headers = document.querySelectorAll('#cmm-container .cmm-cat-header');
    for (var i = 0; i < bodies.length; i++) {
      bodies[i].style.display = 'none';
      headers[i].setAttribute('aria-expanded', 'false');
      headers[i].querySelector('.cmm-cat-chevron').textContent = '\u25B8';
    }
  }

  function exportMarkdown() {
    saveState();
    var lines = [];
    var customer = getCustomer() || 'Unknown Customer';
    lines.push('# SOF AI-Enabled SOC CMM Assessment \u2014 ' + customer);
    lines.push('');
    lines.push('**Date:** ' + new Date().toLocaleDateString());
    lines.push('');

    DATA.forEach(function (group, gi) {
      lines.push('## ' + group.cat);
      lines.push('');
      group.items.forEach(function (item, ii) {
        var key = responseKey(gi, ii);
        var resp = state.responses[key] || {};
        var lvl = (resp.level !== '' && resp.level !== undefined) ? resp.level : '_Not assessed_';
        var band = levelToBand(resp.level);
        var bandLabel = band >= 0 ? BAND_LABELS[band] : 'Not assessed';

        lines.push('### ' + item.sub);
        lines.push('');
        lines.push('**Description:** ' + item.desc);
        lines.push('');
        lines.push('**Current Level:** ' + lvl + ' (' + bandLabel + ')');
        lines.push('');
        lines.push('**Target:** ' + item.target + ' (' + BAND_LABELS[levelToBand(item.target)] + ')');
        lines.push('');
        if (resp.level !== '' && resp.level !== undefined) {
          var gap = parseInt(resp.level, 10) - item.target;
          lines.push('**Gap:** ' + (gap >= 0 ? '+' : '') + gap);
          lines.push('');
        }
        if (resp.notes) {
          lines.push('**Notes:** ' + resp.notes);
          lines.push('');
        }
      });
    });

    // Summary table
    lines.push('---');
    lines.push('');
    lines.push('## Summary');
    lines.push('');
    lines.push('| Category | Capability | Level | Band | Target | Gap |');
    lines.push('|:---|:---|:---:|:---|:---:|:---:|');
    DATA.forEach(function (group, gi) {
      group.items.forEach(function (item, ii) {
        var key = responseKey(gi, ii);
        var resp = state.responses[key] || {};
        var lvl = (resp.level !== '' && resp.level !== undefined) ? resp.level : '\u2014';
        var band = levelToBand(resp.level);
        var bandLabel = band >= 0 ? BAND_LABELS[band] : '\u2014';
        var gap = (resp.level !== '' && resp.level !== undefined) ? (parseInt(resp.level, 10) - item.target) : '\u2014';
        lines.push('| ' + group.cat + ' | ' + item.sub + ' | ' + lvl + ' | ' + bandLabel + ' | ' + item.target + ' | ' + gap + ' |');
      });
    });

    var md = lines.join('\n');
    // Download as .md file
    var blob = new Blob([md], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'SOF-CMM-Assessment-' + (customer.replace(/[^a-zA-Z0-9]/g, '_') || 'export') + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ---- Init ----
  function init() {
    loadState();
    var custInput = document.getElementById('cmm-customer-input');
    if (custInput) {
      custInput.value = getCustomer();
      custInput.addEventListener('input', function () {
        setCustomer(custInput.value);
      });
    }
    render();
    updateProgress();
  }

  // Public API
  window.CMM = {
    saveSession: saveSession,
    loadSession: loadSession,
    newSession: newSession,
    expandAll: expandAll,
    collapseAll: collapseAll,
    exportMarkdown: exportMarkdown
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
