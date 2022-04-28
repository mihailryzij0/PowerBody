import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card, { CardProps } from "./Card";

jest.mock("../AvatarDynamic/AvatarDinamic", () => {
  return function AvatarDinamic({ authorId }: Record<string, string>) {
    return <div data-testid="map">{authorId}</div>;
  };
});

describe("DefultPage", () => {
  const cardsProps: CardProps = {
    title: "Тренировка",
    rating: "4",
    image: "https://firebasestorage.googleapis.com",
    author: "Михаил",
    authorId: "32345sdfbb",
  };

  it("Card render", () => {
    render(<Card {...cardsProps} />);
    const cardsTitle = screen.getByText(/Тренировка/i);
    const cardsRating = screen.getByText(/4 Stars/i);
    const cardsAuthor = screen.getByText(/Михаил/i);
    const cardsImage = screen.getByRole("img", { name: /image-card/i });
    expect(cardsTitle).toBeInTheDocument();
    expect(cardsRating).toBeInTheDocument();
    expect(cardsAuthor).toBeInTheDocument();
    expect(cardsImage).toBeInTheDocument();
  });
});
