import {
  IconCalendar,
  IconChevronRight,
  IconLock,
  IconWeight,
} from "@tabler/icons-react";
import classNames from "classnames";
import { type NavigateFunction } from "react-router";
import {
  deleteWordlist,
  postWordlistCancelDownload,
  postWordlistDownload,
  postWordlistValidate,
} from "../../services/wordlists";

class Wordlister {
  public static getStatusColor(status: WordlistStatus) {
    return this.statusColors[status];
  }

  private static statusColors = {
    IMPORTED: "bg-amber-500 text-amber-500",
    DOWNLOADING: "bg-indigo-500 text-indigo-500",
    DOWNLOADED: "bg-blue-500 text-blue-500",
    VALIDATING: "bg-pink-500 text-pink-500",
    VALIDATED: "bg-dream-500 text-dream-500",
    ANALYZING: "bg-green-500 text-green-500",
    FAILED: "bg-red-500 text-red-500",
  };

  public static getActionButtons(
    wordlist: WordlistCard,
    dict: Dict,
    token: string,
    navigate: NavigateFunction,
  ) {
    return {
      IMPORTED: [
        {
          color: "danger",
          label: dict.windows.wordLists.actions.delete,
          onClick: () => {
            deleteWordlist(token, wordlist.id);
            navigate("/tools/wordlists");
          },
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
          onClick: () => {
            deleteWordlist(token, wordlist.id);
            navigate("/tools/wordlists");
          },
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
          onClick: () => {
            deleteWordlist(token, wordlist.id);
            navigate("/tools/wordlists");
          },
        },
      ],
      FAILED: [
        {
          color: "danger",
          label: dict.windows.wordLists.actions.validate,
          onClick: () => postWordlistValidate(token, wordlist.id),
        },
      ],
      ANALYZING: [],
      VALIDATING: [],
    } as const;
  }

  public static generateInfoCards(wordlist: WordlistCard) {
    const infoCards = [
      {
        icon: IconLock,
        value: Intl.NumberFormat().format(wordlist.totalPasswords),
      },
      {
        icon: IconCalendar,
        value: wordlist.year,
      },
      {
        icon: IconWeight,
        value: `${wordlist.size} ${wordlist.sizeUnits}`,
      },
    ];

    return (
      <div className="flex flex-wrap gap-2 p-2 bg-day-300 dark:bg-night-500 rounded-b-2xl">
        {infoCards.map((infoCard) => (
          <div className="flex items-center max-md:grow gap-1.5 bg-day-200 dark:bg-night-300 rounded-lg p-2 text-xs">
            <infoCard.icon size={16} />

            {infoCard.value}
          </div>
        ))}
      </div>
    );
  }

  public static doesRequirePolling(wordlist: WordlistCard) {
    return wordlist.status.endsWith("ING");
  }

  public static generateStatus(status: WordlistStatus, dict: Dict) {
    return (
      <strong
        className={classNames(
          "flex-1 flex items-center justify-between bg-opacity-30 px-2 py-1",
          Wordlister.getStatusColor(status),
        )}
      >
        {dict.windows.wordLists.status[status] || status}

        <IconChevronRight />
      </strong>
    );
  }
}

export default Wordlister;
