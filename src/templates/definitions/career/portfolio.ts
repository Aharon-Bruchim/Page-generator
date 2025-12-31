import { Template } from '../../../types';

export const portfolioTemplate: Template = {
  id: 'career-portfolio',
  name: 'Portfolio',
  nameHe: 'פורטפוליו',
  description: 'Creative portfolio showcase',
  descriptionHe: 'תצוגת פורטפוליו יצירתית',
  category: 'career',
  thumbnail: '🖼️',
  tags: ['פורטפוליו', 'עבודות', 'יצירות', 'עיצוב'],
  suggestedPreset: 'modern',
  suggestedColorMode: 'dark',
  popularity: 90,
  pages: [
    {
      title: 'אודות',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם מלא',
            subtitle: 'מעצב/ת | מפתח/ת | יוצר/ת',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## מי אני\n\nתיאור קצר של עצמך, הסגנון שלך והגישה היצירתית. מה מייחד אותך ומה אתה אוהב ליצור.',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 5, suffix: '+', label: 'שנות ניסיון' },
              { id: '2', value: 100, suffix: '+', label: 'פרויקטים' },
              { id: '3', value: 30, suffix: '+', label: 'לקוחות' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '🎨', title: 'עיצוב', description: 'UI/UX, גרפיקה, מיתוג' },
              { id: '2', icon: '💻', title: 'פיתוח', description: 'React, TypeScript, Node' },
              { id: '3', icon: '📱', title: 'מובייל', description: 'אפליקציות iOS/Android' },
            ],
            columns: 3,
          },
        },
      ],
    },
    {
      title: 'עבודות',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'העבודות שלי',
            subtitle: 'מבחר פרויקטים נבחרים',
          },
        },
        {
          type: 'gallery',
          defaultData: {
            images: [
              { id: '1', src: '', alt: 'פרויקט 1', caption: 'שם הפרויקט | לקוח' },
              { id: '2', src: '', alt: 'פרויקט 2', caption: 'שם הפרויקט | לקוח' },
              { id: '3', src: '', alt: 'פרויקט 3', caption: 'שם הפרויקט | לקוח' },
              { id: '4', src: '', alt: 'פרויקט 4', caption: 'שם הפרויקט | לקוח' },
            ],
            columns: 2,
            enableLightbox: true,
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
            title: 'בואו נעבוד יחד',
            subtitle: 'יש לכם פרויקט בראש? אשמח לשמוע',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '📧 email@example.com\n📱 050-1234567\n🌐 www.mysite.com\n💼 linkedin.com/in/username',
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'שלח הודעה',
            url: 'mailto:email@example.com',
            variant: 'primary',
            size: 'large',
            alignment: 'center',
          },
        },
      ],
    },
  ],
};
