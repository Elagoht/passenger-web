import { FC } from "react";
import Container from "../../../components/layout/Container";
import { Paragraph, Title } from "../../../components/ui/Typography";
import ForgotPassphraseForm from "../../../forms/ForgotPassphraseForm";
import useDictStore from "../../../stores/dict";

const ForgotPassphraseWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container className="flex flex-col gap-6 mx-auto max-w-lg w-full">
      <Title className="text-cream-500">
        {dict.windows.forgotPassphrase.title}
      </Title>

      <Paragraph>{dict.windows.forgotPassphrase.description}</Paragraph>

      <ForgotPassphraseForm />
    </Container>
  );
};

export default ForgotPassphraseWindow;
