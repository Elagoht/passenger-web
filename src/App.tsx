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
import ChangePassphraseWindow from "./windows/(panel)/settings/change-passphrase/window";
import ExportWindow from "./windows/(panel)/settings/export-accounts/window";
import ImportWindow from "./windows/(panel)/settings/import-accounts/window";
import SettingsWindow from "./windows/(panel)/settings/window";
import LeaksNewsWindow from "./windows/(panel)/tools/leaks/news/window";
import LeaksWindow from "./windows/(panel)/tools/leaks/windows";
import StatisticsWindow from "./windows/(panel)/tools/statistics/window";
import TagAddWindow from "./windows/(panel)/tools/tags/add/window";
import TagDetailsWindow from "./windows/(panel)/tools/tags/details/[id]/window";
import TagsWindow from "./windows/(panel)/tools/tags/window";
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
      { path: "/tools/tags", element: <TagsWindow /> },
      { path: "/tools/tags/add", element: <TagAddWindow /> },
      { path: "/tools/tags/details/:id", element: <TagDetailsWindow /> },
      { path: "/tools", element: <ToolsWindow /> },
      { path: "/tools/leaks", element: <LeaksWindow /> },
      { path: "/tools/leaks/news", element: <LeaksNewsWindow /> },
      { path: "/tools/statistics", element: <StatisticsWindow /> },
      { path: "/settings", element: <SettingsWindow /> },
      { path: "/settings/import-accounts", element: <ImportWindow /> },
      { path: "/settings/export-accounts", element: <ExportWindow /> },
      {
        path: "/settings/change-passphrase",
        element: <ChangePassphraseWindow />,
      },
    ],
  },
]);

const App: FC = () => {
  useEffect(() => initializeDict(), []);

  return <RouterProvider router={router} />;
};

export default App;
