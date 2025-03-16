import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Container from "../../../../../components/layout/Container";
import { Paragraph, Title } from "../../../../../components/ui/Typography";
import DetailsColumn from "../../../../../components/windows/accounts/account-details/DetailsColumn";
import AccountForm from "../../../../../forms/AccountForm";
import { getAccountById } from "../../../../../services/accounts";
import useAuthStore from "../../../../../stores/auth";
import useDictStore from "../../../../../stores/dict";
import toastError from "../../../../../utilities/ToastError";

const AccountDetailsWindow: FC = () => {
  const { id } = useParams();
  const { token } = useAuthStore();
  const { dict } = useDictStore();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  if (!id) return <Navigate to="/accounts" />;

  if (isLoading)
    return (
      <Container>
        <IconLoader className="animate-spin" />
      </Container>
    );

  return (
    <Container className="grid grid-cols-1 xl:grid-cols-2 gap-8 justify-start">
      <div className="flex flex-col gap-4 h-full">
        <Title>{dict.windows.accountDetails.title}</Title>

        <Paragraph>{dict.windows.accountDetails.description}</Paragraph>

        <AccountForm
          mode="edit"
          initialValues={{
            icon: account?.icon,
            id: account?.id,
            identity: account?.identity,
            note: account?.note,
            platform: account?.platform,
            url: account?.url,
          }}
        />
      </div>

      {account && (
        <DetailsColumn
          id={account.id}
          copiedCount={account.copiedCount}
          lastCopiedAt={account.lastCopiedAt}
        />
      )}
    </Container>
  );
};

export default AccountDetailsWindow;
