import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

// Nos dictionnaires de traduction
const translations = {
  fr: {
    navHome: "Accueil", navHotels: "Hôtels", navLogin: "Connexion", navLogout: "Déconnexion",
    homeTitle: "Trouvez votre séjour parfait", homeSearch: "Rechercher par ville...", homeBtn: "Rechercher",
    registerTitle: "Inscription", registerBtn: "S'inscrire", email: "Email", password: "Mot de passe"
  },
  en: {
    navHome: "Home", navHotels: "Hotels", navLogin: "Login", navLogout: "Logout",
    homeTitle: "Find Your Perfect Stay", homeSearch: "Search by city...", homeBtn: "Search",
    registerTitle: "Register", registerBtn: "Sign Up", email: "Email", password: "Password"
  },
  ar: {
    navHome: "الرئيسية", navHotels: "الفنادق", navLogin: "تسجيل الدخول", navLogout: "خروج",
    homeTitle: "ابحث عن إقامتك المثالية", homeSearch: "ابحث حسب المدينة...", homeBtn: "بحث",
    registerTitle: "تسجيل", registerBtn: "إنشاء حساب", email: "بريد إلكتروني", password: "كلمة المرور"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('fr');

  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);