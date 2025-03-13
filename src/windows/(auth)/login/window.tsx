import { FC } from "react";
import Container from "../../../components/layout/Container";
import { Subtitle, Title } from "../../../components/ui/Typography";
import LoginForm from "../../../forms/LoginForm";
import useDictStore from "../../../stores/dict";

const LoginWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container>
      <Title className="text-cream-500">{dict.windows.login.title}</Title>

      <Subtitle className="text-cream-600">
        {dict.windows.login.subtitle}
      </Subtitle>

      <LoginForm />
    </Container>
  );
};

export default LoginWindow;
