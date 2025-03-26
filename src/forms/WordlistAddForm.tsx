import { IconLink } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { FC } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { postWordlistImport } from "../services/wordlists";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

const WordlistAddForm: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ url: "" }}
      onSubmit={(values, { setSubmitting }) => {
        postWordlistImport(token, values.url)
          .then(() => navigate("/tools/wordlists"))
          .catch((error) =>
            toastError(error, dict, {
              400: () => toast.error(dict.windows.wordListAdd.form.invalidUrl),
              409: () =>
                toast.error(dict.windows.wordListAdd.form.alreadyExists),
            }),
          )
          .finally(() => setSubmitting(false));
      }}
    >
      <Form className="w-full max-w-screen-md flex flex-col gap-4">
        <Input
          icon={IconLink}
          name="url"
          label={dict.windows.wordListAdd.form.url}
        />

        <Button type="submit">{dict.windows.wordListAdd.form.submit}</Button>
      </Form>
    </Formik>
  );
};

export default WordlistAddForm;
