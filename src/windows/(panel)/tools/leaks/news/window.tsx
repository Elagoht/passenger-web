import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import Container from "../../../../../components/layout/Container";
import { Paragraph, Title } from "../../../../../components/ui/Typography";
import LeakCard from "../../../../../components/windows/leaks/LeakCard";
import { getNews } from "../../../../../services/news";
import useAuthStore from "../../../../../stores/auth";
import useDictStore from "../../../../../stores/dict";
import toastError from "../../../../../utilities/ToastError";

const LeaksNewsWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [leaks, setLeaks] = useState<Leak[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getNews(token)
      .then((res) => setLeaks(res))
      .catch((error) => toastError(error, dict))
      .finally(() => setLoading(false));
  }, [token, dict]);

  return (
    <Container>
      <Title>{dict.windows.news.title}</Title>

      <Paragraph>{dict.windows.news.description}</Paragraph>

      {loading && (
        <div className="flex justify-center items-center">
          <IconLoader className="animate-spin" size={96} />
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full my-6">
          {leaks.map((leak) => (
            <LeakCard key={leak.id} {...leak} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default LeaksNewsWindow;
