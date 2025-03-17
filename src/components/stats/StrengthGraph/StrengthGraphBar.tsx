import classNames from "classnames";
import { FC } from "react";
import useDictStore from "../../../stores/dict";

const StrengthGraphBar: FC<StrengthGraphEntry> = ({
  date,
  strength,
  isNew,
}) => {
  const { dict } = useDictStore();

  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className="w-6 h-full flex items-end bg-day-400 dark:bg-night-200
        rounded-2xl overflow-hidden"
      >
        <div
          className={classNames(
            "w-full bg-gradient-to-t flex items-start pt-1 justify-center",
            "rounded-2xl text-xs text-dream-100 text-center transition-all",
            "raise-graph",
            {
              " from-cream-700 to-cream-500": isNew,
              " from-dream-700 to-dream-500": !isNew,
            },
          )}
          style={{ height: `${strength}%` }}
        >
          {strength}
        </div>
      </div>

      <time className="text-sm font-medium block">
        {formatDate(date, dict)}
      </time>
    </div>
  );
};

const formatDate = (date: string, dict: Dict) => {
  const dateObj = new Date(date);
  return isNaN(dateObj.getTime())
    ? date
    : dateObj.toLocaleDateString(dict.meta.locale);
};

export default StrengthGraphBar;
