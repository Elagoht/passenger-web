import { IconCheck, IconCopy } from "@tabler/icons-react";
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
      setCopied(true);
      navigator.clipboard
        .writeText(passphrase)
        .then(() => setTimeout(() => setCopied(false), 1000))
        .catch(() => toast.error(dict.errors.clipboard));
    });
  };

  return (
    <button className="p-2 rounded-full" onClick={handleCopy}>
      {copied ? <IconCheck size={24} /> : <IconCopy size={24} />}
    </button>
  );
};

export default AccountPassphraseCopier;
