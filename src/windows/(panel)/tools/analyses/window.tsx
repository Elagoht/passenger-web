import { IconLoader, IconReport } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import WordlistCard from "../../../../components/common/WordlistCard";
import Container from "../../../../components/layout/Container";
import Button from "../../../../components/ui/Button";
import {
  Paragraph,
  Subtitle,
  Title,
} from "../../../../components/ui/Typography";
import { getAvailableWordlists } from "../../../../services/analyses";
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

    getAvailableWordlists(token)
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

      {wordlists.length === 0 && (
        <Paragraph>{dict.windows.analyses.list.noWordlists}</Paragraph>
      )}

      {wordlists.map((wordlist) => (
        <div
          key={wordlist.id}
          className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-4"
        >
          <WordlistCard {...wordlist} />
        </div>
      ))}

      <Button icon={IconReport} solidIcon color="info">
        {dict.windows.analyses.allReports}
      </Button>
    </Container>
  );
};

export default AnalysesWindow;
