import { Template } from '../../../types';

export const onePagerTemplate: Template = {
  id: 'marketing-one-pager',
  name: 'One Pager',
  nameHe: 'One Pager',
  description: 'Concise one-page overview',
  descriptionHe: 'סקירה תמציתית בעמוד אחד',
  category: 'marketing',
  thumbnail: '📄',
  tags: ['one pager', 'סיכום', 'תמציתי', 'מכירות'],
  suggestedPreset: 'modern',
  suggestedColorMode: 'light',
  popularity: 87,
  pages: [
    {
      title: 'One Pager',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם החברה/המוצר',
            subtitle: 'משפט שמתאר את הערך המרכזי בשורה אחת',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**הבעיה:**\n[בעיה X] עולה לעסקים [Y] בשנה\n\n**הפתרון:**\n[שם המוצר] עוזר ל[קהל יעד] לפתור [בעיה] על ידי [איך]',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', prefix: '$', value: 10, suffix: 'B', label: 'גודל השוק' },
              { id: '2', value: 500, suffix: '+', label: 'לקוחות' },
              { id: '3', value: 95, suffix: '%', label: 'שימור לקוחות' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '✅', title: 'יתרון 1', description: 'הסבר קצר' },
              { id: '2', icon: '✅', title: 'יתרון 2', description: 'הסבר קצר' },
              { id: '3', icon: '✅', title: 'יתרון 3', description: 'הסבר קצר' },
            ],
            columns: 3,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## איך זה עובד\n\n**1. צעד ראשון** → **2. צעד שני** → **3. תוצאה**',
          },
        },
        {
          type: 'testimonials',
          defaultData: {
            testimonials: [
              { id: '1', quote: 'ציטוט קצר ומשכנע מלקוח', authorName: 'שם', authorRole: 'תפקיד, חברה', rating: 5 },
            ],
            variant: 'single',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## תמחור\n\nמתחיל מ-**₪X/חודש** | ניסיון חינם ל-14 יום',
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'קבע פגישה',
            url: '#contact',
            variant: 'primary',
            size: 'large',
            alignment: 'center',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '📧 email@example.com | 📱 050-1234567 | 🌐 www.example.com',
          },
        },
      ],
    },
  ],
};
