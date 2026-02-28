/**
 * Convert ISO 639-1 language code to corresponding flag emoji
 *
 * @param languageCode - ISO 639-1 language code (e.g., "de", "en", "fr")
 * @returns Flag emoji or original code if not found
 *
 * @example
 * getLanguageFlag("de") // Returns "🇩🇪"
 * getLanguageFlag("en") // Returns "🇬🇧"
 * getLanguageFlag("fr") // Returns "🇫🇷"
 */
export function getLanguageFlag(languageCode: string): string {
  const codeToCountry: Record<string, string> = {
    de: "DE", // Germany
    en: "GB", // United Kingdom (for English)
    fr: "FR", // France
  };

  const countryCode = codeToCountry[languageCode.toLowerCase()];

  if (!countryCode) {
    return languageCode.toUpperCase();
  }

  // Convert country code to regional indicator symbols (flag emoji)
  // Regional indicator symbols: U+1F1E6 to U+1F1FF
  const codePoints = countryCode
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}
