// Import external dependencies
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import ContactMessagesTable from "@/components/routes/contact/contactMessagesTable";
import contactReducer from "@/store/slices/contactSlice";
import settingsReducer from "@/store/slices/settingsSlice";
import userReducer from "@/store/slices/userSlice";
import { http } from "@/networking/httpRequest";

// Mock react-i18next: prefer defaultValue (used for table labels/page info)
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { defaultValue?: string }) =>
      options?.defaultValue ?? key,
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

const longMessage = "x".repeat(1500);

const mockMessages = [
  {
    name: "Alice",
    email: "alice@example.com",
    message: "Hello there",
    creation_date: "2024-05-01T10:30:00",
    lang: "en",
  },
  {
    name: "Bob",
    email: "bob@example.com",
    message: longMessage,
    creation_date: "",
    lang: null,
  },
  {
    name: "Carol",
    email: "carol@example.com",
    message: null,
    creation_date: "not-a-date",
    lang: "xx",
  },
];

function makeStore(contactOverrides = {}) {
  return configureStore({
    reducer: {
      contact: contactReducer,
      settings: settingsReducer,
      user: userReducer,
    },
    preloadedState: {
      contact: {
        loaded: true,
        name: "",
        email: "",
        message: "",
        sentSuccessfully: false,
        messages: [],
        messagesLoaded: false,
        messagesLoading: false,
        error: null,
        ...contactOverrides,
      },
      settings: {
        language: "en",
        isDarkModeEnabled: false,
        backButtonEnabled: false,
      },
      user: {
        loaded: true,
        loggedIn: false,
        jwt: "test-jwt",
        error: { active: false, code: "" },
        user: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          repeatPassword: "",
          isSuperUser: false,
        },
      },
    },
  });
}

describe("ContactMessagesTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({ status: 200, data: [] });
  });

  /**
   * Test to check if the loading spinner renders while messages load.
   */
  it("renders loading state while fetching", () => {
    const { container } = render(
      <Provider
        store={makeStore({ messagesLoading: true, messagesLoaded: false })}
      >
        <ContactMessagesTable />
      </Provider>
    );

    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });

  /**
   * Test to check if messages render with formatted date, mailto link,
   * truncation, fallbacks and the total count.
   */
  it("renders messages with formatting, fallbacks and count", () => {
    render(
      <Provider
        store={makeStore({
          messages: mockMessages,
          messagesLoaded: true,
        })}
      >
        <ContactMessagesTable />
      </Provider>
    );

    // Total count
    expect(screen.getByText("3")).toBeInTheDocument();

    // Plain message and mailto link
    expect(screen.getByText("Hello there")).toBeInTheDocument();
    const mailLink = screen.getByRole("link", {
      name: "alice@example.com",
    });
    expect(mailLink).toHaveAttribute("href", "mailto:alice@example.com");

    // Formatted date contains the year
    expect(screen.getByText(/2024/)).toBeInTheDocument();

    // Long message is truncated, full text is absent
    expect(screen.queryByText(longMessage)).not.toBeInTheDocument();
    expect(document.body.textContent).toContain(`${"x".repeat(1000)}...`);

    // Fallback dashes: missing/invalid dates, missing language
    expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(3);

    // Unknown language code falls back to uppercased code
    expect(screen.getByText("XX")).toBeInTheDocument();
  });

  /**
   * Test to check if the empty state renders when there are no messages.
   */
  it("renders empty state when no messages exist", () => {
    render(
      <Provider store={makeStore({ messages: [], messagesLoaded: true })}>
        <ContactMessagesTable />
      </Provider>
    );

    expect(screen.getByText("No data available")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  /**
   * Test to check if messages are fetched on mount when not loaded yet.
   */
  it("fetches messages on mount when not loaded", async () => {
    mockHttp.mockResolvedValue({ status: 200, data: mockMessages });

    render(
      <Provider
        store={makeStore({ messages: [], messagesLoaded: false })}
      >
        <ContactMessagesTable />
      </Provider>
    );

    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(mockHttp).toHaveBeenCalledWith(
      expect.objectContaining({ method: "GET", path: "/contact/" })
    );
  });
});
