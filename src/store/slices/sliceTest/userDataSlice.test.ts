import { store } from "../../store";
import { getUserData, setImageProfile } from "../userDataSlice";

const result = {
  workout: {
    authorId: "123",
    author: "Михаил",
    image: "https://google.firestore.com/workout.jpg",
    description: "тренировка",
    rating: "5",
    workouts: [],
  },
  isAdmin: true,
  nickname: "Михаил",
  avatarImg: "https://google.firestore.com/avatar.jpg",
};

jest.mock("../../../firebase", () => ({
  setFirebaseImage: jest
    .fn()
    .mockResolvedValueOnce("https://google.firestore.com"),
  setFirebaseData: jest.fn(),
  updateFirebaseData: jest.fn(),
  getFirebaseData: jest
    .fn()
    .mockResolvedValueOnce(result)
    .mockRejectedValueOnce("ошибка"),
}));

describe("CardSlice", () => {
  beforeEach(() => {});

  it("asyncThunk setImageProfile", async () => {
    let image = new Blob();
    await store.dispatch(setImageProfile(image));
    const { userData } = store.getState();
    expect(userData.avatarImg).toBe("https://google.firestore.com");
    expect(userData.status).toBe("img-fulfilled");
  });
  it("asyncThunk getUserData fulfilled", async () => {
    await store.dispatch(getUserData());
    const { userData } = store.getState();
    expect(userData.status).toBe("getData-fulfilled");
    expect(userData.workout).toEqual(result.workout);
    expect(userData.avatarImg).toEqual(result.avatarImg);
    expect(userData.nickname).toEqual(result.nickname);
  });
  it("asyncThunk getUserData rejected", async () => {
    await store.dispatch(getUserData());
    const { userData } = store.getState();
    expect(userData.status).toBe("getData-rejected");
    expect(userData.error).toEqual("ошибка");
  });
});
