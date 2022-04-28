import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AvararDinamic from "./AvatarDinamic";
import { renderWithReduxAndRouter } from "../../test-utils";

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

describe("AvararDinamic", () => {
  const authorId = "123test";
  it("AvararDinamic render with an image", () => {
    renderWithReduxAndRouter(<AvararDinamic authorId={authorId} />);
    const avarar = screen.getByRole("img");
    expect(avarar).toBeInTheDocument();
  });
  it("AvararDinamic render render without image", () => {
    renderWithReduxAndRouter(<AvararDinamic authorId={"321test"} />);
    const avarar = screen.getByTestId("PersonIcon");
    expect(avarar).toBeInTheDocument();
  });
});
