import { IconCalendar, IconLock, IconWeight } from "@tabler/icons-react";
import classNames from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteWordlist,
  getWordlistStatus,
  postWordlistCancelDownload,
  postWordlistDownload,
  postWordlistValidate,
} from "../../../services/wordlists";
import useAuthStore from "../../../stores/auth";
import useDictStore from "../../../stores/dict";
import Button from "../../ui/Button";
import { Paragraph } from "../../ui/Typography";

const WordlistCard: FC<WordlistCard> = (props) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [status, setStatus] = useState<WordlistStatus>(props.status);
  const [shouldPoll, setShouldPoll] = useState<boolean>(
    doesRequirePolling(props.status),
  );

  const handlePoll = useCallback(() => {
    getWordlistStatus(token, props.id).then(({ status }) => {
      setShouldPoll(doesRequirePolling(status));
      setStatus(status);
    });
  }, [props.id, token]);

  useEffect(() => {
    if (!shouldPoll) return;
    // Poll immediately
    handlePoll();
    // Then set up interval for subsequent polls
    const interval = setInterval(() => {
      handlePoll();
    }, 1000);

    return () => clearInterval(interval);
  }, [handlePoll, shouldPoll]);

  return (
    <div className="grow flex flex-col items-start justify-between bg-day-100 dark:bg-night-400 rounded-2xl">
      <Link to={props.id} className="flex flex-col grow gap-2 p-3">
        <strong>{props.displayName}</strong>

        <Paragraph className="text-sm mb-2">{props.description}</Paragraph>

        <div className="flex flex-wrap gap-2">{generateInfoCards(props)}</div>
      </Link>

      <div className="flex mt-0 w-full">
        {generateStatus(status, dict)}

        {generateActionButton(token, props, handlePoll, dict)}
      </div>
    </div>
  );
};

const generateStatus = (status: WordlistStatus, dict: Dict) => {
  return (
    <strong
      className={classNames(
        "flex-1 grid place-items-center bg-opacity-30 rounded-bl-2xl",
        {
          "bg-amber-500 text-amber-500": status === "IMPORTED",
          "bg-indigo-500 text-indigo-500": status === "DOWNLOADING",
          "bg-blue-500 text-blue-500": status === "DOWNLOADED",
          "bg-pink-500 text-pink-500": status === "VALIDATING",
          "bg-dream-500 text-dream-500": status === "VALIDATED",
          "bg-green-500 text-green-500": status === "ANALYZING",
          "bg-red-500 text-red-500": status === "FAILED",
        },
      )}
    >
      {dict.windows.wordLists.status[status] || status}
    </strong>
  );
};

const generateActionButton = (
  token: string,
  wordlist: WordlistCard,
  handlePoll: () => void,
  dict: Dict,
) => {
  if (
    wordlist.status === "VALIDATING" ||
    wordlist.status === "ANALYZING" ||
    wordlist.status === "FAILED"
  ) {
    return null;
  }

  const props = {
    IMPORTED: [
      {
        color: "danger",
        label: dict.windows.wordLists.actions.delete,
        onClick: () => deleteWordlist(token, wordlist.id),
      },
      {
        color: "success",
        label: dict.windows.wordLists.actions.download,
        onClick: () => postWordlistDownload(token, wordlist.id),
      },
    ],
    DOWNLOADING: [
      {
        color: "danger",
        label: dict.windows.wordLists.actions.cancelDownload,
        onClick: () => postWordlistCancelDownload(token, wordlist.id),
      },
    ],
    DOWNLOADED: [
      {
        color: "danger",
        label: dict.windows.wordLists.actions.delete,
        onClick: () => deleteWordlist(token, wordlist.id),
      },
      {
        color: "info",
        label: dict.windows.wordLists.actions.validate,
        onClick: () => postWordlistValidate(token, wordlist.id),
      },
    ],
    VALIDATED: [
      {
        color: "danger",
        label: dict.windows.wordLists.actions.delete,
        onClick: () => deleteWordlist(token, wordlist.id),
      },
    ],
    FAILED: [
      {
        color: "danger",
        label: dict.windows.wordLists.actions.validate,
        onClick: () => postWordlistValidate(token, wordlist.id),
      },
    ],
  } as const;

  return props[wordlist.status].map((prop, index) => (
    <Button
      key={new Date().getTime()}
      color={prop.color}
      size="small"
      className={classNames(" border-l-0 rounded-l-none rounded-t-none", {
        "rounded-r-none":
          index !== props[wordlist.status as keyof typeof props].length - 1,
      })}
      onClick={() => {
        prop.onClick();
        handlePoll();
      }}
    >
      {prop.label}
    </Button>
  ));
};

const generateInfoCards = (wordlist: WordlistCard) => {
  const infoCards = [
    {
      icon: <IconLock />,
      value: Intl.NumberFormat().format(wordlist.totalPasswords),
    },
    {
      icon: <IconCalendar />,
      value: wordlist.year,
    },
    {
      icon: <IconWeight />,
      value: `${wordlist.size} ${wordlist.sizeUnits}`,
    },
  ];

  return infoCards.map((infoCard) => (
    <div className="flex items-center max-md:grow gap-2 bg-day-200 dark:bg-night-500 rounded-md p-2">
      {infoCard.icon}

      {infoCard.value}
    </div>
  ));
};

const doesRequirePolling = (status: WordlistStatus) => {
  return status.endsWith("ING");
};

export default WordlistCard;
