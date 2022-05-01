import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Login from "../Login";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import { renderWithReduxAndRouter } from "../../../test-utils/renderWithReduxAndRouter";

describe("DefultPage", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    renderWithReduxAndRouter(<Login />);
  });

  it("Login render", () => {
    expect(screen.getByText("Войти")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-pass")).toBeInTheDocument();
    expect(screen.getByText("Ввод")).toBeInTheDocument();
  });
});
