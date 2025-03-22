import { FC } from "react";
import Container from "../../../../components/layout/Container";
import { Paragraph, Title } from "../../../../components/ui/Typography";
import MasterPassphraseForm from "../../../../forms/MasterPassphraseForm";
import useDictStore from "../../../../stores/dict";

const ChangePassphraseWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container className="gap-4">
      <Title>{dict.windows.changePassphrase.title}</Title>

      <Paragraph>{dict.windows.changePassphrase.description}</Paragraph>

      <MasterPassphraseForm />
    </Container>
  );
};

export default ChangePassphraseWindow;
