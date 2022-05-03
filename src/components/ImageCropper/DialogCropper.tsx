import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
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

export interface PropsDialogCropp {
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
}: PropsDialogCropp) {
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
  const handleClick = () => {
    handlerImage(blob);
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
              data-testid={"closeButton"}
              edge="start"
              color="inherit"
              onClick={() => setStateOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Button
              data-testid={"saveButton"}
              autoFocus
              color="inherit"
              onClick={handleClick}
            >
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <div data-testid={"cropper"} className="profole-crppper-box">
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
