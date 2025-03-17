import { FC } from "react";
import StrengthGraphBar from "./StrengthGraphBar";

type StrengthGraphProps = {
  data: StrengthGraph;
};

const StrengthGraph: FC<StrengthGraphProps> = ({ data }) => {
  return (
    <div className="flex aspect-video overflow-x-auto gap-4">
      {data.map((item, index) => (
        <StrengthGraphBar key={index} {...item} />
      ))}
    </div>
  );
};

export default StrengthGraph;
