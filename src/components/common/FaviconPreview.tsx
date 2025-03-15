import { IconX } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Yarn from "../../utilities/Yarn";

type FaviconPreviewProps = {
  icon: string | null;
  url: string | undefined;
  initialIcon: string | null;
  children: React.ReactNode;
  setIcon: (icon: string | null) => void;
};

const FaviconPreview: FC<FaviconPreviewProps> = ({
  url,
  icon,
  initialIcon,
  children,
  setIcon,
}) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [urlToBeUsed, setUrlToBeUsed] = useState<string | null>(initialIcon);
  const [debouncedUrlToBeUsed] = useDebounce(urlToBeUsed, 1000);

  useEffect(() => {
    if (!isInitialized) return setIsInitialized(true);
    if (url !== urlToBeUsed) {
      setUrlToBeUsed(url || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, urlToBeUsed]);

  useEffect(() => {
    setIcon(convertUrlToFaviconUrl(debouncedUrlToBeUsed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUrlToBeUsed]);

  return (
    <div className="flex items-end gap-2">
      {children}

      {icon ? (
        <button
          type="button"
          className="relative shrink-0"
          style={{ width: 50, height: 50 }}
          onClick={() => {
            setIcon(null);
            setUrlToBeUsed(null);
          }}
        >
          <img
            src={icon}
            width={50}
            height={50}
            className="shrink-0 rounded-full"
          />

          <div
            className="absolute opacity-0 hover:opacity-100
            inset-0 transition-opacity duration-300 bg-red-500/50
            rounded-full flex items-center justify-center"
          >
            <IconX size={50} />
          </div>
        </button>
      ) : (
        <div
          style={{ width: 50, height: 50 }}
          className="shrink-0 rounded-full bg-day-400
          dark:bg-night-900 text-night-100 dark:text-day-900
          flex items-center justify-center font-semibold text-2xl"
        >
          {Yarn.getInitials(url || "")}
        </div>
      )}
    </div>
  );
};

const convertUrlToFaviconUrl = (url: string | null) => {
  if (!url || url.trim() === "") return null;

  try {
    let faviconUrl = url;
    if (!url.match(/^https?:\/\//)) faviconUrl = `https://${url}`;
    const urlObj = new URL(faviconUrl);
    const hostname = urlObj.hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return null;
  }
};

export default FaviconPreview;
