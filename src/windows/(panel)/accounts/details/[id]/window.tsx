import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Container from "../../../../../components/layout/Container";
import { Paragraph, Title } from "../../../../../components/ui/Typography";
import { DetailPill } from "../../../../../components/windows/accounts/account-details/DetailPill";
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
    <section className="flex flex-col flex-1 items-center justify-center">
      <Container
        className="!flex-row flex-wrap justify-between max-md:justify-center gap-4 w-full
        max-md:p-6 mb-0"
      >
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
      </Container>

      <Container className="grid grid-cols-1 xl:grid-cols-2 gap-8 justify-start">
        <div className="flex flex-col gap-4 h-full">
          <AccountForm
            onSubmitSuccess={() => {
              toast.success(dict.windows.accountDetails.success);
              navigate("/accounts");
            }}
            mode="edit"
            initialValues={{
              id: account?.id,
              identity: account?.identity,
              note: account?.note,
              platform: account?.platform,
              url: account?.url,
              passphrase: account?.passphrase,
            }}
          />
        </div>

        {account && <DetailsColumn id={account.id} />}
      </Container>
    </section>
  );
};

export default AccountDetailsWindow;
