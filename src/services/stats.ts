import { apiCall } from "../utilities/ApiCall";

export const getStrengthGraphOfAccount = async (token: string, id: string) => {
  return await apiCall.get<StrengthGraph>(`/stats/graph/strength/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};
