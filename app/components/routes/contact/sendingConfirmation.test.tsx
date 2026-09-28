// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";

// Import internal dependencies
import SendingConfirmation from "@/components/routes/contact/sendingConfirmation";
import contactReducer from "@/store/slices/contactSlice";
import userReducer from "@/store/slices/userSlice";

// Mock react-i18next: return the key so tests stay locale-independent
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the http layer (import.meta.env is unavailable under Jest)
jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const baseContactState = {
  loaded: true,
  name: "Simon",
  email: "simon@example.com",
  message: "Hello!",
  sentSuccessfully: true,
  messages: [],
  messagesLoaded: false,
  messagesLoading: false,
  error: null,
};

function makeStore(loggedIn: boolean, contactName = "Simon") {
  return configureStore({
    reducer: {
      contact: contactReducer,
      user: userReducer,
    },
    preloadedState: {
      contact: { ...baseContactState, name: contactName },
      user: {
        loaded: true,
        loggedIn,
        jwt: "",
        error: { active: false, code: "" },
        user: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "",
          repeatPassword: "",
          isSuperUser: false,
        },
      },
    },
  });
}

function LocationProbe() {
  const location = useLocation();
  return <span data-testid="location">{location.pathname}</span>;
}

function renderConfirmation(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/contact"]}>
        <LocationProbe />
        <SendingConfirmation />
      </MemoryRouter>
    </Provider>
  );
}

describe("SendingConfirmation Component", () => {
  /**
   * Test to check if the confirmation greets the contact name
   * for logged-out users.
   */
  it("greets contact name when logged out", () => {
    renderConfirmation(makeStore(false));

    expect(
      screen.getByText("main.contact.confirmation.headline, Simon!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("main.contact.confirmation.message")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Successfully sent")).toBeInTheDocument();
  });

  /**
   * Test to check if the confirmation greets the user first name
   * for logged-in users.
   */
  it("greets first name when logged in", () => {
    renderConfirmation(makeStore(true));

    expect(
      screen.getByText("main.contact.confirmation.headline, John!")
    ).toBeInTheDocument();
  });

  /**
   * Test to check if the return-home button navigates to the home page.
   */
  it("navigates home on return-home click", () => {
    renderConfirmation(makeStore(false));

    expect(screen.getByTestId("location")).toHaveTextContent("/contact");

    fireEvent.click(
      screen.getByRole("button", { name: /return-home/i })
    );

    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });

  /**
   * Test to check if the return-to-contact button resets the contact state.
   */
  it("resets contact state on return-to-contact click", () => {
    const store = makeStore(false);
    renderConfirmation(store);

    fireEvent.click(
      screen.getByRole("button", { name: /return-to-contact/i })
    );

    expect(store.getState().contact.name).toBe("");
    expect(store.getState().contact.sentSuccessfully).toBe(false);
    expect(
      screen.getByText("main.contact.confirmation.headline, !")
    ).toBeInTheDocument();
  });
});
