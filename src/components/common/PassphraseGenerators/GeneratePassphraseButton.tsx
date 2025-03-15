import {
  IconDice1,
  IconDice2,
  IconDice3,
  IconDice4,
  IconDice5,
  IconDice6,
} from "@tabler/icons-react";
import { FC, useState } from "react";
import { getGeneratedPassphrase } from "../../../services/generate";
import useDictStore from "../../../stores/dict";
import toastError from "../../../utilities/ToastError";
import Button from "../../ui/Button";

type GeneratePassphraseButtonProps = {
  onPassphraseGenerated: (passphrase: string) => void;
};

const GeneratePassphraseButton: FC<GeneratePassphraseButtonProps> = ({
  onPassphraseGenerated,
}) => {
  const { dict } = useDictStore();
  const [dice, setDice] = useState<number>(getRandomDice());

  return (
    <Button
      variant="gradient"
      color="info"
      icon={dices[dice]}
      onClick={async () => {
        await getGeneratedPassphrase()
          .then((response) => {
            onPassphraseGenerated(response.passphrase);
            setDice(getRandomDice());
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

const getRandomDice = () => {
  return Math.floor(Math.random() * dices.length);
};

const dices = [
  IconDice1,
  IconDice2,
  IconDice3,
  IconDice4,
  IconDice5,
  IconDice6,
];

export default GeneratePassphraseButton;
