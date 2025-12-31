import { Template } from '../../../types';

export const worksheetTemplate: Template = {
  id: 'education-worksheet',
  name: 'Worksheet',
  nameHe: 'דף עבודה',
  description: 'Educational worksheet template',
  descriptionHe: 'תבנית דף עבודה לימודי',
  category: 'education',
  thumbnail: '📝',
  tags: ['דף עבודה', 'תרגול', 'שאלות', 'למידה'],
  suggestedPreset: 'minimal',
  suggestedColorMode: 'light',
  popularity: 90,
  pages: [
    {
      title: 'דף עבודה',
      sections: [
        {
          type: 'text',
          defaultData: {
            content: '# דף עבודה: [נושא]\n\n**שם התלמיד/ה:** _________________ **כיתה:** _____ **תאריך:** _______',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'solid',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**הוראות:** קרא/י את השאלות בעיון וענה/י על כולן.',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## חלק א\': שאלות פתוחות\n\n**1.** [שאלה ראשונה]\n\n_____________________________________________________________\n\n_____________________________________________________________\n\n**2.** [שאלה שנייה]\n\n_____________________________________________________________\n\n_____________________________________________________________',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'dashed',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## חלק ב\': בחירה מרובה\n\n**3.** [שאלה]\n\nא. תשובה 1\nב. תשובה 2\nג. תשובה 3\nד. תשובה 4\n\n**4.** [שאלה]\n\nא. תשובה 1\nב. תשובה 2\nג. תשובה 3\nד. תשובה 4',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'dashed',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## חלק ג\': התאמה\n\n**5.** התאם/י בין העמודות:\n\n| עמודה א | עמודה ב |\n|---------|----------|\n| 1. פריט | ___ הגדרה א |\n| 2. פריט | ___ הגדרה ב |\n| 3. פריט | ___ הגדרה ג |',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**שאלת אתגר (בונוס):**\n\n[שאלה מאתגרת לתלמידים מתקדמים]',
          },
        },
      ],
    },
  ],
};
