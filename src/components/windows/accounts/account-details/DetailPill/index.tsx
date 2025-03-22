import { FC } from "react";

type DetailPillProps = {
  title: string;
  content: string;
};

export const DetailPill: FC<DetailPillProps> = ({ title, content }) => {
  return (
    <div
      className="text-center flex flex-col items-center justify-center
      bg-day-100 dark:bg-night-800 rounded-lg py-1 px-2"
    >
      <strong className="text-sm text-day-900">{title}</strong>

      <span>{content}</span>
    </div>
  );
};
