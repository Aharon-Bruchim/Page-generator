import { Template } from '../../../types';

export const weddingInviteTemplate: Template = {
  id: 'personal-wedding-invite',
  name: 'Wedding Invitation',
  nameHe: 'הזמנה לחתונה',
  description: 'Elegant wedding invitation',
  descriptionHe: 'הזמנה אלגנטית לחתונה',
  category: 'personal',
  thumbnail: '💒',
  tags: ['חתונה', 'הזמנה', 'זוגיות', 'אהבה'],
  suggestedPreset: 'elegant',
  suggestedColorMode: 'light',
  popularity: 92,
  pages: [
    {
      title: 'הזמנה לחתונה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '💍 [שם] & [שם] 💍',
            subtitle: 'מתחתנים!',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## ברוב שמחה ואושר\n\n**משפחת [שם]** ו**משפחת [שם]**\n\nמזמינות אתכם לחגוג עמנו\nאת נישואי ילדינו האהובים',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '## [שם הכלה] ❤️ [שם החתן]',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '📅', title: 'יום [X]', description: '[תאריך עברי ולועזי]' },
              { id: '2', icon: '🕐', title: 'קבלת פנים', description: '[שעה]' },
              { id: '3', icon: '💒', title: 'חופה', description: '[שעה]' },
            ],
            columns: 3,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## מיקום האירוע\n\n**[שם האולם]**\n[כתובת מלאה]\n\n*חניה במקום*',
          },
        },
        {
          type: 'mapEmbed',
          defaultData: {
            address: '[כתובת האולם]',
            zoom: 15,
            height: 250,
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**אישור הגעה עד:** [תאריך]\n\n📱 כלה: [טלפון]\n📱 חתן: [טלפון]',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '---\n\n*נשמח לראותכם!*\n\n*דרס קוד: [לבוש]*',
          },
        },
      ],
    },
  ],
};
