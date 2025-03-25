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

type WordlistStatus =
  | "IMPORTED"
  | "DOWNLOADING"
  | "DOWNLOADED"
  | "VALIDATING"
  | "VALIDATED"
  | "ANALYZING"
  | "FAILED";

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
