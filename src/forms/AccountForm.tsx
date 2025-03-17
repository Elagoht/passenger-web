import {
  IconBadgeTm,
  IconDeviceFloppy,
  IconKey,
  IconLink,
  IconNote,
  IconUser,
} from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { FC } from "react";
import PassphraseGenerators from "../components/common/PassphraseGenerators";
import StrengthMeter from "../components/common/StrengthMeter";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { createAccountSchema } from "../lib/validation/account";
import { postAccountAdd, postAccountUpdate } from "../services/accounts";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

type AccountFormProps = {
  onSubmitSuccess?: () => void;
} & (
  | { mode: "add"; initialValues?: never }
  | { mode: "edit"; initialValues: RequestAccountEdit }
);

const AccountForm: FC<AccountFormProps> = ({
  mode,
  initialValues,
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
        <Form autoComplete="off" className="flex flex-col gap-4 w-full mt-6">
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
            onChange={(passphrase) => setFieldValue("passphrase", passphrase)}
          />

          <StrengthMeter
            passphrase={values.passphrase || ""}
            wantedFeedback={
              mode === "add" ||
              (mode === "edit" &&
                initialValues.passphrase !== values.passphrase)
            }
          />

          <Input
            icon={IconNote}
            name="note"
            label={dict.windows.addAccount.form.note}
          />

          <Button type="submit" icon={IconDeviceFloppy}>
            {mode === "edit"
              ? dict.windows.accountDetails.edit.form.save
              : dict.windows.addAccount.form.save}
          </Button>
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
