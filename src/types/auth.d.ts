type ResponseIsInitialized = {
  initialized: boolean;
};

type RequestInitialize = {
  passphrase: string;
};

type RequestLogin = {
  passphrase: string;
};

type ResponseLogin = {
  token: string;
};

type RequestInitialize = {
  username: string;
  passphrase: string;
};

type ResponseInitialize = {
  token: string;
  recoveryKey: string;
};

type RequestForgotPassphrase = {
  recoveryKey: string;
};

type ResponseForgotPassphrase = {
  assignedPassphrase: string;
};

type RequestChangePassphrase = {
  passphrase: string;
};
