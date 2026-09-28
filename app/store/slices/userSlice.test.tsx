// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Import internal dependencies
import reducer, {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setRepeatPassword,
  resetError,
  renewJwt,
  login,
  register,
  fetchUserProfile,
  updateUserProfile,
  logout,
} from "@/store/slices/userSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  __esModule: true,
  default: { get: jest.fn(), set: jest.fn(), remove: jest.fn() },
}));

const mockHttp = http as jest.Mock;
const mockCookieGet = Cookies.get as jest.Mock;

const getInitialState = () => ({
  loaded: true,
  loggedIn: false,
  jwt: "",
  error: { active: false, code: "" },
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    isSuperUser: false,
  },
});

describe("userSlice reducers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockCookieGet.mockReturnValue("");
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(getInitialState());
  });

  it("sets form fields", () => {
    let state = getInitialState();
    state = reducer(state, setFirstName("Jane"));
    state = reducer(state, setLastName("Doe"));
    state = reducer(state, setEmail("jane@example.com"));
    state = reducer(state, setPassword("secret"));
    state = reducer(state, setRepeatPassword("secret"));
    expect(state.user).toEqual({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      password: "secret",
      repeatPassword: "secret",
      isSuperUser: false,
    });
  });

  it("resetError clears the error", () => {
    const prev = {
      ...getInitialState(),
      error: { active: true, code: "Login failed" },
    };
    expect(reducer(prev, resetError()).error).toEqual({
      active: false,
      code: "",
    });
  });
});

describe("userSlice extraReducers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renewJwt.pending sets loaded false and clears error", () => {
    const prev = {
      ...getInitialState(),
      loaded: true,
      error: { active: true, code: "old" },
    };
    const next = reducer(
      prev,
      renewJwt.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
    expect(next.error.active).toBe(false);
  });

  it("renewJwt.fulfilled with status 200 logs the user in", () => {
    const next = reducer(
      { ...getInitialState(), loaded: false },
      renewJwt.fulfilled(
        { status: 200, data: { access_token: "token-123" } },
        "request-id",
        { language: "en" }
      )
    );
    expect(next.jwt).toBe("token-123");
    expect(next.loaded).toBe(true);
    expect(next.loggedIn).toBe(true);
    expect(next.error).toEqual({ active: false, code: "" });
    expect(localStorage.getItem("jwt")).toBe("token-123");
  });

  it("renewJwt.fulfilled with non-200 status leaves state unchanged", () => {
    const prev = getInitialState();
    const next = reducer(
      prev,
      renewJwt.fulfilled(
        { status: 401, data: {} },
        "request-id",
        { language: "en" }
      )
    );
    expect(next).toEqual(prev);
  });

  it("renewJwt.rejected sets the error", () => {
    const next = reducer(
      getInitialState(),
      renewJwt.rejected(
        new Error("failed"),
        "request-id",
        { language: "en" },
        "No credentials found"
      )
    );
    expect(next.loaded).toBe(true);
    expect(next.loggedIn).toBe(false);
    expect(next.error).toEqual({ active: true, code: "No credentials found" });
  });

  it("login.pending sets loaded false and clears error", () => {
    const next = reducer(
      getInitialState(),
      login.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
    expect(next.error.active).toBe(false);
  });

  it("login.fulfilled with status 200 logs the user in", () => {
    const prev = {
      ...getInitialState(),
      user: { ...getInitialState().user, email: "jane@example.com" },
    };
    const next = reducer(
      prev,
      login.fulfilled(
        { status: 200, data: { access_token: "token-abc" } },
        "request-id",
        { language: "en" }
      )
    );
    expect(next.jwt).toBe("token-abc");
    expect(next.loaded).toBe(true);
    expect(next.loggedIn).toBe(true);
    expect(next.error).toEqual({ active: false, code: "" });
    expect(localStorage.getItem("jwt")).toBe("token-abc");
  });

  it("login.rejected sets the error", () => {
    const next = reducer(
      getInitialState(),
      login.rejected(
        new Error("failed"),
        "request-id",
        { language: "en" },
        "Invalid credentials"
      )
    );
    expect(next.loaded).toBe(true);
    expect(next.loggedIn).toBe(false);
    expect(next.error).toEqual({ active: true, code: "Invalid credentials" });
  });

  it("register.pending sets loaded false and register.rejected sets the error", () => {
    const pending = reducer(
      getInitialState(),
      register.pending("request-id", { language: "en" })
    );
    expect(pending.loaded).toBe(false);
    expect(pending.error.active).toBe(false);

    const rejected = reducer(
      getInitialState(),
      register.rejected(
        new Error("failed"),
        "request-id",
        { language: "en" },
        "Registration failed"
      )
    );
    expect(rejected.loaded).toBe(true);
    expect(rejected.loggedIn).toBe(false);
    expect(rejected.error).toEqual({
      active: true,
      code: "Registration failed",
    });
  });

  it("logout.pending sets loaded false", () => {
    const next = reducer(
      getInitialState(),
      logout.pending("request-id", { language: "en", jwt: "token" })
    );
    expect(next.loaded).toBe(false);
  });

  it("logout.fulfilled clears session data", () => {
    localStorage.setItem("jwt", "token-abc");
    const prev = {
      ...getInitialState(),
      jwt: "token-abc",
      loggedIn: true,
      loaded: false,
    };
    const next = reducer(
      prev,
      logout.fulfilled({}, "request-id", { language: "en", jwt: "token-abc" })
    );
    expect(next.jwt).toBe("");
    expect(next.loaded).toBe(true);
    expect(next.loggedIn).toBe(false);
    expect(localStorage.getItem("jwt")).toBeNull();
  });

  it("logout.rejected sets the error", () => {
    const next = reducer(
      getInitialState(),
      logout.rejected(
        new Error("failed"),
        "request-id",
        { language: "en", jwt: "token" },
        "Logout failed"
      )
    );
    expect(next.loaded).toBe(true);
    expect(next.error).toEqual({ active: true, code: "Logout failed" });
  });

  it("fetchUserProfile.pending sets loaded false", () => {
    const next = reducer(
      getInitialState(),
      fetchUserProfile.pending("request-id", { language: "en", jwt: "token" })
    );
    expect(next.loaded).toBe(false);
  });

  it("fetchUserProfile.fulfilled stores profile data", () => {
    const next = reducer(
      { ...getInitialState(), loaded: false },
      fetchUserProfile.fulfilled(
        {
          status: 200,
          data: {
            is_superuser: true,
            first_name: "Jane",
            last_name: "Doe",
            email: "jane@example.com",
          },
        },
        "request-id",
        { language: "en", jwt: "token" }
      )
    );
    expect(next.loaded).toBe(true);
    expect(next.user.firstName).toBe("Jane");
    expect(next.user.lastName).toBe("Doe");
    expect(next.user.email).toBe("jane@example.com");
    expect(next.user.isSuperUser).toBe(true);
  });

  it("fetchUserProfile.rejected resets superuser flag", () => {
    const prev = {
      ...getInitialState(),
      user: { ...getInitialState().user, isSuperUser: true },
    };
    const next = reducer(
      prev,
      fetchUserProfile.rejected(new Error("failed"), "request-id", {
        language: "en",
        jwt: "token",
      })
    );
    expect(next.loaded).toBe(true);
    expect(next.user.isSuperUser).toBe(false);
  });

  it("updateUserProfile.pending sets loaded false and clears error", () => {
    const next = reducer(
      getInitialState(),
      updateUserProfile.pending("request-id", {
        language: "en",
        jwt: "token",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
      })
    );
    expect(next.loaded).toBe(false);
    expect(next.error.active).toBe(false);
  });

  it("updateUserProfile.fulfilled updates profile and clears passwords", () => {
    const prev = {
      ...getInitialState(),
      user: {
        ...getInitialState().user,
        password: "old",
        repeatPassword: "old",
      },
    };
    const next = reducer(
      prev,
      updateUserProfile.fulfilled(
        {
          status: 200,
          data: {
            first_name: "Janet",
            last_name: "Dooley",
            email: "janet@example.com",
          },
        },
        "request-id",
        {
          language: "en",
          jwt: "token",
          firstName: "Janet",
          lastName: "Dooley",
          email: "janet@example.com",
        }
      )
    );
    expect(next.loaded).toBe(true);
    expect(next.user.firstName).toBe("Janet");
    expect(next.user.lastName).toBe("Dooley");
    expect(next.user.email).toBe("janet@example.com");
    expect(next.user.password).toBe("");
    expect(next.user.repeatPassword).toBe("");
    expect(next.error).toEqual({ active: false, code: "" });
  });

  it("updateUserProfile.rejected sets the error", () => {
    const next = reducer(
      getInitialState(),
      updateUserProfile.rejected(
        new Error("failed"),
        "request-id",
        {
          language: "en",
          jwt: "token",
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
        },
        "Failed to update profile"
      )
    );
    expect(next.loaded).toBe(true);
    expect(next.error).toEqual({
      active: true,
      code: "Failed to update profile",
    });
  });
});

describe("userSlice thunks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockCookieGet.mockReturnValue("");
    jest.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const setupStore = () => configureStore({ reducer: { user: reducer } });

  it("login thunk logs in on success", async () => {
    mockHttp.mockResolvedValue({
      status: 200,
      data: { access_token: "token-abc" },
    });
    const store = setupStore();
    store.dispatch(setEmail("jane@example.com"));
    store.dispatch(setPassword("secret"));

    await store.dispatch(login({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "POST",
      path: "/auth/jwt/login",
      body: "username=jane%40example.com&password=secret",
      language: "en",
    });
    expect(store.getState().user.loggedIn).toBe(true);
    expect(store.getState().user.jwt).toBe("token-abc");
  });

  it("login thunk sets error detail on failure", async () => {
    mockHttp.mockRejectedValue({
      response: { data: { detail: "LOGIN_BAD_CREDENTIALS" } },
    });
    const store = setupStore();

    await store.dispatch(login({ language: "en" }));

    expect(store.getState().user.loggedIn).toBe(false);
    expect(store.getState().user.error).toEqual({
      active: true,
      code: "LOGIN_BAD_CREDENTIALS",
    });
  });

  it("renewJwt thunk rejects when no credentials are stored", async () => {
    const store = setupStore();

    await store.dispatch(renewJwt({ language: "en" }));

    expect(mockHttp).not.toHaveBeenCalled();
    expect(store.getState().user.error).toEqual({
      active: true,
      code: "No credentials found",
    });
  });

  it("renewJwt thunk logs in with stored cookies", async () => {
    mockCookieGet.mockReturnValue("stored-value");
    mockHttp.mockResolvedValue({
      status: 200,
      data: { access_token: "renewed-token" },
    });
    const store = setupStore();

    await store.dispatch(renewJwt({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "POST",
      path: "/auth/jwt/login",
      body: "username=stored-value&password=stored-value",
      language: "en",
    });
    expect(store.getState().user.loggedIn).toBe(true);
    expect(store.getState().user.jwt).toBe("renewed-token");
  });

  it("register thunk logs the user in after successful registration", async () => {
    mockHttp
      .mockResolvedValueOnce({ status: 201, data: {} })
      .mockResolvedValueOnce({
        status: 200,
        data: { access_token: "fresh-token" },
      });
    const store = setupStore();
    store.dispatch(setFirstName("Jane"));
    store.dispatch(setLastName("Doe"));
    store.dispatch(setEmail("jane@example.com"));
    store.dispatch(setPassword("secret"));

    await store.dispatch(register({ language: "en" }));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockHttp).toHaveBeenCalledTimes(2);
    expect(mockHttp.mock.calls[0][0]).toEqual({
      method: "POST",
      path: "/auth/register",
      body: {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane@example.com",
        password: "secret",
      },
      language: "en",
    });
    expect(store.getState().user.loggedIn).toBe(true);
    expect(store.getState().user.jwt).toBe("fresh-token");
  });

  it("register thunk sets error on failure without logging in", async () => {
    mockHttp.mockRejectedValue({
      response: { data: { detail: "REGISTER_INVALID" } },
    });
    const store = setupStore();

    await store.dispatch(register({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledTimes(1);
    expect(store.getState().user.loggedIn).toBe(false);
    expect(store.getState().user.error).toEqual({
      active: true,
      code: "REGISTER_INVALID",
    });
  });

  it("fetchUserProfile thunk stores the profile", async () => {
    mockHttp.mockResolvedValue({
      status: 200,
      data: {
        is_superuser: false,
        first_name: "Jane",
        last_name: "Doe",
        email: "jane@example.com",
      },
    });
    const store = setupStore();

    await store.dispatch(fetchUserProfile({ language: "en", jwt: "token" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/users/me",
      language: "en",
      jwt: "token",
    });
    expect(store.getState().user.user.firstName).toBe("Jane");
  });

  it("updateUserProfile thunk omits empty password from the body", async () => {
    mockHttp.mockResolvedValue({
      status: 200,
      data: {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane@example.com",
      },
    });
    const store = setupStore();

    await store.dispatch(
      updateUserProfile({
        language: "en",
        jwt: "token",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
      })
    );

    expect(mockHttp).toHaveBeenCalledWith({
      method: "PATCH",
      path: "/users/me",
      body: { first_name: "Jane", last_name: "Doe", email: "jane@example.com" },
      language: "en",
      jwt: "token",
    });
  });

  it("updateUserProfile thunk includes a provided password", async () => {
    mockHttp.mockResolvedValue({ status: 200, data: {} });
    const store = setupStore();

    await store.dispatch(
      updateUserProfile({
        language: "en",
        jwt: "token",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        password: "new-secret",
      })
    );

    expect(mockHttp.mock.calls[0][0].body).toEqual({
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@example.com",
      password: "new-secret",
    });
  });

  it("logout thunk clears the session", async () => {
    mockHttp.mockResolvedValue({ data: {} });
    const store = setupStore();
    store.dispatch(
      login.fulfilled(
        { status: 200, data: { access_token: "token-abc" } },
        "request-id",
        { language: "en" }
      )
    );
    expect(store.getState().user.loggedIn).toBe(true);

    await store.dispatch(logout({ language: "en", jwt: "token-abc" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "POST",
      path: "/auth/jwt/logout",
      language: "en",
      jwt: "token-abc",
    });
    expect(store.getState().user.loggedIn).toBe(false);
    expect(store.getState().user.jwt).toBe("");
  });
});
