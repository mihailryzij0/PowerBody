import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithReduxAndRouter } from "../../test-utils/renderWithReduxAndRouter";
import { preloadedStateCards } from "../../test-utils/initialStateTest";
import { act } from "react-dom/test-utils";
import GeneratorWorkout from "../GeneratorWorkout";

describe("GeneratorWorkout", () => {
  beforeEach(() => {
    renderWithReduxAndRouter(<GeneratorWorkout />, preloadedStateCards);
  });

  it("GeneratorWorkout render", () => {
    expect(screen.getByText(/Генератор тренировок/i)).toBeInTheDocument();
    expect(screen.getByText(/Создать тренировку/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Уровень подготовки/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Цель тренировок/i)[0]).toBeInTheDocument();
    expect(
      screen.getAllByText(/Чему уделить внимание/i)[0]
    ).toBeInTheDocument();
  });

  it("a training session is created and a preview is opened", async () => {
    const selects = screen.getAllByRole("button");
    await act(async () => {
      fireEvent.mouseDown(selects[0]);
    });
    fireEvent.click(await screen.findByText(/Начинающий/i));
    await act(async () => {
      fireEvent.mouseDown(selects[1]);
    });
    fireEvent.click(await screen.findByText(/Набрать массу/i));
    await act(async () => {
      fireEvent.mouseDown(selects[2]);
    });
    fireEvent.click(await screen.findByText(/Ноги/i));

    await act(async () => {
      fireEvent.click(screen.getByText(/Создать тренировку/i));
    });
    const previewWorkout = screen.getByTestId("preview-workout");
    expect(previewWorkout).toBeInTheDocument();
  });

  it("an error appears when select is not selected", async () => {
    const selects = screen.getAllByRole("button");
    await act(async () => {
      fireEvent.mouseDown(selects[0]);
    });
    fireEvent.click(await screen.findByText(/Начинающий/i));
    await act(async () => {
      fireEvent.mouseDown(selects[1]);
    });
    fireEvent.click(await screen.findByText(/Набрать массу/i));

    await act(async () => {
      fireEvent.click(screen.getByText(/Создать тренировку/i));
    });
    const previewWorkout = screen.queryByTestId("preview-workout");
    expect(previewWorkout).not.toBeInTheDocument();
    expect(screen.getByText(/Заполните все формы/i)).toBeInTheDocument();
  });
});
