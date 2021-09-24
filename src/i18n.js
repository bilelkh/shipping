import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const initialState = {
  locale: "fr"
};

const resources = {
  en: {
    translation: {
      autocompletePlaceholder: "countries",
      currentLanguageInputLabel:"language"

    }
  },
  fr: {
    translation: {
      autocompletePlaceholder: "pays",
      currentLanguageInputLabel:"langue"
    }
  }
};
let lang = initialState.locale;
i18next.use(initReactI18next).init({
  resources,
  lng: lang,
  debug: true,
  interpolation: {
    escapeValue: false
  }
});
export default i18next;
