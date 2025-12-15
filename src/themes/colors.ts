import { ThemeColors, ColorMode } from '../types/theme';

export const lightColors: ThemeColors = {
  background: '#ffffff',
  backgroundSecondary: '#f8f9fa',
  text: '#1a1a2e',
  textSecondary: '#6c757d',
  primary: '#4361ee',
  primaryLight: '#e8ecff',
  accent: '#f72585',
  border: '#e9ecef',
  divider: '#dee2e6',
  highlight: '#fff3cd',
  highlightText: '#856404',
};

export const darkColors: ThemeColors = {
  background: '#1a1a2e',
  backgroundSecondary: '#16213e',
  text: '#f8f9fa',
  textSecondary: '#adb5bd',
  primary: '#4cc9f0',
  primaryLight: '#1a3a4a',
  accent: '#f72585',
  border: '#2d3748',
  divider: '#4a5568',
  highlight: '#2d3a1f',
  highlightText: '#98c379',
};

export function getColors(colorMode: ColorMode): ThemeColors {
  return colorMode === 'light' ? lightColors : darkColors;
}
