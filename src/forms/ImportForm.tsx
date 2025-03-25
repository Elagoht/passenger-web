import { Form, Formik } from "formik";
import { FC } from "react";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import { FileInput } from "../components/ui/FileInput";
import { postImportAccounts } from "../services/transfer";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

const ImportForm: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const navigate = useNavigate();

  return (
    <Formik<RequestImportAccounts>
      initialValues={{ file: new File([], "") }}
      onSubmit={async (values, { setSubmitting }) => {
        postImportAccounts(token, values)
          .then(() => navigate("/accounts"))
          .catch((error) => toastError(error, dict))
          .finally(() => setSubmitting(false));
      }}
    >
      <Form className="flex gap-4 w-full max-w-screen-md">
        <FileInput name="file" accept=".csv" />

        <Button type="submit">{dict.windows.import.form.submit}</Button>
      </Form>
    </Formik>
  );
};

export default ImportForm;
