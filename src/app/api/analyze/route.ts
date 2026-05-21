import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { BiomarkerProfile } from "@/lib/biomarkers";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { profile }: { profile: BiomarkerProfile } = await req.json();

  const prompt = `You are a longevity medicine AI analyzing a developer's biomarker profile during a 24-hour hackathon.

Profile: ${profile.label}
Chronological Age: ${profile.age}
Biological Age: ${profile.biologicalAge}
Overall Health Score: ${profile.overallScore}/100

Key Biomarkers:
- Inflammation (CRP): ${profile.biomarkers.inflammation.crp ?? "N/A"} mg/L — Status: ${profile.biomarkers.inflammation.status} (Score: ${profile.biomarkers.inflammation.score}/100)
- Melatonin Level: ${profile.biomarkers.melatonin.level ?? "N/A"} pg/mL — Status: ${profile.biomarkers.melatonin.status} (Score: ${profile.biomarkers.melatonin.score}/100)
- Telomere Health → Biological Age: ${profile.biomarkers.telomere.biologicalAge ?? "N/A"} — Status: ${profile.biomarkers.telomere.status} (Score: ${profile.biomarkers.telomere.score}/100)
- Immune Function: NK Cells ${profile.biomarkers.immunity.nkCells ?? "N/A"}%, T Cells ${profile.biomarkers.immunity.tCells ?? "N/A"}% — Status: ${profile.biomarkers.immunity.status} (Score: ${profile.biomarkers.immunity.score}/100)
- Nutrition: Vit D ${profile.biomarkers.nutrition.vitD ?? "N/A"} ng/mL, B12 ${profile.biomarkers.nutrition.b12 ?? "N/A"} pg/mL — Status: ${profile.biomarkers.nutrition.status} (Score: ${profile.biomarkers.nutrition.score}/100)
- Gut Microbiome Diversity: ${profile.biomarkers.gut.diversity ?? "N/A"}/100 — Status: ${profile.biomarkers.gut.status} (Score: ${profile.biomarkers.gut.score}/100)

Current Recommendation: ${profile.recommendation.toUpperCase()}

Please provide a structured analysis in JSON format:
{
  "stateSignal": "FOCUS NOW | LIGHT WORK | REST & RECOVER",
  "agentMode": "human-led | hybrid | agent-led",
  "headline": "One punchy sentence about their current biological state",
  "keyInsights": ["insight1", "insight2", "insight3"],
  "agentTasks": ["task1", "task2", "task3"],
  "recoveryTips": ["tip1", "tip2"],
  "riskFlags": ["flag1"] or []
}

Be specific, actionable, and reference actual biomarker values. Keep each item under 15 words.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Failed to parse analysis" }, { status: 500 });
  }

  return NextResponse.json(JSON.parse(jsonMatch[0]));
}
