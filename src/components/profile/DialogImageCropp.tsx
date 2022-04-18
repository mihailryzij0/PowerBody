import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import ImageCropper from "../ImageCropper/ImageCropper";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setImageProfile } from "../../store/slices/userDataSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Event<T = EventTarget> {
  target: T;
}

export default function DialogImageCropp() {
  const dispach = useAppDispatch();
  const [blob, setBlob] = useState<HTMLImageElement | null>(null);
  const [inputImg, setInputImg] = useState<string | null>("");

  const getBlob = (blob: React.SetStateAction<HTMLImageElement | null>) => {
    setBlob(blob);
  };
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onInputChange = (e: Event<HTMLInputElement>) => {
    setOpen(true);
    console.log(inputImg);
    if (e && e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader() as any;

      reader.addEventListener(
        "load",
        () => {
          setInputImg(reader.result);
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <MenuItem component="label">
        Upload File
        <input onChange={onInputChange} type="file" hidden />
      </MenuItem>
      {inputImg && open && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Sound
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={() => {
                  handleClose();
                  dispach(setImageProfile(blob as HTMLImageElement));
                }}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className="profole-crppper-box">
            <ImageCropper getBlob={getBlob} inputImg={inputImg} />
          </div>
        </Dialog>
      )}
    </>
  );
}
