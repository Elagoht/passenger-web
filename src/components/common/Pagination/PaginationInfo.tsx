import { FC } from "react";
import useDictStore from "../../../stores/dict";
import Yarn from "../../../utilities/Yarn";

type PaginationInfoProps = {
  total: number;
  perPage: number;
  current: number;
};

const PaginationInfo: FC<PaginationInfoProps> = ({
  total,
  perPage,
  current,
}) => {
  const { dict } = useDictStore();

  return (
    <div className="gap-2 mt-6 text-left w-full">
      {Yarn.formatMessage(dict.pagination.info, {
        total: total.toString(),
        from: ((current - 1) * perPage + 1).toString(),
        to: Math.min(current * perPage, total).toString(),
      })}
    </div>
  );
};

export default PaginationInfo;
