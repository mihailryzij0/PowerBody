import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, getByRole, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithReduxAndRouter } from "../../test-utils";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import { FormAuth } from "./FormAuth";
import { UserDataForm } from "./Login";

// jest.mock("../../store/slices/userSlice", () => ({
//   signInUser: jest.fn(),
// }));

const userData = {
  email: "sdfsd@gmail.com",
  pass: "123test",
};

const mockSubmit = jest.fn();

describe("formAuth", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    renderWithReduxAndRouter(<FormAuth title="test" onSubmit={mockSubmit} />);
  });

  it("Login render", () => {
    const title = screen.getByText("test");
    const inputEmail = screen.getByTestId("input-email");
    const inputPass = screen.getByTestId("input-pass");
    const button = screen.getByText("Ввод");
    expect(title).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("Login form submit", async () => {
    await act(async () => {
      const inputEmail = screen.getByLabelText("email") as HTMLInputElement;
      const inputPass = screen.getByLabelText("password") as HTMLInputElement;
      fireEvent.change(inputEmail, { target: { value: "sdfsd@gmail.com" } });
      fireEvent.change(inputPass, { target: { value: "1234567" } });
    });
    await act(async () => {
      const button = screen.getByText("Ввод");
      fireEvent.click(button);
    });

    expect(mockSubmit).toBeCalled();
    expect(mockSubmit.mock.calls[0][0]).toEqual({
      email: "sdfsd@gmail.com",
      pass: "1234567",
    });
  });
});
