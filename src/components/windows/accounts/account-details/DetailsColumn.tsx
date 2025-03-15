import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useMemo, useState } from "react";
import { getStrengthGraphOfAccount } from "../../../../services/stats";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";
import StrengthGraph from "../../../stats/StrengthGraph";
import { Subtitle } from "../../../ui/Typography";
import { DetailPill } from "./DetailPill";

const DetailsColumn: FC<
  Pick<Account, "id" | "copiedCount" | "lastCopiedAt">
> = ({ id, copiedCount, lastCopiedAt }) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [strengthGraph, setStrengthGraph] = useState<StrengthGraph>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getStrengthGraphOfAccount(token, id)
      .then((graph) => setStrengthGraph(graph))
      .catch((error) => toastError(error, dict))
      .finally(() => setIsLoading(false));
  }, [id, dict, token]);

  const details = useMemo(
    () => [
      {
        title: dict.windows.accountDetails.details.lastCopiedAt,
        content: lastCopiedAt
          ? new Date(lastCopiedAt).toLocaleDateString(dict.meta.locale)
          : "--/--/----",
      },
      {
        title: dict.windows.accountDetails.details.timesCopied,
        content: copiedCount?.toString() ?? "--",
      },
    ],
    [copiedCount, dict, lastCopiedAt],
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      {strengthGraph && (
        <>
          <Subtitle className="ml-4">
            {dict.windows.accountDetails.details.strengthGraph}
          </Subtitle>

          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <IconLoader size={192} className="animate-spin" />
            </div>
          ) : (
            <StrengthGraph data={strengthGraph} />
          )}
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        {details
          .filter((detail) => detail.content)
          .map((detail, index) => (
            <DetailPill
              key={index}
              title={detail.title}
              content={detail.content}
            />
          ))}
      </div>
    </div>
  );
};

export default DetailsColumn;
