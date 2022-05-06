import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PopupRateWorkout from "../PopupRateWorkout";
import { renderWithRedux } from "../../../test-utils/renderWithRedux";
import { act } from "react-dom/test-utils";

jest.mock("../../../hooks/redux-hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(() => () => {}),
}));
const closePopup = jest.fn();
describe("PopupRateWorkout render", () => {
  const authorId = "123test";
  it("PopupRateWorkout render", () => {
    renderWithRedux(<PopupRateWorkout id={authorId} closePopup={closePopup} />);
    const rating = screen.getByLabelText("4 Stars");
    const popup = screen.getByRole("dialog");
    const title = screen.getByText(/Оцени тренировку/i);
    expect(rating).toBeInTheDocument();
    expect(popup).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("the closing function is called", () => {
    renderWithRedux(<PopupRateWorkout id={authorId} closePopup={closePopup} />);
    const star = screen.getByLabelText("4 Stars");
    act(() => {
      fireEvent.click(star);
    });
    expect(closePopup).toHaveBeenCalled();
  });
});
