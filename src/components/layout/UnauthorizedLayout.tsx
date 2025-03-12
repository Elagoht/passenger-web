import { FC, useEffect } from "react"
import { Outlet } from "react-router-dom"
import useAuthStore from "../../stores/auth"
import { useNavigate } from "react-router"

const UnauthorizedLayout: FC = () => {
  const { token } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (token !== null) {
      navigate("/")
    }
  }, [token])

  return <main className="flex flex-col items-center justify-center min-h-screen
    max-w-screen-xs mx-auto"
  >
    <Outlet />
  </main>
}

export default UnauthorizedLayout
