import { FC } from "react";
import { Navigate } from "react-router";
import { Outlet } from "react-router-dom";
import useAuthStore from "../../stores/auth";

const UnauthorizedLayout: FC = () => {
  const { token } = useAuthStore();

  if (token !== "") {
    return <Navigate to="/accounts" replace />;
  }

  return (
    <main className="grid md:grid-cols-3 grid-cols-1 fade-in min-h-screen">
      <aside className="bg-cover bg-center bg-onboarding min-h-36" />

      <section className="md:col-span-2 flex flex-col justify-center">
        <Outlet />
      </section>
    </main>
  );
};

export default UnauthorizedLayout;
