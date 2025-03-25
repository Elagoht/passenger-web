import { Form, Formik } from "formik";
import { FC } from "react";
import Button from "../components/ui/Button";
import { Combobox } from "../components/ui/Combobox";
import { postExportAccounts } from "../services/transfer";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

const ExportForm: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  return (
    <Formik<{ format: QueryExportAccountType }>
      initialValues={{ format: "chrome" }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        postExportAccounts(token, values.format)
          .then((response) =>
            downloadBlob(
              new Blob([response], { type: "text/csv" }),
              "accounts.csv",
            ),
          )
          .catch((error) => toastError(error, dict))
          .finally(() => setSubmitting(false));
      }}
    >
      <Form className="flex flex-col gap-4 max-w-lg w-full">
        <Combobox
          name="format"
          options={[
            { label: "Chrome", value: "chrome" },
            { label: "Firefox", value: "firefox" },
            { label: "LastPass", value: "lastpass" },
            { label: "1Password", value: "1password" },
          ]}
        />

        <Button type="submit">{dict.windows.export.download}</Button>
      </Form>
    </Formik>
  );
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};

export default ExportForm;
