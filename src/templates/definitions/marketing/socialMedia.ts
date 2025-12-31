import { Template } from '../../../types';

export const socialMediaTemplate: Template = {
  id: 'marketing-social-media',
  name: 'Social Media Post',
  nameHe: 'פוסט לרשתות',
  description: 'Social media content template',
  descriptionHe: 'תבנית תוכן לרשתות חברתיות',
  category: 'marketing',
  thumbnail: '📱',
  tags: ['רשתות חברתיות', 'פוסט', 'אינסטגרם', 'פייסבוק'],
  suggestedPreset: 'creative',
  suggestedColorMode: 'light',
  popularity: 86,
  pages: [
    {
      title: 'פוסט לרשתות',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '📱 תוכן לרשתות חברתיות',
            subtitle: 'קמפיין: [שם הקמפיין]',
          },
        },
        {
          type: 'tabs',
          defaultData: {
            tabs: [
              { id: '1', label: 'אינסטגרם', content: '**Caption:**\n\n[פתיחה מושכת]\n\n[תוכן מרכזי]\n\n[קריאה לפעולה]\n\n.\n.\n.\n#hashtag1 #hashtag2 #hashtag3' },
              { id: '2', label: 'פייסבוק', content: '**פוסט:**\n\n[כותרת מושכת]\n\n[סיפור/ערך]\n\n[קריאה לפעולה]\n\n🔗 קישור' },
              { id: '3', label: 'לינקדאין', content: '**פוסט מקצועי:**\n\n[Hook - משפט פתיחה]\n\n[תובנה/ערך]\n\n[סיכום + קריאה לפעולה]\n\n#professional #hashtag' },
            ],
            variant: 'horizontal',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'solid',
          },
        },
        {
          type: 'gallery',
          defaultData: {
            images: [
              { id: '1', src: '', alt: 'ויזואל 1', caption: 'תמונה ראשית' },
              { id: '2', src: '', alt: 'ויזואל 2', caption: 'תמונה משנית' },
              { id: '3', src: '', alt: 'ויזואל 3', caption: 'סטורי' },
            ],
            columns: 3,
            enableLightbox: true,
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: 'מטרות הפוסט', content: '- מטרה 1 (לדוגמה: הגברת מודעות)\n- מטרה 2 (לדוגמה: הנעה לפעולה)\n- KPIs: לייקים, שיתופים, קליקים' },
              { id: '2', title: 'קהל יעד', content: '- גיל: X-Y\n- תחומי עניין: ...\n- התנהגות: ...' },
              { id: '3', title: 'זמני פרסום מומלצים', content: '- אינסטגרם: 11:00, 19:00\n- פייסבוק: 13:00, 20:00\n- לינקדאין: 08:00, 17:00' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## רשימת Hashtags\n\n**אינסטגרם:**\n#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5\n\n**לינקדאין:**\n#professional1 #professional2 #professional3',
          },
        },
      ],
    },
  ],
};
