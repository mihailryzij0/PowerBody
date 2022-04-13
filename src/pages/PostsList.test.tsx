import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostsList from "./PostsList";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import { renderWithReduxAndRouter } from "../test-utils";

const valueReturnFirebase = {
  postCards: {
    vitamins: [{ title: "курс тестостерон", rating: "2", id: 7 }],
    workouts: [{ title: "тренировка по шейко", rating: "2", id: 8 }],
  },
};
jest.mock("../firebase", () => ({
  getFirebaseData: jest
    .fn()
    .mockImplementation(() => valueReturnFirebase.postCards),
}));

describe("DefultPage", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    renderWithReduxAndRouter(<PostsList />);
  });

  it("PostList render", () => {
    const tab1 = screen.getByLabelText(/Тренировки/i);
    const tab2 = screen.getByLabelText(/Витамины/i);
    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
  });
  it("when you click on the tab , the component is displayed", async () => {
    const tabPonel1 = await screen.findByTestId("cards-1-list");
    const tabPonel2 = screen.queryByTestId("cards-2-list");
    expect(tabPonel2).not.toBeInTheDocument();
    expect(tabPonel1).toBeInTheDocument();
    user.click(screen.getByRole("tab", { selected: false }));
    waitFor(() => {
      expect(tabPonel2).toBeInTheDocument();
      expect(tabPonel1).not.toBeInTheDocument();
    });
  });

  // it("when you click on the card, you go to the page of the post",
  //   async () => {
  //   user.click(await screen.findByTestId ('cards-1-list'))
  //   waitFor(()=>{
  //     expect(tabPonel1).not.toBeInTheDocument()
  //   })
  // });
});
