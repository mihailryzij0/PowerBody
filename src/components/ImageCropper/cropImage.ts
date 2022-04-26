import { Area } from "react-easy-crop/types";
const createImage: (url: string) => Promise<HTMLImageElement> = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

interface GetCroppedImgProps {
  imageSrc: string;
  pixelCrop: Area;
  widthBlob?: number;
  heightBlob?: number;
}

export async function getCroppedImg({
  imageSrc,
  pixelCrop,
  widthBlob,
  heightBlob,
}: GetCroppedImgProps): Promise<Blob | null> {
  const image: HTMLImageElement = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  if (widthBlob && heightBlob) {
    canvas.width = widthBlob;
    canvas.height = heightBlob;
  } else {
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, "image/webp");
  });
}
