import { Template } from '../../../types';

export const courseOutlineTemplate: Template = {
  id: 'education-course-outline',
  name: 'Course Outline',
  nameHe: 'סילבוס קורס',
  description: 'Comprehensive course outline',
  descriptionHe: 'סילבוס קורס מקיף',
  category: 'education',
  thumbnail: '📋',
  tags: ['קורס', 'סילבוס', 'תוכנית', 'לימודים'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 88,
  pages: [
    {
      title: 'סילבוס',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם הקורס',
            subtitle: 'סמסטר [X] | שנה"ל תשפ"ה',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**מרצה:** שם המרצה\n**דוא"ל:** email@example.com\n**שעות קבלה:** יום X, שעות Y-Z\n\n**מועד הקורס:** יום [X], שעות [Y]\n**מיקום:** בניין [X], חדר [Y]',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**תיאור הקורס**\n\nתיאור כללי של הקורס, הנושאים המרכזיים והגישה הפדגוגית.',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '🎯', title: 'מטרה 1', description: 'הסבר על המטרה' },
              { id: '2', icon: '🎯', title: 'מטרה 2', description: 'הסבר על המטרה' },
              { id: '3', icon: '🎯', title: 'מטרה 3', description: 'הסבר על המטרה' },
            ],
            columns: 3,
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: 'שבוע 1-2: מבוא', content: 'נושאי השבוע וקריאה נדרשת' },
              { id: '2', title: 'שבוע 3-4: נושא 1', content: 'נושאי השבוע וקריאה נדרשת' },
              { id: '3', title: 'שבוע 5-6: נושא 2', content: 'נושאי השבוע וקריאה נדרשת' },
              { id: '4', title: 'שבוע 7-8: נושא 3', content: 'נושאי השבוע וקריאה נדרשת' },
              { id: '5', title: 'שבוע 9-10: נושא 4', content: 'נושאי השבוע וקריאה נדרשת' },
              { id: '6', title: 'שבוע 11-12: סיכום', content: 'חזרה והכנה לבחינה' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## הערכה\n\n| רכיב | משקל |\n|------|------|\n| נוכחות והשתתפות | 10% |\n| עבודות | 30% |\n| בחינה | 60% |\n\n## ביבליוגרפיה\n\n1. ספר חובה 1\n2. ספר חובה 2\n3. מאמרים נוספים יחולקו במהלך הקורס',
          },
        },
      ],
    },
  ],
};
