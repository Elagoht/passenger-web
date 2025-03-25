import { apiCall } from "../utilities/ApiCall";

export const getWordlists = async (token: string) => {
  return await apiCall.get<WordlistCard[]>("/word-lists", {
    Authorization: `Bearer ${token}`,
  });
};
