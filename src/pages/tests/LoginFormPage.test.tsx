import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithReduxAndRouter } from "../../test-utils/renderWithReduxAndRouter";
import { preloadedStateCards } from "../../test-utils/initialStateTest";
import { act } from "react-dom/test-utils";
import LoginFormPage from "../LoginFormPage";

describe("LoginFormPage", () => {
  beforeEach(() => {
    renderWithReduxAndRouter(<LoginFormPage />, preloadedStateCards);
  });

  it("LoginFormPage render", () => {
    expect(screen.getByText(/Войти/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  it("go to the SignUp page after clicking on the 'Зарегистрироваться'", async () => {
    expect(screen.getByText(/Войти/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.queryByText(/Регистрация/i)).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText(/Зарегистрироваться/i));
    });
    screen.debug();
    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
  });
});
