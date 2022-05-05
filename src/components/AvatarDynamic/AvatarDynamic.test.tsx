import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AvatarDynamic from "./AvatarDynamic";
import { renderWithRedux } from "../../test-utils/renderWithRedux";

const usersAvatar = {
  usersAvatar: {
    "123test": "https://firebasestorage.google.com",
    "234test": "https://firebasestorage.google.com",
    "345test": "https://firebasestorage.google.com",
  },
};
jest.mock("../../hooks/redux-hooks", () => ({
  useAppSelector: jest.fn().mockReturnValue(usersAvatar),
  useAppDispatch: jest.fn(() => () => {}),
}));

describe("AvatarDynamic", () => {
  const authorId = "123test";
  it("AvatarDynamic render with an image", () => {
    renderWithRedux(<AvatarDynamic authorId={authorId} />);
    const avatar = screen.getByRole("img");
    expect(avatar).toBeInTheDocument();
  });
  it("AvatarDynamic render render without image", () => {
    renderWithRedux(<AvatarDynamic authorId={"321test"} />);
    const avatar = screen.getByTestId("PersonIcon");
    expect(avatar).toBeInTheDocument();
  });
});
