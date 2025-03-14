import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../../components/layout/Container";
import Button from "../../../../components/ui/Button";
import CopyText from "../../../../components/ui/CopyText";
import { Paragraph, Title } from "../../../../components/ui/Typography";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
const AssignedPassphraseWindow: FC = () => {
  const { dict } = useDictStore();
  const { assignedPassphrase, setAssignedPassphrase } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Container className="flex flex-col gap-6 mx-auto max-w-lg w-full">
      <Title className="text-cream-500">
        {dict.windows.assignedPassphrase.title}
      </Title>

      <Paragraph>{dict.windows.assignedPassphrase.description}</Paragraph>

      <CopyText text={assignedPassphrase ?? ""} />

      <Button
        onClick={() => {
          setAssignedPassphrase(null);
          navigate("/login");
        }}
        className="w-full"
      >
        {dict.windows.assignedPassphrase.continue}
      </Button>
    </Container>
  );
};

export default AssignedPassphraseWindow;
