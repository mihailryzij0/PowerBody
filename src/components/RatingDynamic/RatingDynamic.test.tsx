import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RatingDynamic from "./RatingDynamic";
import { renderWithRedux } from "../../test-utils/renderWithRedux";

const usersRating = {
  ratings: {
    "123test": "4",
    "234test": "5",
    "345test": "3",
  },
};
jest.mock("../../hooks/redux-hooks", () => ({
  useAppSelector: jest.fn().mockReturnValue(usersRating),
  useAppDispatch: jest.fn(() => () => {}),
}));
describe("RatingDynamic render", () => {
  const authorId = "123test";
  it("RatingDynamic render", () => {
    renderWithRedux(<RatingDynamic id={authorId} />);
    const avatars = screen.getAllByTestId("StarIcon");
    expect(avatars[0]).toBeInTheDocument();
    expect(avatars[1]).toBeInTheDocument();
    expect(avatars[2]).toBeInTheDocument();
    expect(avatars[3]).toBeInTheDocument();
    expect(avatars[4]).toBeInTheDocument();
  });
});
