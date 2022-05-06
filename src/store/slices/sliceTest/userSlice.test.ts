import { UserDataForm } from "../../../components/formAuth/Login";
import { store } from "../../store";
import {
  onAuthChanged,
  removeUser,
  signInUser,
  signUpUser,
} from "../userSlice";

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
  });

  it("asyncThunk signIn rejected", async () => {
    await store.dispatch(signInUser(parameters));
    const { user } = store.getState();
    expect(user.status).toBe("rejected");
    expect(user.error).toBe("ошибка");
  });
});

describe("userSlice signUp", () => {
  let result: { email: any; idUser: any };
  let parameters: Required<UserDataForm>;
  beforeEach(() => {
    result = {
      email: "test123@gmail.com",
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

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({
      email: "test123@gmail.com",
      token: "testToken",
      uid: "testID",
    });
  }),
}));

jest.mock("../userDataSlice", () => ({
  getUserData: jest.fn(),
}));

describe("userSlice onAuthChanged", () => {
  let result: { email: any; idUser: any };
  let parameters: Required<UserDataForm>;
  beforeEach(() => {
    result = {
      email: "test123@gmail.com",
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

  it("asyncThunk onAuthChanged", async () => {
    await store.dispatch(onAuthChanged());
    const { user } = store.getState();
    expect(user.email).toBe("test123@gmail.com");
    expect(user.idUser).toBe("testID");
    expect(localStorage.getItem("isAuth")).toBe("true");
  });
});
