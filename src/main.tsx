import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./index.css";
import App from "./App.tsx";
import { GlobalThemeProvider } from "./components/global-theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalThemeProvider>
      <App />
    </GlobalThemeProvider>
  </StrictMode>,
);
