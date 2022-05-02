export default async function readFileAsDataURL(
  file: File | Blob
): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", (evt) => {
      if (reader.result) {
        resolve(reader.result as string);
      }
    });
    reader.readAsDataURL(file);
  });
}
