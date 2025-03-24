import {
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { FC } from "react";
import Button from "../components/ui/Button";
import { Combobox } from "../components/ui/Combobox";
import { Input } from "../components/ui/Input";
import { Switch } from "../components/ui/Switch";
import useDictStore from "../stores/dict";

type LeakQueryFormProps = {
  query: LeaksQuery;
  setQuery: (query: LeaksQuery) => void;
};

const LeakQueryForm: FC<LeakQueryFormProps> = ({ query, setQuery }) => {
  const { dict } = useDictStore();

  return (
    <Formik<LeaksQuery>
      initialValues={query}
      onSubmit={(values, { setSubmitting }) => {
        setQuery(values);
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col w-full gap-2">
          <div className="flex items-center gap-2">
            <Input
              name="name"
              icon={IconSearch}
              label={dict.windows.leaks.query.searchTerm}
            />

            <Switch name="verified" label={dict.windows.leaks.query.verified} />
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Combobox
                label={dict.windows.leaks.query.sortBy}
                name="sortBy"
                icon={IconSearch}
                options={[
                  { value: "date", label: dict.windows.leaks.query.date },
                  { value: "name", label: dict.windows.leaks.query.name },
                  { value: "domain", label: dict.windows.leaks.query.domain },
                ]}
              />
            </div>

            <div className="flex items-center">
              {[
                {
                  onClick: () => setFieldValue("sortOrder", "asc"),
                  className: "rounded-r-none",
                  value: "asc",
                  icon: <IconSortAscending />,
                },
                {
                  onClick: () => setFieldValue("sortOrder", "desc"),
                  className: "rounded-l-none",
                  value: "desc",
                  icon: <IconSortDescending />,
                },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={
                    values.sortOrder === option.value ? "solid" : "outlined"
                  }
                  className={classNames(
                    "h-10 flex items-center justify-center",
                    option.className,
                  )}
                  onClick={option.onClick}
                >
                  {option.icon}
                </Button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="solid">
            {dict.windows.leaks.query.search}
          </Button>

          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};
export default LeakQueryForm;
