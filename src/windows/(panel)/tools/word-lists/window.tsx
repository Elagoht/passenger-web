import { IconSignRight } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import Container from "../../../../components/layout/Container";
import Box from "../../../../components/ui/Box";
import { Paragraph, Title } from "../../../../components/ui/Typography";
import { getWordlists } from "../../../../services/wordlists";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";

const WordListsWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [wordLists, setWordLists] = useState<WordlistCard[]>([]);

  useEffect(() => {
    getWordlists(token)
      .then((wordlists) => setWordLists(wordlists))
      .catch((error) => toastError(error, dict));
  }, [dict, token]);

  return (
    <Container className="gap-4">
      <Title>{dict.windows.wordLists.title}</Title>

      <Paragraph>{dict.windows.wordLists.description}</Paragraph>

      <Box color="dream" className="max-w-screen-lg">
        <Paragraph>
          <IconSignRight className="inline -mt-1 md:mr-2 mr-1" />
          {dict.windows.wordLists.flow}
        </Paragraph>
      </Box>

      <pre>{JSON.stringify(wordLists, null, 2)}</pre>
    </Container>
  );
};

export default WordListsWindow;
