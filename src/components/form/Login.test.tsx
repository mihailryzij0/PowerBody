import React from "react";
import {screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";import { renderWithReduxAndRouter } from "../../test-utils";
import Login from "./Login";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";


jest.mock("../../firebase", ()=>({
  signIn:jest.fn()
  .mockImplementation(() => userData )
}))


const userData = {
  email: 'sdfsd@gmail.com',
  idUser: 'sfgsfvdsvsvxxdvxzv',
  token: 'sdvvvvvvvvvvvvvvvvvvvvvvvvv',
  isAuth: true,
};



describe("DefultPage", () => {
  let user: UserEvent;
  beforeEach(()=>{
     user = userEvent.setup()
     renderWithReduxAndRouter(<Login /> )
  }) 

  it("Login render", () => {
    const title = screen.getByText("Войти")
    const input = screen.getByRole("textbox",{name:'email'})
    expect(title).toBeInTheDocument();
  });

  

});