import { Form, Formik } from "formik";
import { FC, useMemo } from "react";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import { Combobox } from "../components/ui/Combobox";
import { Switch } from "../components/ui/Switch";
import { postPreference } from "../services/preferences";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

type PreferencesFormProps = {
  settings: Preference[];
  wordlists: WordlistCard[];
};

const PreferencesForm: FC<PreferencesFormProps> = ({
  settings,
  wordlists = [],
}) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const navigate = useNavigate();

  const initialValues = useMemo(() => {
    return settings2InitialValues(settings);
  }, [settings]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        Promise.all(
          Object.entries(values).map(([key, value]) => {
            if (String(initialValues[key]) === String(value) || value === "")
              return;

            return postPreference(token, {
              key: key as Preference["key"],
              value: String(value),
            });
          }),
        )
          .then(() => navigate("/settings"))
          .catch((error) => toastError(error, dict))
          .finally(() => setSubmitting(false));
      }}
    >
      <Form className="flex flex-col gap-2 w-full divide-y divide-day-400 dark:divide-night-100">
        {settings?.map((setting) => (
          <div
            key={setting.key}
            className="flex items-center justify-between gap-2 p-2 hover:bg-day-300 dark:hover:bg-night-900"
          >
            <div className="flex flex-col">
              <strong>
                {dict.windows.preferences.items[setting.key].title}
              </strong>

              <code className="text-xs text-day-900">{setting.key}</code>
            </div>

            <div>{renderValueOption(setting.key, wordlists)}</div>
          </div>
        ))}

        <Button type="submit" className="w-full">
          {dict.windows.preferences.save}
        </Button>
      </Form>
    </Formik>
  );
};

const settings2InitialValues = (settings: Preference[]) => {
  return settings.reduce(
    (acc, setting) => {
      acc[setting.key] =
        setting.key === "strictMode"
          ? string2Boolean(setting.value as string)
          : setting.value;
      return acc;
    },
    {} as Record<string, string | boolean>,
  );
};

const string2Boolean = (value: string) => {
  return value === "true";
};

const renderValueOption = (key: string, options: WordlistCard[]) => {
  switch (key) {
    case "strictMode":
      return <Switch name={key} />;
    case "wordlist":
      return (
        <Combobox
          name={key}
          options={[
            {
              label: "---",
              value: " ",
            },
            ...options.map((option) => ({
              label: option.displayName,
              value: option.id,
            })),
          ]}
        />
      );
  }
};

export default PreferencesForm;
