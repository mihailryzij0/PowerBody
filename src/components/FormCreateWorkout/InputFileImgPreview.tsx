import { Box } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import DialogCropper from "../ImageCropper/DialogCropper";
import readFileAsDataURL from "../ImageCropper/readFileAsDataURL";

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
  };

  const onInputChange = useCallback(({ target }) => {
    async function doFileRead() {
      const result = await readFileAsDataURL(target.files[0]);
      setInputImg(result as string);
      setOpen(true);
    }
    doFileRead();
  }, []);

  const handleImage = useCallback((blob: Blob | null) => {
    async function doFileRead() {
      if (blob) {
        setValue("image", blob);
        const url = await readFileAsDataURL(blob);
        setInputImg(url);
      }
      setOpen(false);
    }
    doFileRead();
  }, []);

  return (
    <>
      <Box className="preview" component="label">
        <img data-testid="image" className="preview__img" src={inputImg} />
        <input
          data-testid="input"
          type="file"
          onChange={onInputChange}
          accept="image/*"
          hidden
        />
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
