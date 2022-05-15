import { setFirebaseData, setFirebaseImage } from "../../../firebase";
import { WorkoutForm } from "../../../pages/UserCreateWorkout";
import { store } from "../../store";
import { createPost, createPostProps } from "../createPostSlice";

const receivedData = {
  postData: {
    authorId: "test123",
    author: "Михаил",
    image: { name: "image", width: 400, height: 500 },
    description: "test",
    rating: "5",
    typeWorkout: "",
    title: "test",
    weeks: 6,
    id: "123",
    video: null,
    comments: [],
  },
  postKey: "vitamins",
};

jest.mock("../../../firebase", () => ({
  setFirebaseImage: jest
    .fn()
    .mockResolvedValueOnce("https://google.firestore.com"),
  setFirebaseData: jest.fn(),
  updateFirebaseData: jest.fn(),
  getFirebaseData: jest
    .fn()
    .mockResolvedValueOnce(receivedData as unknown as createPostProps)
    .mockRejectedValueOnce("ошибка"),
}));

describe("createPostSlice", () => {
  beforeEach(() => {});

  it("asyncThunk createPost fulfilled", async () => {
    await store.dispatch(
      createPost(receivedData as unknown as createPostProps)
    );
    expect(setFirebaseImage).toHaveBeenCalledWith(
      {
        height: 500,
        name: "image",
        width: 400,
      },
      "123",
      "imagePosts"
    );
    expect(setFirebaseData).toHaveBeenCalledWith(
      "posts",
      "123",
      receivedData.postData
    );
    expect(setFirebaseData).toHaveBeenCalledWith(
      "posts",
      "123",
      receivedData.postData
    );
    expect(setFirebaseData).toHaveBeenCalledWith(
      "posts",
      "123",
      receivedData.postData
    );
  });
  // it("asyncThunk getUserAvatar rejected", async () => {
  //   await store.dispatch(createPost(receivedData));
  //   const { usersAvatar } = store.getState();
  //   expect(usersAvatar.status).toBe("rejected");
  //   expect(usersAvatar.error).toEqual("ошибка");
  // });
});
