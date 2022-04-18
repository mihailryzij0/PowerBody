import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import { getCroppedImg } from "./cropImage";

interface Props {
  getBlob: (arg0: HTMLImageElement) => void;
  inputImg: string;
}

const ImageCropper = ({ getBlob, inputImg }: Props) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(3);

  const onCropComplete = async (_: any, croppedAreaPixels: Area) => {
    const croppedImage = (await getCroppedImg(
      inputImg,
      croppedAreaPixels
    )) as HTMLImageElement;
    getBlob(croppedImage);
  };

  return (
    <Cropper
      image={inputImg}
      crop={crop}
      zoom={zoom}
      aspect={1}
      cropShape="round"
      showGrid={false}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
};

export default ImageCropper;
