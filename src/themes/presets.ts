import { PresetConfig, StylePreset } from '../types/theme';

export const presets: Record<StylePreset, PresetConfig> = {
  minimal: {
    name: 'Minimal',
    nameHe: 'מינימלי',
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      headingFontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      baseFontSize: '16px',
      lineHeight: '1.7',
      headingLineHeight: '1.3',
    },
    spacing: {
      section: '3rem',
      element: '1.5rem',
      content: '1rem',
    },
    layout: {
      maxWidth: '720px',
      borderRadius: '4px',
      boxShadow: 'none',
    },
  },
  modern: {
    name: 'Modern',
    nameHe: 'מודרני',
    typography: {
      fontFamily: "'Rubik', -apple-system, BlinkMacSystemFont, sans-serif",
      headingFontFamily: "'Rubik', -apple-system, BlinkMacSystemFont, sans-serif",
      baseFontSize: '17px',
      lineHeight: '1.8',
      headingLineHeight: '1.25',
    },
    spacing: {
      section: '4rem',
      element: '2rem',
      content: '1.25rem',
    },
    layout: {
      maxWidth: '800px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    },
  },
  elegant: {
    name: 'Elegant',
    nameHe: 'אלגנטי',
    typography: {
      fontFamily: "'David Libre', 'Times New Roman', serif",
      headingFontFamily: "'Playfair Display', 'David Libre', serif",
      baseFontSize: '18px',
      lineHeight: '1.9',
      headingLineHeight: '1.2',
    },
    spacing: {
      section: '5rem',
      element: '2.5rem',
      content: '1.5rem',
    },
    layout: {
      maxWidth: '760px',
      borderRadius: '0',
      boxShadow: 'none',
    },
  },
  creative: {
    name: 'Creative',
    nameHe: 'יצירתי',
    typography: {
      fontFamily: "'Heebo', -apple-system, BlinkMacSystemFont, sans-serif",
      headingFontFamily: "'Secular One', 'Heebo', sans-serif",
      baseFontSize: '17px',
      lineHeight: '1.75',
      headingLineHeight: '1.15',
    },
    spacing: {
      section: '4.5rem',
      element: '2rem',
      content: '1.25rem',
    },
    layout: {
      maxWidth: '900px',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    },
  },
};

export function getPreset(preset: StylePreset): PresetConfig {
  return presets[preset];
}
