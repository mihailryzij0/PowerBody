import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import { getCroppedImg } from "./cropImage";

interface Props {
  getBlob: (arg0: Blob | null) => void;
  imageSrc: string;
  cropShape: "round" | "rect";
  aspect: number;
  widthBlob: number;
  heightBlob: number;
}

const ImageCropper = ({
  getBlob,
  imageSrc,
  cropShape,
  aspect,
  widthBlob,
  heightBlob,
}: Props) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0);

  const onCropComplete = async (_: any, pixelCrop: Area) => {
    const croppedImage = await getCroppedImg({
      imageSrc,
      pixelCrop,
      widthBlob,
      heightBlob,
    });

    getBlob(croppedImage);
  };

  return (
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
  );
};

export default ImageCropper;
