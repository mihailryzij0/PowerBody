import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithReactHookForm } from "../../../test-utils/renderWithReactHookForm";
import InputFileImgPreview from "../InputFileImgPreview";
import { act } from "react-dom/test-utils";
import * as ReadFileAsDataURL from "../../ImageCropper/readFileAsDataURL";
import { PropsDialogCropper } from "../../ImageCropper/DialogCropper";

jest.mock("../../ImageCropper/DialogCropper", () => {
  return function DialogCropper({
    handlerImage,
    imageSrc,
    open,
    setStateOpen,
    aspect,
    cropShape,
  }: PropsDialogCropper) {
    return (
      <>
        {open && (
          <div data-testid="DialogCropper">
            <img src={imageSrc} />
            <button
              data-testid={"closeButton"}
              onClick={() => setStateOpen(false)}
            >
              Закрыть
            </button>
            <button
              onClick={() => handlerImage(null)}
              data-testid={"saveButton"}
            >
              Сохранить
            </button>
          </div>
        )}
      </>
    );
  };
});

describe("InputFileImgPreview", () => {
  let readFileMock: jest.SpyInstance<Promise<string>, [file: File | Blob]>;
  let file: File;

  beforeEach(() => {
    renderWithReactHookForm(<InputFileImgPreview />);
    file = new File([new ArrayBuffer(1)], "file.jpg");

    readFileMock = jest
      .spyOn(ReadFileAsDataURL, "default")
      .mockResolvedValue("image content");
    jest.clearAllMocks();
  });

  it("InputFileImgPreview render", async () => {
    expect(screen.getByTestId("image")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("the ReadFileAsDataURL function is called", async () => {
    await act(async () => {
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { files: [file] } });
    });
    expect(screen.getByText(/Сохранить/i)).toBeInTheDocument();
    expect(readFileMock).toHaveBeenCalledTimes(1);
    expect(readFileMock).toHaveBeenCalledWith(file);
    expect(screen.getByTestId("image")).toHaveAttribute("src", "image content");
  });

  it("the modal window opens and closes when the close button is clicked", async () => {
    await act(async () => {
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { files: [file] } });
    });

    expect(screen.getByText(/Сохранить/i)).toBeInTheDocument();
    expect(screen.getByText(/Закрыть/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByTestId("closeButton"));
    });

    expect(screen.queryByText(/Сохранить/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Сохранить/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Закрыть/i)).not.toBeInTheDocument();
  });

  it("the modal window opens and closes when you click on the create button", async () => {
    await act(async () => {
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { files: [file] } });
    });

    expect(screen.getByText(/Сохранить/i)).toBeInTheDocument();
    expect(screen.getByText(/Закрыть/i)).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId("saveButton"));
    });
    expect(screen.queryByText(/Сохранить/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Закрыть/i)).not.toBeInTheDocument();
  });
});
