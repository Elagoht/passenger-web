import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../../components/layout/Container";
import { Paragraph, Title } from "../../../../../components/ui/Typography";
import { getAnalysisReport } from "../../../../../services/analyses";
import useAuthStore from "../../../../../stores/auth";
import useDictStore from "../../../../../stores/dict";
import toastError from "../../../../../utilities/ToastError";

const AnalysisReportWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const { reportId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [report, setReport] = useState<AnalysisReport | null>(null);

  useEffect(() => {
    if (!reportId) return;

    getAnalysisReport(token, reportId)
      .then((report) => setReport(report))
      .catch((error) => toastError(error, dict))
      .finally(() => setIsLoading(false));
  }, [reportId, token, dict]);

  if (isLoading) {
    return (
      <Container>
        <IconLoader className="animate-spin" size={96} />
      </Container>
    );
  }

  return (
    <Container>
      <Title>{dict.windows.analysisReport.title}</Title>

      <Paragraph>{dict.windows.analysisReport.description}</Paragraph>

      <pre>{JSON.stringify(report, null, 2)}</pre>
    </Container>
  );
};

export default AnalysisReportWindow;
