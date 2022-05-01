import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardsFilter from "../CardsFilter";
import {
  renderWithRedux,
  testStore,
} from "../../../test-utils/renderWithRedux";
import { preloadedStateCards } from "../../../test-utils/initialStateTest";

describe("CardsFilter", () => {
  it("CardsFilter render", async () => {
    renderWithRedux(<CardsFilter />, preloadedStateCards);
    const selects = screen.getAllByRole("button");
    expect(selects[0]).toBeInTheDocument();
    expect(selects[1]).toBeInTheDocument();
    expect(selects.length).toBe(2);
  });
  it("a static select opens with the training type", async () => {
    renderWithRedux(<CardsFilter />, preloadedStateCards);
    expect(screen.queryByText(/На массу/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/На сушку/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/На выносливость/i)).not.toBeInTheDocument();

    await act(async () => {
      const selects = screen.getAllByRole("button");
      fireEvent.mouseDown(selects[0]);
    });

    expect(screen.getByText(/На массу/i)).toBeInTheDocument();
    expect(screen.getByText(/На сушку/i)).toBeInTheDocument();
    expect(screen.getByText(/На выносливость/i)).toBeInTheDocument();
  });
  it("a dynamic selection opens with the names of the authors", async () => {
    renderWithRedux(<CardsFilter />, preloadedStateCards);
    expect(screen.queryByText(/Михаил/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Вася/i)).not.toBeInTheDocument();
    await act(async () => {
      const selects = screen.getAllByRole("button");
      fireEvent.mouseDown(selects[1]);
    });

    expect(screen.getByText(/Михаил/i)).toBeInTheDocument();
    expect(screen.getByText(/Вася/i)).toBeInTheDocument();
  });

  it(`processing clicks on select options 
  (author's choice), recording data in Redux`, async () => {
    renderWithRedux(<CardsFilter />, preloadedStateCards);
    const selects = screen.getAllByRole("button");

    await act(async () => {
      fireEvent.mouseDown(selects[1]);
    });
    fireEvent.click(await screen.findByText(/Вася/i));

    expect(testStore.getState().cards.filteredCards.filtredParams).toEqual({
      author: "Вася",
      typeWorkout: "Весь список",
    });
  });

  it(`processing clicks on select options 
  (choosing the type of training), recording data in Redux`, async () => {
    renderWithRedux(<CardsFilter />, preloadedStateCards);
    const selects = screen.getAllByRole("button");

    await act(async () => {
      fireEvent.mouseDown(selects[0]);
    });
    fireEvent.click(await screen.findByText(/На сушку/i));

    expect(testStore.getState().cards.filteredCards.filtredParams).toEqual({
      author: "Весь список",
      typeWorkout: "На сушку",
    });
  });

  it("processing clicks on two select options , recording data in Redux", async () => {
    renderWithRedux(<CardsFilter />, preloadedStateCards);
    const selects = screen.getAllByRole("button");

    await act(async () => {
      fireEvent.mouseDown(selects[1]);
    });
    fireEvent.click(await screen.findByText(/Михаил/i));

    await act(async () => {
      fireEvent.mouseDown(selects[0]);
    });
    fireEvent.click(await screen.findByText(/На массу/i));

    expect(testStore.getState().cards.filteredCards.filtredParams).toEqual({
      author: "Михаил",
      typeWorkout: "На массу",
    });
  });
});
