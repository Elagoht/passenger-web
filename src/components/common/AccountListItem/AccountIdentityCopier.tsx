import { IconClipboardCheck, IconUserCircle } from "@tabler/icons-react";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import useDictStore from "../../../stores/dict";

const AccountIdentityCopier: FC<Pick<AccountCard, "identity">> = ({
  identity,
}) => {
  const { dict } = useDictStore();

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard
      .writeText(identity)
      .then(() => setTimeout(() => setCopied(false), 1000))
      .catch(() => toast.error(dict.errors.clipboard));
  };

  return (
    <button className="shrink-0 p-2 rounded-full" onClick={handleCopy}>
      {copied ? <IconClipboardCheck size={24} /> : <IconUserCircle size={24} />}
    </button>
  );
};

export default AccountIdentityCopier;
