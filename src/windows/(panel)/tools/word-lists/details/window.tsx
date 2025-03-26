import {
  IconCalendar,
  IconExternalLink,
  IconEye,
  IconGitFork,
  IconGitMerge,
  IconHash,
  IconInfoCircle,
  IconLoader,
  IconPlus,
  IconRuler2,
  IconRuler3,
  IconWeight,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Container from "../../../../../components/layout/Container";
import Button from "../../../../../components/ui/Button";
import {
  Paragraph,
  Subtitle,
  Title,
} from "../../../../../components/ui/Typography";
import { getWordlist } from "../../../../../services/wordlists";
import useAuthStore from "../../../../../stores/auth";
import useDictStore from "../../../../../stores/dict";
import toastError from "../../../../../utilities/ToastError";
import Wordlister from "../../../../../utilities/Wordlister";

const WordListDetailsWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wordlist, setWordlist] = useState<Wordlist>();

  useEffect(() => {
    if (!id) return;
    getWordlist(token, id)
      .then((wordlist) => setWordlist(wordlist))
      .catch((error) => toastError(error, dict))
      .finally(() => setIsLoading(false));
  }, [token, id, dict]);

  if (!wordlist) {
    navigate("/tools/wordlists");
    return;
  }

  if (isLoading) return <IconLoader className="animate-spin" size={96} />;

  return (
    <Container className="gap-4">
      <Title>{wordlist.displayName}</Title>

      <Paragraph>{wordlist.description}</Paragraph>

      <ul className="flex flex-wrap gap-2 text-sm">
        <li
          className={classNames(
            Wordlister.getStatusColor(wordlist.status),
            "rounded-2xl p-1 pr-2 font-medium flex items-center gap-1 bg-opacity-30",
          )}
        >
          <IconInfoCircle />

          {dict.windows.wordLists.status[wordlist.status]}
        </li>

        {getPills(wordlist, dict).map((pill) => (
          <li
            key={pill.label}
            className="flex items-center gap-1 rounded-2xl bg-day-300 dark:bg-night-300 pr-3 p-1"
          >
            <pill.icon />

            <strong className="font-medium">{pill.label}</strong>

            <ins>{pill.value}</ins>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {getRepositories(wordlist, dict).map((repository) => (
          <div
            key={repository.title}
            className="w-full flex flex-col gap-2 bg-day-100 dark:bg-night-900 p-4 rounded-lg"
          >
            <div className="flex flex-wrap items-center gap-2 justify-center text-center">
              <repository.icon className="shrink-0" />

              <strong>{repository.title}</strong>

              <span className="text-dream-500">{repository.value}</span>
            </div>

            <Button
              size="small"
              variant="text"
              icon={IconExternalLink}
              onClick={() => window.open(repository.repository, "_blank")}
            >
              {dict.windows.wordListDetails.repositories.seeRepository}
            </Button>
          </div>
        ))}
      </div>

      <div
        className={classNames(
          "w-full flex max-lg:flex-col bg-day-100 dark:bg-night-900 p-4 rounded-2xl",
          {
            "lg:gap-4 lg:items-end": wordlist.analysesCount > 0,
            "flex-col": wordlist.analysesCount === 0,
          },
        )}
      >
        <div className="flex-1">
          <Subtitle>{dict.windows.wordListDetails.analyses.title}</Subtitle>

          <Paragraph className="mb-4">
            {dict.windows.wordListDetails.analyses.description}
          </Paragraph>
        </div>

        {wordlist.analysesCount > 0 ? (
          <div className="flex gap-2 -m-2 self-end">
            <Button solidIcon size="small" color="success" icon={IconPlus}>
              {dict.windows.wordListDetails.analyses.actions.new}
            </Button>

            <Button solidIcon size="small" color="info" icon={IconEye}>
              {dict.windows.wordListDetails.analyses.actions.view}
            </Button>
          </div>
        ) : (
          <div className="text-day-900 text-center bg-day-200 dark:bg-night-600 p-2 -m-2 rounded-xl">
            {dict.windows.wordListDetails.analyses.noAnalyses}
          </div>
        )}
      </div>

      <div className="flex w-full max-w-screen-sm">
        {Wordlister.getActionButtons(wordlist, dict, token, navigate)[
          wordlist.status
        ].map((button) => (
          <Button
            key={button.label}
            color={button.color}
            className="w-full rounded-none first:rounded-l-lg last:rounded-r-lg"
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default WordListDetailsWindow;

const getPills = (wordlist: Wordlist, dict: Dict) => {
  return [
    {
      icon: IconCalendar,
      label: dict.windows.wordListDetails.pills.year,
      value: wordlist.year,
    },
    {
      icon: IconWeight,
      label: dict.windows.wordListDetails.pills.size,
      value: `${wordlist.size} ${wordlist.sizeUnits}`,
    },
    {
      icon: IconRuler3,
      label: dict.windows.wordListDetails.pills.minLength,
      value: wordlist.minLength,
    },
    {
      icon: IconRuler2,
      label: dict.windows.wordListDetails.pills.maxLength,
      value: wordlist.maxLength,
    },
    {
      icon: IconHash,
      label: dict.windows.wordListDetails.pills.totalFiles,
      value: wordlist.totalFiles,
    },
  ];
};

const getRepositories = (wordlist: Wordlist, dict: Dict) => {
  return [
    {
      icon: IconGitFork,
      title: dict.windows.wordListDetails.repositories.original,
      value: wordlist.publishedBy,
      repository: wordlist.source,
    },
    {
      icon: IconGitMerge,
      title: dict.windows.wordListDetails.repositories.adaptedBy,
      value: wordlist.adaptedBy,
      repository: wordlist.repository,
    },
  ];
};

/**
  remaining properties:

  repository: string;
  source: string;
  publishedBy: string;
  adaptedBy: string;
  message: string;
  analysesCount: number;
 */
