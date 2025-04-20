import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalThemeProvider } from "./components/global-theme-provider";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalThemeProvider>
      <App />
      <Analytics />
    </GlobalThemeProvider>
  </StrictMode>,
);
