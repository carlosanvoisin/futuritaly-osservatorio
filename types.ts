export interface Tender {
  id: string;
  source: 'ANAC/PDND' | 'TED Europa' | 'UNGM' | 'World Bank';
  title: string;
  authority: string; // Contracting authority
  value: number;
  location: string;
  deadline: string;
  type: 'Servizi' | 'Forniture' | 'Lavori';
  cpv: string;
  cpvDescription: string;
  isAboveThreshold: boolean;
  aiScore: number; // 0-100
  matchExplanation: string;
  requirements: string[];
  criticalIssues: string[];
  operationalSummary: string;
  status: 'Aperto' | 'In scadenza' | 'Chiuso';
}

export type CompanySize = 'Micro' | 'Piccola' | 'Media' | 'Grande';
export type GrantScope = 'Nazionale' | 'Regionale' | 'Europeo' | 'Locale';
export type SubmissionMode = 'A scadenza' | 'A sportello';

export interface Grant {
  id: string;
  source: string;
  title: string;
  issuingBody: string; // 7. Ente
  totalAllocation: number;
  maxContribution: string; 
  aidIntensity: string;
  scope: GrantScope; // 1. Perimetro
  deadline: string | null; // Null if "A sportello" (sometimes) or just date
  submissionMode: SubmissionMode; // 5. Modalità
  beneficiaries: string[]; 
  allowedCompanySizes: CompanySize[]; // 3. Dimensioni
  sectors: string[]; // 2. Tipologia attività (Industria, Turismo, etc.)
  minInvestment?: number; // 4. Soglie minime
  maxInvestment?: number; // 4. Soglie massime
  atecoCodes: string[]; // 6. Codici ATECO
  aiScore: number;
  grantPerspective: 'supplier' | 'intermediary'; // 1. Perspective
  eligibility: {
    size: boolean;
    sector: boolean;
    ateco: boolean;
  };
  eligibleExpenses: string[];
  operationalSummary: string;
}

export interface Notification {
  id: string;
  type: 'opportunity' | 'deadline' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export enum Page {
  DASHBOARD = 'dashboard',
  TENDERS = 'tenders',
  GRANTS = 'grants',
  ANALYTICS = 'analytics',
  PROFILE = 'profile',
  AI_ASSISTANT = 'ai_assistant',
  NOTIFICATIONS = 'notifications'
}