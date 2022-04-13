import { Box, Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";

export interface inputFileProps {
  register: UseFormRegister<any>;
  PreviewImgBox: any;
  InputFileButton: any;
  inputFileButtonContent: string | SVGViewElement;
}

export default function InputFileImgPreview() {
  const { register, watch } = useFormContext();
  const uploadedImage = useRef<HTMLImageElement>(null);

  const watchImage = watch("image");
  if (watchImage) {
    const reader = new FileReader();
    const { current }: any = uploadedImage;
    if (current) current.file = watchImage[0];
    reader.onload = (e: any) => {
      current.src = e.target.result;
    };
    reader.readAsDataURL(watchImage[0]);
  }

  return (
    <>
      <Box className="preview" component="label">
        <img className="preview__img" ref={uploadedImage} />
        <input type="file" {...register("image")} accept="image/*" hidden />
      </Box>
    </>
  );
}
