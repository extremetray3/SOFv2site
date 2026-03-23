---
title: "6. Modern SOC III – Agentic AI"
layout: default
nav_order: 10
---

# <iconify-icon icon="fluent-emoji-flat:crystal-ball" width="36" height="36" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> 6. Modern SOC III with Agentic AI for Security – One Year On
{: .no_toc }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

In the original briefing, Agentic AI—AI agents capable of performing multi-step tasks with some autonomy—was the most forward-looking element of the SOC III vision. Over the last year, that concept has moved from theory toward early practice.

---

## <iconify-icon icon="fluent-emoji-flat:joystick" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> From Concept to Controlled Autonomy

Previously, SOC automation largely meant:

- Static playbooks and workflows triggered by alerts.
- Copilot answering questions when prompted by humans.

Agentic AI introduces:

- Agents that observe, reason over context with LLMs and tools, and take bounded actions to achieve goals (e.g., triaging phishing queues, orchestrating steps in incident response).
- The ability to iterate—agents can seek additional data, refine hypotheses, and adjust actions within defined constraints.

What changed in 2025 is not just model capability, but the scaffolding needed to operate such agents safely: identity, governance, monitoring, and policy enforcement.

**Example: Dynamic Threat Detection Agent**

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_15.png" alt="Dynamic Threat Detection Agent" class="slide-img" />
</figure>

---

## <iconify-icon icon="fluent-emoji-flat:building-construction" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Platform Building Blocks for SOC Agents

### Microsoft Agent 365 – Identity and Governance for AI Agents

Agent 365 provides a control plane for registering and managing AI agents:

- **First-class identities:** Each significant agent (e.g., a phishing triage agent, ticketing assistant, or auto-response workflow) is assigned its own Entra ID identity rather than running under a human or generic service account.
- **Access and policies:** Agents can have roles, Conditional Access, and least-privilege permissions just like administrators.
- **Inventory and lifecycle:** Agent 365 maintains a catalog of agents, including who owns them, where they're used, and whether they are still needed.

For the SOC, this means:

- Any automation capable of taking security-relevant actions should be registered as an agent identity.
- You can answer "which agent did this?" and quickly disable or constrain misbehaving agents.
- "Digital colleagues" (agents) now have onboarding, review, and offboarding processes, just like human staff.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_31.png" alt="Agent 365" class="slide-img" />
</figure>

### Defender & Purview for AI Agents – Security and Compliance Guardrails

To complement identity and inventory, Defender and Purview have been extended to treat agents as observable entities:

**Microsoft Defender** provides protections for AI agents, including inventory, monitoring, hunting, and threat detection:

- Unusual resource access patterns.
- Attempts to perform out-of-scope actions.
- Suspicious timing or volume of activity.

**Microsoft Purview** provides data security and compliance controls for AI agents, including capabilities such as classification, policy enforcement, and auditing, depending on the agent type and scenario.

Because agents often operate at machine scale, SOCs must:

- Define expected behavior baselines per agent.
- Configure alerts for when agents exceed their scope (e.g., accessing data they shouldn't, or interacting with external endpoints unexpectedly).
- Log agent activity in enough detail to support audits and investigations.

---

## <iconify-icon icon="fluent-emoji-flat:gear" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Early Autonomous SOC Agents

Recent advances reveal several production-grade SOC agents moving from concept to reality:

**Phishing Triage Agent:**
Helps SOC teams triage and classify user-reported phishing submissions, improving consistency and reducing analyst toil.

**Response and detection agents:**
Prototypes and internal previews show agents that:

- Execute standard response steps for known threats (e.g., device isolation, account disablement, ticket creation).
- Suggest or generate new detection rules based on repeated incident patterns.

**Dynamic Threat Detection Agent:**
Autonomously investigate incidents and telemetry to uncover blind spots. When a gap is identified, the agent dynamically generates an alert and delivers the finding with clear risk context and actionable next steps.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_7.png" alt="Dynamic Threat Detection Agent" class="slide-img" />
</figure>

**Threat Hunting Agent:**
Translates natural language into ready-to-run queries, so analysts can focus on uncovering threats without needing KQL expertise.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_23.png" alt="Threat Hunting Agent" class="slide-img" />
</figure>

Outside SecOps, successful end-to-end agents (e.g., in sales or support scenarios) demonstrate that bounded tasks + strong guardrails + rich telemetry can be automated effectively. The SOC can follow a similar path.

---

## <iconify-icon icon="fluent-emoji-flat:person-raising-hand" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Autonomy with Oversight – Operating Model Implications

Agentic AI doesn't mean removing humans—it changes how humans work.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_39.png" alt="Autonomy with oversight" class="slide-img" />
</figure>

**Key principles:**

- <iconify-icon icon="fluent-emoji-flat:locked" width="18" height="18" style="vertical-align: middle;"></iconify-icon> **Treat agents as privileged actors, not "just scripts."**
  - Apply least privilege, Conditional Access, and approvals for high-impact actions.
  - Ensure comprehensive logging and retention for agent activity.
  - Include agents in your regular access review process.

- <iconify-icon icon="fluent-emoji-flat:bust-in-silhouette" width="18" height="18" style="vertical-align: middle;"></iconify-icon> **Keep humans in the loop for critical decisions.**
  - Use a staged model: recommend → propose → act with rollback.
  - For high-risk scenarios (e.g., mass account disablement, public communications), require explicit human approval.

- <iconify-icon icon="fluent-emoji-flat:star" width="18" height="18" style="vertical-align: middle;"></iconify-icon> **New roles: agent supervisors and "meta-analysts."**
  - Analysts shift from doing all the work themselves to directing and supervising fleets of agents.
  - Responsibilities include designing guardrails, tuning agent behavior, reviewing agent performance, and handling edge cases or novel incidents.

- <iconify-icon icon="fluent-emoji-flat:books" width="18" height="18" style="vertical-align: middle;"></iconify-icon> **Culture and skills.**
  - Position Agentic AI as a way to remove toil, not jobs.
  - Train teams in agent operations (how agents are configured, monitored, and corrected).
  - Encourage feedback when agents behave unexpectedly and treat that as input for continuous improvement.

---

## <iconify-icon icon="fluent-emoji-flat:world-map" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> A Practical Roadmap to Modern SOC III

A pragmatic adoption sequence emerging from customers:

### 1. Establish governance and identity foundations

- Register all significant SOC automations in Agent 365 with dedicated identities.
- Define a minimum agent standard: documented purpose, owner, allowed data/systems, allowed actions, approval requirements, and logging expectations.
- Map these constraints into Defender and Purview policies.

### 2. Select 1–3 low-risk, high-volume pilot use cases

Good early candidates include:

- Phishing report triage.
- Alert deduplication and enrichment for known detections.
- Malware hash lookups and reputation decisions.
- Pre-screening for user access reviews.

### 3. Phase in autonomy deliberately

- **Observation:** agents run in "shadow mode," making recommendations while humans still execute actions.
- **Assisted:** agents prepare actions for human approval.
- **Constrained autonomy:** agents execute actions within well-defined bounds with rollback options.

### 4. Measure impact and tune

Track MTTD/MTTR, analyst time per incident, auto-handled alert percentages, false-positive rates, and audit findings. Use these metrics to justify expansions or to refine agent scopes and policies.

### 5. Scale to an agent portfolio

- Expand coverage across more SOC capabilities (e.g., vulnerability management, IR orchestration).
- Integrate agents into MXDR or hybrid operating models.
- Periodically review the agent catalog as part of security architecture and risk management.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_8.png" alt="Practical roadmap" class="slide-img" />
</figure>

---

## <iconify-icon icon="fluent-emoji-flat:telescope" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Looking Ahead

The Modern SOC III vision remains: a security function where AI systems can independently learn, adapt, and execute a significant portion of operational work, under strong human governance.

What has changed is that this is **operationally attainable:**

- Agent 365 provides agent identity and lifecycle management.
- Defender and Purview extend security and compliance controls to non-human actors.
- Early autonomous agents are already delivering value in defined SOC workflows.

{: .note }
> Progress will be incremental, not a big bang. Organizations that start with narrow, well-governed use cases now will be best positioned as more agentic capabilities become available out-of-the-box.
