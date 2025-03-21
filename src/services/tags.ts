import { apiCall } from "../utilities/ApiCall";

export const getTags = async (token: string) => {
  return await apiCall.get<Tag[]>("/tags", {
    Authorization: `Bearer ${token}`,
  });
};

export const getTag = async (token: string, id: string) => {
  return await apiCall.get<Tag>(`/tags/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};

export const postTagAdd = async (token: string, tag: RequestTagAdd) => {
  return await apiCall.post<Tag>("/tags", tag, {
    Authorization: `Bearer ${token}`,
  });
};

export const patchTagUpdate = async (
  token: string,
  id: string,
  tag: RequestTagUpdate,
) => {
  return await apiCall.patch<Tag>(`/tags/${id}`, tag, {
    Authorization: `Bearer ${token}`,
  });
};

export const deleteTag = async (token: string, id: string) => {
  return await apiCall.delete<Tag>(`/tags/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};
