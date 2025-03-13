import { FC, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthorizedLayout from "./components/layout/AuthorizedLayout";
import UnauthorizedLayout from "./components/layout/UnauthorizedLayout";
import { initializeDict } from "./stores/dict";
import InitializeWindow from "./windows/(auth)/initialize/window";
import RegisterWindow from "./windows/(auth)/register/window";
import AccountsWindow from "./windows/(panel)/accounts/window";

const App: FC = () => {
  useEffect(() => initializeDict(), []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthorized Routes */}
        <Route element={<UnauthorizedLayout />}>
          <Route path="/initialize" element={<InitializeWindow />} />
          <Route path="/register" element={<RegisterWindow />} />
        </Route>

        {/* Authorized Routes */}
        <Route element={<AuthorizedLayout />}>
          <Route path="/" element={<AccountsWindow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
