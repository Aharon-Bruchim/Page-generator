import { Section, SectionType } from './section';
import { StylePreset, ColorMode } from './theme';

// קטגוריות תבניות
export type TemplateCategory =
  | 'business'
  | 'career'
  | 'education'
  | 'marketing'
  | 'personal';

// מטא-דאטה של קטגוריה
export interface TemplateCategoryMeta {
  id: TemplateCategory;
  name: string;
  nameHe: string;
  icon: string;
  description: string;
  descriptionHe: string;
}

// הגדרת section בתבנית (ללא ID - נוצר בעת החלה)
export interface TemplateSectionConfig {
  type: SectionType;
  defaultData: Omit<Section, 'id' | 'type'>;
}

// הגדרת דף בתבנית
export interface TemplatePageConfig {
  title: string;
  sections: TemplateSectionConfig[];
}

// תבנית מלאה
export interface Template {
  id: string;
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  category: TemplateCategory;
  thumbnail: string;
  tags: string[];
  pages: TemplatePageConfig[];
  suggestedPreset: StylePreset;
  suggestedColorMode: ColorMode;
  popularity?: number;
}

// Registry לתבניות
export interface TemplateRegistry {
  templates: Template[];
  categories: TemplateCategoryMeta[];
}

// מצב פילטרים בגלריה
export interface TemplateFilters {
  category: TemplateCategory | 'all';
  searchQuery: string;
  sortBy: 'name' | 'popularity' | 'category';
}

// הגדרות הקטגוריות
export const TEMPLATE_CATEGORIES: TemplateCategoryMeta[] = [
  {
    id: 'business',
    name: 'Business',
    nameHe: 'עסקי',
    icon: '💼',
    description: 'Professional business documents',
    descriptionHe: 'מסמכים עסקיים מקצועיים',
  },
  {
    id: 'career',
    name: 'Career',
    nameHe: 'קריירה',
    icon: '📋',
    description: 'Resumes and career documents',
    descriptionHe: 'קורות חיים ומסמכי קריירה',
  },
  {
    id: 'education',
    name: 'Education',
    nameHe: 'חינוך',
    icon: '📚',
    description: 'Educational materials and courses',
    descriptionHe: 'חומרי לימוד וקורסים',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    nameHe: 'שיווק',
    icon: '📢',
    description: 'Marketing and promotional content',
    descriptionHe: 'תוכן שיווקי ופרסומי',
  },
  {
    id: 'personal',
    name: 'Personal',
    nameHe: 'אישי',
    icon: '✨',
    description: 'Personal documents and invitations',
    descriptionHe: 'מסמכים אישיים והזמנות',
  },
];
