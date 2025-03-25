import { apiCall } from "../utilities/ApiCall";

export const getStrengthGraphOfAccount = async (token: string, id: string) => {
  return await apiCall.get<StrengthGraph>(`/stats/graph/strength/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const getStrengthGraph = async (token: string) => {
  return await apiCall.get<StrengthGraph>("/stats/graph/strength", {
    Authorization: `Bearer ${token}`,
  });
};
