import ger from "./ger.json";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = { ger: { translation: ger } };

if (!i18next.language) {
  i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    fallbackLng: "ger",
    debug: true,
    resources,
    lng: "ger",
  });
}

export default i18next;
