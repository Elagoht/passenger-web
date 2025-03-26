import { apiCall } from "../utilities/ApiCall";

export const initializeAnalysis = async (token: string, wordlistId: string) => {
  return await apiCall.post(`/analyses/initialize/${wordlistId}`, undefined, {
    Authorization: `Bearer ${token}`,
  });
};

export const stopAnalysis = async (token: string, analysisId: string) => {
  return await apiCall.post(`/analyses/stop/${analysisId}`, undefined, {
    Authorization: `Bearer ${token}`,
  });
};

export const observeAnalysis = async (token: string, id: string) => {
  return await apiCall.get(`/analyses/observe/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getAvailableWordlists = async (token: string) => {
  return await apiCall.get<WordlistCard[]>(`/analyses/available-wordlists`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getReports = async (token: string) => {
  return await apiCall.get(`/analyses/reports`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getReport = async (token: string, id: string) => {
  return await apiCall.get(`/analyses/reports/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};
