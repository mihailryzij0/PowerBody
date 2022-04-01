import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./firebase";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";

import { Workbox } from "workbox-window";


  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js");

    wb.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        if (confirm(`New app update is available!. Click OK to refresh`)) {
          window.location.reload();
        }
      }
    });
    wb.register();
  }
  let theme = createTheme();
  theme = createTheme({
    palette: {
      primary: {
        main: '#121216',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: '#293b30',
      },
    },
  });
  theme = responsiveFontSizes(theme);


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);

