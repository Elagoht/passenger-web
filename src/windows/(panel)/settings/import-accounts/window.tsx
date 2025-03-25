import { FC } from "react";
import Container from "../../../../components/layout/Container";
import {
  Paragraph,
  Subtitle,
  Title,
} from "../../../../components/ui/Typography";
import ImportForm from "../../../../forms/ImportForm";
import useDictStore from "../../../../stores/dict";

const ImportWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container className="gap-4">
      <Title>{dict.windows.import.title}</Title>

      <Subtitle>{dict.windows.import.subtitle}</Subtitle>

      <Paragraph>{dict.windows.import.description}</Paragraph>

      <ImportForm />
    </Container>
  );
};

export default ImportWindow;
