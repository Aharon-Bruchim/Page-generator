import { Template } from '../../../types';

export const eventInvitationTemplate: Template = {
  id: 'personal-event-invitation',
  name: 'Event Invitation',
  nameHe: 'הזמנה לאירוע',
  description: 'General event invitation',
  descriptionHe: 'הזמנה לאירוע כללי',
  category: 'personal',
  thumbnail: '🎈',
  tags: ['הזמנה', 'אירוע', 'מסיבה', 'חגיגה'],
  suggestedPreset: 'creative',
  suggestedColorMode: 'light',
  popularity: 88,
  pages: [
    {
      title: 'הזמנה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '🎉 הזמנה מיוחדת 🎉',
            subtitle: 'אתם מוזמנים ל[שם האירוע]!',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**[שם המארח/ת] מזמין/ה אתכם**\n\nלחגוג איתנו ב[אירוע]!',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '📅', title: 'מתי', description: '[תאריך ושעה]' },
              { id: '2', icon: '📍', title: 'איפה', description: '[כתובת מלאה]' },
              { id: '3', icon: '👔', title: 'דרס קוד', description: '[לבוש מומלץ]' },
            ],
            columns: 3,
          },
        },
        {
          type: 'mapEmbed',
          defaultData: {
            address: '[כתובת האירוע]',
            zoom: 15,
            height: 250,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## מה יהיה?\n\n- פעילות 1\n- פעילות 2\n- כיבוד/אוכל\n- הפתעות!',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**אישור הגעה עד:** [תאריך]\n\n📱 [מספר טלפון] | 💬 וואטסאפ | ✉️ [אימייל]',
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'אשר הגעה',
            url: '#rsvp',
            variant: 'primary',
            size: 'large',
            alignment: 'center',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '*נא לא להביא מתנות - הנוכחות שלכם היא המתנה!*\n\n❤️ מחכים לראות אתכם!',
          },
        },
      ],
    },
  ],
};
