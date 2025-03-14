import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import useDictStore from "../../stores/dict";

type CopyTextProps = {
  text: string;
  onClick?: () => void;
};

const CopyText: FC<CopyTextProps> = ({ text, onClick }) => {
  const { dict } = useDictStore();

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch(() => {
        toast.error(dict.errors.unexpected);
      });
  };

  return (
    <button
      disabled={copied}
      onClick={() => {
        handleCopy();
        onClick?.();
      }}
      className="flex select-text items-center w-full rounded-lg p-2 gap-2 overflow-hidden
      bg-day-500 dark:bg-night-500 text-night-500 dark:text-day-500"
    >
      <span className="text-xs break-all grow">{text}</span>

      <span className="shrink-0">
        {copied ? <IconCopyCheck className="text-green-600" /> : <IconCopy />}
      </span>
    </button>
  );
};
export default CopyText;
