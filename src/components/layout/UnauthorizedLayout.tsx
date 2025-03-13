import { FC, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import { getIsInitialized } from "../../services/auth";
import useAuthStore from "../../stores/auth";

const UnauthorizedLayout: FC = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) return;

    getIsInitialized().then((response) => {
      if (response.initialized) {
        return navigate("/login");
      }
      return navigate("/");
    });
  }, [navigate, token]);

  if (token !== null) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="grid sm:grid-cols-3 grid-cols-1 h-screen fade-in">
      <aside className="bg-cover bg-center bg-onboarding min-h-36" />

      <section className="col-span-2">
        <Outlet />
      </section>
    </main>
  );
};

export default UnauthorizedLayout;
