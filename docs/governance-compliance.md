---
title: "3. Governance & Compliance"
layout: default
nav_order: 7
---

# <iconify-icon icon="fluent-emoji-flat:classical-building" width="36" height="36" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> 3. New Governance and Compliance Drivers – Frameworks, Standards and Regulations Catch Up to Technology
{: .no_toc }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

{: .references }
> **Reference:** 2025 Microsoft Digital Defense Report (DDR)
>
> Regulation and standards have started to catch up with AI and modern security operations. What were "best practices" a year ago are fast becoming expectations.

---

## <iconify-icon icon="fluent-emoji-flat:chart-increasing" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Governance Bar Raised

Key developments influencing SOC strategy include:

- **NIST CSF 2.0** (Feb 2024) – adds a dedicated Governance function and updates for supply chain and emerging risks, including AI.
- **AI risk management standards** – e.g., ISO/IEC 23894 (AI risk management), ISO/IEC 42001 (AI management systems), ISO/IEC 27090 (AI threat defense), and NIST AI RMF (AI risk framework).
- **EU AI Act** (2024) – phased enforcement from 2025–2026 introduces explicit obligations for "high-risk" AI systems around transparency, human oversight, and documentation.
- **US SEC cyber rules** (Dec 2023) – require public companies to disclose material incidents within tight timelines and report on cyber risk management practices.
- **Ongoing privacy and data sovereignty requirements** influencing where logs and AI processing can take place, and how monitoring is conducted.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_10.png" alt="Governance developments" class="slide-img" />
</figure>

For the SOC, this means governance work cannot be an afterthought.

---

## <iconify-icon icon="fluent-emoji-flat:shield" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> NIST CSF 2.0 – Governance as a First-Class Function

CSF 2.0's new Governance function reinforces:

- The need for clear roles and responsibilities for cyber and AI risk.
- Documented processes for risk assessment, continuous improvement, and oversight.
- Alignment between SOC practices and business risk objectives.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_20.png" alt="NIST CSF 2.0" class="slide-img" />
</figure>

**Practical SOC actions:**

- Map your SOC program and CMM capabilities to CSF 2.0 and identify where you lack defined governance (e.g., AI use in the SOC, multi-cloud posture management).
- Ensure that SOC automation, Copilot usage, and agentic workflows are captured in your broader enterprise cyber governance.

---

## <iconify-icon icon="fluent-emoji-flat:books" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> AI Risk Management Frameworks and Standards

Frameworks such as ISO/IEC 23894, ISO/IEC 42001, ISO/IEC 27090 and NIST AI RMF provide structured guidance on:

- AI lifecycle management and risk assessment.
- Human oversight and accountability.
- Data governance and monitoring for AI systems.

For SecOps, these frameworks are complementary:

- **ISO/IEC 23894** provides the method for identifying and treating AI risk.
- **ISO/IEC 42001** provides the management-system structure for governing AI.
- **ISO/IEC 27090** focuses on AI-specific security threats and compromises.
- **NIST AI RMF** provides the most flexible operational model for governing, assessing, measuring, and managing AI risk.

Together, they help the SOC in two directions: secure AI systems and use AI responsibly to improve SOC performance.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_40.png" alt="AI risk frameworks" class="slide-img" />
</figure>

**Example framework highlights – NIST AI RMF:**

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_13.png" alt="NIST AI RMF highlights" class="slide-img" />
</figure>

### When the SOC Is Securing AI Systems

When the SOC is responsible for protecting AI systems, the frameworks play different roles:

- **ISO/IEC 23894** helps the organization identify, assess, and treat AI-related risks as part of enterprise risk management.
- **ISO/IEC 42001** helps establish ownership, policy, lifecycle controls, oversight, and continual improvement for AI systems.
- **ISO/IEC 27090** adds the missing security lens by focusing specifically on AI-targeted threats, failures, detection, and mitigation considerations.
- **NIST AI RMF** helps translate all of that into an operating model by forcing teams to govern the use case, map the system context and dependencies, measure trustworthiness and risk indicators, and manage mitigations over time.

That makes 23894 the **risk method**, 42001 the **governance backbone**, 27090 the **AI threat lens**, and NIST AI RMF the **operational coordination model**.

### When the SOC Is Using AI to Improve Itself

When the SOC is using AI to improve SOC effectiveness—for example in triage, investigation support, correlation, summarization, case enrichment, or automation—the same frameworks apply, but differently:

- **ISO/IEC 23894** helps evaluate the operational risks of those tools, such as bad outputs, over-reliance on automation, weak evaluation practices, privacy issues, or failure to account for context.
- **ISO/IEC 42001** helps ensure those AI capabilities are operated as governed systems with clear roles, acceptable-use boundaries, human oversight, and continuous improvement.
- **ISO/IEC 27090** is useful for asking how the SOC's own AI tools could be manipulated, compromised, or abused.
- **NIST AI RMF** is especially helpful here because its Playbook-oriented, outcome-based structure supports iterative deployment: govern the use, map the context, measure performance and risk, and manage with controls, monitoring, and response procedures.

### What This Means for a Modern SOC

For a modern SOC, the practical takeaway is that no single framework does the whole job:

- If the goal is to perform structured AI risk analysis, **23894** is the analytic guide.
- If the goal is to show that AI is being run under a formal management system, **42001** is the anchor.
- If the goal is to sharpen detection, hardening, and response around attacks on AI systems, **27090** is the closest fit once finalized.
- If the goal is to create a usable cross-functional operating model that security, engineering, data science, legal, and governance teams can all work from, **NIST AI RMF** is usually the most practical common language.

{: .note }
> That is why many organizations will use **42001 + 23894 + NIST AI RMF** today, while watching **27090** as the AI-security-specific layer matures.

---

## <iconify-icon icon="fluent-emoji-flat:eu-flag" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> EU AI Act

The EU AI Act introduces obligations for high-risk AI systems along dimensions such as:

- Risk management and testing.
- Transparency and record-keeping.
- Human oversight and the ability to override or contest AI decisions.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_29.png" alt="EU AI Act" class="slide-img" />
</figure>

Even if your SOC tooling is not explicitly classified as "high-risk AI," it is wise to:

- Document how human-in-the-loop oversight works for Copilot and agents.
- Ensure audit logs capture when AI played a role in analyses or decisions.
- Involve legal/compliance in decisions about deploying autonomous or semi-autonomous SOC workflows, especially in EU contexts.

---

## <iconify-icon icon="fluent-emoji-flat:page-facing-up" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> US SEC Cyber Rule and Incident Reporting

Shortened disclosure timelines and increased scrutiny of cyber risk management affect SOC processes:

- Materiality assessments and disclosure decisions now sit on much tighter clocks.
- Boards and executives need faster, clearer incident understanding.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_5.png" alt="SEC cyber reporting" class="slide-img" />
</figure>

**SOC implications:**

- Incident response playbooks should include a step such as: "Assess potential materiality and trigger escalation to legal/comms if thresholds are met."
- Security Copilot can help assemble timelines, impact summaries, and technical narratives to support executive decision-making and regulatory filings—but human review remains essential.

---

## <iconify-icon icon="fluent-emoji-flat:locked" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Privacy and Data Sovereignty

Data protection regulations (e.g., GDPR and regional privacy laws) continue to shape:

- Where logs and telemetry can be stored and processed.
- What types of monitoring are permissible (e.g., monitoring internal communications for threats).
- How user and employee data appears in AI training and inference.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_21.png" alt="Privacy and data sovereignty" class="slide-img" />
</figure>

**For SOCs:**

- Involve legal, HR, and privacy teams when rolling out new monitoring and AI capabilities.
- Be explicit about data residency for Sentinel, Defender, and Copilot workloads.
- Document how you handle user data in AI-assisted investigations and reporting.
