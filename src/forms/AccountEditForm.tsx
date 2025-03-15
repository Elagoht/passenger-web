import {
  IconBadgeTm,
  IconFavicon,
  IconLink,
  IconLock,
  IconUser,
} from "@tabler/icons-react";
import { Formik } from "formik";
import { FC } from "react";
import { Form } from "react-router";
import PassphraseGenerators from "../components/common/PassphraseGenerators";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import useDictStore from "../stores/dict";

const AccountEditForm: FC<RequestAccountEdit> = (props) => {
  const { dict } = useDictStore();

  return (
    <Formik<RequestAccountEdit> initialValues={props} onSubmit={() => {}}>
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-4">
          <Input
            icon={IconBadgeTm}
            label={dict.windows.accountDetails.edit.form.platform}
            name="platform"
          />

          <Input
            icon={IconUser}
            label={dict.windows.accountDetails.edit.form.identity}
            name="identity"
          />

          <Input
            icon={IconFavicon}
            label={dict.windows.accountDetails.edit.form.icon}
            name="icon"
          />

          <Input
            type=""
            icon={IconLink}
            label={dict.windows.accountDetails.edit.form.url}
            name="url"
          />

          <Input
            type="password"
            icon={IconLock}
            label={dict.windows.accountDetails.edit.form.passphrase}
            name="passphrase"
          />

          <PassphraseGenerators
            input={values.passphrase || ""}
            onChange={(passphrase) => setFieldValue("passphrase", passphrase)}
          />

          <Button type="submit">
            {dict.windows.accountDetails.edit.form.save}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AccountEditForm;
