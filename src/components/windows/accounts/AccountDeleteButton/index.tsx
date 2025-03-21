import { IconTrash } from "@tabler/icons-react";
import { FC, useState } from "react";
import { deleteAccount } from "../../../../services/accounts";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import Button from "../../../ui/Button";
import Dialog from "../../../ui/Dialog";

const AccountDeleteButton: FC<Pick<Account, "id">> = ({ id }) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        color="danger"
        variant="outlined"
        icon={IconTrash}
        className="w-full"
      >
        {dict.windows.accountDetails.delete}
      </Button>

      <Dialog
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        title={dict.windows.accountDetails.deleteModal.title}
        description={dict.windows.accountDetails.deleteModal.description}
        submitColor="danger"
        submitText={dict.windows.accountDetails.deleteModal.submit}
        onSubmit={() => {
          deleteAccount(id, token).then(() => {
            setIsOpen(false);
          });
        }}
        cancelText={dict.windows.accountDetails.deleteModal.cancel}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default AccountDeleteButton;
