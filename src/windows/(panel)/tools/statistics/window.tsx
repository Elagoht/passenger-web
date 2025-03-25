import { IconInfoCircle, IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import Container from "../../../../components/layout/Container";
import StrengthGraph from "../../../../components/stats/StrengthGraph";
import {
  Paragraph,
  Subtitle,
  Title,
} from "../../../../components/ui/Typography";
import { getStrengthGraph } from "../../../../services/stats";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";

const StatisticsWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [strengthGraph, setStrengthGraph] = useState<StrengthGraph>();

  useEffect(() => {
    setLoading(false);
    getStrengthGraph(token)
      .then((res) => setStrengthGraph(res))
      .catch((error) => toastError(error, dict))
      .finally(() => setLoading(false));
  }, [token, dict]);

  return (
    <Container className="gap-4">
      <Title>{dict.windows.statistics.title}</Title>

      <Subtitle>{dict.windows.statistics.description}</Subtitle>

      {loading && (
        <div className="flex justify-center items-center">
          <IconLoader className="animate-spin" size={96} />
        </div>
      )}

      {!loading && strengthGraph?.length === 0 && (
        <div className="flex justify-center items-center bg-day-300 dark:bg-night-800 rounded-md p-2 gap-2 text-blue-500">
          <IconInfoCircle size={32} />

          <Paragraph>{dict.windows.statistics.noData}</Paragraph>
        </div>
      )}

      {!loading && strengthGraph && strengthGraph.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
          <div className="flex flex-col gap-2">
            <Subtitle>{dict.windows.statistics.strengthGraph.title}</Subtitle>

            <Paragraph className="text-sm text-day-900">
              {dict.windows.statistics.strengthGraph.description}
            </Paragraph>

            <StrengthGraph data={strengthGraph} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default StatisticsWindow;
