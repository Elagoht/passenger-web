type WordlistCard = {
  id: string;
  displayName: string;
  description: string;
  status: WordlistStatus;
  totalPasswords: number;
  year: number;
  size: number;
  sizeUnits: string;
};

type WordlistWIPStatus = "DOWNLOADING" | "VALIDATING" | "ANALYZING";

type WordlistIDLEStatus = "IMPORTED" | "DOWNLOADED" | "VALIDATED" | "FAILED";

type WordlistStatus = WordlistWIPStatus | WordlistIDLEStatus;

type Wordlist = {
  id: string;
  displayName: string;
  description: string;
  status: WordlistStatus;
  totalPasswords: number;
  year: number;
  size: number;
  sizeUnits: string;
  minLength: number;
  maxLength: number;
  totalFiles: number;
  slug: string;
  repository: string;
  source: string;
  publishedBy: string;
  adaptedBy: string;
  message: string;
  analysesCount: number;
};

type ResponseWordlistStatus = {
  status: WordlistStatus;
  message: string;
};

type AnalysisReport = {
  id: string;
  status: AnalysisReportStatus;
  message: string;
  totalMatched: number;
  totalChecked: number;
  tookMiliseconds: number;
  createdAt: string;
  updatedAt: string;
};

type AnalysisReportStatus = "IDLE" | "RUNNING" | "COMPLETED" | "FAILED";
