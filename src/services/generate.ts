import { apiCall } from "../utilities/ApiCall";

export const getGeneratedPassphrase = async () => {
  return await apiCall.get<ResponseGeneratedPassphrase>("/generate");
};

export const postManipulatedPassphrase = async (input: string) => {
  return await apiCall.post<ResponseManipulatedPassphrase>(
    "/generate/alternative",
    { input },
  );
};
