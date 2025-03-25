import { apiCall } from "../utilities/ApiCall";

export const postImportAccounts = async (
  token: string,
  data: RequestImportAccounts,
) => {
  const formData = new FormData();
  formData.append("file", data.file);

  return await apiCall.post("/transfer/import", formData, {
    Authorization: `Bearer ${token}`,
  });
};
