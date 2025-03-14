type AccountCard = {
  id: string;
  platform: string;
  identity: string;
  icon: string;
  tags: Tag[];
  url: string;
};

type ResponseAccountPassphrase = {
  passphrase: string;
  copiedCount: number;
};