import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../../../../components/layout/Container";
import { Paragraph, Title } from "../../../../../components/ui/Typography";
import { DetailPill } from "../../../../../components/windows/accounts/account-details/DetailPill";
import FindSimilar from "../../../../../components/windows/accounts/account-details/FindSimilar";
import AccountForm from "../../../../../forms/AccountForm";
import { getAccountById } from "../../../../../services/accounts";
import { getStrengthGraphOfAccount } from "../../../../../services/stats";
import useAuthStore from "../../../../../stores/auth";
import useDictStore from "../../../../../stores/dict";
import toastError from "../../../../../utilities/ToastError";

const AccountDetailsWindow: FC = () => {
  const { id } = useParams();
  const { token } = useAuthStore();
  const { dict } = useDictStore();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/accounts");
      return;
    }

    getAccountById(token, id)
      .then((account) => setAccount(account))
      .catch((error) => toastError(error, dict));
  }, [id, navigate, token, dict]);

  const [strengthGraph, setStrengthGraph] = useState<StrengthGraph>();

  useEffect(() => {
    if (!id) return;
    getStrengthGraphOfAccount(token, id)
      .then((graph) => setStrengthGraph(graph))
      .catch((error) => toastError(error, dict));
  }, [id, token, dict]);

  if (!account || !id)
    return (
      <Container>
        <IconLoader className="animate-spin" />
      </Container>
    );

  const details = [
    {
      title: dict.windows.accountDetails.details.timesAccessed,
      content: account?.copiedCount?.toString() ?? "--",
    },
    {
      title: dict.windows.accountDetails.details.lastAccessedAt,
      content: account?.lastCopiedAt
        ? new Date(account.lastCopiedAt).toLocaleDateString(dict.meta.locale)
        : "--/--/----",
    },
  ];

  return (
    <Container className="flex flex-col flex-1 gap-6 items-center justify-center">
      <div className="flex flex-col xl:flex-row justify-between max-md:justify-center gap-4 w-full">
        <hgroup className="flex flex-col gap-2">
          <Title>{dict.windows.accountDetails.title}</Title>

          <Paragraph>{dict.windows.accountDetails.description}</Paragraph>
        </hgroup>

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

      <AccountForm
        key={account.id}
        onSubmitSuccess={() => {
          toast.success(dict.windows.accountDetails.success);
          navigate("/accounts");
        }}
        mode="edit"
        strengthGraph={strengthGraph}
        id={account.id}
        initialValues={account}
      />

      <FindSimilar id={account.id} />
    </Container>
  );
};

export default AccountDetailsWindow;
