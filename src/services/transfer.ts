import QueryString from "qs";
import { apiCall } from "../utilities/ApiCall";

export const postImportAccounts = async (
  token: string,
  data: RequestImportAccounts,
) => {
  const formData = new FormData();
  formData.append("file", data.file);

  return await apiCall.post<void>("/transfer/import", formData, {
    Authorization: `Bearer ${token}`,
  });
};

export const postExportAccounts = async (
  token: string,
  format: QueryExportAccountType,
) => {
  return await apiCall.post<string>(
    `/transfer/export${QueryString.stringify(
      { format },
      { addQueryPrefix: true },
    )}`,
    undefined,
    { Authorization: `Bearer ${token}` },
  );
};
