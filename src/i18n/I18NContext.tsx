import React, { useState, useEffect, FC, useContext, useCallback } from 'react';
import * as RNLocalize from 'react-native-localize';
import { I18NStrings, en } from './en';
import { zh } from './zh';
import { I18nManager } from 'react-native';

const availableTranslations = { en, zh };

const I18NContext = React.createContext<I18NStrings>(en);

export const I18NProvider: FC = ({ children }) => {
  const [translation, setTranslation] = useState(en);

  const updateTranslation = useCallback(() => {
    const fallback = { languageTag: 'en', isRTL: false } as const;
    const { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(['en', 'zh']) || fallback;

    I18nManager.forceRTL(isRTL);
    setTranslation(availableTranslations[languageTag]);
  }, []);

  useEffect(() => {
    updateTranslation();
    RNLocalize.addEventListener('change', updateTranslation);
    return () => {
      RNLocalize.removeEventListener('change', updateTranslation);
    };
  }, [updateTranslation]);

  return (
    <I18NContext.Provider value={translation}>{children}</I18NContext.Provider>
  );
};

export function useI18nStrings() {
  return useContext(I18NContext);
}
