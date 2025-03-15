import { IconRefresh } from "@tabler/icons-react";
import { FC } from "react";
import { postManipulatedPassphrase } from "../../../services/generate";
import useDictStore from "../../../stores/dict";
import toastError from "../../../utilities/ToastError";
import Button from "../../ui/Button";

type ManipulatePassphraseButtonProps = {
  input: string;
  onPassphraseManipulated: (passphrase: string) => void;
};

const ManipulatePassphraseButton: FC<ManipulatePassphraseButtonProps> = ({
  input,
  onPassphraseManipulated,
}) => {
  const { dict } = useDictStore();

  return (
    <Button
      variant="gradient"
      color="warning"
      icon={IconRefresh}
      onClick={async () => {
        if (input.length === 0) return;
        await postManipulatedPassphrase(input)
          .then((response) => {
            onPassphraseManipulated(response.passphrase);
          })
          .catch((error) => {
            toastError(error, dict);
          });
      }}
    >
      {dict.generators.generate}
    </Button>
  );
};

export default ManipulatePassphraseButton;
