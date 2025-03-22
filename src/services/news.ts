import { apiCall } from "../utilities/ApiCall";

export const getLeaks = async (token: string) => {
  return await apiCall.get<ResponseLeaks>("/leaks", {
    Authorization: `Bearer ${token}`,
  });
};

export const getNews = async (token: string) => {
  return await apiCall.get<Leak[]>("/leaks/news", {
    Authorization: `Bearer ${token}`,
  });
};
