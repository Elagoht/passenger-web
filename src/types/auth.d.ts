type ResponseIsInitialized = {
  initialized: boolean;
};

type RequestInitialize = {
  email: string;
  password: string;
};

type RequestLogin = {
  email: string;
  password: string;
};

type ResponseLogin = {
  token: string;
};

type RequestInitialize = {
  email: string;
  password: string;
};

type ResponseInitialize = {
  token: string;
  recoveryKey: string;
};
