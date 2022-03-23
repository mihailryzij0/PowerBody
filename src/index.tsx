import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./firebaseAPI";
import {
  Container,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
let theme = createTheme();
theme = createTheme({
  palette: {
    primary: {
      main: "#950740",
    },
    secondary: {
      main: "#e89eef",
    },
  },
  // components: {
  //   // Name of the component
  //   MuiMenu: {
  //     styleOverrides: {
  //       // Name of the slot
  //       root: {
  //         // Some CSS
  //         minWidth:'100%',
  //         maxWidth: '100%'
  //       },
  //     },
  //   },
  // },
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
