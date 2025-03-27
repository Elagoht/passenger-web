import { apiCall } from "../utilities/ApiCall";

export const postAnalysisInitialize = async (
  token: string,
  wordlistId: string,
) => {
  return await apiCall.post(`/analyses/initialize/${wordlistId}`, undefined, {
    Authorization: `Bearer ${token}`,
  });
};

export const postAnalysisStop = async (token: string, analysisId: string) => {
  return await apiCall.post(`/analyses/stop/${analysisId}`, undefined, {
    Authorization: `Bearer ${token}`,
  });
};

export const getAnalysisObserve = async (token: string, id: string) => {
  return await apiCall.get(`/analyses/observe/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getAnalysisAvailableWordlists = async (token: string) => {
  return await apiCall.get<WordlistCard[]>(`/analyses/available-wordlists`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getAnalysisReports = async (token: string) => {
  return await apiCall.get(`/analyses/reports`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getAnalysisReport = async (token: string, id: string) => {
  return await apiCall.get(`/analyses/reports/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};
