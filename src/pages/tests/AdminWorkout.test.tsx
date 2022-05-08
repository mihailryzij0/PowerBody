import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import { renderWithReduxAndRouter } from "../../test-utils/renderWithReduxAndRouter";
import AdminWorkout from "../AdminWorkout";
import { preloadedStateCards } from "../../test-utils/initialStateTest";
import { act } from "react-dom/test-utils";

describe("AdminWorkout", () => {
  beforeEach(() => {
    renderWithReduxAndRouter(<AdminWorkout />, preloadedStateCards);
  });

  it("AdminWorkout render", () => {
    expect(screen.getByText(/Тренировка/i)).toBeInTheDocument();
    expect(screen.getByText(/Курс/i)).toBeInTheDocument();
    expect(screen.getByText(/Недель:/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Ссылка видео youtube")).toBeInTheDocument();
  });
  it("training fields appear when you click on the button with the text 'Тренировка'", async () => {
    const buttonWorkout = screen.getByText(/Тренировка/i);
    const buttonVitamin = screen.getByText(/Курс/i);
    const accordionInputsWorkout = screen.queryByText(/тренировочный день/i);
    expect(accordionInputsWorkout).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.click(buttonWorkout);
    });
    expect(screen.getByText(/тренировочный день/i)).toBeInTheDocument();
  });
});
