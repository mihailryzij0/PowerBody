import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider  } from '@emotion/react'
import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme();
theme = createTheme({
  palette: {
    primary: {
      main: '#950740'
    },
    secondary:{
      main: '#e89eef'
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
   <ThemeProvider theme={theme}  >
     <App />
     </ThemeProvider>
  </BrowserRouter>
  </React.StrictMode>

, document.getElementById("root"));
