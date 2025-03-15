import classNames from "classnames";
import { FC } from "react";

type DetailPillProps = {
  index: number;
  title: string;
  content: string;
};

export const DetailPill: FC<DetailPillProps> = ({ index, title, content }) => {
  return (
    <div
      className={classNames(
        "flex flex-col rounded-2xl px-4 py-1 shadow-inner",
        "bg-opacity-50 dark:bg-opacity-50",
        {
          "bg-dream-300 dark:bg-dream-900 shadow-dream-300": index % 2 === 0,
          "dark:shadow-dream-600 text-dream-900 dark:text-dream-200":
            index % 2 === 0,
          "bg-cream-500 dark:bg-cream-900 shadow-cream-400": index % 2 === 1,
          "dark:shadow-cream-700 text-cream-900 dark:text-cream-200":
            index % 2 === 1,
        },
      )}
    >
      <h2 className="text-lg font-bold">{title}</h2>

      <span className="text-center">{content}</span>
    </div>
  );
};
