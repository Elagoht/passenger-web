type AccountCard = {
  id: string;
  platform: string;
  identity: string;
  tags: Tag[];
  url: string;
};

type Account = {
  id: string;
  platform: string;
  identity: string;
  tags: Tag[];
  url: string;
  note: string;
  passphrase: string;
  copiedCount: number;
  lastCopiedAt: string;
};

type RequestAccountAdd = {
  platform: string;
  identity: string;
  url: string;
  note: string;
  passphrase: string;
  tags: Tag["id"][];
};

type RequestAccountEdit = Partial<{
  platform: string;
  identity: string;
  url: string;
  note: string;
  passphrase: string;
  addTags?: Tag["id"][];
  removeTags?: Tag["id"][];
}>;

type ResponseAccountPassphrase = {
  passphrase: string;
  copiedCount: number;
};
