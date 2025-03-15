import { FC } from "react";
import StrengthGraphBar from "./StrengthGraphBar";
import StrengthGraphBarPlaceholder from "./StrengthGraphBarPlaceholder";

type StrengthGraphProps = {
  data: StrengthGraph;
};

const StrengthGraph: FC<StrengthGraphProps> = ({ data }) => {
  return (
    <div
      className="w-full aspect-video flex gap-4 bg-day-200
      dark:bg-night-900 rounded-3xl p-4 overflow-x-auto shadow-inner
      shadow-day-400 dark:shadow-night-300"
    >
      {data.map((item) => (
        <StrengthGraphBar key={item.date} {...item} />
      ))}

      {Array.from({ length: 5 - data.length }).map((_, index) => (
        <StrengthGraphBarPlaceholder key={index} />
      ))}
    </div>
  );
};

export default StrengthGraph;
