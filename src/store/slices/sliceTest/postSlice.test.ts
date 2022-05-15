import { store } from "../../store";
import { getPostData } from "../postSlice";

const receivedData = {
  authorId: "test123",
  author: "Михаил",
  image: "https://firebasestorage.googleapis.com",
  description: "test",
  rating: "5",
  title: "test",
  id: 123,
};

jest.mock("../../../firebase", () => ({
  getFirebaseData: jest
    .fn()
    .mockResolvedValueOnce(receivedData)
    .mockRejectedValueOnce("ошибка"),
}));

describe("postSlice", () => {
  beforeEach(() => {});

  it("asyncThunk getPostData fulfilled", async () => {
    await store.dispatch(getPostData(123));
    const { post } = store.getState();
    expect(post.status).toBe("fulfilled");
    expect(post.postData).toEqual(receivedData);
  });
  it("asyncThunk getPostData rejected", async () => {
    await store.dispatch(getPostData(123));
    const { post } = store.getState();
    expect(post.status).toBe("rejected");
    expect(post.error).toEqual("ошибка");
  });
});
