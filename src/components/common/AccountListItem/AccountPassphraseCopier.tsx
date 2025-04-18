import { IconClipboardCheck, IconKey } from "@tabler/icons-react";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { getAccountPassphrase } from "../../../services/accounts";
import useAuthStore from "../../../stores/auth";
import useDictStore from "../../../stores/dict";

const AccountPassphraseCopier: FC<Pick<AccountCard, "id">> = ({ id }) => {
  const { token } = useAuthStore();
  const { dict } = useDictStore();

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    getAccountPassphrase(token, id).then(({ passphrase }) => {
      navigator.clipboard
        .writeText(passphrase)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        })
        .catch(() => toast.error(dict.errors.clipboard));
    });
  };

  return (
    <button className="shrink-0 p-2 rounded-full" onClick={handleCopy}>
      {copied ? <IconClipboardCheck size={24} /> : <IconKey size={24} />}
    </button>
  );
};

export default AccountPassphraseCopier;
