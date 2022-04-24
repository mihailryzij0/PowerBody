import { Backdrop } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/redux-hooks";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileContent from "../components/profile/ProfileContent";

export default function Profile() {
  const { userData } = useAppSelector((state) => state);

  return (
    <div className="container">
      {userData.status == "pending" ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <ProfileContent />
      )}
    </div>
  );
}
