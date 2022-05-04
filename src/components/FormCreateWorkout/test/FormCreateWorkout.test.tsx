import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import FormCreateWorkout from "../FormCreateWorkout";
import { renderWithRedux } from "../../../test-utils/renderWithRedux";

const mockHandlerForm = jest.fn();

describe("InputGrupWorkout with the vitamins key", () => {
  beforeEach(() => {
    renderWithRedux(
      <FormCreateWorkout handlerForm={mockHandlerForm} postKey="vitamins" />
    );
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));

    jest.clearAllMocks();
  });

  it("FormCreateWorkout render", () => {
    expect(screen.getByTestId("inputYoutube")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.getByTestId("buttonSubmit")).toBeInTheDocument();
    expect(screen.getByTestId("slider")).toBeInTheDocument();
  });

  it("writing data to a form, calling a handler function", async () => {
    const inputYoutube = screen.getByTestId("inputYoutube");
    const inputTitle = screen.getByTestId("title");
    const inputDescription = screen.getByTestId("description");
    const buttonSubmit = screen.getByTestId("buttonSubmit");
    const selectTyptWorkout = screen.getByLabelText(/Тип тренировки/i);

    await act(async () => {
      fireEvent.change(inputYoutube, {
        target: { value: "https://www.youtube.com/watch?v=yoqqBJYMNcY" },
      });
      fireEvent.change(inputTitle, { target: { value: "testTitle" } });
      fireEvent.change(inputDescription, {
        target: { value: "testDescription" },
      });

      await waitFor(() => {
        fireEvent.mouseDown(selectTyptWorkout);
      });
      fireEvent.click(await screen.findByText(/На сушку/i));
    });

    await act(async () => {
      fireEvent.click(buttonSubmit);
    });

    expect(mockHandlerForm).toHaveBeenCalledWith({
      title: "testTitle",
      description: "testDescription",
      typeWorkout: "На сушку",
      authorId: null,
      author: "",
      id: "1577836800000",
      weeks: 4,
      image: null,
      comments: [],
      vidio: "https://www.youtube.com/watch?v=yoqqBJYMNcY",
    });
  });
});

describe("InputGrupWorkout with the workouts key", () => {
  beforeEach(() => {
    renderWithRedux(
      <FormCreateWorkout handlerForm={mockHandlerForm} postKey="workouts" />
    );
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));

    jest.clearAllMocks();
  });

  it("FormCreateWorkout render", () => {
    expect(screen.getByTestId("inputYoutube")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.getByTestId("buttonSubmit")).toBeInTheDocument();
    expect(screen.getByTestId("slider")).toBeInTheDocument();
    expect(screen.getByTestId("addinputNameComplexBtn")).toBeInTheDocument();
    expect(screen.getByTestId("deleteExerciseInputBtn")).toBeInTheDocument();
    expect(screen.getByTestId("addExerciseInputBtn")).toBeInTheDocument();
    expect(screen.getByTestId("inputNameExercise")).toBeInTheDocument();
    expect(screen.getByTestId("inputNameComplex")).toBeInTheDocument();
    expect(screen.getByTestId("accordionBtn")).toBeInTheDocument();
    expect(screen.getByText(/Тренировочный день/i)).toBeInTheDocument();
  });

  it("writing data to a form, calling a handler function", async () => {
    const inputYoutube = screen.getByTestId("inputYoutube");
    const inputTitle = screen.getByTestId("title");
    const inputDescription = screen.getByTestId("description");
    const inputsExercise = screen.getByTestId("inputNameExercise");
    const inputNameComplex = screen.getByTestId("inputNameComplex");
    const buttonSubmit = screen.getByTestId("buttonSubmit");
    const selectTyptWorkout = screen.getByLabelText(/Тип тренировки/i);

    await act(async () => {
      fireEvent.change(inputYoutube, {
        target: { value: "https://www.youtube.com/watch?v=yoqqBJYMNcY" },
      });
      fireEvent.change(inputTitle, { target: { value: "testTitle" } });
      fireEvent.change(inputDescription, {
        target: { value: "testDescription" },
      });
      fireEvent.change(inputsExercise, { target: { value: "testExercise" } });
      fireEvent.change(inputNameComplex, {
        target: { value: "testNameComplex" },
      });

      await waitFor(() => {
        fireEvent.mouseDown(selectTyptWorkout);
      });
      fireEvent.click(await screen.findByText(/На сушку/i));
    });

    await act(async () => {
      fireEvent.click(buttonSubmit);
    });

    expect(mockHandlerForm).toHaveBeenCalledWith({
      title: "testTitle",
      description: "testDescription",
      typeWorkout: "На сушку",
      authorId: null,
      author: "",
      id: "1577836800000",
      weeks: 4,
      image: null,
      vidio: "https://www.youtube.com/watch?v=yoqqBJYMNcY",
      comments: [],
      workouts: [
        {
          exercises: ["testExercise"],
          workoutName: "testNameComplex",
        },
      ],
    });
  });
});
