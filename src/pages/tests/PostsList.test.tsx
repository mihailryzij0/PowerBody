import React from "react";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import { renderWithReduxAndRouter } from "../../test-utils";
import PostsList from "../PostsList";
import { store } from "../../store/store";

const valueReturnFirebase = {
  cards: {
    postCards: {
      vitamins: [{ title: "курс тестостерон", rating: "2", id: 7 }],
      workouts: [{ title: "тренировка по шейко", rating: "2", id: 8 }],
    },
    filteredCards: {
      vitamins: [{ title: "курс тестостерон", rating: "2", id: 7 }],
      workouts: [{ title: "тренировка по шейко", rating: "2", id: 8 }],
      filtredParams: {
        author: "Весь список",
        typeWorkout: "Весь список",
      },
    },
    status: "fulfilled",
  },
};
jest.mock("../../hooks/redux-hooks", () => ({
  useAppSelector: jest.fn().mockImplementation(() => valueReturnFirebase.cards),
  useAppDispatch: jest.fn(() => () => {}),
}));
jest.mock("../../components/cards/Card", () => {
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
    expect(screen.getByLabelText(/Тренировки/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Витамины/i)).toBeInTheDocument();
  });
  it("Cards render", () => {
    expect(screen.getByText(/тренировка по шейко/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByTestId("Card")).toBeInTheDocument();
  });
  it("when you click on the tab , the component is displayed", async () => {
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
