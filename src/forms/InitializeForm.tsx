import { IconLock, IconUser } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import Pre from "../components/debug/Pre"
import Button from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import useDictStore from "../stores/dict"

const InitializeForm: FC = () => {
  const { dict } = useDictStore()

  return <Formik<RequestInitialize>
    initialValues={{
      email: "",
      password: ""
    }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false)
    }}
  >
    <Form className="flex flex-col gap-6 mt-12 max-w-md w-full">
      <Input
        icon={IconUser}
        name="email"
        label={dict.forms.fields.email}
      />
      <Input
        icon={IconLock}
        type="password"
        name="password"
label={dict.forms.fields.password}
      />

      <Button
        type="submit"
        color="success"
      >
        {dict.windows.initialize.register.form.submit}
      </Button>

      <Pre />
    </Form>
  </Formik>
}

export default InitializeForm