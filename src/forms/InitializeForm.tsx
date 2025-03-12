import { FC } from "react"
import { Formik, Form } from "formik"
import useDictStore from "../stores/dict"
import { Input } from "../components/ui/Input"
import Button from "../components/ui/Button"
import { IconLock, IconUser } from "@tabler/icons-react"

const InitializeForm: FC = () => {
  const { dict } = useDictStore()

  return <Formik<RequestInitialize>
    initialValues={{
      email: "",
      password: ""
    }}
    onSubmit={() => { }}
  >
    <Form className="flex flex-col gap-6 fade-in">
      <Input
        icon={<IconUser />}
        name="email"
        label={dict.forms.fields.email}
      />
      <Input
        icon={<IconLock />}
        name="password"
        label={dict.forms.fields.password}
      />

      <Button
        type="submit"
        color="success"
      >
        {dict.windows.initialize.register.form.submit}
      </Button>
    </Form>
  </Formik>
}

export default InitializeForm