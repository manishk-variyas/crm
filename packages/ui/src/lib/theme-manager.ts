/**
 * Theme Manager - Dynamic theming for the CRM application
 * Manages accent colors, font sizes, font families, and dark/light mode
 * Used by ThemeProvider to apply CSS variables based on store state
 */
import { AccentColor, FontFamily, FontSize, ThemeMode } from '@crm/store';

/** Accent color configurations (HSL values for CSS variables) */
export const accentColors: Record<AccentColor, { primary: string; ring: string; foreground: string }> = {
  indigo: { primary: '239 84% 67%', ring: '239 84% 67%', foreground: '0 0% 100%' },
  blue: { primary: '221 83% 53%', ring: '221 83% 53%', foreground: '0 0% 100%' },
  emerald: { primary: '142 71% 45%', ring: '142 71% 45%', foreground: '0 0% 100%' },
  rose: { primary: '347 77% 50%', ring: '347 77% 50%', foreground: '0 0% 100%' },
  amber: { primary: '38 92% 50%', ring: '38 92% 50%', foreground: '0 0% 100%' },
  slate: { primary: '215 25% 27%', ring: '215 25% 27%', foreground: '0 0% 100%' },
};

/** Font size mappings to pixel values */
export const fontSizes: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

interface ThemeSettings {
  theme: ThemeMode;
  accentColor: AccentColor;
  fontSize: FontSize;
  fontFamily: FontFamily;
}

/**
 * Applies theme settings to the document root
 * Sets CSS custom properties for dynamic styling
 * @param theme - Theme mode: 'light', 'dark', or 'system'
 * @param accentColor - Selected accent color
 * @param fontSize - Font size preference
 * @param fontFamily - Font family preference
 */
export function applyTheme({ theme, accentColor, fontSize, fontFamily }: ThemeSettings) {
  const root = document.documentElement;
  
  // Apply Dark Mode
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Apply Accent Color
  const colors = accentColors[accentColor];
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--primary-foreground', colors.foreground);
  root.style.setProperty('--ring', colors.ring);

  // Apply Font Size
  root.style.setProperty('font-size', fontSizes[fontSize]);

  // Apply Font Family
  root.style.setProperty('--font-sans', `"${fontFamily}", sans-serif`);
}
