import { apiCall } from "../utilities/ApiCall";

export const getIsInitialized = async () => {
  return await apiCall.get<ResponseIsInitialized>("/auth/is-initialized");
};

export const postInitialize = async (request: RequestInitialize) => {
  return await apiCall.post<ResponseInitialize>("/auth/initialize", request);
};

export const postLogin = async (request: RequestLogin) => {
  return await apiCall.post<ResponseLogin>("/auth/login", request);
};

export const postForgotPassphrase = async (
  request: RequestForgotPassphrase,
) => {
  return await apiCall.post<ResponseForgotPassphrase>(
    "/auth/reset-passphrase",
    request,
  );
};

export const postChangePassphrase = async (
  token: string,
  request: RequestChangePassphrase,
) => {
  return await apiCall.post<void>("/auth/change-passphrase", request, {
    Authorization: `Bearer ${token}`,
  });
};
