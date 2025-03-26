import { FC } from "react";
import Container from "../../../../../components/layout/Container";
import { Paragraph, Title } from "../../../../../components/ui/Typography";
import WordlistAddForm from "../../../../../forms/WordlistAddForm";
import useDictStore from "../../../../../stores/dict";
const WordListAddWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container className="flex gap-4">
      <Title>{dict.windows.wordListAdd.title}</Title>

      <Paragraph>{dict.windows.wordListAdd.description}</Paragraph>

      <WordlistAddForm />
    </Container>
  );
};

export default WordListAddWindow;
