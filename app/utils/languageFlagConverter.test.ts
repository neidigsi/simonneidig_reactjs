// Import internal dependencies
import { getLanguageFlag } from "@/utils/languageFlagConverter";

describe("getLanguageFlag", () => {
  /**
   * Test to check if known ISO 639-1 codes map to the correct flag emoji.
   */
  it("returns flag emoji for known language codes", () => {
    expect(getLanguageFlag("de")).toBe("🇩🇪");
    expect(getLanguageFlag("en")).toBe("🇬🇧");
    expect(getLanguageFlag("fr")).toBe("🇫🇷");
  });

  /**
   * Test to check if code lookup is case-insensitive.
   */
  it("handles uppercase language codes", () => {
    expect(getLanguageFlag("DE")).toBe("🇩🇪");
  });

  /**
   * Test to check if unknown codes fall back to the uppercased code.
   */
  it("returns uppercased code for unknown language codes", () => {
    expect(getLanguageFlag("es")).toBe("ES");
  });

  /**
   * Test to check if missing values return a placeholder instead of crashing.
   * Records without a language association reach the table with null/undefined.
   */
  it.each([null, undefined, ""])(
    "returns placeholder dash for missing value %p",
    (value) => {
      expect(getLanguageFlag(value)).toBe("—");
    }
  );
});
