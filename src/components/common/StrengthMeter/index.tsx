import { FC } from "react";
import { Strength } from "../../../utilities/Strength";

type StrengthMeterProps = Pick<Account, "passphrase">;

const StrengthMeter: FC<StrengthMeterProps> = ({ passphrase }) => {
  const strength = Strength.evaluate(passphrase);

  return (
    <div
      className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full
      relative"
    >
      <div
        className="h-2 rounded-full bg-gradient-to-r inset-0 absolute
        from-red-500 via-yellow-500 to-green-500"
        style={{
          clipPath: `polygon(0 0, ${strength.score}% 0, ${
            strength.score
          }% 100%, 0% 100%)`,
        }}
      />
    </div>
  );
};

export default StrengthMeter;
