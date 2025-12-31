import { Template } from '../../../types';

export const landingPageTemplate: Template = {
  id: 'marketing-landing-page',
  name: 'Landing Page',
  nameHe: 'דף נחיתה',
  description: 'High-converting landing page',
  descriptionHe: 'דף נחיתה עם המרה גבוהה',
  category: 'marketing',
  thumbnail: '🚀',
  tags: ['דף נחיתה', 'המרה', 'שיווק', 'מכירות'],
  suggestedPreset: 'modern',
  suggestedColorMode: 'light',
  popularity: 98,
  pages: [
    {
      title: 'דף נחיתה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'כותרת ראשית שמושכת תשומת לב',
            subtitle: 'תת-כותרת שמסבירה את הערך שאתה מציע ללקוח בצורה ברורה ותמציתית',
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'התחל עכשיו בחינם',
            url: '#signup',
            variant: 'primary',
            size: 'large',
            alignment: 'center',
            icon: '🚀',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 10000, suffix: '+', label: 'לקוחות מרוצים' },
              { id: '2', value: 98, suffix: '%', label: 'שביעות רצון' },
              { id: '3', value: 24, suffix: '/7', label: 'תמיכה' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '⚡', title: 'מהיר ויעיל', description: 'חסוך זמן עם הכלים האוטומטיים שלנו' },
              { id: '2', icon: '🔒', title: 'בטוח ומאובטח', description: 'אבטחה ברמה הגבוהה ביותר' },
              { id: '3', icon: '💰', title: 'חסכוני', description: 'מחירים תחרותיים לכל כיס' },
            ],
            columns: 3,
          },
        },
        {
          type: 'testimonials',
          defaultData: {
            testimonials: [
              { id: '1', quote: 'השירות הזה שינה לנו את העסק! ממליץ בחום.', authorName: 'ישראל ישראלי', authorRole: 'מנכ"ל, חברה א', rating: 5 },
              { id: '2', quote: 'פשוט, יעיל ועובד. בדיוק מה שחיפשנו.', authorName: 'שרה כהן', authorRole: 'מנהלת שיווק, חברה ב', rating: 5 },
            ],
            variant: 'cards',
          },
        },
        {
          type: 'pricingTable',
          defaultData: {
            plans: [
              {
                id: '1',
                name: 'בסיסי',
                price: 'חינם',
                features: [
                  { text: 'עד 100 פעולות', included: true },
                  { text: 'תמיכה במייל', included: true },
                  { text: 'אינטגרציות', included: false },
                ],
                isHighlighted: false,
                ctaText: 'התחל בחינם',
              },
              {
                id: '2',
                name: 'מקצועי',
                price: '₪99/חודש',
                features: [
                  { text: 'פעולות ללא הגבלה', included: true },
                  { text: 'תמיכה 24/7', included: true },
                  { text: 'כל האינטגרציות', included: true },
                ],
                isHighlighted: true,
                ctaText: 'הצטרף עכשיו',
              },
            ],
            currency: '₪',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**מוכנים להתחיל?**\n\nהצטרפו לאלפי לקוחות מרוצים עוד היום!',
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'צור קשר עכשיו',
            url: '#contact',
            variant: 'primary',
            size: 'large',
            alignment: 'center',
          },
        },
      ],
    },
  ],
};
