import i18n from "@/i18n";
import translationEN from "@/assets/locales/en/translation.json";
import translationDE from "@/assets/locales/de/translation.json";
import translationFR from "@/assets/locales/fr/translation.json";

describe("i18n", () => {
  it("initializes with english as fallback language", () => {
    expect(i18n.isInitialized).toBe(true);
    expect(i18n.options.fallbackLng).toEqual(["en"]);
    expect(i18n.options.interpolation?.escapeValue).toBe(false);
  });

  it("loads english, german and french resource bundles", () => {
    for (const lng of ["en", "de", "fr"]) {
      expect(i18n.hasResourceBundle(lng, "translation")).toBe(true);
    }
  });

  it("exposes the bundled translations per language", () => {
    expect(i18n.getResource("en", "translation", "main.about.title")).toBe(
      translationEN.main.about.title
    );
    expect(i18n.getResource("de", "translation", "main.about.title")).toBe(
      translationDE.main.about.title
    );
    expect(i18n.getResource("fr", "translation", "main.about.title")).toBe(
      translationFR.main.about.title
    );
  });

  it("translates a key after switching language", async () => {
    await i18n.changeLanguage("de");
    expect(i18n.t("main.about.title")).toBe(translationDE.main.about.title);
    await i18n.changeLanguage("en");
    expect(i18n.t("main.about.title")).toBe(translationEN.main.about.title);
  });
});
