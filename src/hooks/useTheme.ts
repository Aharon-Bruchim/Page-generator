import { useMemo } from 'react';
import { createTheme, themeToCSSVariables } from '../themes';
import { StylePreset, ColorMode, Theme } from '../types';

export function useTheme(preset: StylePreset, colorMode: ColorMode) {
  const theme = useMemo(() => createTheme(preset, colorMode), [preset, colorMode]);

  const cssVariables = useMemo(() => themeToCSSVariables(theme), [theme]);

  const applyTheme = (element: HTMLElement | null) => {
    if (!element) return;

    Object.entries(cssVariables).forEach(([key, value]) => {
      element.style.setProperty(key, value);
    });
  };

  return { theme, cssVariables, applyTheme };
}

export function useThemeStyles(theme: Theme): React.CSSProperties {
  return useMemo(() => {
    const vars = themeToCSSVariables(theme);
    const styles: Record<string, string> = {};

    Object.entries(vars).forEach(([key, value]) => {
      styles[key] = value;
    });

    return styles as React.CSSProperties;
  }, [theme]);
}
