import { FC } from "react";
import useDictStore from "../../../stores/dict";
import { Strength } from "../../../utilities/Strength";

type StrengthMeterProps = Pick<Account, "passphrase"> & {
  wantedFeedback: boolean;
};

const StrengthMeter: FC<StrengthMeterProps> = ({
  passphrase,
  wantedFeedback,
}) => {
  const { dict } = useDictStore();

  const { score, feedback } = new Strength(dict).evaluate(passphrase);

  return (
    <div className="flex flex-col gap-2 mx-4 -m-3 -z-10">
      <div
        className="w-full h-4 bg-day-400 dark:bg-night-100 rounded-full
        relative"
      >
        <div
          className="rounded-full bg-gradient-to-r inset-0 absolute
          from-red-500 via-yellow-500 to-green-500 transition-all duration-300"
          style={{
            clipPath: `polygon(0 0, ${score}% 0, ${score}% 100%, 0% 100%)`,
          }}
        />
      </div>

      {feedback.length > 0 && wantedFeedback && (
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {feedback.map((item) => (
            <li key={item} className="text-xs raise-graph">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StrengthMeter;
