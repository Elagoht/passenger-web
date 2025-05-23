import { IconLoader, IconPlus } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AccountListItem from "../../../components/common/AccountListItem";
import Container from "../../../components/layout/Container";
import FAB from "../../../components/ui/FAB";
import { Paragraph } from "../../../components/ui/Typography";
import SearchAccountsForm from "../../../forms/SearchAccountsForm";
import { getAccounts } from "../../../services/accounts";
import useAuthStore from "../../../stores/auth";
import useDictStore from "../../../stores/dict";
import toastError from "../../../utilities/ToastError";

const AccountsWindow: FC = () => {
  const { token } = useAuthStore();
  const { dict } = useDictStore();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<AccountCard[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getAccounts(token)
      .then((accounts) => setAccounts(accounts))
      .catch((error) => toastError(error, dict))
      .finally(() => setIsLoading(false));
  }, [token, dict]);

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center">
        <IconLoader className="animate-spin" />
      </Container>
    );
  }

  return (
    <Container className="flex md:gap-4 gap-2 items-stretch !justify-start">
      <SearchAccountsForm setAccounts={setAccounts} />

      {accounts.length === 0 ? (
        <Paragraph>{dict.windows.accounts.notFound}</Paragraph>
      ) : (
        <div
          className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3
          md:gap-4 gap-1 !justify-start"
        >
          {accounts.map((account) => (
            <AccountListItem key={account.id} {...account} />
          ))}
        </div>
      )}

      <FAB
        icon={IconPlus}
        color="secondary"
        onClick={() => navigate("/accounts/add")}
      />
    </Container>
  );
};

export default AccountsWindow;
