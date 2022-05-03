import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithRedux } from "../../../test-utils/renderWithRedux";
import DialogCropp from "../DialogCropper";

const mockHandlerImage = jest.fn();
const mockSetStateOpen = jest.fn();

describe("DialogCropp", () => {
  beforeEach(() => {
    render(
      <DialogCropp
        handlerImage={mockHandlerImage}
        open={true}
        setStateOpen={mockSetStateOpen}
        imageSrc={"data:123test"}
        cropShape={"rect"}
        aspect={1}
      />
    );
    jest.clearAllMocks();
  });

  it("DialogCropp render", () => {
    expect(screen.getByTestId("closeButton")).toBeInTheDocument();
    expect(screen.getByTestId("saveButton")).toBeInTheDocument();
    expect(screen.getByTestId("cropper")).toBeInTheDocument();
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });

  it("DialogCropp button click close", () => {
    const closeButton = screen.getByTestId("closeButton");
    fireEvent.click(closeButton);
    expect(mockSetStateOpen).toHaveBeenCalledWith(false);
  });

  it("FormCreateWorkout button click save", () => {
    const saveButton = screen.getByTestId("saveButton");
    fireEvent.click(saveButton);
    expect(mockHandlerImage).toHaveBeenCalled();
  });
});
