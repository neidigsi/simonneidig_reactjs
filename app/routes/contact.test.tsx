import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import Contact from "@/routes/contact";
import contactReducer from "@/store/slices/contactSlice";
import userReducer from "@/store/slices/userSlice";
import settingsReducer from "@/store/slices/settingsSlice";

jest.mock("react-i18next", () => {
  const actual = jest.requireActual("react-i18next");
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: { language: "en", changeLanguage: jest.fn() },
    }),
  };
});

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

jest.mock("@/components/routes/contact/contactForm", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-contact-form" />,
}));

jest.mock("@/components/routes/contact/sendingConfirmation", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-sending-confirmation" />,
}));

jest.mock("@/components/routes/contact/contactMessagesTable", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-contact-messages-table" />,
}));

jest.mock("@/assets/css/main.css", () => ({}));

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

const baseUserState = {
  loaded: true,
  loggedIn: false,
  jwt: "",
  error: { active: false, code: "" },
  user: { firstName: "", lastName: "", email: "", password: "", repeatPassword: "", isSuperUser: false },
};

function makeStore(contactOverrides = {}, userOverrides = {}) {
  return configureStore({
    reducer: { contact: contactReducer, user: userReducer, settings: settingsReducer },
    preloadedState: {
      contact: { ...baseContactState, ...contactOverrides },
      user: { ...baseUserState, ...userOverrides },
      settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
    },
  });
}

function renderContact(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/contact"]}>
        <Contact />
      </MemoryRouter>
    </Provider>
  );
}

describe("Contact route", () => {
  it("sets the document title and shows the contact form by default", () => {
    renderContact(makeStore());
    expect(document.title).toBe("main.contact.title | Simon Neidig");
    expect(screen.getByText("main.contact.title")).toBeInTheDocument();
    expect(screen.getByTestId("mock-contact-form")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-sending-confirmation")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-contact-messages-table")).not.toBeInTheDocument();
  });

  it("shows the sending confirmation after a successful send", () => {
    renderContact(makeStore({ sentSuccessfully: true }));
    expect(screen.getByTestId("mock-sending-confirmation")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-contact-form")).not.toBeInTheDocument();
  });

  it("shows the admin messages table for logged-in superusers", () => {
    renderContact(
      makeStore({}, { loggedIn: true, user: { ...baseUserState.user, isSuperUser: true } })
    );
    expect(screen.getByTestId("mock-contact-messages-table")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-contact-form")).not.toBeInTheDocument();
  });

  it("shows the regular form for logged-in users without admin rights", () => {
    renderContact(makeStore({}, { loggedIn: true }));
    expect(screen.getByTestId("mock-contact-form")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-contact-messages-table")).not.toBeInTheDocument();
  });
});
