import classNames from "classnames";
import { FC } from "react";
import useDictStore from "../../../stores/dict";

type StrengthGraphBarProps = StrengthGraphEntry & {
  isCurrent: boolean;
};

const StrengthGraphBar: FC<StrengthGraphBarProps> = ({
  date,
  strength,
  isNew,
  isCurrent,
}) => {
  const { dict } = useDictStore();

  return (
    <div className="flex gap-2 items-center raise-up">
      <time className="text-sm font-medium block w-20 text-right">
        {formatDate(date, dict)}
      </time>

      <div
        className="h-4 flex items-end bg-day-400 dark:bg-night-200
        rounded-2xl overflow-hidden grow"
      >
        <div
          className={classNames(
            "h-4 bg-gradient-to-t flex items-center justify-end pr-2",
            "rounded-2xl text-xs text-dream-100 text-center transition-all",
            "wide-right",
            {
              " from-cream-700 to-cream-500": isNew,
              " from-dream-700 to-dream-500": !isNew,
              "border-2 border-night-500 dark:border-day-500": isCurrent,
            },
          )}
          style={{ width: `${strength}%` }}
        >
          {strength}
        </div>
      </div>
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
