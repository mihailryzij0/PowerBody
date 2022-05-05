import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card, { CardProps } from "../Card";
import { renderWithRedux } from "../../../test-utils/renderWithRedux";

jest.mock("../../AvatarDynamic/AvatarDynamic", () => {
  return function AvatarDynamic({ authorId }: Record<string, string>) {
    return <div data-testid="map">{authorId}</div>;
  };
});

describe("DefaultPage", () => {
  const cardsProps: CardProps = {
    title: "Тренировка",
    image: "https://firebasestorage.googleapis.com",
    author: "Михаил",
    authorId: "32345sdfbb",
    id: "1",
  };

  it("Card render", () => {
    renderWithRedux(<Card {...cardsProps} />, {
      ratings: {
        ratings: { "1": { rating: 5, voted: 0, sumRating: 5 } },
      },
    });
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
