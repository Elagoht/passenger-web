import { IconInfoCircle, IconLoader, IconPlus } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import WordlistCard from "../../../../components/common/WordlistCard";
import Container from "../../../../components/layout/Container";
import Box from "../../../../components/ui/Box";
import Button from "../../../../components/ui/Button";
import { Paragraph, Title } from "../../../../components/ui/Typography";
import { getWordlists } from "../../../../services/wordlists";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";
import Wordlister from "../../../../utilities/Wordlister";

const WordListsWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wordLists, setWordLists] = useState<WordlistCard[]>();

  useEffect(() => {
    if (!wordLists) return;

    const hasPollRequired = wordLists.some((wordlist) =>
      Wordlister.doesRequirePolling(wordlist),
    );

    if (!hasPollRequired) return;

    const interval = setInterval(() => {
      getWordlists(token).then((wordlists) => setWordLists(wordlists));
    }, 2000);

    return () => clearInterval(interval);
  }, [token, wordLists]);

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

      <Box
        color="dream"
        shade={200}
        className="items-center rounded-2xl gap-4 max-lg:flex-col"
        orientation="horizontal"
        padding="sm"
      >
        <Paragraph className="grow">{dict.windows.wordLists.flow}</Paragraph>

        <Button
          icon={IconPlus}
          solidIcon
          color="success"
          className="ml-auto rounded-lg"
          onClick={() => navigate("/tools/wordlists/add")}
        >
          {dict.windows.wordLists.actions.add}
        </Button>
      </Box>

      {isLoading && <IconLoader className="animate-spin" size={96} />}

      {!isLoading && wordLists && wordLists.length > 0 && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {wordLists.map((wordlist) => (
            <WordlistCard key={wordlist.id} {...wordlist} />
          ))}
        </div>
      )}

      {!isLoading && wordLists && wordLists.length === 0 && (
        <div className="w-full flex justify-center items-center bg-day-100 dark:bg-night-400 rounded-2xl gap-2 p-4">
          <IconInfoCircle />

          <Paragraph>{dict.windows.wordLists.noWordlists}</Paragraph>
        </div>
      )}
    </Container>
  );
};

export default WordListsWindow;
