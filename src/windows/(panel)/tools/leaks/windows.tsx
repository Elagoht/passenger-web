import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import Pagination from "../../../../components/common/Pagination";
import PaginationInfo from "../../../../components/common/Pagination/PaginationInfo";
import Container from "../../../../components/layout/Container";
import { Subtitle, Title } from "../../../../components/ui/Typography";
import LeakCard from "../../../../components/windows/leaks/LeakCard";
import LeakQueryForm from "../../../../forms/LeakQueryForm";
import { getLeaks } from "../../../../services/news";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";

const PER_PAGE = 12;

const LeaksWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [leaks, setLeaks] = useState<Leak[]>();
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<LeaksQuery>({
    sortBy: "date",
    sortOrder: "desc",
  });

  useEffect(() => {
    setLoading(true);

    getLeaks(token, query)
      .then(({ data, total }) => {
        setLeaks(data);
        setTotal(total);
      })
      .catch((error) => toastError(error, dict))
      .finally(() => setLoading(false));
  }, [dict, token, query]);

  return (
    <Container>
      <Title>{dict.windows.leaks.title}</Title>

      <Subtitle>{dict.windows.leaks.description}</Subtitle>

      <LeakQueryForm query={query} setQuery={setQuery} />

      {loading && (
        <div className="flex justify-center items-center">
          <IconLoader className="animate-spin" size={96} />
        </div>
      )}

      {leaks && !loading && (
        <>
          <PaginationInfo
            total={total}
            perPage={query.take || 12}
            current={query.page || 1}
          />

          <div
            className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3
            gap-4 w-full my-6"
          >
            {leaks.map((leak) => (
              <LeakCard key={leak.id} {...leak} />
            ))}
          </div>
        </>
      )}

      {total > PER_PAGE && (
        <Pagination
          total={total}
          current={query.page || 1}
          onChange={(page) => setQuery({ ...query, page })}
        />
      )}
    </Container>
  );
};

export default LeaksWindow;
