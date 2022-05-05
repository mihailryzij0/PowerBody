import { UserDataForm } from "../../../components/formAuth/Login";
import { store } from "../../store";
import { removeUser, signInUser, signUpUser } from "../userSlice";

const result = {
  email: "test123@gmail.com",
  token: "testToken",
  idUser: "testID",
};

jest.mock("../../../firebase", () => ({
  signIn: jest
    .fn()
    .mockResolvedValueOnce(result)
    .mockRejectedValueOnce({ message: "ошибка" }),
  signUp: jest
    .fn()
    .mockResolvedValueOnce(result)
    .mockRejectedValueOnce({ message: "ошибка" }),
}));

describe("userSlice signIn", () => {
  let parameters: UserDataForm;
  beforeEach(() => {
    parameters = {
      email: "test123@gmail.com",
      pass: "123456",
    };
  });
  afterEach(() => {
    localStorage.removeItem("user");
  });

  it("asyncThunk signIn fulfilled", async () => {
    await store.dispatch(signInUser(parameters));
    const { user } = store.getState();
    expect(user.status).toBe("fulfilled");
    expect(user.email).toBe(result.email);
    expect(user.token).toBe(result.token);
    expect(user.idUser).toBe(result.idUser);
    expect(localStorage.getItem("user")).toBe(JSON.stringify(result));
  });

  it("asyncThunk signIn rejected", async () => {
    await store.dispatch(signInUser(parameters));
    const { user } = store.getState();
    expect(user.status).toBe("rejected");
    expect(user.error).toBe("ошибка");
  });
});

describe("userSlice signUp", () => {
  let result: { email: any; token: any; idUser: any };
  let parameters: Required<UserDataForm>;
  beforeEach(() => {
    result = {
      email: "test123@gmail.com",
      token: "testToken",
      idUser: "testID",
    };
    parameters = {
      email: "test123@gmail.com",
      pass: "123456",
      nickname: "Михаил",
    };
  });
  afterEach(() => {
    localStorage.removeItem("user");
  });

  it("asyncThunk signUp fulfilled and removeUser", async () => {
    await store.dispatch(signUpUser(parameters));
    const { user } = store.getState();
    expect(user.status).toBe("fulfilled");
    expect(localStorage.getItem("user")).toBe(JSON.stringify(result));

    store.dispatch(removeUser());
    const {
      user: { email },
    } = store.getState();
    expect(email).toBe(null);
    expect(localStorage.getItem("user")).toBe(null);
  });

  it("asyncThunk signUp rejected", async () => {
    await store.dispatch(signUpUser(parameters));
    const { user } = store.getState();
    expect(user.status).toBe("rejected");
    expect(user.error).toBe("ошибка");
  });
});
