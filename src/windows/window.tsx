import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import Branding from "../components/common/Branding";
import Container from "../components/layout/Container";
import { Subtitle, Title } from "../components/ui/Typography";
import { getIsInitialized } from "../services/auth";
import useDictStore from "../stores/dict";

const SplashWindow: FC = () => {
  const { dict } = useDictStore();
  const navigate = useNavigate();

  useEffect(() => {
    getIsInitialized().then((response) => {
      new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
        if (response.initialized) {
          return navigate("/login");
        }
        return navigate("/initialize");
      });
    });
  }, [navigate]);

  return (
    <Container className="flex flex-col max-w-lg mx-auto gap-4">
      <Branding size="large" />

      <Title className="text-center text-cream-500">{dict.branding.name}</Title>

      <Subtitle className="text-center text-cream-600">
        {dict.branding.slogan}
      </Subtitle>
    </Container>
  );
};

export default SplashWindow;
