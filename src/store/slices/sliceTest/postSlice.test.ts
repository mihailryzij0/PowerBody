import { store } from "../../store";
import { getPostCards } from "../cardsSlice";
import { getPostData } from "../postSlice";

const state = {
  postData: {
    authorId: "test123",
    author: "Михаил",
    image: "https://firebasestorage.googleapis.com",
    description: "test",
    rating: "5",
    title: "test",
    id: 123,
  },
};

jest.mock("../../../firebase", () => ({
  getFirebaseData: jest
    .fn()
    .mockResolvedValueOnce(state)
    .mockRejectedValueOnce("ошибка"),
}));

describe("CardSlice", () => {
  beforeEach(() => {});

  it("asyncThunk getPostData fulfilled", async () => {
    await store.dispatch(getPostData(123));
    const { post } = store.getState();
    expect(post.status).toBe("fulfilled");
    expect(post.postData).toEqual(state.postData);
  });
  it("asyncThunk getPostData rejected", async () => {
    await store.dispatch(getPostData(123));
    const { post } = store.getState();
    expect(post.status).toBe("rejected");
    expect(post.error).toEqual("ошибка");
  });
});
