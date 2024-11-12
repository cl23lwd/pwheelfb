import { useState, useEffect } from 'react';
import { getLanguage, type Language } from '../config/language';

function getBrowserLanguage(): string {
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  return browserLang;
}

export function useLanguage(): Language {
  const [language, setLanguage] = useState<Language>(getLanguage());

  useEffect(() => {
    function updateLanguage() {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      
      if (urlLang) {
        setLanguage(getLanguage(urlLang));
      } else {
        const browserLang = getBrowserLanguage();
        setLanguage(getLanguage(browserLang));
      }
    }

    // Initial update
    updateLanguage();

    // Listen for URL changes
    window.addEventListener('popstate', updateLanguage);
    
    return () => {
      window.removeEventListener('popstate', updateLanguage);
    };
  }, []);

  return language;
}