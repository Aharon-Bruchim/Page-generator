// ==================== Section Types ====================

export type SectionType =
  // Basic sections (existing)
  | 'hero'
  | 'text'
  | 'image'
  | 'highlight'
  | 'divider'
  // Interactive sections
  | 'accordion'
  | 'tabs'
  // Content sections
  | 'timeline'
  | 'teamCards'
  | 'testimonials'
  | 'featureList'
  // Media sections
  | 'gallery'
  | 'videoEmbed'
  | 'mapEmbed'
  // Conversion sections
  | 'stats'
  | 'pricingTable'
  | 'ctaButton';

// Section categories for UI organization
export type SectionCategory =
  | 'basic'
  | 'interactive'
  | 'content'
  | 'media'
  | 'conversion';

// Section metadata for registry
export interface SectionMeta {
  type: SectionType;
  label: string;
  labelHe: string;
  icon: string;
  category: SectionCategory;
  description?: string;
  descriptionHe?: string;
}

// ==================== Base Section ====================

export interface BaseSection {
  id: string;
  type: SectionType;
}

// ==================== Basic Sections (Existing) ====================

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

// ==================== Interactive Sections ====================

// Accordion Section
export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  isOpen?: boolean;
}

export interface AccordionSection extends BaseSection {
  type: 'accordion';
  items: AccordionItem[];
  allowMultiple: boolean;
}

// Tabs Section
export interface TabItem {
  id: string;
  label: string;
  content: string;
}

export interface TabsSection extends BaseSection {
  type: 'tabs';
  tabs: TabItem[];
  activeTabId?: string;
  variant: 'horizontal' | 'vertical';
}

// ==================== Content Sections ====================

// Timeline Section
export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: string;
}

export interface TimelineSection extends BaseSection {
  type: 'timeline';
  items: TimelineItem[];
  variant: 'alternating' | 'left' | 'right';
}

// Team Cards Section
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TeamCardsSection extends BaseSection {
  type: 'teamCards';
  members: TeamMember[];
  columns: 2 | 3 | 4;
  showBio: boolean;
}

// Testimonials Section
export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  authorPhoto?: string;
  rating?: number;
}

export interface TestimonialsSection extends BaseSection {
  type: 'testimonials';
  testimonials: Testimonial[];
  variant: 'cards' | 'carousel' | 'single';
}

// Feature List Section
export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FeatureListSection extends BaseSection {
  type: 'featureList';
  features: FeatureItem[];
  columns: 1 | 2 | 3;
  iconPosition: 'top' | 'left';
}

// ==================== Media Sections ====================

// Gallery Section
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

export interface GallerySection extends BaseSection {
  type: 'gallery';
  images: GalleryImage[];
  columns: 2 | 3 | 4;
  enableLightbox: boolean;
}

// Video Embed Section
export interface VideoEmbedSection extends BaseSection {
  type: 'videoEmbed';
  url: string;
  provider: 'youtube' | 'vimeo' | 'custom';
  title?: string;
  autoplay?: boolean;
  showControls: boolean;
  aspectRatio: '16:9' | '4:3' | '1:1';
}

// Map Embed Section
export interface MapEmbedSection extends BaseSection {
  type: 'mapEmbed';
  address?: string;
  coordinates?: { lat: number; lng: number };
  zoom: number;
  height: number;
  showMarker: boolean;
}

// ==================== Conversion Sections ====================

// Stats Section
export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: string;
}

export interface StatsSection extends BaseSection {
  type: 'stats';
  items: StatItem[];
  animate: boolean;
  columns: 2 | 3 | 4;
}

// Pricing Table Section
export interface PricingFeature {
  id: string;
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  isHighlighted: boolean;
  ctaText: string;
  ctaUrl?: string;
}

export interface PricingTableSection extends BaseSection {
  type: 'pricingTable';
  plans: PricingPlan[];
  currency?: string;
}

// CTA Button Section
export interface CTAButtonSection extends BaseSection {
  type: 'ctaButton';
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  alignment: 'left' | 'center' | 'right';
  icon?: string;
}

// ==================== Union Type ====================

export type Section =
  // Basic
  | HeroSection
  | TextSection
  | ImageSection
  | HighlightSection
  | DividerSection
  // Interactive
  | AccordionSection
  | TabsSection
  // Content
  | TimelineSection
  | TeamCardsSection
  | TestimonialsSection
  | FeatureListSection
  // Media
  | GallerySection
  | VideoEmbedSection
  | MapEmbedSection
  // Conversion
  | StatsSection
  | PricingTableSection
  | CTAButtonSection;

// ==================== Section Registry ====================

export const SECTION_REGISTRY: Record<SectionType, SectionMeta> = {
  // Basic
  hero: {
    type: 'hero',
    label: 'Hero',
    labelHe: 'כותרת ראשית',
    icon: '🎯',
    category: 'basic',
    descriptionHe: 'כותרת וכותרת משנה בולטות',
  },
  text: {
    type: 'text',
    label: 'Text',
    labelHe: 'טקסט',
    icon: '📝',
    category: 'basic',
    descriptionHe: 'פסקת טקסט עם כותרת אופציונלית',
  },
  image: {
    type: 'image',
    label: 'Image',
    labelHe: 'תמונה',
    icon: '🖼️',
    category: 'basic',
    descriptionHe: 'תמונה עם כיתוב',
  },
  highlight: {
    type: 'highlight',
    label: 'Highlight',
    labelHe: 'הדגשה',
    icon: '💡',
    category: 'basic',
    descriptionHe: 'ציטוט או טקסט מודגש',
  },
  divider: {
    type: 'divider',
    label: 'Divider',
    labelHe: 'מפריד',
    icon: '➖',
    category: 'basic',
    descriptionHe: 'קו מפריד בין אזורים',
  },

  // Interactive
  accordion: {
    type: 'accordion',
    label: 'Accordion',
    labelHe: 'אקורדיון',
    icon: '📋',
    category: 'interactive',
    descriptionHe: 'רשימה מתקפלת של שאלות ותשובות',
  },
  tabs: {
    type: 'tabs',
    label: 'Tabs',
    labelHe: 'טאבים',
    icon: '📑',
    category: 'interactive',
    descriptionHe: 'תוכן מחולק לכרטיסיות',
  },

  // Content
  timeline: {
    type: 'timeline',
    label: 'Timeline',
    labelHe: 'ציר זמן',
    icon: '📅',
    category: 'content',
    descriptionHe: 'תצוגת אירועים על ציר זמן',
  },
  teamCards: {
    type: 'teamCards',
    label: 'Team Cards',
    labelHe: 'כרטיסי צוות',
    icon: '👥',
    category: 'content',
    descriptionHe: 'הצגת חברי צוות עם תמונות',
  },
  testimonials: {
    type: 'testimonials',
    label: 'Testimonials',
    labelHe: 'המלצות',
    icon: '💬',
    category: 'content',
    descriptionHe: 'ציטוטים והמלצות מלקוחות',
  },
  featureList: {
    type: 'featureList',
    label: 'Feature List',
    labelHe: 'רשימת פיצ\'רים',
    icon: '✅',
    category: 'content',
    descriptionHe: 'רשימת יתרונות עם אייקונים',
  },

  // Media
  gallery: {
    type: 'gallery',
    label: 'Gallery',
    labelHe: 'גלריה',
    icon: '🖼️',
    category: 'media',
    descriptionHe: 'גריד תמונות עם תצוגה מוגדלת',
  },
  videoEmbed: {
    type: 'videoEmbed',
    label: 'Video',
    labelHe: 'וידאו',
    icon: '🎬',
    category: 'media',
    descriptionHe: 'הטמעת סרטון YouTube או Vimeo',
  },
  mapEmbed: {
    type: 'mapEmbed',
    label: 'Map',
    labelHe: 'מפה',
    icon: '📍',
    category: 'media',
    descriptionHe: 'מפת Google עם מיקום',
  },

  // Conversion
  stats: {
    type: 'stats',
    label: 'Stats',
    labelHe: 'סטטיסטיקות',
    icon: '📊',
    category: 'conversion',
    descriptionHe: 'מספרים גדולים עם אנימציה',
  },
  pricingTable: {
    type: 'pricingTable',
    label: 'Pricing Table',
    labelHe: 'טבלת מחירים',
    icon: '💰',
    category: 'conversion',
    descriptionHe: 'השוואת חבילות ומחירים',
  },
  ctaButton: {
    type: 'ctaButton',
    label: 'CTA Button',
    labelHe: 'כפתור פעולה',
    icon: '🔘',
    category: 'conversion',
    descriptionHe: 'כפתור בולט להנעה לפעולה',
  },
};

// ==================== Helper Functions ====================

export function getSectionsByCategory(category: SectionCategory): SectionMeta[] {
  return Object.values(SECTION_REGISTRY).filter(s => s.category === category);
}

export function getSectionMeta(type: SectionType): SectionMeta {
  return SECTION_REGISTRY[type];
}

export function getAllCategories(): SectionCategory[] {
  return ['basic', 'interactive', 'content', 'media', 'conversion'];
}

export const CATEGORY_LABELS: Record<SectionCategory, { label: string; labelHe: string; icon: string }> = {
  basic: { label: 'Basic', labelHe: 'בסיסי', icon: '📄' },
  interactive: { label: 'Interactive', labelHe: 'אינטראקטיבי', icon: '🎮' },
  content: { label: 'Content', labelHe: 'תוכן', icon: '📰' },
  media: { label: 'Media', labelHe: 'מדיה', icon: '🎥' },
  conversion: { label: 'Conversion', labelHe: 'המרה', icon: '🎯' },
};

// ==================== Factory Function ====================

export function createSection(type: SectionType, defaultData?: Partial<Section>): Section {
  const id = crypto.randomUUID();
  const base = { id, ...defaultData };

  switch (type) {
    // Basic sections
    case 'hero':
      return { ...base, type, title: '', subtitle: '' } as HeroSection;
    case 'text':
      return { ...base, type, content: '', heading: '' } as TextSection;
    case 'image':
      return { ...base, type, src: '', alt: '', caption: '' } as ImageSection;
    case 'highlight':
      return { ...base, type, content: '', author: '' } as HighlightSection;
    case 'divider':
      return { ...base, type, style: 'line' } as DividerSection;

    // Interactive sections
    case 'accordion':
      return {
        ...base,
        type,
        items: [{ id: crypto.randomUUID(), title: 'פריט חדש', content: '', isOpen: true }],
        allowMultiple: false,
      } as AccordionSection;

    case 'tabs':
      return {
        ...base,
        type,
        tabs: [
          { id: crypto.randomUUID(), label: 'כרטיסיה 1', content: '' },
          { id: crypto.randomUUID(), label: 'כרטיסיה 2', content: '' },
        ],
        variant: 'horizontal',
      } as TabsSection;

    // Content sections
    case 'timeline':
      return {
        ...base,
        type,
        items: [{ id: crypto.randomUUID(), date: '', title: '', description: '' }],
        variant: 'alternating',
      } as TimelineSection;

    case 'teamCards':
      return {
        ...base,
        type,
        members: [],
        columns: 3,
        showBio: true,
      } as TeamCardsSection;

    case 'testimonials':
      return {
        ...base,
        type,
        testimonials: [],
        variant: 'cards',
      } as TestimonialsSection;

    case 'featureList':
      return {
        ...base,
        type,
        features: [],
        columns: 2,
        iconPosition: 'top',
      } as FeatureListSection;

    // Media sections
    case 'gallery':
      return {
        ...base,
        type,
        images: [],
        columns: 3,
        enableLightbox: true,
      } as GallerySection;

    case 'videoEmbed':
      return {
        ...base,
        type,
        url: '',
        provider: 'youtube',
        showControls: true,
        aspectRatio: '16:9',
      } as VideoEmbedSection;

    case 'mapEmbed':
      return {
        ...base,
        type,
        address: '',
        zoom: 14,
        height: 400,
        showMarker: true,
      } as MapEmbedSection;

    // Conversion sections
    case 'stats':
      return {
        ...base,
        type,
        items: [{ id: crypto.randomUUID(), value: 100, label: 'סטטיסטיקה', suffix: '+' }],
        animate: true,
        columns: 3,
      } as StatsSection;

    case 'pricingTable':
      return {
        ...base,
        type,
        plans: [
          {
            id: crypto.randomUUID(),
            name: 'בסיסי',
            price: '0',
            features: [],
            isHighlighted: false,
            ctaText: 'התחל',
          },
        ],
        currency: '₪',
      } as PricingTableSection;

    case 'ctaButton':
      return {
        ...base,
        type,
        text: 'לחץ כאן',
        url: '#',
        variant: 'primary',
        size: 'medium',
        alignment: 'center',
      } as CTAButtonSection;

    default:
      const _exhaustiveCheck: never = type;
      throw new Error(`Unknown section type: ${type}`);
  }
}
