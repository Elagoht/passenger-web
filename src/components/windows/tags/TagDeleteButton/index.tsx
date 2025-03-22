import { IconTrash } from "@tabler/icons-react";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { deleteTag } from "../../../../services/tags";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";
import Button from "../../../ui/Button";
import Dialog from "../../../ui/Dialog";

const TagDeleteButton: FC<Pick<Tag, "id">> = ({ id }) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        color="danger"
        variant="outlined"
        icon={IconTrash}
        onClick={() => setIsOpen(true)}
      >
        {dict.windows.tagDetails.delete}
      </Button>

      <Dialog
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        title={dict.windows.tagDetails.delete}
        description={dict.windows.tagDetails.deleteModal.description}
        submitText={dict.windows.tagDetails.deleteModal.submit}
        submitColor="danger"
        onSubmit={() => {
          deleteTag(token, id)
            .then(() => {
              setIsOpen(false);
              navigate("/tools/tags");
            })
            .catch((error) => toastError(error, dict));
        }}
        cancelText={dict.windows.tagDetails.deleteModal.cancel}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default TagDeleteButton;
