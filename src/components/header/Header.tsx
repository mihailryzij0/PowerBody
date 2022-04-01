import {
  AccountCircle,
  FitnessCenter,
  Home,
  PlaylistAdd,
} from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Menu, Container } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const CustomizedSlide = styled(Menu)`
  color: #20b2aa;
  min-width: 100% !important
  max-width: 100%;
min-height: 16px;
max-height: calc(100% - 32px);
left:0;
outline: 0;
display:none
min-width: 100%;
  :hover {
    color: #2e8b57;
  }
`;

export default function Header() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Container maxWidth={"sm"}>
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <IconButton component={Link} to="/posts" color="inherit">
            <Home></Home>
          </IconButton>
          <IconButton component={Link} to="/individual" color="inherit">
            <FitnessCenter></FitnessCenter>
          </IconButton>
          <IconButton component={Link} to="/" color="inherit">
            <AccountCircle></AccountCircle>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
