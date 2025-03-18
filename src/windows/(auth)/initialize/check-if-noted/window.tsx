import { FC } from "react";
import Container from "../../../../components/layout/Container";
import { Paragraph, Title } from "../../../../components/ui/Typography";
import CheckRecoveryKeyCopiedForm from "../../../../forms/CheckRecoveryKeyCopiedForm";
import useDictStore from "../../../../stores/dict";

const CheckIfNotedWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container className="!max-w-lg mx-auto gap-4">
      <Title className="text-cream-500">
        {dict.windows.initialize.checkIfNoted.title}
      </Title>

      <Paragraph>{dict.windows.initialize.checkIfNoted.description}</Paragraph>

      <CheckRecoveryKeyCopiedForm />
    </Container>
  );
};

export default CheckIfNotedWindow;
