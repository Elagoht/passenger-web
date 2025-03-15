type AccountCard = {
  id: string;
  platform: string;
  identity: string;
  icon: string;
  tags: Tag[];
  url: string;
};

type Account = {
  id: string;
  platform: string;
  identity: string;
  icon: string;
  tags: Tag[];
  url: string;
  note: string;
  copiedCount: number;
  lastCopiedAt: string;
};

type RequestAccountEdit = Partial<{
  platform: string;
  identity: string;
  icon: string;
  url: string;
  note: string;
  passphrase: string;
}>;

type ResponseAccountPassphrase = {
  passphrase: string;
  copiedCount: number;
};
