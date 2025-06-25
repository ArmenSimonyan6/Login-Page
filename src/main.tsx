import "./index.scss";

import { StrictMode } from "react";
import { AppProvider } from "./App";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>
);
