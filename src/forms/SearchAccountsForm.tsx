import { IconFilter, IconSearch } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { FC } from "react";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const SearchAccountsForm: FC = () => {
  return (
    <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
      <Form className="flex gap-2">
        <Input icon={IconSearch} name="search" placeholder="Search" />

        <Button variant="gradient" color="secondary">
          <IconFilter size={24} />
        </Button>
      </Form>
    </Formik>
  );
};

export default SearchAccountsForm;
