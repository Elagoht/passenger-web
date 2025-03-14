import { apiCall } from "../utilities/ApiCall";

export const getAccounts = async (token: string) => {
  return await apiCall.get<AccountCard[]>("/accounts", {
    Authorization: `Bearer ${token}`,
  });
};

export const getAccountPassphrase = async (token: string, id: string) => {
  return await apiCall.get<ResponseAccountPassphrase>(
    `/accounts/${id}/passphrase`,
    { Authorization: `Bearer ${token}` },
  );
};
