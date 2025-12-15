import { Section } from './section';
import { StylePreset, ColorMode } from './theme';

export interface Page {
  id: string;
  title: string;
  sections: Section[];
}

export interface Document {
  id: string;
  title: string;
  pages: Page[];
  stylePreset: StylePreset;
  colorMode: ColorMode;
  createdAt: Date;
}

export function createPage(title: string = 'דף חדש'): Page {
  return {
    id: crypto.randomUUID(),
    title,
    sections: [],
  };
}

export function createDocument(): Document {
  return {
    id: crypto.randomUUID(),
    title: 'מסמך חדש',
    pages: [createPage('דף ראשי')],
    stylePreset: 'modern',
    colorMode: 'light',
    createdAt: new Date(),
  };
}
