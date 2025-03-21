import { apiCall } from "../utilities/ApiCall";

export const getCollections = async (token: string) => {
  return await apiCall.get("/collections", {
    Authorization: `Bearer ${token}`,
  });
};

export const createCollection = async (token: string, name: string) => {
  return await apiCall.post(
    "/collections",
    { name },
    { Authorization: `Bearer ${token}` },
  );
};

export const updateCollection = async (
  token: string,
  id: string,
  name: string,
) => {
  return await apiCall.put(
    `/collections/${id}`,
    { name },
    { Authorization: `Bearer ${token}` },
  );
};

export const deleteCollection = async (token: string, id: string) => {
  return await apiCall.delete(`/collections/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const addAccountToCollection = async (
  token: string,
  collectionId: string,
  accountId: string,
) => {
  return await apiCall.post(
    `/collections/${collectionId}/accounts/${accountId}`,
    { Authorization: `Bearer ${token}` },
  );
};

export const removeAccountFromCollection = async (
  token: string,
  collectionId: string,
  accountId: string,
) => {
  return await apiCall.delete(
    `/collections/${collectionId}/accounts/${accountId}`,
    { Authorization: `Bearer ${token}` },
  );
};
