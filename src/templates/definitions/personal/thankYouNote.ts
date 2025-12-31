import { Template } from '../../../types';

export const thankYouNoteTemplate: Template = {
  id: 'personal-thank-you-note',
  name: 'Thank You Note',
  nameHe: 'מכתב תודה',
  description: 'Heartfelt thank you note',
  descriptionHe: 'מכתב תודה מהלב',
  category: 'personal',
  thumbnail: '💝',
  tags: ['תודה', 'הכרה', 'מכתב', 'הערכה'],
  suggestedPreset: 'elegant',
  suggestedColorMode: 'light',
  popularity: 82,
  pages: [
    {
      title: 'מכתב תודה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '💝 תודה מהלב',
            subtitle: '',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '[תאריך]\n\n**[שם יקר/יקרה],**',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: 'רציתי לקחת רגע ולהודות לך מכל הלב על [על מה אתה מודה].\n\n[פסקה שמסבירה למה זה היה משמעותי עבורך. איך זה השפיע? מה זה אומר לך?]\n\n[פסקה נוספת - אולי זיכרון ספציפי או דוגמה שממחישה את ההערכה שלך]',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '✨ **[משפט מפתח שמסכם את הרגש]** ✨',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: 'אני באמת מעריך/ה את [מה שאתה מעריך - הזמן/המאמץ/האכפתיות].\n\n[משפט סיום חם ואישי]\n\n---\n\n**באהבה/בהערכה רבה/בתודה,**\n\n**[השם שלך]**\n\n❤️',
          },
        },
      ],
    },
  ],
};
