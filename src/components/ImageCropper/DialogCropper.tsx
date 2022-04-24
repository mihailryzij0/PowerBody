import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Area, Point } from "react-easy-crop/types";
import { getCroppedImg } from "./cropImage";
import Cropper from "react-easy-crop";

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

interface Props {
  handlerImage: (blob: Blob | null) => void;
  open: boolean;
  setStateOpen: Dispatch<SetStateAction<boolean>>;
  widthBlob?: number;
  heightBlob?: number;
  imageSrc: string;
  cropShape: "round" | "rect";
  aspect: number;
}

export default function DialogCropp({
  handlerImage,
  imageSrc,
  open,
  setStateOpen,
  widthBlob,
  heightBlob,
  aspect,
  cropShape,
}: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [blob, setBlob] = useState<Blob | null>(null);

  const onCropComplete = async (_: any, pixelCrop: Area) => {
    const croppedImage = await getCroppedImg({
      imageSrc,
      pixelCrop,
      widthBlob,
      heightBlob,
    });

    setBlob(croppedImage);
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setStateOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setStateOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Отменить
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                setStateOpen(false);
                handlerImage(blob);
                console.log(blob);
              }}
            >
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <div className="profole-crppper-box">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            showGrid={true}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </Dialog>
    </>
  );
}
