import { Template } from '../../../types';

export const birthdayCardTemplate: Template = {
  id: 'personal-birthday-card',
  name: 'Birthday Card',
  nameHe: 'ברכת יום הולדת',
  description: 'Fun birthday greeting card',
  descriptionHe: 'כרטיס ברכה ליום הולדת',
  category: 'personal',
  thumbnail: '🎂',
  tags: ['יום הולדת', 'ברכה', 'חגיגה', 'מזל טוב'],
  suggestedPreset: 'creative',
  suggestedColorMode: 'light',
  popularity: 90,
  pages: [
    {
      title: 'יום הולדת שמח',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '🎂 יום הולדת שמח! 🎂',
            subtitle: 'ל[שם חוגג/ת]',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '🎈🎉🎊 **מזל טוב!** 🎊🎉🎈\n\n**[גיל] שנים של אושר!**',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## [שם] היקר/ה!\n\nביום המיוחד הזה רצינו לאחל לך:\n\n- שנה מלאה באושר ובריאות\n- הגשמת חלומות\n- אהבה ושמחה\n- הצלחה בכל מה שתעשה!\n\n*שתמשיך להיות המדהים/ה שאת/ה!*',
          },
        },
        {
          type: 'gallery',
          defaultData: {
            images: [
              { id: '1', src: '', alt: 'תמונה 1', caption: 'רגע מיוחד' },
              { id: '2', src: '', alt: 'תמונה 2', caption: 'זיכרון יפה' },
              { id: '3', src: '', alt: 'תמונה 3', caption: 'יחד' },
            ],
            columns: 3,
            enableLightbox: true,
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 365, label: 'ימים של אושר' },
              { id: '2', value: 1000000, label: 'חיוכים' },
              { id: '3', value: 100, suffix: '%', label: 'אהבה' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## באהבה גדולה,\n\n**[שם/שמות החותמים]**\n\n❤️🎁🎈',
          },
        },
      ],
    },
  ],
};
