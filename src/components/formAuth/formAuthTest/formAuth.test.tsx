import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import { FormAuth } from "../FormAuth";
import { renderWithReduxAndRouter } from "../../../test-utils";

const mockSubmit = jest.fn();
describe("formAuth", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<FormAuth title="test" onSubmit={mockSubmit} />);
  });

  it("FormAuth render", () => {
    const title = screen.getByText("test");
    const inputEmail = screen.getByTestId("input-email");
    const inputPass = screen.getByTestId("input-pass");
    const button = screen.getByText("Ввод");
    expect(title).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("calls the onSubmit function", async () => {
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
  it("renders the email validation error", async () => {
    await act(async () => {
      const emailInput = screen.getByLabelText("email");
      fireEvent.change(emailInput, { target: { value: "invalid email" } });
      fireEvent.blur(emailInput);
    });

    expect(screen.getByText("email введен не правильно")).toBeInTheDocument();
  });
  it("renders the password validation error", async () => {
    await act(async () => {
      const passInput = screen.getByLabelText("password");
      fireEvent.change(passInput, { target: { value: "123" } });
      fireEvent.blur(passInput);
    });

    expect(screen.getByText("пароль минимум 6 символов")).toBeInTheDocument();
  });
});

jest.mock("../../../hooks/redux-hooks", () => ({
  useAppSelector: jest.fn().mockImplementation(() => {
    return {
      status: "rejected",
      error: "Firebase: Error (auth/user-not-found).",
    };
  }),
}));
describe("checking for firebase errors", () => {
  it("an error is displayed", async () => {
    renderWithReduxAndRouter(<FormAuth title="test" onSubmit={mockSubmit} />);
    expect(screen.getByText("Пользователь не найден")).toBeInTheDocument();
  });
});
