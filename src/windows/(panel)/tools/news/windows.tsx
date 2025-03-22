import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import Container from "../../../../components/layout/Container";
import { Subtitle, Title } from "../../../../components/ui/Typography";
import LeakCard from "../../../../components/windows/leaks/LeakCard";
import { getLeaks } from "../../../../services/news";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";

const LeaksWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [leaks, setLeaks] = useState<ResponseLeaks>();

  useEffect(() => {
    getLeaks(token)
      .then(setLeaks)
      .catch((error) => toastError(error, dict))
      .finally(() => setLoading(false));
  }, [dict, token]);

  return (
    <Container>
      <Title>{dict.windows.leaks.title}</Title>

      <Subtitle>{dict.windows.leaks.description}</Subtitle>

      {loading && (
        <div className="flex justify-center items-center">
          <IconLoader className="animate-spin" size={96} />
        </div>
      )}

      {leaks && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3
          gap-4 w-full mt-6"
        >
          {leaks.data.map((leak) => (
            <LeakCard key={leak.id} {...leak} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default LeaksWindow;
