---
title: "5. Generative AI in the SOC"
layout: default
nav_order: 9
---

# <iconify-icon icon="fluent-emoji-flat:robot" width="36" height="36" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> 5. Generative AI in the SOC – From Novelty to Necessity
{: .no_toc }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

Generative AI has moved from pilot to standard SOC capability in 2025.

---

## <iconify-icon icon="fluent-emoji-flat:star" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Key Security Copilot Developments (Ignite '25)

Recent milestones include:

**Security Copilot availability and adoption:** Microsoft Security Copilot is now broadly available across Microsoft security experiences and increasingly operationalized in enterprise SOC workflows.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_30.png" alt="Security Copilot availability" class="slide-img" />
</figure>

**Embedded agents:** Specialized Copilot agents exist within Defender, Sentinel, Entra, Purview, and other portals—for example:

- **Threat Hunting Agent** for natural language querying and hunting in Sentinel.
- **Phishing Triage Agent** for auto-handling and clustering user-reported messages.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_3.png" alt="Copilot embedded agents" class="slide-img" />
</figure>

- **Threat Intelligence Briefing Agent** for rapid summaries when new campaigns or CVEs appear.

**Partner ecosystem:** A growing marketplace of plugins and partner agents that integrate non-Microsoft tools into Copilot experiences.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_14.png" alt="Partner ecosystem" class="slide-img" />
</figure>

---

## <iconify-icon icon="fluent-emoji-flat:hammer-and-wrench" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Operationalizing Generative AI in the SOC

With Copilot embedded, generative AI is woven into daily operations:

**Tier-1 analysts use natural language for common tasks:**

- "Summarize this incident and list likely impacted assets."
- "Show related alerts for this user in the last 48 hours."
- "Explain this script or suspicious command line."

**Specialized agents handle specific workflows:**

- Phishing triage for user-reported messages.
- Log analysis and pattern search for complex incidents.
- Threat intel synthesis to brief leadership and stakeholders.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_33.png" alt="Operationalizing generative AI" class="slide-img" />
</figure>

To make this effective:

### Set clear usage guidelines

Define where Copilot should be used (e.g., investigations, summarization, hunt queries) and where it must never be the sole source of truth (e.g., final regulatory filings, high-stakes access decisions).

### Embed AI in playbooks

Update incident response runbooks to include steps like "Request Copilot summary" or "Use Threat Hunting Agent to look for similar activity."

### Train analysts in "AI literacy"

Ensure your teams understand how to prompt effectively, verify outputs, and recognize when AI might be missing context or hallucinating.

---

## <iconify-icon icon="fluent-emoji-flat:desktop-computer" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Specialized Copilot Agents Embedded in Tools

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_6.png" alt="Specialized Copilot agents" class="slide-img" />
</figure>

The shift from a standalone chat to in-context agents is important:

- In **Microsoft Sentinel** and the **Defender portal**, Security Copilot can help analysts generate hunting queries and investigate threats using natural language.
- In **Defender**, analysts can click a Copilot panel on an incident to get explanations, suggested next steps, or root-cause narratives.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_22.png" alt="Copilot in Defender" class="slide-img" />
</figure>

- In **Entra**, Copilot can summarize a user's risk history, sign-in anomalies, and unusual behavior patterns.

This makes AI help feel like part of the tool, not an extra step, and encourages consistent usage.

---

## <iconify-icon icon="fluent-emoji-flat:magnifying-glass-tilted-right" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> Quality and Accuracy – "Assistant, Not Oracle"

Generative AI is powerful but not infallible:

- It can misinterpret context, omit relevant data, or fabricate plausible-sounding but incorrect explanations.
- It is only as good as the underlying data quality and scope of visibility.

{: .warning }
> **SOC guidance:**
> - Treat Copilot as a highly capable assistant, not an oracle.
> - Require human review for critical decisions and external reporting.
> - Establish a lightweight feedback loop (e.g., monthly quality review) to capture issues and refine usage patterns.

---

## <iconify-icon icon="fluent-emoji-flat:speech-balloon" width="28" height="28" style="vertical-align: middle; margin-right: 0.3em;"></iconify-icon> AI for Reporting and Communication

One of the most immediate value areas has been communications:

- Drafting incident summaries for executives and boards.
- Producing technical appendices for post-incident reviews.
- Creating briefings when new threats or regulatory requirements emerge.

These outputs save analysts time and help ensure more consistent messaging, while still allowing humans to shape tone and nuance.

<figure class="slide-figure">
  <img src="{{ site.baseurl }}/assets/images/img_41.png" alt="AI for reporting" class="slide-img" />
</figure>
