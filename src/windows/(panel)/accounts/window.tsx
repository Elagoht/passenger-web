import {
  IconList,
  IconLoader,
  IconPlus,
  IconTag,
  IconUrgent,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AccountListItem from "../../../components/common/AccountListItem";
import Container from "../../../components/layout/Container";
import FAB from "../../../components/ui/FAB";
import { Paragraph } from "../../../components/ui/Typography";
import FeatureButton from "../../../components/windows/accounts/FeatureButton";
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
    <Container className="flex gap-4 items-stretch !justify-start">
      <SearchAccountsForm />

      <div className="flex gap-2 w-full">
        {getButtons(dict).map((button) => (
          <FeatureButton key={button.title} {...button} />
        ))}
      </div>

      {accounts.length === 0 ? (
        <Paragraph>{dict.windows.accounts.notFound}</Paragraph>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1 !justify-start">
          {accounts.map((account) => (
            <AccountListItem key={account.id} {...account} />
          ))}
        </div>
      )}

      <FAB
        icon={IconPlus}
        label={dict.windows.accounts.fab.add}
        color="secondary"
        onClick={() => navigate("/accounts/add")}
      />
    </Container>
  );
};

const getButtons = (dict: Dict) => {
  return [
    {
      title: dict.windows.accounts.gridButtons.lists,
      icon: IconList,
      className:
        "border-cream-500 bg-cream-500 text-cream-900 dark:text-cream-500",
      onClick: () => {},
    },
    {
      title: dict.windows.accounts.gridButtons.tags,
      icon: IconTag,
      className:
        "border-dream-500 bg-dream-500 text-dream-900 dark:text-dream-500",
      onClick: () => {},
    },
    {
      title: dict.windows.accounts.gridButtons.panic,
      icon: IconUrgent,
      className: "border-red-500 bg-red-500 text-red-900 dark:text-red-500",
      onClick: () => {},
    },
  ];
};

export default AccountsWindow;
