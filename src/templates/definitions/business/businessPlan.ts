import { Template } from '../../../types';

export const businessPlanTemplate: Template = {
  id: 'business-plan',
  name: 'Business Plan',
  nameHe: 'תכנית עסקית',
  description: 'Comprehensive business plan template',
  descriptionHe: 'תבנית תכנית עסקית מקיפה',
  category: 'business',
  thumbnail: '📊',
  tags: ['תכנית', 'עסקית', 'אסטרטגיה', 'יזמות'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 87,
  pages: [
    {
      title: 'תקציר מנהלים',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'תכנית עסקית',
            subtitle: 'שם החברה/המיזם',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**תקציר מנהלים**\n\nתיאור קצר של העסק, המוצר/שירות, והזדמנות השוק. מה הבעיה שאתם פותרים ולמה עכשיו זה הזמן.',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', prefix: '₪', value: 5, suffix: 'M', label: 'גודל השוק' },
              { id: '2', value: 25, suffix: '%', label: 'צמיחה שנתית' },
              { id: '3', prefix: '₪', value: 500, suffix: 'K', label: 'הכנסות צפויות שנה 1' },
            ],
            animate: true,
            columns: 3,
          },
        },
      ],
    },
    {
      title: 'המוצר והשוק',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'המוצר והשוק',
            subtitle: '',
          },
        },
        {
          type: 'tabs',
          defaultData: {
            tabs: [
              { id: '1', label: 'המוצר/שירות', content: 'תיאור מפורט של המוצר או השירות. מה היתרונות התחרותיים? מה מייחד אתכם?' },
              { id: '2', label: 'השוק', content: 'ניתוח שוק היעד. מי הלקוחות? מה גודל השוק? מהן המגמות?' },
              { id: '3', label: 'תחרות', content: 'ניתוח המתחרים. מי הם? מה היתרונות והחסרונות שלהם?' },
            ],
            variant: 'horizontal',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '🎯', title: 'יתרון תחרותי 1', description: 'הסבר על היתרון הראשון' },
              { id: '2', icon: '💡', title: 'יתרון תחרותי 2', description: 'הסבר על היתרון השני' },
              { id: '3', icon: '🚀', title: 'יתרון תחרותי 3', description: 'הסבר על היתרון השלישי' },
            ],
            columns: 3,
          },
        },
      ],
    },
    {
      title: 'תכנית פעולה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'תכנית פעולה',
            subtitle: 'אסטרטגיה ויישום',
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: 'רבעון 1', title: 'הקמה והשקה', description: 'פיתוח MVP והשקה ראשונית', icon: '🚀' },
              { id: '2', date: 'רבעון 2', title: 'צמיחה', description: 'גיוס לקוחות ראשונים', icon: '📈' },
              { id: '3', date: 'רבעון 3-4', title: 'התרחבות', description: 'הרחבת הצוות והמוצר', icon: '🌟' },
              { id: '4', date: 'שנה 2', title: 'סקייל', description: 'צמיחה מואצת וגיוס הון', icon: '🎯' },
            ],
            variant: 'alternating',
          },
        },
      ],
    },
    {
      title: 'פיננסים',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'תחזית פיננסית',
            subtitle: '',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', prefix: '₪', value: 200, suffix: 'K', label: 'השקעה נדרשת' },
              { id: '2', value: 18, label: 'חודשים ל-Break Even' },
              { id: '3', prefix: '₪', value: 2, suffix: 'M', label: 'הכנסות שנה 3' },
              { id: '4', value: 30, suffix: '%', label: 'מרווח רווחיות' },
            ],
            animate: true,
            columns: 4,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## שימוש בכספי ההשקעה\n\n- **פיתוח:** 40%\n- **שיווק:** 30%\n- **תפעול:** 20%\n- **רזרבה:** 10%',
          },
        },
      ],
    },
  ],
};
