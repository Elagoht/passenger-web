import { FC } from "react";

const StrengthGraphBarPlaceholder: FC = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className="w-6 h-full flex items-end outline-2 outline-dashed
        outline-day-300 dark:outline-night-300 rounded-lg"
      >
        <div
          className="w-full bg-gradient-to-t from-day-300 dark:from-night-300
          rounded-lg text-xs text-day-200 dark:text-night-200 text-center p-1"
        >
          -
        </div>
      </div>

      <time className="text-sm font-medium block text-day-500 dark:text-night-200">
        --/--/----
      </time>
    </div>
  );
};

export default StrengthGraphBarPlaceholder;
