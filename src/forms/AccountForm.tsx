import {
  IconBadgeTm,
  IconDeviceFloppy,
  IconKey,
  IconLink,
  IconUser,
} from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { FC } from "react";
import PassphraseGenerators from "../components/common/PassphraseGenerators";
import StrengthMeter from "../components/common/StrengthMeter";
import Container from "../components/layout/Container";
import StrengthGraph from "../components/stats/StrengthGraph";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Subtitle } from "../components/ui/Typography";
import { createAccountSchema } from "../lib/validation/account";
import { postAccountAdd, postAccountUpdate } from "../services/accounts";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

type AccountFormProps = {
  onSubmitSuccess?: () => void;
} & (
  | { mode: "add"; initialValues?: never; strengthGraph?: never }
  | {
      mode: "edit";
      initialValues: RequestAccountEdit;
      strengthGraph?: StrengthGraph;
    }
);

const AccountForm: FC<AccountFormProps> = ({
  mode,
  initialValues,
  strengthGraph,
  onSubmitSuccess,
}) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  return (
    <Formik<RequestAccountAdd | RequestAccountEdit>
      initialValues={initialValues ? initialValues : defaultValues}
      onSubmit={async (values, { setSubmitting }) => {
        (mode === "edit"
          ? postAccountUpdate(token, { ...values, id: initialValues?.id })
          : postAccountAdd(token, values as RequestAccountAdd)
        )
          .then(() => onSubmitSuccess?.())
          .catch((error) => toastError(error, dict))
          .finally(() => setSubmitting(false));
      }}
      validationSchema={mode === "add" ? createAccountSchema(dict) : undefined}
    >
      {({ values, setFieldValue }) => (
        <Form className="w-full">
          <Container
            className="grid grid-cols-1 xl:grid-cols-2
            gap-8 justify-start"
          >
            <div className="flex flex-col gap-4 h-full">
              <Input
                icon={IconBadgeTm}
                label={dict.windows.accountDetails.edit.form.platform}
                name="platform"
              />

              <Input
                icon={IconLink}
                label={dict.windows.accountDetails.edit.form.url}
                name="url"
              />

              <Input
                icon={IconUser}
                label={dict.windows.accountDetails.edit.form.identity}
                name="identity"
              />

              <Input
                icon={IconKey}
                type="password"
                name="passphrase"
                autoComplete="off"
                autoSave="off"
                label={
                  mode === "edit"
                    ? dict.windows.accountDetails.edit.form.passphrase
                    : dict.windows.addAccount.form.passphrase
                }
              />

              <PassphraseGenerators
                input={values.passphrase || ""}
                onChange={(passphrase) =>
                  setFieldValue("passphrase", passphrase)
                }
              />

              <StrengthMeter
                passphrase={values.passphrase || ""}
                wantedFeedback={
                  mode === "add" ||
                  (mode === "edit" &&
                    initialValues.passphrase !== values.passphrase)
                }
              />

              <Button type="submit" icon={IconDeviceFloppy}>
                {mode === "edit"
                  ? dict.windows.accountDetails.edit.form.save
                  : dict.windows.addAccount.form.save}
              </Button>
            </div>

            <div className="flex flex-col gap-4 self-start">
              <Textarea
                name="note"
                label={dict.windows.addAccount.form.note}
                style={{
                  backgroundSize: "1.5rem 1.5rem",
                  backgroundColor: "rgba(251, 191, 36, 0.05)",
                  backgroundImage: `
                    linear-gradient(to right, rgba(251, 191, 36, 0.25) 0.075rem, transparent 0.075rem),
                    linear-gradient(to bottom, rgba(251, 191, 36, 0.25) 0.075rem, transparent 0.075rem)
                  `,
                }}
              />

              {strengthGraph && (
                <div className="flex flex-col gap-4">
                  <Subtitle className="ml-4">
                    {dict.windows.accountDetails.details.strengthGraph}
                  </Subtitle>

                  <StrengthGraph data={strengthGraph} />
                </div>
              )}
            </div>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

const defaultValues: RequestAccountAdd = {
  platform: "",
  identity: "",
  url: "",
  note: "",
  passphrase: "",
};

export default AccountForm;
