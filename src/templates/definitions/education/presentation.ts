import { Template } from '../../../types';

export const presentationTemplate: Template = {
  id: 'education-presentation',
  name: 'Presentation',
  nameHe: 'מצגת לימודית',
  description: 'Educational presentation template',
  descriptionHe: 'תבנית מצגת לימודית',
  category: 'education',
  thumbnail: '🎬',
  tags: ['מצגת', 'הרצאה', 'שיעור', 'ויזואלי'],
  suggestedPreset: 'modern',
  suggestedColorMode: 'light',
  popularity: 91,
  pages: [
    {
      title: 'שער',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'כותרת המצגת',
            subtitle: 'תת-כותרת | שם המציג | תאריך',
          },
        },
      ],
    },
    {
      title: 'מבוא',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'מבוא',
            subtitle: '',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '1️⃣', title: 'נושא ראשון', description: 'תיאור קצר' },
              { id: '2', icon: '2️⃣', title: 'נושא שני', description: 'תיאור קצר' },
              { id: '3', icon: '3️⃣', title: 'נושא שלישי', description: 'תיאור קצר' },
            ],
            columns: 1,
          },
        },
      ],
    },
    {
      title: 'נושא 1',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'נושא ראשון',
            subtitle: 'תת-כותרת',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## נקודות מרכזיות\n\n- נקודה ראשונה עם הסבר\n- נקודה שנייה עם הסבר\n- נקודה שלישית עם הסבר',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '💡 **ציטוט/רעיון מרכזי**\n\n"טקסט חשוב שכדאי לזכור"',
          },
        },
      ],
    },
    {
      title: 'נושא 2',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'נושא שני',
            subtitle: '',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 85, suffix: '%', label: 'נתון 1' },
              { id: '2', value: 120, label: 'נתון 2' },
              { id: '3', value: 50, suffix: 'K', label: 'נתון 3' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## ניתוח הנתונים\n\nהסבר על המשמעות של הנתונים המוצגים.',
          },
        },
      ],
    },
    {
      title: 'סיכום',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'סיכום',
            subtitle: '',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '✅', title: 'מסקנה 1', description: 'תיאור' },
              { id: '2', icon: '✅', title: 'מסקנה 2', description: 'תיאור' },
              { id: '3', icon: '✅', title: 'מסקנה 3', description: 'תיאור' },
            ],
            columns: 1,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## שאלות?\n\nתודה על ההקשבה!',
          },
        },
      ],
    },
  ],
};
