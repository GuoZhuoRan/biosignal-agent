export interface BiomarkerProfile {
  id: string;
  label: string;
  age: number;
  sex: "Male" | "Female";
  biomarkers: {
    inflammation: { crp?: number; il6?: number; tnfa?: number; score: number; status: "optimal" | "moderate" | "elevated" };
    melatonin: { level?: number; score: number; status: "optimal" | "moderate" | "low" };
    telomere: { length?: number; biologicalAge?: number; score: number; status: "long" | "average" | "short" };
    immunity: { nkCells?: number; tCells?: number; score: number; status: "strong" | "moderate" | "weak" };
    nutrition: { vitD?: number; b12?: number; omega3?: number; score: number; status: "optimal" | "moderate" | "deficient" };
    gut: { diversity?: number; score: number; status: "diverse" | "moderate" | "low" };
  };
  overallScore: number;
  biologicalAge: number;
  recommendation: "focus" | "light" | "rest";
}

export const DEMO_PROFILES: BiomarkerProfile[] = [
  {
    id: "10f",
    label: "10 Years Old · Female",
    age: 10,
    sex: "Female",
    biomarkers: {
      inflammation: { crp: 0.4, score: 95, status: "optimal" },
      melatonin: { level: 42, score: 90, status: "optimal" },
      telomere: { biologicalAge: 8, score: 92, status: "long" },
      immunity: { nkCells: 18, tCells: 72, score: 88, status: "strong" },
      nutrition: { vitD: 38, b12: 520, score: 85, status: "optimal" },
      gut: { diversity: 82, score: 87, status: "diverse" },
    },
    overallScore: 90,
    biologicalAge: 8,
    recommendation: "focus",
  },
  {
    id: "28m",
    label: "28 Years Old · Male",
    age: 28,
    sex: "Male",
    biomarkers: {
      inflammation: { crp: 1.2, score: 78, status: "moderate" },
      melatonin: { level: 28, score: 72, status: "moderate" },
      telomere: { biologicalAge: 31, score: 70, status: "average" },
      immunity: { nkCells: 14, tCells: 65, score: 75, status: "moderate" },
      nutrition: { vitD: 22, b12: 380, score: 68, status: "moderate" },
      gut: { diversity: 68, score: 70, status: "moderate" },
    },
    overallScore: 72,
    biologicalAge: 31,
    recommendation: "light",
  },
  {
    id: "30m",
    label: "30 Years Old · Male",
    age: 30,
    sex: "Male",
    biomarkers: {
      inflammation: { crp: 0.8, score: 84, status: "optimal" },
      melatonin: { level: 32, score: 80, status: "optimal" },
      telomere: { biologicalAge: 29, score: 82, status: "long" },
      immunity: { nkCells: 16, tCells: 70, score: 80, status: "strong" },
      nutrition: { vitD: 35, b12: 480, score: 82, status: "optimal" },
      gut: { diversity: 74, score: 76, status: "moderate" },
    },
    overallScore: 81,
    biologicalAge: 29,
    recommendation: "focus",
  },
  {
    id: "41m",
    label: "41 Years Old · Male",
    age: 41,
    sex: "Male",
    biomarkers: {
      inflammation: { crp: 2.8, score: 52, status: "elevated" },
      melatonin: { level: 18, score: 55, status: "low" },
      telomere: { biologicalAge: 47, score: 48, status: "short" },
      immunity: { nkCells: 10, tCells: 58, score: 58, status: "moderate" },
      nutrition: { vitD: 18, b12: 290, omega3: 1.2, score: 55, status: "deficient" },
      gut: { diversity: 54, score: 52, status: "low" },
    },
    overallScore: 53,
    biologicalAge: 47,
    recommendation: "rest",
  },
  {
    id: "51f",
    label: "51 Years Old · Female",
    age: 51,
    sex: "Female",
    biomarkers: {
      inflammation: { crp: 1.9, score: 65, status: "moderate" },
      melatonin: { level: 15, score: 60, status: "low" },
      telomere: { biologicalAge: 54, score: 62, status: "average" },
      immunity: { nkCells: 12, tCells: 62, score: 65, status: "moderate" },
      nutrition: { vitD: 28, b12: 420, score: 72, status: "moderate" },
      gut: { diversity: 65, score: 68, status: "moderate" },
    },
    overallScore: 65,
    biologicalAge: 54,
    recommendation: "light",
  },
];
