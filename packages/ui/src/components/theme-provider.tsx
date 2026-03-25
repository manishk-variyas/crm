import React, { useEffect } from 'react';
import { useStore, RootStore } from '@crm/store';
import { applyTheme } from '../lib/theme-manager';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useStore((state: RootStore) => state.theme);
  const accentColor = useStore((state: RootStore) => state.accentColor);
  const fontSize = useStore((state: RootStore) => state.fontSize);
  const fontFamily = useStore((state: RootStore) => state.fontFamily);

  useEffect(() => {
    applyTheme({
      theme,
      accentColor,
      fontSize,
      fontFamily
    });

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme({ theme, accentColor, fontSize, fontFamily });
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, accentColor, fontSize, fontFamily]);

  return <>{children}</>;
}
