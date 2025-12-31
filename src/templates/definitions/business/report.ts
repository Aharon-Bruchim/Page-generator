import { Template } from '../../../types';

export const reportTemplate: Template = {
  id: 'business-report',
  name: 'Business Report',
  nameHe: 'דוח עסקי',
  description: 'Professional business report template',
  descriptionHe: 'תבנית דוח עסקי מקצועי',
  category: 'business',
  thumbnail: '📈',
  tags: ['דוח', 'סיכום', 'ניתוח', 'עסקי'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 83,
  pages: [
    {
      title: 'דוח עסקי',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'דוח רבעוני',
            subtitle: 'Q[X] 2024',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**תקציר מנהלים**\n\nסיכום קצר של הממצאים העיקריים והמלצות.',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', prefix: '₪', value: 1.2, suffix: 'M', label: 'הכנסות' },
              { id: '2', value: 15, suffix: '%', label: 'צמיחה' },
              { id: '3', value: 850, label: 'לקוחות חדשים' },
              { id: '4', value: 92, suffix: '%', label: 'שביעות רצון' },
            ],
            animate: true,
            columns: 4,
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'solid',
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: 'ביצועים פיננסיים', content: 'ניתוח מפורט של הביצועים הפיננסיים ברבעון.' },
              { id: '2', title: 'פעילות תפעולית', content: 'סיכום הפעילות התפעולית, אתגרים והישגים.' },
              { id: '3', title: 'שיווק ומכירות', content: 'ביצועי השיווק והמכירות, קמפיינים וROI.' },
              { id: '4', title: 'משאבי אנוש', content: 'עדכונים בנוגע לכוח אדם, גיוסים ושימור.' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## מסקנות והמלצות\n\n1. **המלצה ראשונה** - הסבר\n2. **המלצה שנייה** - הסבר\n3. **המלצה שלישית** - הסבר\n\n---\n\n*דוח זה הוכן על ידי [שם] | תאריך: [תאריך]*',
          },
        },
      ],
    },
  ],
};
