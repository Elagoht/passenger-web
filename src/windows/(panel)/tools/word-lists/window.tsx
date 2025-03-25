import { IconLoader, IconSignRight } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import WordlistCard from "../../../../components/common/WordlistCard";
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wordLists, setWordLists] = useState<WordlistCard[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getWordlists(token)
      .then((wordlists) => setWordLists(wordlists))
      .catch((error) => toastError(error, dict))
      .finally(() => setIsLoading(false));
  }, [dict, token]);

  return (
    <Container className="gap-4">
      <Title>{dict.windows.wordLists.title}</Title>

      <Paragraph>{dict.windows.wordLists.description}</Paragraph>

      <Box color="dream" shade={200} className="max-w-screen-lg">
        <Paragraph>
          <IconSignRight className="inline -mt-1 md:mr-2 mr-1" />

          {dict.windows.wordLists.flow}
        </Paragraph>
      </Box>

      {isLoading ? (
        <IconLoader className="animate-spin" size={96} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {wordLists.map((wordlist) => (
            <WordlistCard key={wordlist.id} {...wordlist} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default WordListsWindow;
