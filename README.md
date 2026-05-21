# BioSignal Agent 🧬

> **Know when to push, when to rest, when to let the agent take over.**

Built for **晚安，黑客 · Good Night, Hackers 2026** — a 24-hour hackathon that rewards healthy delivery over all-nighters.

## What it does

BioSignal Agent analyzes multi-modal longevity biomarker data and uses Claude AI to generate a real-time developer state signal:

- **⚡ FOCUS NOW** — your biology is primed, push hard
- **🌤 LIGHT WORK** — moderate state, let the agent handle heavy lifting  
- **🌙 REST & RECOVER** — step away, agent takes over the task queue

## Features

- **Biomarker Dashboard** — Inflammation (CRP), Melatonin, Telomere health, Immune function, Nutrition, Gut microbiome
- **Biological Age** vs chronological age comparison
- **Claude-powered analysis** — synthesizes 6 biomarker dimensions into one actionable state signal
- **Agent Task Queue** — shows what your agent executes while you sleep
- **Recovery Protocol** — personalized tips based on your actual biomarker values

## Demo Data

5 anonymized patient profiles from **Regenerative Bio** (provided by muShanghai Longevity):

| Profile | Key Reports |
|---------|------------|
| 10y Female | Melatonin, Food Allergy, Immunity, Amino Acids, Gut Microbiome |
| 28y Male | Full Medical Examination |
| 30y Male | Health Checkup |
| 41y Male | Inflammation, Telomere, Melatonin, Nutrition, Antioxidant, Immune Cells |
| 51y Female | Lab Tests, Genetics, Gut Microbiome, DHEA, Nutrition |

Open-source wearable datasets from [PhysioNet](https://physionet.org/): BUTPPG, DREAMT, MMASH, sleep-accel.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **Anthropic Claude API** (`claude-sonnet-4-6`) for biomarker analysis
- **Vercel** for deployment

## Getting Started

```bash
git clone https://github.com/GuoZhuoRan/biosignal-agent
cd biosignal-agent
npm install

# Add your Anthropic API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Prize Targets

| Award | Why |
|-------|-----|
| LAIFE Recovery Agent Challenge ¥1,000 | Integrates biomarker data + wearable signals → decision agent |
| 最佳 Agent 执行效率奖 ¥1,000 | Agent task queue runs while developer sleeps |
| 全场奖 up to ¥3,000 | Complete 24h delivery with real data, real AI, real demo |

## Data Notice

Demo data is anonymized and provided for educational/exploratory use only.  
Not medical advice. Not a diagnostic tool. Data used with permission from Regenerative Bio.

---

Built with Claude Code at 晚安，黑客 · Good Night, Hackers 2026 · Shanghai
