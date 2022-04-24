import { Box, Button } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import DialogCropper from "../ImageCropper/DialogCropper";

export interface inputFileProps {
  register: UseFormRegister<any>;
  PreviewImgBox: any;
  InputFileButton: any;
  inputFileButtonContent: string | SVGViewElement;
}
interface Event<T = EventTarget> {
  target: T;
}
export default function InputFileImgPreview() {
  const { setValue } = useFormContext();
  const [inputImg, setInputImg] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  const setStateOpen: Dispatch<SetStateAction<boolean>> = (open) => {
    setOpen(open);
    console.log(open);
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
      setOpen(true);
    }
  };
  const handleImage = (blob: Blob | null) => {
    if (blob) {
      setValue("image", blob);
      createImageUrl(blob);
    }
  };

  return (
    <>
      <Box className="preview" component="label">
        <img className="preview__img" src={inputImg} />
        <input type="file" onChange={onInputChange} accept="image/*" hidden />
      </Box>
      <DialogCropper
        handlerImage={handleImage}
        open={open}
        setStateOpen={setStateOpen}
        imageSrc={inputImg}
        cropShape={"rect"}
        aspect={5 / 3}
      />
    </>
  );
}
