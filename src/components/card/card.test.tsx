import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card, { CardProps } from "./Card" 
describe("DefultPage", () => {
  const cardsProps:CardProps ={
    title:"Тренировка",
    rating:"4",
  }

  it("test quantity of hr at DOM", () => {
    render(<Card {...cardsProps} />);
    const cardsTitle = screen.getByText(/Тренировка/i)
    const cardsRating = screen.getByText(/4/i)
    expect(cardsTitle).toBeInTheDocument();
    expect(cardsRating).toBeInTheDocument();
  });
});