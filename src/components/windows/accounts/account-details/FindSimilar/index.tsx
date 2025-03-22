import { IconLoader } from "@tabler/icons-react";
import { FC, useCallback, useState } from "react";
import { findSimilarAccounts } from "../../../../../services/accounts";
import useAuthStore from "../../../../../stores/auth";
import useDictStore from "../../../../../stores/dict";
import toastError from "../../../../../utilities/ToastError";
import AccountListItem from "../../../../common/AccountListItem";
import BottomSheet from "../../../../common/BottomSheet";
import Button from "../../../../ui/Button";
import { Paragraph, Subtitle } from "../../../../ui/Typography";

const FindSimilar: FC<Pick<Account, "id">> = ({ id }) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [similarAccounts, setSimilarAccounts] = useState<Account[]>([]);
  const [state, setState] = useState<"off" | "loading" | "success" | "error">(
    "off",
  );

  const findSimilar = useCallback(async () => {
    setState("loading");
    findSimilarAccounts(token, id)
      .then((res) => {
        setSimilarAccounts(res);
      })
      .catch((error) => {
        toastError(error, dict);
        setState("error");
      })
      .finally(() => setState("success"));
  }, [token, id, dict]);

  return (
    <div className="flex flex-col gap-2 w-full mt-12  ">
      <Subtitle>{dict.windows.accountDetails.findSimilar}</Subtitle>

      <Button variant="outlined" color="info" onClick={findSimilar}>
        {dict.windows.accountDetails.findSimilarButton}
      </Button>

      <BottomSheet isOpen={state !== "off"} onClose={() => setState("off")}>
        <div className="flex flex-col gap-2">
          <Subtitle>
            {dict.windows.accountDetails.similarityModal.title}
          </Subtitle>

          <small>
            {dict.windows.accountDetails.similarityModal.description}
          </small>

          <div
            className="flex flex-col gap-2 items-center bg-day-200
          dark:bg-night-300 rounded-lg p-4"
          >
            {state === "loading" && (
              <>
                <IconLoader size={96} className="animate-spin" />

                <Paragraph>
                  {dict.windows.accountDetails.similarityModal.wip}
                </Paragraph>
              </>
            )}

            {state === "error" && (
              <Paragraph>
                {dict.windows.accountDetails.similarityModal.error}
              </Paragraph>
            )}

            {state === "success" && similarAccounts.length > 0 ? (
              <div
                className="flex flex-col gap-2 w-full"
                onClick={() => setState("off")}
              >
                <Paragraph>
                  {dict.windows.accountDetails.similarityModal.found.replace(
                    "{{count}}",
                    similarAccounts.length.toString(),
                  )}
                </Paragraph>

                {similarAccounts.map((account) => (
                  <AccountListItem key={account.id} {...account} />
                ))}
              </div>
            ) : (
              <Paragraph>
                {dict.windows.accountDetails.similarityModal.noResults}
              </Paragraph>
            )}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default FindSimilar;
