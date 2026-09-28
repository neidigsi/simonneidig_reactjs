// Import external dependencies
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import ContactForm from "@/components/routes/contact/contactForm";
import contactReducer from "@/store/slices/contactSlice";
import settingsReducer from "@/store/slices/settingsSlice";
import userReducer from "@/store/slices/userSlice";
import { http } from "@/networking/httpRequest";

// Mock react-i18next: return the key so tests stay locale-independent
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the http layer to avoid real API calls
jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

// Mock i18n setup (settingsSlice imports it; real init needs browser APIs)
jest.mock("@/i18n", () => ({
  __esModule: true,
  default: { changeLanguage: jest.fn() },
}));

const mockHttp = http as jest.Mock;

const baseContactState = {
  loaded: true,
  name: "",
  email: "",
  message: "",
  sentSuccessfully: false,
  messages: [],
  messagesLoaded: false,
  messagesLoading: false,
  error: null,
};

const baseSettingsState = {
  language: "en",
  isDarkModeEnabled: false,
  backButtonEnabled: false,
};

const loggedOutUserState = {
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
};

const loggedInUserState = {
  ...loggedOutUserState,
  loggedIn: true,
  user: {
    ...loggedOutUserState.user,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  },
};

function makeStore(contactOverrides = {}, userState = loggedOutUserState) {
  return configureStore({
    reducer: {
      contact: contactReducer,
      settings: settingsReducer,
      user: userReducer,
    },
    preloadedState: {
      contact: { ...baseContactState, ...contactOverrides },
      settings: baseSettingsState,
      user: userState,
    },
  });
}

function renderForm(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <ContactForm />
    </Provider>
  );
}

describe("ContactForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({ status: 200, data: {} });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /**
   * Test to check if name/email/message fields render for logged-out users
   * and the submit button starts disabled.
   */
  it("renders fields and disabled submit for logged-out users", () => {
    renderForm(makeStore());

    expect(
      screen.getByLabelText("main.contact.form.name")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("main.contact.form.email")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("main.contact.form.message")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).toBeDisabled();
  });

  /**
   * Test to check if typing updates Redux state and enables submit
   * once all fields are valid.
   */
  it("enables submit after entering valid name, email and message", () => {
    const store = makeStore();
    renderForm(store);

    fireEvent.change(screen.getByLabelText("main.contact.form.name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText("main.contact.form.email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText("main.contact.form.message"), {
      target: { value: "Hello!" },
    });

    expect(store.getState().contact.name).toBe("Jane");
    expect(store.getState().contact.email).toBe("jane@example.com");
    expect(store.getState().contact.message).toBe("Hello!");
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).not.toBeDisabled();
  });

  /**
   * Test to check if an invalid email shows an error and keeps submit disabled.
   */
  it("shows email error and keeps submit disabled for invalid email", () => {
    renderForm(makeStore());

    fireEvent.change(screen.getByLabelText("main.contact.form.name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText("main.contact.form.email"), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(screen.getByLabelText("main.contact.form.message"), {
      target: { value: "Hello!" },
    });

    expect(
      screen.getByText("main.contact.email-invalid")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).toBeDisabled();
  });

  /**
   * Test to check if no email error shows while the email field is empty.
   */
  it("shows no email error for empty email", () => {
    renderForm(makeStore());

    expect(
      screen.queryByText("main.contact.email-invalid")
    ).not.toBeInTheDocument();
  });

  /**
   * Test to check if submitting dispatches sendMessage via http POST.
   */
  it("sends message on submit click", async () => {
    const store = makeStore({
      name: "Jane",
      email: "jane@example.com",
      message: "Hello!",
    });
    renderForm(store);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await screen.findByText("main.contact.send-success");
    expect(mockHttp).toHaveBeenCalledWith(
      expect.objectContaining({ method: "POST", path: "/contact/" })
    );
  });

  /**
   * Test to check if logged-in users see no name/email fields and can
   * submit with only a message.
   */
  it("hides name/email fields for logged-in users", () => {
    const store = makeStore({}, loggedInUserState);
    renderForm(store);

    expect(
      screen.queryByLabelText("main.contact.form.name")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("main.contact.form.email")
    ).not.toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /submit/i });
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByLabelText("main.contact.form.message"), {
      target: { value: "Hello!" },
    });
    expect(submit).not.toBeDisabled();

    expect(store.getState().contact.message).toBe("Hello!");
  });

  /**
   * Test to check if a pre-existing error shows the failure notification.
   */
  it("shows error notification when sending failed", async () => {
    renderForm(makeStore({ error: "Server exploded" }));

    await screen.findByText("main.contact.send-failed");
    expect(screen.getByText("Server exploded")).toBeInTheDocument();
  });

  /**
   * Test to check if a successful send shows the notification and then
   * resets the contact state after the timeout.
   */
  it("resets contact state after successful send timeout", async () => {
    jest.useFakeTimers();
    const store = makeStore({
      name: "Jane",
      email: "jane@example.com",
      message: "Hello!",
      sentSuccessfully: true,
    });
    renderForm(store);

    // Notification is shown synchronously after mount effects flush
    expect(
      screen.getByText("main.contact.send-success")
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(store.getState().contact.name).toBe("");
    expect(store.getState().contact.message).toBe("");
    expect(store.getState().contact.sentSuccessfully).toBe(false);
  });
});
