import { FC } from "react";
import { useNavigate } from "react-router";
import Container from "../../../../components/layout/Container";
import Button from "../../../../components/ui/Button";
import { Subtitle, Title } from "../../../../components/ui/Typography";
import useDictStore from "../../../../stores/dict";

const LetsStartWindow: FC = () => {
  const { dict } = useDictStore();
  const navigate = useNavigate();

  return (
    <Container className="max-w-lg mx-auto gap-4">
      <Title className="text-center text-cream-500">
        {dict.windows.initialize.letsStart.title}
      </Title>

      <Subtitle className="text-center text-cream-600">
        {dict.windows.initialize.letsStart.description}
      </Subtitle>

      <Button
        variant="gradient"
        color="success"
        className="w-full"
        onClick={() => {
          navigate("/login");
        }}
      >
        {dict.windows.initialize.letsStart.submit}
      </Button>
    </Container>
  );
};

export default LetsStartWindow;
