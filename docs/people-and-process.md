---
title: "7. People & Process"
layout: default
nav_order: 11
---

# <iconify-icon icon="fluent-emoji-flat:busts-in-silhouette" width="36" height="36" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> 7. People and Process – Adapting the Operating Model & Using the SOC CMM
{: .no_toc }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

Technology alone does not create an effective SOC. The advances described above demand changes in skills, processes, and governance, and benefit from a clear way to measure maturity.

---

## <iconify-icon icon="fluent-emoji-flat:graduation-cap" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Evolving Skills and Team Composition

The "analyst of the future" differs from yesterday's profile:

- <iconify-icon icon="fluent-emoji-flat:robot" width="18" height="18" style="vertical-align: middle;"></iconify-icon> **AI proficiency:** Not building models, but skillfully using Copilot and agents—prompting, validating outputs, and understanding limitations.

- <iconify-icon icon="fluent-emoji-flat:hammer-and-wrench" width="18" height="18" style="vertical-align: middle;"></iconify-icon> **Scripting and automation:** Ability to work with playbooks, APIs, and infrastructure-as-code. Many SOCs now maintain a SOC engineering function to manage automations, detections, and integrations.

- <iconify-icon icon="fluent-emoji-flat:cloud" width="18" height="18" style="vertical-align: middle;"></iconify-icon> **Cloud and DevOps literacy:** At least a subset of the team should have strong cloud and DevSecOps expertise to interpret cloud telemetry and collaborate with development and platform teams.

- <iconify-icon icon="fluent-emoji-flat:magnifying-glass-tilted-right" width="18" height="18" style="vertical-align: middle;"></iconify-icon> **Threat intel and hunting specialization:** Focused roles to track emerging threats and feed structured intelligence into detections, hunting plans, and agent playbooks.

- <iconify-icon icon="fluent-emoji-flat:speech-balloon" width="18" height="18" style="vertical-align: middle;"></iconify-icon> **Communication and stakeholder engagement:** Increased reporting expectations (board, regulators, customers) make clear, business-level communication skills essential for SOC leaders and selected analysts.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_25.png" alt="Evolving skills" class="slide-img" />
</figure>

---

## <iconify-icon icon="fluent-emoji-flat:gear" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Process Updates for AI and Automation

Existing processes need to adapt:

### Incident response playbooks

- Incorporate automated disruption and AI steps (e.g., "Validate automatic containment actions," "Request Copilot incident summary").
- Add explicit steps for assessing regulatory disclosure triggers and involving legal/comms.

### Content and detection management

- Treat AI-authored detections and queries like any other content: test them, review them, and promote them via a controlled process.
- Use version control (e.g., Git) and change management to track modifications, whether human- or AI-generated.

### Triage and handoff models

- If agents auto-triage certain alerts, redefine Tier 1/Tier 2 boundaries. Tier 1 may focus more on exceptions and complex cases rather than raw alert noise.

### Maintenance of AI and agent performance

- Schedule regular reviews of Copilot quality and agent behavior.
- Capture user feedback and integrate lessons learned into prompts, configurations, and training.

### Continuous improvement

- Establish a cadence (e.g., quarterly) for reviewing new platform features, threat trends, and regulatory changes.
- Update threat modeling to include AI misuse scenarios and cloud/supply-chain attack patterns.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_42.png" alt="Process updates" class="slide-img" />
</figure>

---

## <iconify-icon icon="fluent-emoji-flat:bar-chart" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Using the SOF AI-Enabled SOC CMM as a Compass

The SOF AI-Enabled SOC CMM models ~30–40 SOC capabilities across People, Process, Technology, and Data, each scored across maturity levels (e.g., ad hoc → standardized → optimized). It is a practical way to connect everything in this brief to a plan.

### Suggested usage

**Baseline assessment:**

- Score your current state.
- Identify where recent technological and operational changes have created gaps (e.g., strong in Unified Telemetry but low in AI Governance).

**Plan target state:**

- Decide where you want to be in 12–18 months (e.g., all capabilities at least at Level 2, key areas at Level 3).
- Prioritize capabilities most aligned to your industry and risk (e.g., cloud monitoring for cloud-native orgs, governance and compliance for highly regulated ones).

**Track progress and tie to business outcomes:**

- Re-assess every 6–12 months and use results for board and budget conversations.
- Make explicit connections between maturity gains (e.g., in Incident Response Automation) and improved metrics (e.g., lower MTTR, reduced impact per incident).

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_16.png" alt="SOC CMM" class="slide-img" />
</figure>

---

## <iconify-icon icon="fluent-emoji-flat:handshake" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Operating Model and Collaboration

Modern SOC operations increasingly involve:

### Considering operating model options

- 24/7 in-house SOC.
- Extended business hours with on-call overnight, supported by automation.
- Hybrid models with MSSPs or MXDR providers, ensuring they also leverage modern tooling and AI.

### Strengthening cross-functional collaboration

- Regular "Security Operations Council" meetings bringing together SOC, IT, DevOps, Compliance, and HR.
- Shared understanding of automated actions (e.g., device isolation) and expectations across teams.

{: .note }
> The human element is about enabling your team to fully exploit the new capabilities without being overwhelmed, and the CMM provides the roadmap to do that systematically.
