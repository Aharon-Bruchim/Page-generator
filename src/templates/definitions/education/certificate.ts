import { Template } from '../../../types';

export const certificateTemplate: Template = {
  id: 'education-certificate',
  name: 'Certificate',
  nameHe: 'תעודה',
  description: 'Achievement certificate template',
  descriptionHe: 'תבנית תעודת הצטיינות/השתתפות',
  category: 'education',
  thumbnail: '🏆',
  tags: ['תעודה', 'הצטיינות', 'השתתפות', 'הכרה'],
  suggestedPreset: 'elegant',
  suggestedColorMode: 'light',
  popularity: 84,
  pages: [
    {
      title: 'תעודה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '🏆 תעודת הוקרה 🏆',
            subtitle: 'שם המוסד/הארגון',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## ניתנת בזאת ל:',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '# [שם המקבל/ת]\n\nעל [הישג/השתתפות/סיום]',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '---\n\n**בהוקרה על:**\n\n[תיאור ההישג או הפעילות]\n\n---',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**תאריך:** [תאריך]\n\n**חתימה:**\n\n\n________________________\n[שם החותם]\n[תפקיד]',
          },
        },
      ],
    },
  ],
};
