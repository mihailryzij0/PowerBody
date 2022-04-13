import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

interface ButtonProgres {
  status: "pending" | "fulfilled" | "rejected" | "";
}

export default function ButtonProgres({ status }: ButtonProgres) {
  return (
    <Box position={{ position: "relative" }}>
      <Button
        fullWidth={true}
        color={status === "rejected" ? "error" : "secondary"}
        type="submit"
        disabled={status === "pending"}
        variant="contained"
      >
        Ввод
      </Button>
      {status === "pending" && (
        <CircularProgress
          size={24}
          sx={{
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
}
