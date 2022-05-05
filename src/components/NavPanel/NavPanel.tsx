import { AccountCircle, FitnessCenter, Home } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Menu, Container } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default function NavPanel() {
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
          <IconButton component={Link} to="/generator" color="inherit">
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
