import { setFirebaseData, setFirebaseImage } from "../../../firebase";
import { store } from "../../store";
import { createPost } from "../createPostSlice";
import { getUserAvatar } from "../getUsersAvatarSlice";

const receivedData = {
  postData:{
    authorId: "test123",
    author: "Михаил",
    image: [{name:'image', width:400, haight:500}],
    description: "test",
    rating: "5",
    title: "test",
    id: 123,
  },
  postKey:'vitamons'
};


jest.mock("../../../firebase", () => ({
  setFirebaseImage: jest
    .fn()
    .mockResolvedValueOnce("https://google.firestore.com"),
  setFirebaseData: jest.fn(),
  updateFirebaseData: jest.fn(),
  getFirebaseData: jest
    .fn()
    .mockResolvedValueOnce(receivedData)
    .mockRejectedValueOnce("ошибка"),
}));

describe("createPostSlice", () => {
  beforeEach(() => {});

  it("asyncThunk createPost fulfilled", async () => {
    await store.dispatch(createPost(receivedData));
    expect(setFirebaseImage)
    .toHaveBeenCalledWith({
      "haight": 500, "name": "image", "width": 400},
       "image", "imagePosts"
       );
    expect(setFirebaseData)
      .toHaveBeenCalledWith("posts", "123", receivedData.postData);   
      expect(setFirebaseData)
      .toHaveBeenCalledWith("posts", "123", receivedData.postData);  
  });
  // it("asyncThunk getUserAvatar rejected", async () => {
  //   await store.dispatch(getUserAvatar('123'));
  //   const { usersAvatar } = store.getState();
  //   expect(usersAvatar.status).toBe("rejected");
  //   expect(usersAvatar.error).toEqual("ошибка");
  // });
});
