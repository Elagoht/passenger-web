import { FC } from "react";
import useDictStore from "../../../stores/dict";

const StrengthGraphBar: FC<StrengthGraphEntry> = ({ date, strength }) => {
  const { dict } = useDictStore();

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="w-6 h-full flex items-end bg-day-400 dark:bg-night-200 rounded-lg">
        <div
          className="w-full bg-gradient-to-t from-dream-700 to-dream-500
          flex items-start pt-1 justify-center rounded-lg text-xs text-dream-100
          text-center transition-all raise-graph"
          style={{ height: `${strength}%` }}
        >
          {strength}
        </div>
      </div>

      <time className="text-sm font-medium block">
        {new Date(date).toLocaleDateString(dict.meta.locale)}
      </time>
    </div>
  );
};

export default StrengthGraphBar;
