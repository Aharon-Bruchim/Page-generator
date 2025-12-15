import { Theme, StylePreset, ColorMode } from '../types/theme';
import { getColors } from './colors';
import { getPreset } from './presets';

export { presets, getPreset } from './presets';
export { lightColors, darkColors, getColors } from './colors';

export function createTheme(preset: StylePreset, colorMode: ColorMode): Theme {
  const presetConfig = getPreset(preset);
  const colors = getColors(colorMode);

  return {
    preset,
    colorMode,
    colors,
    typography: presetConfig.typography,
    spacing: presetConfig.spacing,
    layout: presetConfig.layout,
  };
}

export function themeToCSSVariables(theme: Theme): Record<string, string> {
  return {
    '--color-background': theme.colors.background,
    '--color-background-secondary': theme.colors.backgroundSecondary,
    '--color-text': theme.colors.text,
    '--color-text-secondary': theme.colors.textSecondary,
    '--color-primary': theme.colors.primary,
    '--color-primary-light': theme.colors.primaryLight,
    '--color-accent': theme.colors.accent,
    '--color-border': theme.colors.border,
    '--color-divider': theme.colors.divider,
    '--color-highlight': theme.colors.highlight,
    '--color-highlight-text': theme.colors.highlightText,
    '--font-family': theme.typography.fontFamily,
    '--font-family-heading': theme.typography.headingFontFamily,
    '--font-size-base': theme.typography.baseFontSize,
    '--line-height': theme.typography.lineHeight,
    '--line-height-heading': theme.typography.headingLineHeight,
    '--spacing-section': theme.spacing.section,
    '--spacing-element': theme.spacing.element,
    '--spacing-content': theme.spacing.content,
    '--layout-max-width': theme.layout.maxWidth,
    '--layout-border-radius': theme.layout.borderRadius,
    '--layout-box-shadow': theme.layout.boxShadow,
  };
}

export function generateThemeCSS(theme: Theme): string {
  const vars = themeToCSSVariables(theme);
  const cssVars = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `:root {\n${cssVars}\n}`;
}
