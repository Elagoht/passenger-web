import { FC, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import AccountsWindow from "./windows/(panel)/accounts/window";
import SplashWindow from "./windows/window";

const App: FC = () => {
  useEffect(() => initializeDict(), []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Splash Screen */}
        <Route path="/" element={<SplashWindow />} />

        {/* Unauthorized Routes */}
        <Route element={<UnauthorizedLayout />}>
          {/* Login */}
          <Route path="/login" element={<LoginWindow />} />

          {/* Onboarding */}
          <Route path="/initialize" element={<InitializeWindow />} />
          <Route path="/initialize/register" element={<RegisterWindow />} />
          <Route
            path="/initialize/recovery-key"
            element={<RecoveryKeyWindow />}
          />
          <Route
            path="/initialize/check-if-noted"
            element={<CheckIfNotedWindow />}
          />
          <Route path="/initialize/lets-start" element={<LetsStartWindow />} />
          {/* Passphrase Recovery */}
          <Route
            path="/forgot-passphrase"
            element={<ForgotPassphraseWindow />}
          />
          <Route
            path="/forgot-passphrase/assigned-passphrase"
            element={<AssignedPassphraseWindow />}
          />
        </Route>

        {/* Authorized Routes */}
        <Route element={<AuthorizedLayout />}>
          <Route path="/accounts" element={<AccountsWindow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
