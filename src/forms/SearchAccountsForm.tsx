import { IconFilter, IconSearch } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { FC } from "react";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import useDictStore from "../stores/dict";
import useAuthStore from "../stores/auth";
import { getAccounts } from "../services/accounts";
import toastError from "../utilities/ToastError";

const SearchAccountsForm: FC<{
  setAccounts: (accounts: AccountCard[]) => void;
}> = ({ setAccounts }) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        getAccounts(token, values.search)
          .then((accounts) => setAccounts(accounts))
          .catch((error) =>
            toastError(error, dict, { 404: () => setAccounts([]) })
          )
          .finally(() => setSubmitting(false));
      }}
    >
      <Form className="flex gap-2">
        <Input
          icon={IconSearch}
          name="search"
          placeholder={dict.windows.accounts.query.placeholder}
        />

        <Button variant="gradient" color="secondary">
          <IconFilter size={24} />
        </Button>
      </Form>
    </Formik>
  );
};

export default SearchAccountsForm;
