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
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
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
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-4 w-full mt-6">
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
