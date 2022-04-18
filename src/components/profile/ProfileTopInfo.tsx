import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import React, {
  ChangeEvent,
  useState,
  MouseEvent,
  ChangeEventHandler,
} from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../store/slices/userSlice";
import { setImageProfile } from "../../store/slices/userDataSlice";
import ImageCropper from "../ImageCropper/ImageCropper";
import DialogImageCropp from "./DialogImageCropp";

export default function ProfileTopInfo({
  image,
}: Record<string, string | null>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dicpatch = useAppDispatch();
  const navigate = useNavigate();
  const hendleMenuLogout = () => {
    dicpatch(removeUser());
    navigate("/");
    handleClose();
  };

  return (
    <div className="profile-top">
      <div className="profile-top__info">
        <Typography>Пройденно: 5/10 </Typography>
        <Typography>Каллорий на день: 5000 </Typography>
      </div>
      <div className="profile-top__avatar">
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt="Remy Sharp"
            src={`${image}`}
          />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={hendleMenuLogout}>Выйти</MenuItem>
          <DialogImageCropp />
        </Menu>
      </div>
    </div>
  );
}
