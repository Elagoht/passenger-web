import { IconLock } from "@tabler/icons-react";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import Container from "../../../../components/layout/Container";
import Announcement from "../../../../components/ui/Announcement";
import Button from "../../../../components/ui/Button";
import CopyText from "../../../../components/ui/CopyText";
import { Paragraph, Title } from "../../../../components/ui/Typography";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";

const RecoveryKeyWindow: FC = () => {
  const { dict } = useDictStore();
  const { recoveryKey } = useAuthStore();

  const navigate = useNavigate();

  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Container className="!max-w-lg mx-auto gap-4">
      <Title className="text-center text-cream-500">
        {dict.windows.initialize.recovery.title}
      </Title>

      <Paragraph>{dict.windows.initialize.recovery.description}</Paragraph>

      <Announcement icon={IconLock} variant="danger">
        {dict.windows.initialize.recovery.warning}
      </Announcement>

      <Paragraph className="w-full -mb-3 text-cream-600">
        {dict.windows.initialize.recovery.recoveryKey}
      </Paragraph>

      <CopyText text={recoveryKey ?? ""} onClick={() => setCopied(true)} />

      <Button
        disabled={!copied}
        variant="gradient"
        className="w-full"
        onClick={() => {
          navigate("/initialize/check-if-noted");
        }}
      >
        {dict.windows.initialize.recovery.understood}
      </Button>
    </Container>
  );
};

export default RecoveryKeyWindow;
