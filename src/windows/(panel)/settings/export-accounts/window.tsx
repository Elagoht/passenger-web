import { FC } from "react";
import Container from "../../../../components/layout/Container";
import {
  Paragraph,
  Subtitle,
  Title,
} from "../../../../components/ui/Typography";
import ExportForm from "../../../../forms/ExportForm";
import useDictStore from "../../../../stores/dict";

const ExportWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container className="gap-4">
      <Title>{dict.windows.export.title}</Title>

      <Subtitle>{dict.windows.export.subtitle}</Subtitle>

      <Paragraph>{dict.windows.export.description}</Paragraph>

      <ExportForm />
    </Container>
  );
};

export default ExportWindow;
