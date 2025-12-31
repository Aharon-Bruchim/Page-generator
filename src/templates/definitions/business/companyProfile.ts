import { Template } from '../../../types';

export const companyProfileTemplate: Template = {
  id: 'business-company-profile',
  name: 'Company Profile',
  nameHe: 'פרופיל חברה',
  description: 'Professional company profile presentation',
  descriptionHe: 'מצגת מקצועית של פרופיל החברה',
  category: 'business',
  thumbnail: '🏢',
  tags: ['חברה', 'פרופיל', 'אודות', 'עסק'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 90,
  pages: [
    {
      title: 'אודות החברה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם החברה',
            subtitle: 'הסלוגן שלנו - משפט מפתח שמתאר את החברה',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## אודותינו\n\nתיאור קצר של החברה, הסיפור שלה, והחזון. ניתן להרחיב על ההיסטוריה והערכים המרכזיים של הארגון.',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 15, label: 'שנות ניסיון' },
              { id: '2', value: 500, suffix: '+', label: 'לקוחות מרוצים' },
              { id: '3', value: 50, label: 'עובדים' },
              { id: '4', value: 99, suffix: '%', label: 'שביעות רצון' },
            ],
            animate: true,
            columns: 4,
          },
        },
      ],
    },
    {
      title: 'השירותים שלנו',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'השירותים שלנו',
            subtitle: 'פתרונות מותאמים לצרכים שלך',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '🎯', title: 'שירות 1', description: 'תיאור מפורט של השירות הראשון' },
              { id: '2', icon: '💡', title: 'שירות 2', description: 'תיאור מפורט של השירות השני' },
              { id: '3', icon: '🚀', title: 'שירות 3', description: 'תיאור מפורט של השירות השלישי' },
            ],
            columns: 3,
          },
        },
      ],
    },
    {
      title: 'הצוות',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'הצוות שלנו',
            subtitle: 'הכירו את האנשים מאחורי ההצלחה',
          },
        },
        {
          type: 'teamCards',
          defaultData: {
            members: [
              { id: '1', name: 'ישראל ישראלי', role: 'מנכ"ל', photo: '', bio: 'מייסד החברה עם ניסיון של 20 שנה בתעשייה' },
              { id: '2', name: 'שרה כהן', role: 'סמנכ"ל תפעול', photo: '', bio: 'מנהלת את כל התפעול השוטף של החברה' },
              { id: '3', name: 'דוד לוי', role: 'מנהל טכנולוגיות', photo: '', bio: 'אחראי על כל ההיבטים הטכנולוגיים' },
            ],
            columns: 3,
          },
        },
      ],
    },
    {
      title: 'צור קשר',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'צור קשר',
            subtitle: 'נשמח לשמוע ממך',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**כתובת:** רחוב הדוגמה 123, תל אביב\n\n**טלפון:** 03-1234567\n\n**דוא"ל:** info@example.com',
          },
        },
        {
          type: 'mapEmbed',
          defaultData: {
            address: 'תל אביב, ישראל',
            zoom: 14,
            height: 300,
          },
        },
      ],
    },
  ],
};
