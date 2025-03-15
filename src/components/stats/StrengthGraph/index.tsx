import { FC } from "react";
import Box from "../../ui/Box";
import StrengthGraphBar from "./StrengthGraphBar";
import StrengthGraphBarPlaceholder from "./StrengthGraphBarPlaceholder";

type StrengthGraphProps = {
  data: StrengthGraph;
};

const StrengthGraph: FC<StrengthGraphProps> = ({ data }) => {
  return (
    <Box
      orientation="horizontal"
      className="aspect-video overflow-x-auto gap-4"
    >
      {data.map((item) => (
        <StrengthGraphBar key={item.date} {...item} />
      ))}

      {Array.from({ length: 5 - data.length }).map((_, index) => (
        <StrengthGraphBarPlaceholder key={index} />
      ))}
    </Box>
  );
};

export default StrengthGraph;
