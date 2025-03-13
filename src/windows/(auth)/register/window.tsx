import { FC } from 'react'
import Container from '../../../components/layout/Container'
import { Subtitle, Title } from '../../../components/ui/Typography'
import InitializeForm from '../../../forms/InitializeForm'
import useDictStore from '../../../stores/dict'

const RegisterWindow: FC = () => {
  const { dict } = useDictStore()

  return <Container className="text-center min-h-screen">
    <Title className="text-cream-500">
      {dict.windows.initialize.register.title}
    </Title>

    <Subtitle className="text-cream-600">
      {dict.windows.initialize.register.description}
    </Subtitle>

    <InitializeForm />
  </Container>
}

export default RegisterWindow