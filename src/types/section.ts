export type SectionType = 'hero' | 'text' | 'image' | 'highlight' | 'divider';

export interface BaseSection {
  id: string;
  type: SectionType;
}

export interface HeroSection extends BaseSection {
  type: 'hero';
  title: string;
  subtitle: string;
}

export interface TextSection extends BaseSection {
  type: 'text';
  content: string;
  heading?: string;
}

export interface ImageSection extends BaseSection {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface HighlightSection extends BaseSection {
  type: 'highlight';
  content: string;
  author?: string;
}

export interface DividerSection extends BaseSection {
  type: 'divider';
  style: 'line' | 'dots' | 'space';
}

export type Section =
  | HeroSection
  | TextSection
  | ImageSection
  | HighlightSection
  | DividerSection;

export function createSection(type: SectionType): Section {
  const id = crypto.randomUUID();

  switch (type) {
    case 'hero':
      return { id, type, title: '', subtitle: '' };
    case 'text':
      return { id, type, content: '', heading: '' };
    case 'image':
      return { id, type, src: '', alt: '', caption: '' };
    case 'highlight':
      return { id, type, content: '', author: '' };
    case 'divider':
      return { id, type, style: 'line' };
  }
}
