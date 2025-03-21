import { FC } from "react";
import StrengthGraphBar from "./StrengthGraphBar";

type StrengthGraphProps = {
  data: StrengthGraph;
};

const StrengthGraph: FC<StrengthGraphProps> = ({ data }) => {
  const currentIndex = data.filter((item) => !item.isNew).length - 1;

  return (
    <div className="flex flex-col-reverse overflow-y-auto gap-2 max-h-64 justify-end">
      {data.map((item, index) => (
        <StrengthGraphBar
          key={index}
          {...item}
          isCurrent={index === currentIndex}
        />
      ))}
    </div>
  );
};

export default StrengthGraph;
