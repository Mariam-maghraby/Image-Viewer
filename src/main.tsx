import React from "react";
import ReactDOM from "react-dom/client";
import { DEFAULT_THEME } from "@mantine/core";
import { MantineProvider, MantineTheme } from "@mantine/core";
import App from "./App.tsx";
import "./index.css";

const APP_THEME: MantineTheme = {
  ...DEFAULT_THEME,
  fontFamily: "Roboto, Noto Sans JP, sans-serif, Helvetica, sans-serif",
  headings: {
    ...DEFAULT_THEME.headings,
    fontFamily: "Roboto, Noto Sans JP, sans-serif, Helvetica, sans-serif",
  },
  primaryColor: "blue",
  spacing: {
    ...DEFAULT_THEME.spacing,
    xxs: "8px",
    xxxs: "6px",
  },
  primaryShade: 7,
};

setTimeout(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <MantineProvider theme={APP_THEME}>
        <App />
      </MantineProvider>
    </React.StrictMode>
  );
}, 1000);
