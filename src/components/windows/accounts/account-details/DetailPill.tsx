import { FC } from "react";
import Box from "../../../ui/Box";

type DetailPillProps = {
  title: string;
  content: string;
};

export const DetailPill: FC<DetailPillProps> = ({ title, content }) => {
  return (
    <Box padding="sm" className="text-center">
      <strong>{title}</strong>

      <span>{content}</span>
    </Box>
  );
};
