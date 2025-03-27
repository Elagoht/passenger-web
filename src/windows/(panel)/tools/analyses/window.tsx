import { IconInfoCircle, IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import WordlistCard from "../../../../components/common/WordlistCard";
import Container from "../../../../components/layout/Container";
import {
  Paragraph,
  Subtitle,
  Title,
} from "../../../../components/ui/Typography";
import { getAnalysisAvailableWordlists } from "../../../../services/analyses";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";

const AnalysesWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wordlists, setWordlists] = useState<WordlistCard[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getAnalysisAvailableWordlists(token)
      .then((wordlists) => setWordlists(wordlists))
      .catch((error) => toastError(error, dict))
      .finally(() => setIsLoading(false));
  }, [token, dict]);

  if (isLoading) {
    return (
      <Container>
        <IconLoader className="animate-spin" size={96} />
      </Container>
    );
  }

  return (
    <Container className="gap-2">
      <Title>{dict.windows.analyses.title}</Title>

      <Subtitle>{dict.windows.analyses.description}</Subtitle>

      <Paragraph>{dict.windows.analyses.list.description}</Paragraph>

      {!isLoading && wordlists && wordlists.length === 0 && (
        <div className="flex justify-center items-center bg-day-100 dark:bg-night-400 rounded-2xl gap-2 p-4">
          <IconInfoCircle className="shrink-0" />

          <Paragraph>{dict.windows.analyses.list.noWordlists}</Paragraph>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-4">
        {wordlists.map((wordlist) => (
          <WordlistCard key={wordlist.id} {...wordlist} />
        ))}
      </div>
    </Container>
  );
};

export default AnalysesWindow;
