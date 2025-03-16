import { FC, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthorizedLayout from "./components/layout/AuthorizedLayout";
import UnauthorizedLayout from "./components/layout/UnauthorizedLayout";
import { initializeDict } from "./stores/dict";
import AssignedPassphraseWindow from "./windows/(auth)/forgot-password/assigned-passphrase/window";
import ForgotPassphraseWindow from "./windows/(auth)/forgot-password/window";
import CheckIfNotedWindow from "./windows/(auth)/initialize/check-if-noted/window";
import LetsStartWindow from "./windows/(auth)/initialize/lets-start/window";
import RecoveryKeyWindow from "./windows/(auth)/initialize/recovery-key/window";
import RegisterWindow from "./windows/(auth)/initialize/register/window";
import InitializeWindow from "./windows/(auth)/initialize/window";
import LoginWindow from "./windows/(auth)/login/window";
import AccountAddWindow from "./windows/(panel)/accounts/add/window";
import AccountDetailsWindow from "./windows/(panel)/accounts/details/[id]/window";
import AccountsWindow from "./windows/(panel)/accounts/window";
import SettingsWindow from "./windows/(panel)/settings/window";
import ToolsWindow from "./windows/(panel)/tools/window";
import SplashWindow from "./windows/window";

const router = createBrowserRouter([
  { path: "/", element: <SplashWindow /> },
  {
    element: <UnauthorizedLayout />,
    children: [
      { path: "/login", element: <LoginWindow /> },
      { path: "/initialize", element: <InitializeWindow /> },
      { path: "/initialize/register", element: <RegisterWindow /> },
      { path: "/initialize/recovery-key", element: <RecoveryKeyWindow /> },
      { path: "/initialize/check-if-noted", element: <CheckIfNotedWindow /> },
      { path: "/initialize/lets-start", element: <LetsStartWindow /> },
      { path: "/forgot-passphrase", element: <ForgotPassphraseWindow /> },
      {
        path: "/forgot-passphrase/assigned-passphrase",
        element: <AssignedPassphraseWindow />,
      },
    ],
  },
  {
    element: <AuthorizedLayout />,
    children: [
      { path: "/accounts", element: <AccountsWindow /> },
      { path: "/accounts/details/:id", element: <AccountDetailsWindow /> },
      { path: "/accounts/add", element: <AccountAddWindow /> },
      { path: "/tools", element: <ToolsWindow /> },
      { path: "/settings", element: <SettingsWindow /> },
    ],
  },
]);

const App: FC = () => {
  useEffect(() => initializeDict(), []);

  return <RouterProvider router={router} />;
};

export default App;
