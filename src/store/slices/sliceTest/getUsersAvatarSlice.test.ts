import { store } from "../../store";
import { getUserAvatar } from "../getUsersAvatarSlice";

const receivedData = {
  avatarImg: "https://firebasestorage.googleapis.com",
};

jest.mock("../../../firebase", () => ({
  getFirebaseData: jest
    .fn()
    .mockResolvedValueOnce(receivedData)
    .mockRejectedValueOnce("ошибка"),
}));

describe("getUsersAvatarSlice", () => {
  beforeEach(() => {});

  it("asyncThunk getUserAvatar fulfilled", async () => {
    await store.dispatch(getUserAvatar("userId123"));
    const { usersAvatar } = store.getState();
    expect(usersAvatar.status).toBe("fulfilled");
    expect(usersAvatar.usersAvatar["userId123"]).toEqual(
      receivedData.avatarImg
    );
  });
  it("asyncThunk getUserAvatar rejected", async () => {
    await store.dispatch(getUserAvatar("userId123"));
    const { usersAvatar } = store.getState();
    expect(usersAvatar.status).toBe("rejected");
    expect(usersAvatar.error).toEqual("ошибка");
  });
});
