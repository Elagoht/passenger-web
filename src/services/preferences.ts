import { apiCall } from "../utilities/ApiCall";

export const getPreferences = async (token: string) => {
  return await apiCall.get<Preference[]>("/preferences", {
    Authorization: `Bearer ${token}`,
  });
};

export const postPreference = async (token: string, preference: Preference) => {
  return await apiCall.post<Preference>(
    `/preferences/${preference.key}`,
    { value: preference.value },
    { Authorization: `Bearer ${token}` },
  );
};

export const deletePreference = async (token: string, key: string) => {
  return await apiCall.delete<Preference>(`/preferences/${key}`, {
    Authorization: `Bearer ${token}`,
  });
};
