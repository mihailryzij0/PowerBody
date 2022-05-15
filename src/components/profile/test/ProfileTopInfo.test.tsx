import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import ProfileTopInfo from "../ProfileTopInfo";
import { renderWithReduxAndRouter } from "../../../test-utils/renderWithReduxAndRouter";
import * as ReadFileAsDataURL from "../../ImageCropper/readFileAsDataURL";
import { PropsDialogCropper } from "../../ImageCropper/DialogCropper";

jest.mock("../../../hooks/redux-hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(() => () => {}),
}));

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
            <img src={imageSrc} data-testid={"image"} />
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

describe("ProfileTopInfo render", () => {
  let readFileMock: jest.SpyInstance<Promise<string>, [file: File | Blob]>;
  let file: File;

  beforeEach(() => {
    renderWithReduxAndRouter(
      <ProfileTopInfo image={"https://firebasestorage.google.com"} />
    );
    file = new File([new ArrayBuffer(1)], "file.jpg");

    readFileMock = jest
      .spyOn(ReadFileAsDataURL, "default")
      .mockResolvedValue("image content");
    jest.clearAllMocks();
  });
  it("ProfileTopInfo render", () => {
    const menu = screen.getByTestId("button-menu");
    const buttonWorkout = screen.getByTestId("button-create-workout");
    expect(menu).toBeInTheDocument();
    expect(buttonWorkout).toBeInTheDocument();
    expect(screen.queryByText(/Выйти/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Мое фото/i)).not.toBeInTheDocument();
  });

  it("the menu opens", async () => {
    const menu = screen.getByTestId("button-menu");
    await act(async () => {
      fireEvent.click(menu);
    });
    expect(screen.getByText(/Выйти/i)).toBeInTheDocument();
    expect(screen.getByText(/Мое фото/i)).toBeInTheDocument();
  });
  it("the cropper opens", async () => {
    const menu = screen.getByTestId("button-menu");
    await act(async () => {
      fireEvent.click(menu);
    });
    await act(async () => {
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { files: [file] } });
    });
    expect(screen.getByText(/Сохранить/i)).toBeInTheDocument();
    expect(screen.getByText(/Закрыть/i)).toBeInTheDocument();
  });

  it("the modal window closes", async () => {
    const menu = screen.getByTestId("button-menu");
    await act(async () => {
      fireEvent.click(menu);
    });
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
    expect(screen.queryByText(/Закрыть/i)).not.toBeInTheDocument();
  });

  it("the ReadFileAsDataURL function is called", async () => {
    const menu = screen.getByTestId("button-menu");
    await act(async () => {
      fireEvent.click(menu);
    });
    await act(async () => {
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { files: [file] } });
    });
    expect(screen.getByText(/Сохранить/i)).toBeInTheDocument();
    expect(readFileMock).toHaveBeenCalledTimes(1);
    expect(readFileMock).toHaveBeenCalledWith(file);
    expect(screen.getByTestId("image")).toHaveAttribute("src", "image content");
  });
});
