import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../stores/auth";
import Navbar from "./skeleton/Navbar";

const AuthorizedLayout: FC = () => {
  const { token } = useAuthStore();

  if (token === "") {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="fade-in flex min-h-screen">
      <Navbar />

      <Outlet />
    </main>
  );
};

export default AuthorizedLayout;
