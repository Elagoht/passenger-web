import { apiCall } from "../utilities/ApiCall";

export const getWordlists = async (token: string) => {
  return await apiCall.get<WordlistCard[]>("/word-lists", {
    Authorization: `Bearer ${token}`,
  });
};

export const postWordlistImport = async (token: string, url: string) => {
  return await apiCall.post<void>(
    "/word-lists/import",
    { url },
    { Authorization: `Bearer ${token}` },
  );
};

export const getWordlist = async (token: string, id: string) => {
  return await apiCall.get<Wordlist>(`/word-lists/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const deleteWordlist = async (token: string, id: string) => {
  return await apiCall.delete<void>(`/word-lists/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getWordlistStatus = async (token: string, id: string) => {
  return await apiCall.get<ResponseWordlistStatus>(`/word-lists/${id}/status`, {
    Authorization: `Bearer ${token}`,
  });
};

export const postWordlistDownload = async (token: string, id: string) => {
  return await apiCall.post<void>(`/word-lists/${id}/download`, {
    Authorization: `Bearer ${token}`,
  });
};

export const postWordlistCancelDownload = async (token: string, id: string) => {
  return await apiCall.post<void>(`/word-lists/${id}/cancel-download`, {
    Authorization: `Bearer ${token}`,
  });
};

export const postWordlistValidate = async (token: string, id: string) => {
  return await apiCall.post<void>(`/word-lists/${id}/validate`, {
    Authorization: `Bearer ${token}`,
  });
};
