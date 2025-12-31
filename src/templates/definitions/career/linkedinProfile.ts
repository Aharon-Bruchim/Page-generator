import { Template } from '../../../types';

export const linkedinProfileTemplate: Template = {
  id: 'career-linkedin-profile',
  name: 'LinkedIn Profile',
  nameHe: 'פרופיל LinkedIn',
  description: 'LinkedIn profile content guide',
  descriptionHe: 'מדריך לכתיבת פרופיל לינקדאין',
  category: 'career',
  thumbnail: '💼',
  tags: ['לינקדאין', 'פרופיל', 'רשת', 'נטוורקינג'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 82,
  pages: [
    {
      title: 'פרופיל LinkedIn',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם מלא',
            subtitle: 'כותרת מקצועית שמתארת מה אתה עושה ואיזה ערך אתה מביא',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**About (אודות)**\n\nהפסקה הזו היא ההזדמנות שלך לספר את הסיפור שלך.\n\n🎯 מה אני עושה: תיאור קצר של התחום והמומחיות\n\n💡 למה אני: מה מייחד אותי ומה הערך שאני מביא\n\n🚀 לאן אני הולך: היעדים והשאיפות שלי\n\n📫 צור קשר: email@example.com',
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: 'Experience (ניסיון)', content: '**תפקיד נוכחי** | חברה | תקופה\n- הישג מדיד 1\n- הישג מדיד 2\n- מילות מפתח רלוונטיות' },
              { id: '2', title: 'Education (השכלה)', content: '**תואר** | מוסד | שנים\nפעילויות ואגודות רלוונטיות' },
              { id: '3', title: 'Skills (מיומנויות)', content: 'רשימה של מיומנויות מפתח לאשר (endorsements)' },
              { id: '4', title: 'Recommendations', content: 'טיפ: בקש המלצות מקולגות, מנהלים ולקוחות' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '✅', title: 'תמונה מקצועית', description: 'תמונת פרופיל ברורה ומקצועית' },
              { id: '2', icon: '✅', title: 'כותרת ממוקדת', description: 'כותרת עם מילות מפתח' },
              { id: '3', icon: '✅', title: 'תוכן עשיר', description: 'About, ניסיון, מיומנויות' },
            ],
            columns: 3,
          },
        },
      ],
    },
  ],
};
