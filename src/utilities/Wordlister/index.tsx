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
}

export default Wordlister;
