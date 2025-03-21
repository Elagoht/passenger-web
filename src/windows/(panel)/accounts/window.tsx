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

const AccountsWindow: FC = () => {
  const { token } = useAuthStore();
  const { dict } = useDictStore();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<AccountCard[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchAccounts = async () => {
      getAccounts(token).then((accounts) => {
        setAccounts(accounts);
      });
    };
    fetchAccounts();
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center">
        <IconLoader className="animate-spin" />
      </Container>
    );
  }

  return (
    <Container className="flex md:gap-4 gap-2 items-stretch !justify-start">
      <SearchAccountsForm />

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
