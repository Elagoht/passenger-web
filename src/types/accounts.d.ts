type AccountCard = {
  id: string;
  platform: string;
  identity: string;
  icon: string | null;
  tags: Tag[];
  url: string;
};

type Account = {
  id: string;
  platform: string;
  identity: string;
  icon: string | null;
  tags: Tag[];
  url: string;
  note: string;
  copiedCount: number;
  lastCopiedAt: string;
};

type RequestAccountAdd = {
  platform: string;
  identity: string;
  icon: string | null;
  url: string;
  note: string;
  passphrase: string;
};
type RequestAccountEdit = Partial<{
  id: string;
  platform: string;
  identity: string;
  icon: string | null;
  url: string;
  note: string;
  passphrase: string;
}>;

type ResponseAccountPassphrase = {
  passphrase: string;
  copiedCount: number;
};
