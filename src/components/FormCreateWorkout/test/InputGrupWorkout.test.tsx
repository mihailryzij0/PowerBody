import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithReactHookForm } from "../../../test-utils/renderWithReactHookForm";
import InputGrupWorkout from "../InputGrupWorkout";

const defaultValues = {
  title: "",
  description: "",
  typeWorkout: "",
  weeks: 6,
  workouts: [
    {
      exercises: [""],
      workoutName: "",
    },
  ],
  image: null,
  vidio: null,
};

describe("InputGrupWorkout", () => {
  beforeEach(() => {
    renderWithReactHookForm(<InputGrupWorkout />, {
      defaultValues: defaultValues,
    });
    jest.clearAllMocks();
  });

  it("InputGrupWorkout render", async () => {
    expect(screen.getByText(/Тренировочный день/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Упражнение/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Название комплекса/i)).toBeInTheDocument();
    expect(screen.getByText(/Создать/i)).toBeInTheDocument();
  });
});
