/**
 * Convert ISO 639-1 language code to corresponding flag emoji
 *
 * @param languageCode - ISO 639-1 language code (e.g., "de", "en", "fr").
 *   Missing or empty values yield a placeholder dash since records without
 *   a language association exist.
 * @returns Flag emoji, uppercased code if unknown, or a placeholder dash if missing
 *
 * @example
 * getLanguageFlag("de") // Returns "🇩🇪"
 * getLanguageFlag("en") // Returns "🇬🇧"
 * getLanguageFlag("fr") // Returns "🇫🇷"
 * getLanguageFlag(null) // Returns "—"
 */
export function getLanguageFlag(
  languageCode: string | null | undefined
): string {
  if (!languageCode) {
    return "—";
  }

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
