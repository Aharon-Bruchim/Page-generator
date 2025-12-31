import { Template } from '../../../types';

export const productLaunchTemplate: Template = {
  id: 'marketing-product-launch',
  name: 'Product Launch',
  nameHe: 'השקת מוצר',
  description: 'Product launch announcement',
  descriptionHe: 'הכרזה על השקת מוצר חדש',
  category: 'marketing',
  thumbnail: '🎉',
  tags: ['השקה', 'מוצר', 'חדש', 'הכרזה'],
  suggestedPreset: 'modern',
  suggestedColorMode: 'dark',
  popularity: 90,
  pages: [
    {
      title: 'השקת מוצר',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '🎉 מכריזים על [שם המוצר]',
            subtitle: 'הדרך החדשה והטובה יותר ל[מה שהמוצר עושה]',
          },
        },
        {
          type: 'videoEmbed',
          defaultData: {
            url: 'https://www.youtube.com/watch?v=VIDEO_ID',
            provider: 'youtube',
            aspectRatio: '16:9',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**הבעיה:**\n\n[תיאור הבעיה שהמוצר פותר]\n\n**הפתרון:**\n\n[איך המוצר פותר את הבעיה]',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '✨', title: 'תכונה חדשה 1', description: 'הסבר על התכונה והערך שלה' },
              { id: '2', icon: '⚡', title: 'תכונה חדשה 2', description: 'הסבר על התכונה והערך שלה' },
              { id: '3', icon: '🎯', title: 'תכונה חדשה 3', description: 'הסבר על התכונה והערך שלה' },
              { id: '4', icon: '🔥', title: 'תכונה חדשה 4', description: 'הסבר על התכונה והערך שלה' },
            ],
            columns: 2,
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 50, suffix: '%', label: 'יותר מהיר' },
              { id: '2', value: 3, suffix: 'x', label: 'יותר יעיל' },
              { id: '3', value: 100, suffix: '%', label: 'קל לשימוש' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: 'שלב 1', title: 'רעיון', description: 'התחלנו עם חזון', icon: '💡' },
              { id: '2', date: 'שלב 2', title: 'פיתוח', description: 'בנינו את המוצר', icon: '⚙️' },
              { id: '3', date: 'שלב 3', title: 'בדיקות', description: 'שיפרנו בעזרת המשתמשים', icon: '🔍' },
              { id: '4', date: 'היום!', title: 'השקה', description: 'מוכנים לעולם', icon: '🚀' },
            ],
            variant: 'alternating',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**מבצע השקה מיוחד!**\n\n🎁 30% הנחה למצטרפים הראשונים\n\n*המבצע בתוקף עד [תאריך]*',
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'קבל גישה מוקדמת',
            url: '#signup',
            variant: 'primary',
            size: 'large',
            alignment: 'center',
            icon: '🎉',
          },
        },
      ],
    },
  ],
};
