import { Tender, Grant, Notification, ChartData } from './types';

export const COLORS = {
  primary: '#1B2A4A', // Dark Navy
  secondary: '#2E5090', // Medium Blue
  accent: '#0077B6', // Teal Blue
  success: '#2E8B57', // Green
  warning: '#D4A017', // Amber
  alert: '#C0392B', // Red
  background: '#F5F7FA', // Light Grey
  white: '#FFFFFF',
  text: '#2D2D2D'
};

export const CLIENT_PROFILE = {
  company: "FuturItaly S.r.l.",
  address: "Largo Ecuador 6, 00198 Roma RM",
  sector: "Advisory firm",
  ateco: ["70.22.09 (Consulenza imprenditoriale)", "72.20.00 (Ricerca e sviluppo)", "73.20.00 (Ricerche di mercato)"],
  size: "PMI",
  area: "Italia, UE",
  expertise: ["Innovazione", "Trasformazione digitale", "Smart cities", "Progetti PNRR", "ESG"],
  budgetRange: "€10,000 – €2,000,000",
  customRules: [
    "Scarta se requisito fatturato > €10M",
    "Priorità a bandi innovazione e trasformazione digitale",
    "Flag se richiesta SOA",
    "Priorità a progetti PNRR"
  ]
};

const today = new Date();
const addDays = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const MOCK_TENDERS: Tender[] = [
  {
    id: "CIG: 9A2B3C4D5E",
    source: "ANAC/PDND",
    title: "Servizi di supporto specialistico per la trasformazione digitale e l'implementazione di soluzioni AI per la PA",
    authority: "Ministero delle Imprese e del Made in Italy (MIMIT)",
    value: 450000,
    location: "Roma (Lazio)",
    deadline: addDays(25),
    type: "Servizi",
    cpv: "72224000-1",
    cpvDescription: "Servizi di consulenza in gestione progetti",
    isAboveThreshold: true,
    aiScore: 92,
    matchExplanation: "Allineamento perfetto con competenze AI e trasformazione digitale. Codice ATECO 70.22.09 incluso.",
    requirements: ["Fatturato specifico > €200k", "Certificazione ISO 9001", "Team di almeno 5 esperti senior"],
    criticalIssues: [],
    operationalSummary: "Alta priorità strategica. Coinvolgere Claudia Bugno per la supervisione della proposta tecnica e l'allineamento istituzionale.",
    status: "Aperto"
  },
  {
    id: "2025/S 045-123456",
    source: "TED Europa",
    title: "Framework agreement for strategic foresight and trend analysis reports for Smart City development",
    authority: "Comune di Milano",
    value: 1200000,
    location: "Milano (Lombardia)",
    deadline: addDays(45),
    type: "Servizi",
    cpv: "73200000-4",
    cpvDescription: "Servizi di consulenza in ricerca e sviluppo",
    isAboveThreshold: true,
    aiScore: 88,
    matchExplanation: "Forte corrispondenza con l'esperienza in Smart Cities e Trend Analysis.",
    requirements: ["Esperienza pregressa con enti locali > 500k abitanti", "Pubblicazioni internazionali"],
    criticalIssues: ["Richiesta garanzia provvisoria 2%"],
    operationalSummary: "Bando rilevante per l'area Advisory. Claudia Bugno coordinerà il gruppo di lavoro per la parte di foresight strategico.",
    status: "Aperto"
  },
  {
    id: "UNGM-RFP-2025-12345",
    source: "UNGM",
    title: "Technical Assistance for Sustainable Tourism Development in Mediterranean Regions",
    authority: "World Tourism Organization (UN Tourism)",
    value: 180000,
    location: "Multipla (Sud Europa)",
    deadline: addDays(15),
    type: "Servizi",
    cpv: "79411000-8",
    cpvDescription: "Servizi di consulenza generale di gestione",
    isAboveThreshold: true,
    aiScore: 65,
    matchExplanation: "Tema turistico rilevante, ma richiesta esperienza specifica in progetti UN che potrebbe mancare.",
    requirements: ["5 anni di esperienza con organizzazioni internazionali", "Esperti fluenti in EN/FR/AR"],
    criticalIssues: ["Scadenza ravvicinata", "Requisiti linguistici stringenti"],
    operationalSummary: "Lidia Boccanera valuterà l'opportunità di partnership con enti specializzati in cooperazione internazionale data la complessità UN.",
    status: "In scadenza"
  },
  {
    id: "CIG: 8F7E6D5C4B",
    source: "ANAC/PDND",
    title: "Manutenzione ordinaria immobili demaniali - Lotto 3",
    authority: "Agenzia del Demanio",
    value: 3500000,
    location: "Campania",
    deadline: addDays(60),
    type: "Lavori",
    cpv: "45210000-2",
    cpvDescription: "Lavori generali di costruzione edifici",
    isAboveThreshold: true,
    aiScore: 15,
    matchExplanation: "Fuori settore (Edilizia/Lavori). Richiede attestazione SOA.",
    requirements: ["SOA OG1 Classifica IV"],
    criticalIssues: ["Settore non pertinente", "Richiesta SOA"],
    operationalSummary: "Out of scope (Lavori). Archiviazione automatica.",
    status: "Aperto"
  },
  {
    id: "CIG: 1A2B3C4D5F",
    source: "ANAC/PDND",
    title: "Servizi di formazione per lo sviluppo delle competenze manageriali nel settore sanitario",
    authority: "ASL Roma 1",
    value: 85000,
    location: "Roma",
    deadline: addDays(20),
    type: "Servizi",
    cpv: "80532000-2",
    cpvDescription: "Servizi di formazione manageriale",
    isAboveThreshold: false,
    aiScore: 78,
    matchExplanation: "Buon fit per l'area Formazione. Importo sotto soglia, procedura semplificata.",
    requirements: ["Iscrizione MePA", "Esperienza formativa documentata"],
    criticalIssues: [],
    operationalSummary: "Procedura snella. Claudia Bugno può fornire i profili dei docenti per la sezione manageriale.",
    status: "Aperto"
  }
];

export const MOCK_GRANTS: Grant[] = [
  {
    id: "INC-2025-MIMIT-0042",
    source: "Incentivi.gov.it",
    title: "Voucher per la consulenza in innovazione (Innovation Manager)",
    issuingBody: "MIMIT",
    totalAllocation: 75000000,
    maxContribution: "€40.000",
    aidIntensity: "50% a fondo perduto",
    scope: "Nazionale",
    deadline: addDays(90),
    submissionMode: "A scadenza",
    beneficiaries: ["PMI", "Reti di impresa"],
    allowedCompanySizes: ["Micro", "Piccola", "Media"],
    sectors: ["Industria", "Servizi", "Commercio"],
    minInvestment: 10000,
    maxInvestment: 80000,
    atecoCodes: ["70.22", "72.20", "62.01"],
    aiScore: 95,
    grantPerspective: "supplier",
    eligibility: { size: true, sector: true, ateco: true },
    eligibleExpenses: ["Consulenza specialistica", "Innovation Manager"],
    operationalSummary: "Opportunità LATO FORNITORE. Paolo Passaro attiverà i contatti con i clienti PMI per proporre FuturItaly come Innovation Manager accreditato."
  },
  {
    id: "HORIZON-CL4-2025-TWIN",
    source: "EU Funding & Tenders",
    title: "AI for Human-Centric Manufacturing",
    issuingBody: "Commissione Europea",
    totalAllocation: 15000000,
    maxContribution: "€2.000.000",
    aidIntensity: "100% (RIA)",
    scope: "Europeo",
    deadline: addDays(120),
    submissionMode: "A scadenza",
    beneficiaries: ["Consorzi transnazionali"],
    allowedCompanySizes: ["Piccola", "Media", "Grande"],
    sectors: ["Industria", "Ricerca"],
    minInvestment: 500000,
    atecoCodes: ["72.19", "26.11"],
    aiScore: 82,
    grantPerspective: "intermediary",
    eligibility: { size: true, sector: true, ateco: true },
    eligibleExpenses: ["Personale", "Attrezzature", "Viaggi", "Overheads"],
    operationalSummary: "Lidia Boccanera sta monitorando la formazione dei consorzi. Possibile inserimento di clienti industriali come partner pilota."
  },
  {
    id: "REG-LAZIO-DIGIT-25",
    source: "Regione Lazio",
    title: "Bando Digitalizzazione PMI Lazio",
    issuingBody: "Regione Lazio",
    totalAllocation: 10000000,
    maxContribution: "€50.000",
    aidIntensity: "70% Fondo perduto",
    scope: "Regionale",
    deadline: null,
    submissionMode: "A sportello",
    beneficiaries: ["PMI sede Lazio"],
    allowedCompanySizes: ["Micro", "Piccola", "Media"],
    sectors: ["Commercio", "Artigianato", "Servizi"],
    minInvestment: 5000,
    maxInvestment: 70000,
    atecoCodes: ["Tutti"],
    aiScore: 89,
    grantPerspective: "intermediary",
    eligibility: { size: true, sector: true, ateco: true },
    eligibleExpenses: ["Hardware", "Software", "Consulenza"],
    operationalSummary: "INTERMEDIARY: Paolo Passaro verificherà il portafoglio clienti Lazio per invio circolare informativa urgente (bando a sportello)."
  },
  {
    id: "TURISMO-2025-FRI",
    source: "Invitalia",
    title: "Fondo Rotativo Imprese (FRI) per il Turismo Sostenibile",
    issuingBody: "Ministero del Turismo",
    totalAllocation: 500000000,
    maxContribution: "€10.000.000",
    aidIntensity: "Finanziamento agevolato + Contributo",
    scope: "Nazionale",
    deadline: addDays(200),
    submissionMode: "A sportello",
    beneficiaries: ["Imprese turistiche"],
    allowedCompanySizes: ["Media", "Grande"],
    sectors: ["Turismo"],
    minInvestment: 500000,
    maxInvestment: 10000000,
    atecoCodes: ["55.10", "55.20"],
    aiScore: 45,
    grantPerspective: "intermediary",
    eligibility: { size: false, sector: false, ateco: false },
    eligibleExpenses: ["Riqualificazione energetica", "Digitalizzazione"],
    operationalSummary: "Paolo Passaro: Segnalare solo a clienti settore Hotellerie > 50 dipendenti. Bassa priorità per il resto del portfolio."
  }
];

export const PIE_DATA: ChartData[] = [
  { name: 'ANAC/PDND', value: 45, color: '#1B2A4A' },
  { name: 'TED Europa', value: 25, color: '#0077B6' },
  { name: 'Incentivi.gov', value: 15, color: '#D4A017' },
  { name: 'UNGM/WB', value: 10, color: '#2E8B57' },
  { name: 'Altro', value: 5, color: '#9CA3AF' },
];

export const SCORE_DISTRIBUTION: ChartData[] = [
  { name: 'Alto (>70%)', value: 9, color: '#2E8B57' },
  { name: 'Medio (40-70%)', value: 47, color: '#D4A017' },
  { name: 'Basso (<40%)', value: 87, color: '#C0392B' },
];