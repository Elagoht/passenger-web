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

type ResponseAccountPassphrase = {
  passphrase: string;
  copiedCount: number;
};
