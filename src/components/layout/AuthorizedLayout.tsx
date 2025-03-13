import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import useAuthStore from "../../stores/auth"

const AuthorizedLayout: FC = () => {
  const { token } = useAuthStore()

  if (token === null) {
    return <Navigate to="/initialize" replace />
  }

  return <main className="fade-in">
    <Outlet />
  </main>
}

export default AuthorizedLayout