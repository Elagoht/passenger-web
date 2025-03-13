import { FC } from "react";
import { Navigate } from "react-router";
import { Outlet } from "react-router-dom";
import useAuthStore from "../../stores/auth";

const UnauthorizedLayout: FC = () => {
  const { token } = useAuthStore();

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
