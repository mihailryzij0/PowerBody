import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  FormProviderMethods,
  renderWithReactHookForm,
} from "../../../test-utils/renderWithReactHookForm";
import InputGrupWorkout from "../InputGrupWorkout";
import { act } from "react-dom/test-utils";

const defaultValues = {
  workouts: [
    {
      exercises: [""],
      workoutName: "",
    },
  ],
};

describe("InputGrupWorkout", () => {
  beforeEach(() => {
    renderWithReactHookForm(<InputGrupWorkout />, {
      defaultValues: defaultValues,
    });
    jest.clearAllMocks();
  });

  it("InputGrupWorkout render", () => {
    expect(screen.getByTestId("addinputNameComplexBtn")).toBeInTheDocument();
    expect(screen.getByTestId("deleteExerciseInputBtn")).toBeInTheDocument();
    expect(screen.getByTestId("addExerciseInputBtn")).toBeInTheDocument();
    expect(screen.getByTestId("inputNameExercise")).toBeInTheDocument();
    expect(screen.getByTestId("inputNameComplex")).toBeInTheDocument();
    expect(screen.getByTestId("accordionBtn")).toBeInTheDocument();
    expect(screen.getByText(/Тренировочный день/i)).toBeInTheDocument();
  });

  it("InputGrupWorkout render", async () => {
    let inputsExercise = screen.getAllByTestId("inputNameExercise");
    expect(inputsExercise.length).toBe(1);

    fireEvent.click(screen.getByTestId("addExerciseInputBtn"));
    inputsExercise = await screen.findAllByTestId("inputNameExercise");
    expect(inputsExercise.length).toBe(2);

    fireEvent.click(screen.getByTestId("addExerciseInputBtn"));
    inputsExercise = await screen.findAllByTestId("inputNameExercise");
    expect(inputsExercise.length).toBe(3);
  });

  it("adding inputs when clicking on the button", async () => {
    let inputNameComplex = screen.getAllByTestId("inputNameComplex");
    expect(inputNameComplex.length).toBe(1);

    fireEvent.click(screen.getByTestId("addinputNameComplexBtn"));
    inputNameComplex = await screen.findAllByTestId("inputNameComplex");
    expect(inputNameComplex.length).toBe(2);

    fireEvent.click(screen.getByTestId("addinputNameComplexBtn"));
    inputNameComplex = await screen.findAllByTestId("inputNameComplex");
    expect(inputNameComplex.length).toBe(3);
  });

  it("input change data entry in React-Hook-Form state", async () => {
    fireEvent.click(screen.getByTestId("addExerciseInputBtn"));
    fireEvent.click(screen.getByTestId("addinputNameComplexBtn"));

    const inputsExercise = await screen.findAllByTestId("inputNameExercise");
    const inputNameComplex = await screen.findAllByTestId("inputNameComplex");
    await act(async () => {
      inputNameComplex.forEach((input, index) => {
        fireEvent.change(inputNameComplex[index], {
          target: { value: "testNameComplex" },
        });
      });

      inputsExercise.forEach((input, index) => {
        fireEvent.change(inputsExercise[index], {
          target: { value: "testExercise" },
        });
      });
    });
    expect(FormProviderMethods.getValues()).toEqual({
      workouts: [
        {
          exercises: ["testExercise", "testExercise"],
          workoutName: "testNameComplex",
        },
        { exercises: ["testExercise"], workoutName: "testNameComplex" },
      ],
    });
  });
});
