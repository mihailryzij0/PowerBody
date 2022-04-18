import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithReduxAndRouter } from "../../test-utils";
import Login from "./Login";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import { signIn } from "../../firebase";
import { signInUser } from "../../store/slices/userSlice";

// jest.mock("../../store/slices/userSlice", () => ({
//   signInUser: jest.fn(),
// }));

const userData = {
  email: "sdfsd@gmail.com",
  pass: "123test",
};

describe("DefultPage", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    renderWithReduxAndRouter(<Login />);
  });

  it("Login render", () => {
    const title = screen.getByText("Войти");
    const inputEmail = screen.getByTestId("input-email");
    const inputPass = screen.getByTestId("input-pass");
    const button = screen.getByText("Ввод");
    expect(title).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  // it("Login form submit", () => {
  //   const title = screen.getByText("Войти");
  //   const inputEmail = screen.getByTestId( "input-email" ) as HTMLInputElement;
  //   const inputPass = screen.getByTestId("input-pass") as HTMLInputElement;
  //   const button = screen.getByText("Ввод");
  //   user.type(inputEmail, "sdfsd@gmail.com")
  //   user.type(inputPass, '123test')
  //   user.click(button)

  // });
});
