// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import reducer, {
  setName,
  setEmail,
  setMessage,
  resetContact,
  resetContactStatus,
  sendMessage,
  fetchMessages,
} from "@/store/slices/contactSlice";
import userReducer, {
  login,
  setFirstName,
  setLastName,
  setEmail as setUserEmail,
} from "@/store/slices/userSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockHttp = http as jest.Mock;

interface ContactTestMessage {
  name: string;
  email: string;
  message: string;
  creation_date: string;
  lang: string;
}

interface ContactTestState {
  loaded: boolean;
  name: string;
  email: string;
  message: string;
  sentSuccessfully: boolean;
  messages: ContactTestMessage[];
  messagesLoaded: boolean;
  messagesLoading: boolean;
  error: string | null;
}

const getInitialState = (): ContactTestState => ({
  loaded: true,
  name: "",
  email: "",
  message: "",
  sentSuccessfully: false,
  messages: [],
  messagesLoaded: false,
  messagesLoading: false,
  error: null,
});

describe("contactSlice reducers", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(getInitialState());
  });

  it("sets name, email and message fields", () => {
    let state = getInitialState();
    state = reducer(state, setName("Jane Doe"));
    state = reducer(state, setEmail("jane@example.com"));
    state = reducer(state, setMessage("Hello!"));
    expect(state.name).toBe("Jane Doe");
    expect(state.email).toBe("jane@example.com");
    expect(state.message).toBe("Hello!");
  });

  it("resetContact clears the form", () => {
    const prev = {
      ...getInitialState(),
      name: "Jane",
      email: "jane@example.com",
      message: "Hi",
      sentSuccessfully: true,
      loaded: false,
      error: "some error",
    };
    expect(reducer(prev, resetContact())).toEqual(getInitialState());
  });

  it("resetContactStatus only clears the sent flag", () => {
    const prev = {
      ...getInitialState(),
      name: "Jane",
      sentSuccessfully: true,
    };
    const next = reducer(prev, resetContactStatus());
    expect(next.sentSuccessfully).toBe(false);
    expect(next.name).toBe("Jane");
  });
});

describe("contactSlice extraReducers", () => {
  it("sendMessage.pending sets loaded false and clears error", () => {
    const next = reducer(
      { ...getInitialState(), error: "old" },
      sendMessage.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
    expect(next.error).toBeNull();
  });

  it("sendMessage.fulfilled marks the message as sent", () => {
    const next = reducer(
      { ...getInitialState(), loaded: false },
      sendMessage.fulfilled(
        { status: 201, data: {} },
        "request-id",
        { language: "en" }
      )
    );
    expect(next.sentSuccessfully).toBe(true);
    expect(next.loaded).toBe(true);
    expect(next.error).toBeNull();
  });

  it("sendMessage.rejected stores the error", () => {
    const next = reducer(
      getInitialState(),
      sendMessage.rejected(
        new Error("failed"),
        "request-id",
        { language: "en" },
        "Failed to send message"
      )
    );
    expect(next.loaded).toBe(true);
    expect(next.sentSuccessfully).toBe(false);
    expect(next.error).toBe("Failed to send message");
  });

  it("fetchMessages.pending sets messagesLoading", () => {
    const next = reducer(
      getInitialState(),
      fetchMessages.pending("request-id", { language: "en", jwt: "token" })
    );
    expect(next.messagesLoading).toBe(true);
  });

  it("fetchMessages.fulfilled stores messages on status 200", () => {
    const messages = [
      {
        name: "Jane",
        email: "jane@example.com",
        message: "Hi",
        creation_date: "2024-01-01",
        lang: "en",
      },
    ];
    const next = reducer(
      { ...getInitialState(), messagesLoading: true },
      fetchMessages.fulfilled(
        { status: 200, data: messages },
        "request-id",
        { language: "en", jwt: "token" }
      )
    );
    expect(next.messagesLoading).toBe(false);
    expect(next.messagesLoaded).toBe(true);
    expect(next.messages).toEqual(messages);
  });

  it("fetchMessages.fulfilled keeps messages on non-200 status", () => {
    const prev = { ...getInitialState(), messagesLoading: true };
    const next = reducer(
      prev,
      fetchMessages.fulfilled(
        { status: 500, data: null },
        "request-id",
        { language: "en", jwt: "token" }
      )
    );
    expect(next.messagesLoading).toBe(false);
    expect(next.messagesLoaded).toBe(true);
    expect(next.messages).toEqual([]);
  });

  it("fetchMessages.rejected resets loading flags", () => {
    const next = reducer(
      { ...getInitialState(), messagesLoading: true },
      fetchMessages.rejected(new Error("failed"), "request-id", {
        language: "en",
        jwt: "token",
      })
    );
    expect(next.messagesLoading).toBe(false);
    expect(next.messagesLoaded).toBe(true);
  });
});

describe("contactSlice thunks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupStore = () =>
    configureStore({ reducer: { contact: reducer, user: userReducer } });

  it("sendMessage thunk uses form data when logged out", async () => {
    mockHttp.mockResolvedValue({ status: 201, data: {} });
    const store = setupStore();
    store.dispatch(setName("Jane Doe"));
    store.dispatch(setEmail("jane@example.com"));
    store.dispatch(setMessage("Hello!"));

    await store.dispatch(sendMessage({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "POST",
      path: "/contact/",
      body: JSON.stringify({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Hello!",
      }),
      language: "en",
    });
    expect(store.getState().contact.sentSuccessfully).toBe(true);
  });

  it("sendMessage thunk uses user data when logged in", async () => {
    mockHttp.mockResolvedValue({ status: 201, data: {} });
    const store = setupStore();
    store.dispatch(setFirstName("Jane"));
    store.dispatch(setLastName("Doe"));
    store.dispatch(setUserEmail("jane@example.com"));
    store.dispatch(
      login.fulfilled(
        { status: 200, data: { access_token: "token" } },
        "request-id",
        { language: "en" }
      )
    );
    store.dispatch(setMessage("Hello from user!"));

    await store.dispatch(sendMessage({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "POST",
      path: "/contact/",
      body: JSON.stringify({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Hello from user!",
      }),
      language: "en",
    });
  });

  it("sendMessage thunk stores the error on failure", async () => {
    mockHttp.mockRejectedValue({
      response: { data: { detail: "SEND_FAILED" } },
    });
    const store = setupStore();

    await store.dispatch(sendMessage({ language: "en" }));

    expect(store.getState().contact.sentSuccessfully).toBe(false);
    expect(store.getState().contact.error).toBe("SEND_FAILED");
  });

  it("fetchMessages thunk loads messages", async () => {
    const messages = [
      {
        name: "Jane",
        email: "jane@example.com",
        message: "Hi",
        creation_date: "2024-01-01",
        lang: "en",
      },
    ];
    mockHttp.mockResolvedValue({ status: 200, data: messages });
    const store = setupStore();

    await store.dispatch(fetchMessages({ language: "en", jwt: "token" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/contact/",
      language: "en",
      jwt: "token",
    });
    expect(store.getState().contact.messages).toEqual(messages);
    expect(store.getState().contact.messagesLoaded).toBe(true);
  });
});
