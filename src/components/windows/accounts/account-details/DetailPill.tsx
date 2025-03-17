import { FC } from "react";

type DetailPillProps = {
  title: string;
  content: string;
};

export const DetailPill: FC<DetailPillProps> = ({ title, content }) => {
  return (
    <div
      className="text-center flex flex-col gap-1 bg-day-100
      dark:bg-night-800 rounded-lg p-2"
    >
      <strong>{title}</strong>

      <span>{content}</span>
    </div>
  );
};
