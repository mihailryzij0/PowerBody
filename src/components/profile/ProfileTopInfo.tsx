import { IconButton, Avatar, Menu, MenuItem, Button } from "@mui/material";
import React, {
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { removeUser, signOutUser } from "../../store/slices/userSlice";
import DialogCropper from "../ImageCropper/DialogCropper";
import { setImageProfile } from "../../store/slices/userDataSlice";
import readFileAsDataURL from "../ImageCropper/readFileAsDataURL";

export default function ProfileTopInfo({
  image,
}: Record<string, string | null>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputImg, setInputImg] = useState<string>("");
  const [openCropper, setOpenCropper] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openMenu = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuLogout = () => {
    dispatch(signOutUser());
    navigate("/");
    handleClose();
  };
  const setStateOpen: Dispatch<SetStateAction<boolean>> = (open) => {
    setOpenCropper(open);
  };
  const handleImage = useCallback((blob: Blob | null) => {
    async function doFileRead() {
      if (blob) {
        dispatch(setImageProfile(blob));
        const url = await readFileAsDataURL(blob);
        setInputImg(url);
      }
      setOpenCropper(false);
    }
    doFileRead();
  }, []);

  const onInputChange = useCallback(({ target }) => {
    async function doFileRead() {
      const result = await readFileAsDataURL(target.files[0]);
      setInputImg(result as string);
      setOpenCropper(true);
    }
    doFileRead();
  }, []);

  return (
    <div className="profile-top">
      <div className="profile-top__info">
        <Button
          variant="outlined"
          onClick={() => navigate("/userCreateWorkout")}
        >
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
          <MenuItem onClick={handleMenuLogout}>Выйти</MenuItem>
          <MenuItem component="label">
            Мое фото
            <input onChange={onInputChange} type="file" hidden />
          </MenuItem>
        </Menu>
        <DialogCropper
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
