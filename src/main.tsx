import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./design/global.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />

    <Toaster position="bottom-right" />
  </>,
);
