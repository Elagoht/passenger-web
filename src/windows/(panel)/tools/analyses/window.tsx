import { IconInfoCircle, IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import Container from "../../../../components/layout/Container";
import {
  Paragraph,
  Subtitle,
  Title,
} from "../../../../components/ui/Typography";
import { getAnalysisReports } from "../../../../services/analyses";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";

const AnalysesWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reports, setReports] = useState<AnalysisReport[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getAnalysisReports(token)
      .then((reports) => setReports(reports))
      .catch((error) => toastError(error, dict))
      .finally(() => setIsLoading(false));
  }, [token, dict]);

  if (isLoading) {
    return (
      <Container>
        <IconLoader className="animate-spin" size={96} />
      </Container>
    );
  }

  return (
    <Container className="gap-2">
      <Title>{dict.windows.analyses.title}</Title>

      <Subtitle>{dict.windows.analyses.description}</Subtitle>

      <Paragraph>{dict.windows.analyses.list.description}</Paragraph>

      {!isLoading && reports && reports.length === 0 && (
        <div className="flex justify-center items-center bg-day-100 dark:bg-night-400 rounded-2xl gap-2 p-4">
          <IconInfoCircle className="shrink-0" />

          <Paragraph>{dict.windows.analyses.list.noAnalyses}</Paragraph>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-4">
        {reports.map((report) => (
          <pre key={report.id}>{JSON.stringify(report, null, 2)}</pre>
        ))}
      </div>
    </Container>
  );
};

export default AnalysesWindow;
