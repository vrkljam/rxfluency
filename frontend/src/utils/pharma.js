// utils/pharma.js
export const PHARMA_SYSTEM = {
  antibiotic: {
    label: "Antibiotics",
    gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
    icon: "bi-capsule",
  },
  cardiovascular: {
    label: "Cardiovascular",
    gradient: "linear-gradient(135deg, #fc466b, #3f5efb)",
    icon: "bi-heart-pulse",
  },
  neurologic: {
    label: "Neurologic",
    gradient: "linear-gradient(135deg, #8e2de2, #4a00e0)",
    icon: "bi-brain",
  },
  analgesic: {
    label: "Pain / Analgesic",
    gradient: "linear-gradient(135deg, #ff9966, #ff5e62)",
    icon: "bi-activity",
  },
  endocrine: {
    label: "Endocrine",
    gradient: "linear-gradient(135deg, #56ab2f, #a8e063)",
    icon: "bi-droplet-half",
  },
  respiratory: {
    label: "Respiratory",
    gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
    icon: "bi-lungs",
  },
  gastrointestinal: {
    label: "GI",
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
    icon: "bi-emoji-smile",
  },
  psychiatric: {
    label: "Psych",
    gradient: "linear-gradient(135deg, #c471f5, #fa71cd)",
    icon: "bi-emoji-dizzy",
  },
  immune: {
    label: "Immune",
    gradient: "linear-gradient(135deg, #00b09b, #96c93d)",
    icon: "bi-shield-plus",
  },
};

export const CLASS_ALIASES = {
  antibiotics: "antibiotic",
  antibacterial: "antibiotic",
  cardio: "cardiovascular",
  hypertension: "cardiovascular",
  beta_blocker: "cardiovascular",
  ace_inhibitor: "cardiovascular",
  cns: "neurologic",
  seizure: "neurologic",
  pain: "analgesic",
  nsaid: "analgesic",
  opioid: "analgesic",
  diabetes: "endocrine",
  insulin: "endocrine",
  asthma: "respiratory",
  copd: "respiratory",
  stomach: "gastrointestinal",
  gerd: "gastrointestinal",
  antidepressant: "psychiatric",
  antipsychotic: "psychiatric",
  immunosuppressant: "immune",
  vaccine: "immune",
};

export const getClassStyle = (name) => {
  const norm = name.toLowerCase().replace(/\s+/g, "_").trim();
  const key = CLASS_ALIASES[norm] || norm;

  if (PHARMA_SYSTEM[key]) return PHARMA_SYSTEM[key];

  const fallbackGradients = [
    "linear-gradient(135deg, #4fc1b8, #2b7d73)",
    "linear-gradient(135deg, #6a11cb, #2575fc)",
    "linear-gradient(135deg, #ff6a00, #ee0979)",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return {
    label: name,
    gradient: fallbackGradients[Math.abs(hash) % fallbackGradients.length],
    icon: "bi-tag",
  };
};
