"use client";

import { useState } from "react";
import { DEMO_PROFILES, BiomarkerProfile } from "@/lib/biomarkers";

interface Analysis {
  stateSignal: string;
  agentMode: string;
  headline: string;
  keyInsights: string[];
  agentTasks: string[];
  recoveryTips: string[];
  riskFlags: string[];
}

const SIGNAL_CONFIG = {
  "FOCUS NOW": { color: "text-green-400", bg: "bg-green-400/10 border-green-400/30", glow: "glow-green", icon: "⚡" },
  "LIGHT WORK": { color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30", glow: "glow-yellow", icon: "🌤" },
  "REST & RECOVER": { color: "text-red-400", bg: "bg-red-400/10 border-red-400/30", glow: "glow-red", icon: "🌙" },
};

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? "bg-green-400" : score >= 60 ? "bg-yellow-400" : "bg-red-400";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span className={score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"}>{score}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function AgentTaskRow({ task, index }: { task: string; index: number }) {
  const statuses = ["✓ Completed", "⟳ Running", "◉ Queued"];
  const colors = ["text-green-400", "text-yellow-400", "text-gray-400"];
  const status = index === 0 ? 0 : index === 1 ? 1 : 2;
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-gray-300">{task}</span>
      <span className={`text-xs font-mono ${colors[status]}`}>{statuses[status]}</span>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<BiomarkerProfile | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze(profile: BiomarkerProfile) {
    setSelected(profile);
    setAnalysis(null);
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });
      const data = await res.json();
      setAnalysis(data);
    } finally {
      setLoading(false);
    }
  }

  const signalKey = analysis?.stateSignal as keyof typeof SIGNAL_CONFIG | undefined;
  const signalCfg = signalKey ? SIGNAL_CONFIG[signalKey] ?? SIGNAL_CONFIG["LIGHT WORK"] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-black">B</div>
          <span className="font-semibold tracking-tight">BioSignal Agent</span>
        </div>
        <div className="text-xs text-gray-500">晚安，黑客 · Good Night, Hackers 2026</div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Hero */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Your Body's State,{" "}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Decoded</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Deep biomarker analysis → your biological state determines how you and your Agent divide the work.
          </p>
        </div>

        {/* Profile selector */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Select a Demo Profile</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {DEMO_PROFILES.map((p) => (
              <button
                key={p.id}
                onClick={() => analyze(p)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selected?.id === p.id
                    ? "border-cyan-400/50 bg-cyan-400/10"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                }`}
              >
                <div className="text-lg mb-1">{p.sex === "Female" ? "👩" : "👨"}</div>
                <div className="text-xs font-medium text-white">{p.age}y {p.sex.charAt(0)}</div>
                <div className={`text-xs mt-1 font-bold ${p.overallScore >= 80 ? "text-green-400" : p.overallScore >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                  {p.overallScore}/100
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Analyzing biomarkers with Claude...</p>
          </div>
        )}

        {/* Analysis */}
        {selected && analysis && !loading && (
          <div className="animate-slide-up space-y-6">
            {/* State signal */}
            {signalCfg && (
              <div className={`rounded-2xl border p-6 ${signalCfg.bg} ${signalCfg.glow}`}>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{signalCfg.icon}</div>
                  <div>
                    <div className={`text-2xl font-bold ${signalCfg.color}`}>{analysis.stateSignal}</div>
                    <div className="text-gray-300 text-sm mt-0.5">{analysis.headline}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs text-gray-500">Human · Agent Split</div>
                    <div className="text-sm font-mono text-cyan-400">{analysis.agentMode}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Biomarker scores */}
              <div className="bg-white/5 rounded-2xl border border-white/10 p-5 space-y-3">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">Biomarker Scores</h3>
                <ScoreBar score={selected.biomarkers.inflammation.score} label="Inflammation Control" />
                <ScoreBar score={selected.biomarkers.melatonin.score} label="Melatonin / Sleep Hormone" />
                <ScoreBar score={selected.biomarkers.telomere.score} label="Telomere Health" />
                <ScoreBar score={selected.biomarkers.immunity.score} label="Immune Function" />
                <ScoreBar score={selected.biomarkers.nutrition.score} label="Nutritional Status" />
                <ScoreBar score={selected.biomarkers.gut.score} label="Gut Microbiome" />
                <div className="pt-2 border-t border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Biological Age</span>
                    <span className="font-bold text-white">{selected.biologicalAge} yrs <span className="text-gray-500">(chrono: {selected.age})</span></span>
                  </div>
                </div>
              </div>

              {/* Key insights */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">Key Insights</h3>
                  <ul className="space-y-2">
                    {analysis.keyInsights.map((insight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-cyan-400 mt-0.5">›</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                {analysis.riskFlags.length > 0 && (
                  <div className="bg-red-400/5 rounded-2xl border border-red-400/20 p-4">
                    <h3 className="text-xs font-semibold text-red-400 mb-2">⚠ Risk Flags</h3>
                    <ul className="space-y-1">
                      {analysis.riskFlags.map((flag, i) => (
                        <li key={i} className="text-xs text-red-300">{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Agent task queue */}
              <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-300">Agent Task Queue</h3>
                  <span className="text-xs bg-green-400/20 text-green-400 px-2 py-0.5 rounded-full">Running in parallel</span>
                </div>
                <div>
                  {analysis.agentTasks.map((task, i) => (
                    <AgentTaskRow key={i} task={task} index={i} />
                  ))}
                </div>
              </div>

              {/* Recovery tips */}
              <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Recovery Protocol</h3>
                <ul className="space-y-3">
                  {analysis.recoveryTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-sm text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!selected && !loading && (
          <div className="text-center py-16 text-gray-600">
            <div className="text-4xl mb-3">🧬</div>
            <p className="text-sm">Select a profile above to run the biomarker analysis</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 px-6 py-4 text-center text-xs text-gray-600">
        BioSignal Agent · Built at 晚安，黑客 2026 · Not medical advice · Data from Regenerative Bio & PhysioNet
      </div>
    </div>
  );
}
