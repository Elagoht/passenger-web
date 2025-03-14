import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Container from "../../../../components/layout/Container";
import { getAccountById } from "../../../../services/accounts";
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

  if (!account) return <Navigate to="/accounts" />;

  return (
    <Container>
      <pre>{JSON.stringify(account, null, 2)}</pre>
    </Container>
  );
};

export default AccountDetailsWindow;
