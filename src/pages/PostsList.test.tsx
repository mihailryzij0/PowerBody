import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostsList from "./PostsList";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import { renderWithReduxAndRouter } from "../test-utils";

const valueReturnFirebase = {
  cards: {
    postCards: {
      vitamins: [{ title: "курс тестостерон", rating: "2", id: 7 }],
      workouts: [{ title: "тренировка по шейко", rating: "2", id: 8 }],
    },
    status: "fulfilled",
  },
};
jest.mock("../hooks/redux-hooks", () => ({
  useAppSelector: jest.fn().mockImplementation(() => valueReturnFirebase.cards),
}));

jest.mock("../components/card/Card", () => {
  return function Card({
    title,
    rating,
    image,
    author,
    authorId,
  }: Record<string, string>) {
    return (
      <div data-testid="Card">
        {title} {rating} {image} {author} {authorId}
      </div>
    );
  };
});

describe("PostList", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    renderWithReduxAndRouter(<PostsList />);
  });

  it("PostList render", () => {
    const tab1 = screen.getByLabelText(/Тренировки/i);
    const tab2 = screen.getByLabelText(/Витамины/i);
    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
  });
  it("Cards render", () => {
    const card = screen.getByTestId("Card");
    const titleCard = screen.getByText(/тренировка по шейко/i);
    const ratingCard = screen.getByText(/2/i);
    expect(titleCard).toBeInTheDocument();
    expect(ratingCard).toBeInTheDocument();
    expect(card).toBeInTheDocument();
  });
  it("when you click on the tab , the component is displayed", () => {
    const tabPonel1 = screen.getByTestId("cards-1-list");
    const tabPonel2 = screen.queryByTestId("cards-2-list");
    expect(tabPonel2).not.toBeInTheDocument();
    expect(tabPonel1).toBeInTheDocument();
    user.click(screen.getByRole("tab", { selected: false }));
    waitFor(() => {
      expect(tabPonel2).toBeInTheDocument();
      expect(tabPonel1).not.toBeInTheDocument();
    });
  });

  it("the card has a link to the post", () => {
    const card = screen.getByTestId("cards-1-list");
    expect(card.closest("a")).toHaveAttribute("href", "/posts/8");
  });
});
