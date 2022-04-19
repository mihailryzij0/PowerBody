import "@testing-library/jest-dom";
import { store } from "../../store";
import { getPostCards } from "../cardsSlice";

const state = {
  vitamins: [{ title: "курс тестостерон", rating: "2", id: 7 }],
  workouts: [{ title: "тренировка по шейко", rating: "2", id: 8 }],
};

jest.mock("../../../firebase", () => ({
  getFirebaseData: jest
    .fn()
    .mockResolvedValueOnce(state)
    .mockRejectedValueOnce("ошибка"),
}));

describe("CardSlice", () => {
  beforeEach(() => {});

  it("asyncThunk getPostCards fulfilled", async () => {
    await store.dispatch(getPostCards());
    const { cards } = store.getState();
    expect(cards.status).toBe("fulfilled");
    expect(cards.postCards).toEqual(state);
  });
  it("asyncThunk getPostCards rejected", async () => {
    await store.dispatch(getPostCards());
    const { cards } = store.getState();
    expect(cards.status).toBe("rejected");
    expect(cards.error).toEqual("ошибка");
  });
});
