import { apiCall } from "../utilities/ApiCall";

export const getTags = async (token: string) => {
  return await apiCall.get<Tag[]>("/tags", {
    Authorization: `Bearer ${token}`,
  });
};
