import { NextRequest, NextResponse } from "next/server";
import { BiomarkerProfile } from "@/lib/biomarkers";

const MOCK_ANALYSES: Record<string, object> = {
  "10f": {
    stateSignal: "FOCUS NOW",
    agentMode: "Driver 🚗 — You lead, Agent executes",
    headline: "Peak biological youth — every system is running optimally.",
    keyInsights: [
      "CRP at 0.4 mg/L signals near-zero systemic inflammation",
      "Melatonin at 42 pg/mL enables deep, restorative sleep cycles",
      "Biological age 2 years younger than chronological — exceptional telomere length",
    ],
    agentTasks: [
      "Compile research summaries while cognitive peak is active",
      "Run automated test suites and generate reports",
      "Draft documentation and README updates",
    ],
    recoveryTips: [
      "Maintain consistent sleep schedule to preserve melatonin levels",
      "Prioritize diverse whole foods to sustain gut microbiome diversity at 82/100",
    ],
    riskFlags: [],
  },
  "28m": {
    stateSignal: "LIGHT WORK",
    agentMode: "Navigator 🧭 — You direct, Agent builds",
    headline: "Mild inflammation and low melatonin — body needs support tonight.",
    keyInsights: [
      "CRP at 1.2 mg/L suggests early-stage inflammation — monitor closely",
      "Melatonin at 28 pg/mL indicates disrupted circadian rhythm from screen exposure",
      "Biological age 3 years older than chronological — lifestyle adjustment needed",
    ],
    agentTasks: [
      "Agent handles code review and PR comments overnight",
      "Automated deploy pipeline and integration tests running",
      "Agent drafts tomorrow's task breakdown and sprint plan",
    ],
    recoveryTips: [
      "Cut screens 90 min before sleep to restore melatonin production",
      "Add Vitamin D supplementation — levels at 22 ng/mL, below optimal 30+",
    ],
    riskFlags: ["Vitamin D deficiency at 22 ng/mL increases inflammation risk"],
  },
  "30m": {
    stateSignal: "FOCUS NOW",
    agentMode: "Driver 🚗 — You lead, Agent executes",
    headline: "Strong biomarker baseline — optimal window for deep work.",
    keyInsights: [
      "CRP at 0.8 mg/L reflects well-controlled inflammation",
      "Telomere analysis shows biological age 1 year younger — positive longevity signal",
      "Immune function strong: NK cells 16%, T cells 70% within healthy range",
    ],
    agentTasks: [
      "Agent monitors deployment logs and alerts on anomalies",
      "Automated data pipeline runs overnight ETL jobs",
      "Agent generates weekly progress summary for stakeholders",
    ],
    recoveryTips: [
      "Boost gut diversity from 74 to 80+ with fermented foods",
      "Maintain current exercise routine — it's preserving your telomere length",
    ],
    riskFlags: [],
  },
  "41m": {
    stateSignal: "REST & RECOVER",
    agentMode: "Overseer 🛰 — Agent executes, you review",
    headline: "Elevated inflammation and shortened telomeres — rest is non-negotiable.",
    keyInsights: [
      "CRP at 2.8 mg/L is clinically elevated — chronic inflammation detected",
      "Biological age 6 years older than chronological — urgent lifestyle intervention",
      "Melatonin critically low at 18 pg/mL — sleep quality severely compromised",
    ],
    agentTasks: [
      "Agent completes all pending code commits and pushes to staging",
      "Automated testing suite runs full regression overnight",
      "Agent prepares morning briefing with prioritized task list",
    ],
    recoveryTips: [
      "Sleep is your highest-ROI action tonight — inflammation reduces 30% with 8h rest",
      "Vitamin D at 18 ng/mL is deficient — supplement immediately and retest in 4 weeks",
    ],
    riskFlags: [
      "CRP 2.8 mg/L — elevated cardiovascular risk if sustained",
      "Biological age 47 vs chronological 41 — accelerated aging markers present",
    ],
  },
  "51f": {
    stateSignal: "LIGHT WORK",
    agentMode: "Navigator 🧭 — You direct, Agent builds",
    headline: "Moderate biomarker profile — pace yourself and let Agent carry the load.",
    keyInsights: [
      "CRP at 1.9 mg/L indicates moderate inflammation — manageable with recovery",
      "Melatonin at 15 pg/mL is age-expected but limits deep sleep duration",
      "Gut microbiome diversity at 65/100 — diversity gap affecting immune signaling",
    ],
    agentTasks: [
      "Agent handles all async communication and email drafts",
      "Automated monitoring and alerting runs without human oversight",
      "Agent queues tomorrow's research tasks and resource gathering",
    ],
    recoveryTips: [
      "Evening walk reduces CRP — 20 min post-dinner shown to lower inflammation markers",
      "Prebiotic foods tonight will boost gut diversity score within 48 hours",
    ],
    riskFlags: ["DHEA levels should be checked — common deficiency at this age profile"],
  },
};

export async function POST(req: NextRequest) {
  const { profile }: { profile: BiomarkerProfile } = await req.json();

  await new Promise((r) => setTimeout(r, 900));

  const analysis = MOCK_ANALYSES[profile.id];
  if (!analysis) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(analysis);
}
