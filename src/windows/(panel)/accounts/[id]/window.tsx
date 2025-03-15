import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Container from "../../../../components/layout/Container";
import StrengthGraph from "../../../../components/stats/StrengthGraph";
import {
  Paragraph,
  Subtitle,
  Title,
} from "../../../../components/ui/Typography";
import { DetailPill } from "../../../../components/windows/accounts/account-details/DetailPill";
import AccountEditForm from "../../../../forms/AccountEditForm";
import { getAccountById } from "../../../../services/accounts";
import { getStrengthGraphOfAccount } from "../../../../services/stats";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";

const AccountDetailsWindow: FC = () => {
  const { id } = useParams();
  const { token } = useAuthStore();
  const { dict } = useDictStore();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [strengthGraph, setStrengthGraph] = useState<StrengthGraph>();

  useEffect(() => {
    setIsLoading(true);
    if (!id) {
      navigate("/accounts");
      return;
    }

    getAccountById(token, id)
      .then((account) => setAccount(account))
      .catch((error) => toastError(error, dict))
      .finally(() => setIsLoading(false));
  }, [id, navigate, token, dict]);

  useEffect(() => {
    if (!account) return;
    getStrengthGraphOfAccount(token, account.id)
      .then((graph) => setStrengthGraph(graph))
      .catch((error) => toastError(error, dict));
  }, [account, dict, token]);

  const details = useMemo(
    () => [
      {
        title: dict.windows.accountDetails.details.lastCopiedAt,
        content: account?.lastCopiedAt
          ? new Date(account.lastCopiedAt).toLocaleDateString(dict.meta.locale)
          : "--/--/----",
      },
      {
        title: dict.windows.accountDetails.details.timesCopied,
        content: account?.copiedCount?.toString() ?? "--",
      },
    ],
    [account, dict],
  );

  if (!id) return <Navigate to="/accounts" />;

  if (isLoading)
    return (
      <Container>
        <IconLoader className="animate-spin" />
      </Container>
    );

  if (!account) return <Navigate to="/accounts" />;

  return (
    <Container className="grid grid-cols-1 xl:grid-cols-2 gap-8 justify-start">
      <div className="flex flex-col gap-4 h-full">
        <Title>{dict.windows.accountDetails.title}</Title>

        <Paragraph>{dict.windows.accountDetails.description}</Paragraph>

        <AccountEditForm {...account} icon={null} />
      </div>

      <div className="flex flex-col gap-4 h-full">
        {strengthGraph && (
          <>
            <Subtitle className="ml-4">
              {dict.windows.accountDetails.details.strengthGraph}
            </Subtitle>

            <StrengthGraph data={strengthGraph} />
          </>
        )}

        <div className="flex flex-wrap gap-4">
          {details
            .filter((detail) => detail.content)
            .map((detail, index) => (
              <DetailPill
                key={index}
                index={index}
                title={detail.title}
                content={detail.content}
              />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default AccountDetailsWindow;
