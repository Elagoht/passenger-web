import { FC } from "react";
import GeneratePassphraseButton from "./GeneratePassphraseButton";
import ManipulatePassphraseButton from "./ManipulatePassphraseButton";

type PassphraseGeneratorsProps = {
  input: string;
  onChange: (passphrase: string) => void;
};

const PassphraseGenerators: FC<PassphraseGeneratorsProps> = ({
  input,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <GeneratePassphraseButton onPassphraseGenerated={onChange} />

      <ManipulatePassphraseButton
        input={input}
        onPassphraseManipulated={onChange}
      />
    </div>
  );
};

export default PassphraseGenerators;
