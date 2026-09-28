// Import internal dependencies
import reducer, {
  toggleDarkMode,
  initializeDarkMode,
  changeLanguage,
  setBackButtonEnabled,
} from "@/store/slices/settingsSlice";
import i18n from "@/i18n";

jest.mock("@/i18n", () => ({
  __esModule: true,
  default: { changeLanguage: jest.fn() },
}));

const mockChangeLanguage = i18n.changeLanguage as jest.Mock;

const setMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe("settingsSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    setMatchMedia(false);
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      language: "en",
      isDarkModeEnabled: false,
      backButtonEnabled: false,
    });
  });

  it("toggleDarkMode enables dark mode", () => {
    const next = reducer(
      {
        language: "en",
        isDarkModeEnabled: false,
        backButtonEnabled: false,
      },
      toggleDarkMode()
    );
    expect(next.isDarkModeEnabled).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("toggleDarkMode disables dark mode", () => {
    document.documentElement.classList.add("dark");
    const next = reducer(
      {
        language: "en",
        isDarkModeEnabled: true,
        backButtonEnabled: false,
      },
      toggleDarkMode()
    );
    expect(next.isDarkModeEnabled).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("initializeDarkMode enables dark mode for stored theme dark", () => {
    localStorage.setItem("theme", "dark");
    const next = reducer(
      {
        language: "en",
        isDarkModeEnabled: false,
        backButtonEnabled: false,
      },
      initializeDarkMode()
    );
    expect(next.isDarkModeEnabled).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("initializeDarkMode disables dark mode for stored theme light", () => {
    localStorage.setItem("theme", "light");
    setMatchMedia(true);
    const next = reducer(
      {
        language: "en",
        isDarkModeEnabled: true,
        backButtonEnabled: false,
      },
      initializeDarkMode()
    );
    expect(next.isDarkModeEnabled).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("initializeDarkMode follows system preference when nothing is stored", () => {
    setMatchMedia(true);
    const next = reducer(
      {
        language: "en",
        isDarkModeEnabled: false,
        backButtonEnabled: false,
      },
      initializeDarkMode()
    );
    expect(next.isDarkModeEnabled).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("initializeDarkMode stays light without stored theme and light system", () => {
    const next = reducer(
      {
        language: "en",
        isDarkModeEnabled: false,
        backButtonEnabled: false,
      },
      initializeDarkMode()
    );
    expect(next.isDarkModeEnabled).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("changeLanguage updates language and notifies i18n", () => {
    const next = reducer(
      {
        language: "en",
        isDarkModeEnabled: false,
        backButtonEnabled: false,
      },
      changeLanguage("de")
    );
    expect(next.language).toBe("de");
    expect(mockChangeLanguage).toHaveBeenCalledWith("de");
  });

  it("setBackButtonEnabled toggles the flag", () => {
    const initial = {
      language: "en",
      isDarkModeEnabled: false,
      backButtonEnabled: false,
    };
    expect(reducer(initial, setBackButtonEnabled(true)).backButtonEnabled).toBe(
      true
    );
    expect(
      reducer({ ...initial, backButtonEnabled: true }, setBackButtonEnabled(false))
        .backButtonEnabled
    ).toBe(false);
  });
});
