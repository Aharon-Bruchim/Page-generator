export type StylePreset = 'minimal' | 'modern' | 'elegant' | 'creative';
export type ColorMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryLight: string;
  accent: string;
  border: string;
  divider: string;
  highlight: string;
  highlightText: string;
}

export interface ThemeTypography {
  fontFamily: string;
  headingFontFamily: string;
  baseFontSize: string;
  lineHeight: string;
  headingLineHeight: string;
}

export interface ThemeSpacing {
  section: string;
  element: string;
  content: string;
}

export interface ThemeLayout {
  maxWidth: string;
  borderRadius: string;
  boxShadow: string;
}

export interface Theme {
  preset: StylePreset;
  colorMode: ColorMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  layout: ThemeLayout;
}

export interface PresetConfig {
  name: string;
  nameHe: string;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  layout: ThemeLayout;
}
