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
  | "UNVALIDATED"
  | "VALIDATING"
  | "VALIDATED"
  | "ANALYZING"
  | "FAILED";
