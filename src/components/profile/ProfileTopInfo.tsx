import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../store/slices/userSlice";
import DialogCropp from "../ImageCropper/DialogCropper";
import { setImageProfile } from "../../store/slices/userDataSlice";

interface Event<T = EventTarget> {
  target: T;
}

export default function ProfileTopInfo({
  image,
}: Record<string, string | null>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputImg, setInputImg] = useState<string>("");
  const [openCropper, setOpenCropper] = React.useState(false);
  const dicpatch = useAppDispatch();
  const navigate = useNavigate();

  const openMenu = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const hendleMenuLogout = () => {
    dicpatch(removeUser());
    navigate("/");
    handleClose();
  };
  const setStateOpen: Dispatch<SetStateAction<boolean>> = (open) => {
    setOpenCropper(open);
  };
  const handleImage = (blob: Blob | null) => {
    if (blob) {
      dicpatch(setImageProfile(blob));
      createImageUrl(blob);
    }
  };
  const createImageUrl = (file: File | Blob) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        if (typeof reader.result === "string") {
          setInputImg(reader.result);
        }
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onInputChange = (e: Event<HTMLInputElement>) => {
    if (e && e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      createImageUrl(file);
      setOpenCropper(true);
    }
  };

  return (
    <div className="profile-top">
      <div className="profile-top__info">
        <Button onClick={() => navigate("/userCreateWorkout")}>
          Создать свою тренировку
        </Button>
      </div>
      <div className="profile-top__avatar">
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          {inputImg === "" ? (
            <Avatar
              sx={{ width: 60, height: 60, transform: "translateZ(0)" }}
              alt="Avatar"
              src={`${image}`}
            />
          ) : (
            <Avatar
              sx={{ width: 60, height: 60, transform: "translateZ(0)" }}
              alt="Avatar"
              src={inputImg}
            />
          )}
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
        >
          <MenuItem onClick={hendleMenuLogout}>Выйти</MenuItem>
          <MenuItem component="label">
            Мое фото
            <input onChange={onInputChange} type="file" hidden />
          </MenuItem>
        </Menu>
        <DialogCropp
          handlerImage={handleImage}
          open={openCropper}
          setStateOpen={setStateOpen}
          imageSrc={inputImg}
          cropShape={"round"}
          aspect={1}
          widthBlob={300}
          heightBlob={300}
        />
      </div>
    </div>
  );
}
