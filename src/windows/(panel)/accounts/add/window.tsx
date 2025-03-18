import { FC } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Container from "../../../../components/layout/Container";
import { Title } from "../../../../components/ui/Typography";
import AccountForm from "../../../../forms/AccountForm";
import useDictStore from "../../../../stores/dict";

const AccountAddWindow: FC = () => {
  const { dict } = useDictStore();

  const navigate = useNavigate();

  return (
    <Container className="!px-0">
      <Title>{dict.windows.addAccount.title}</Title>

      <AccountForm
        mode="add"
        onSubmitSuccess={() => {
          toast.success(dict.windows.addAccount.success);
          navigate("/accounts");
        }}
      />
    </Container>
  );
};

export default AccountAddWindow;
