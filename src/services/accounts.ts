import { apiCall } from "../utilities/ApiCall";

export const getAccounts = async (token: string) => {
  return await apiCall.get<AccountCard[]>("/accounts", {
    Authorization: `Bearer ${token}`,
  });
};

export const getAccountById = async (token: string, id: string) => {
  return await apiCall.get<Account>(`/accounts/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getAccountPassphrase = async (token: string, id: string) => {
  return await apiCall.get<ResponseAccountPassphrase>(
    `/accounts/${id}/passphrase`,
    { Authorization: `Bearer ${token}` },
  );
};

export const postAccountAdd = async (
  token: string,
  data: RequestAccountAdd,
) => {
  return await apiCall.post<void>("/accounts", data, {
    Authorization: `Bearer ${token}`,
  });
};

export const postAccountUpdate = async (
  token: string,
  id: string,
  data: RequestAccountEdit,
) => {
  return await apiCall.patch<void>(
    `/accounts/${id}`,
    { ...data, id: undefined },
    { Authorization: `Bearer ${token}` },
  );
};

export const postAccountTag = async (
  token: string,
  id: string,
  tagId: string,
) => {
  return await apiCall.post<void>(`/accounts/${id}/tags/${tagId}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const deleteAccountTag = async (
  token: string,
  id: string,
  tagId: string,
) => {
  return await apiCall.delete<void>(`/accounts/${id}/tags/${tagId}`, {
    Authorization: `Bearer ${token}`,
  });
};
