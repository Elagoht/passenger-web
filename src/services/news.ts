import QueryString from "qs";
import { apiCall } from "../utilities/ApiCall";

export const getLeaks = async (token: string, query: LeaksQuery) => {
  return await apiCall.get<ResponseLeaks>(
    `/leaks?${QueryString.stringify(query)}`,
    { Authorization: `Bearer ${token}` },
  );
};

export const getNews = async (token: string) => {
  return await apiCall.get<Leak[]>("/leaks/news", {
    Authorization: `Bearer ${token}`,
  });
};
