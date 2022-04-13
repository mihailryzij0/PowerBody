import { Button, TextField } from "@mui/material";
import React, {
  ChangeEvent,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";

export interface inputFileProps {
  register: UseFormRegister<any>;
  PreviewImgBox: any;
  InputFileButton: any;
  inputFileButtonContent: string | SVGViewElement;
}

export default function InputFilePrevius() {
  const { register, watch } = useFormContext();
  const uploadedImage = useRef<HTMLImageElement>(null);

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage) {
      const reader = new FileReader();
      const { current }: any = uploadedImage;
      if (current) current.file = watchImage[0];
      reader.onload = (e: any) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(watchImage[0]);
    }
  }, [watchImage]);

  return (
    <>
      <div className="previus">
        <img
          className="previus__img"
          src={require("../../assets/fon.jpg")}
          ref={uploadedImage}
        />
      </div>
      <Button variant="contained" component="label">
        Заменить изображение
        <input type="file" {...register("image")} accept="image/*" hidden />
      </Button>
    </>
  );
}
