import { Template } from '../../../types';

export const studyGuideTemplate: Template = {
  id: 'education-study-guide',
  name: 'Study Guide',
  nameHe: 'מדריך למידה',
  description: 'Comprehensive study guide',
  descriptionHe: 'מדריך למידה מקיף',
  category: 'education',
  thumbnail: '📘',
  tags: ['מדריך', 'למידה', 'חזרה', 'מבחן'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 86,
  pages: [
    {
      title: 'מדריך למידה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'מדריך למידה',
            subtitle: '[שם הנושא/הקורס]',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**מטרת המדריך**\n\nמדריך זה נועד לסייע לך להתכונן לבחינה/להבין את הנושא בצורה מעמיקה.',
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: 'נושא 1: כותרת', content: '**מושגי מפתח:**\n- מושג 1: הגדרה\n- מושג 2: הגדרה\n\n**נקודות חשובות:**\n1. נקודה 1\n2. נקודה 2' },
              { id: '2', title: 'נושא 2: כותרת', content: '**מושגי מפתח:**\n- מושג 1: הגדרה\n- מושג 2: הגדרה\n\n**נקודות חשובות:**\n1. נקודה 1\n2. נקודה 2' },
              { id: '3', title: 'נושא 3: כותרת', content: '**מושגי מפתח:**\n- מושג 1: הגדרה\n- מושג 2: הגדרה\n\n**נקודות חשובות:**\n1. נקודה 1\n2. נקודה 2' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '💡', title: 'טיפ 1', description: 'טיפ ללמידה יעילה' },
              { id: '2', icon: '⚠️', title: 'שימו לב', description: 'טעות נפוצה להימנע ממנה' },
              { id: '3', icon: '✅', title: 'לזכור', description: 'נקודה חשובה לבחינה' },
            ],
            columns: 3,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## שאלות לחזרה\n\n1. שאלה לחזרה 1?\n2. שאלה לחזרה 2?\n3. שאלה לחזרה 3?\n\n## סיכום בנקודות\n\n- נקודה מרכזית 1\n- נקודה מרכזית 2\n- נקודה מרכזית 3\n\n## משאבים נוספים\n\n- קישור/ספר 1\n- קישור/ספר 2',
          },
        },
      ],
    },
  ],
};
