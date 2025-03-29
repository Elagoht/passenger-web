import {
  IconCalendar,
  IconExternalLink,
  IconGitFork,
  IconGitMerge,
  IconHash,
  IconInfoCircle,
  IconLoader,
  IconNumber,
  IconRuler2,
  IconRuler3,
  IconWeight,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Container from "../../../../../components/layout/Container";
import Button from "../../../../../components/ui/Button";
import { Paragraph, Title } from "../../../../../components/ui/Typography";
import { postAnalysisInitialize } from "../../../../../services/analyses";
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
  const [actionTriggered, setActionTriggered] = useState<number>(0);

  useEffect(() => {
    if (!id || !wordlist) return;

    const hasPollRequired = Wordlister.doesRequirePolling(wordlist);

    if (!hasPollRequired) return;

    const interval = setInterval(() => {
      getWordlist(token, id).then((wordlist) => setWordlist(wordlist));
    }, 2000);

    return () => clearInterval(interval);
  }, [id, token, wordlist, actionTriggered]);

  useEffect(() => {
    if (!id) return;
    getWordlist(token, id)
      .then((wordlist) => setWordlist(wordlist))
      .catch((error) => toastError(error, dict))
      .finally(() => setIsLoading(false));
  }, [token, id, dict]);

  const handleActionButtonClick = useCallback(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    }).then(() => {
      if (!id) return;
      getWordlist(token, id).then((wordlist) => setWordlist(wordlist));
      setActionTriggered((prev) => prev + 1);
    });
  }, [token, id]);

  if (!wordlist || !id) {
    navigate("/tools/wordlists");
    return;
  }

  if (isLoading)
    return (
      <Container>
        <IconLoader className="animate-spin" size={96} />
      </Container>
    );

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
            className="w-full flex flex-col gap-2 bg-day-100 dark:bg-night-900 p-4 rounded-2xl"
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

      <div className="flex flex-wrap justify-center gap-2 w-full max-w-screen-sm">
        {(
          [
            {
              label: dict.windows.wordListDetails.analyses.new,
              color: "secondary",
              onClick: () => {
                postAnalysisInitialize(token, id).then(() =>
                  setActionTriggered((prev) => prev + 1),
                );
              },
            },
          ] as const
        ).map((button) => (
          <Button
            solidIcon
            size="small"
            className="grow"
            color={button.color}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
        {Wordlister.getActionButtons(wordlist, dict, token, navigate)[
          wordlist.status
        ].map((button) => (
          <Button
            key={button.label}
            color={button.color}
            size="small"
            className="grow"
            onClick={() => {
              button.onClick();
              handleActionButtonClick();
            }}
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
    {
      icon: IconNumber,
      label: dict.windows.wordListDetails.pills.analysesCount,
      value: wordlist.analysesCount,
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
