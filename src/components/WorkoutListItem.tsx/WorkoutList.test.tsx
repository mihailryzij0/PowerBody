import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkoutListItem from "./WorkoutListItem";

describe("WorkoutListItem", () => {
  it("WorkoutListItem render", () => {
    render(<WorkoutListItem exercises={["жим", "присед"]} />);
    const item1 = screen.getByText(/жим/i);
    const item2 = screen.getByText(/присед/i);
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
});
