import { FC } from "react"
import { useNavigate } from "react-router"
import Branding from "../../../components/common/Branding"
import Container from "../../../components/layout/Container"
import Button from "../../../components/ui/Button"
import { Subtitle, Title } from "../../../components/ui/Typography"
import useDictStore from "../../../stores/dict"

const InitializeWindow: FC = () => {
  const { dict } = useDictStore()
  const navigate = useNavigate()

  return <Container>
    <Branding />

    <Title className="text-cream-500 relative text-center">
      {dict.branding.name}
    </Title>

    <Subtitle className="text-cream-600 my-4 relative italic
      text-center max-w-md mx-auto"
    >
      {dict.branding.slogan}
    </Subtitle>

    <Button
      variant="gradient"
      onClick={() => navigate("/register")}
      className="w-full max-w-sm"
    >
      {dict.windows.initialize.welcome.start}
    </Button>
  </Container>
}

export default InitializeWindow