import { Template } from '../../../types';

export const resumeCreativeTemplate: Template = {
  id: 'career-resume-creative',
  name: 'Creative Resume',
  nameHe: 'קורות חיים יצירתי',
  description: 'Modern creative resume design',
  descriptionHe: 'עיצוב קורות חיים מודרני ויצירתי',
  category: 'career',
  thumbnail: '🎨',
  tags: ['קורות חיים', 'יצירתי', 'עיצוב', 'מודרני'],
  suggestedPreset: 'modern',
  suggestedColorMode: 'light',
  popularity: 92,
  pages: [
    {
      title: 'קורות חיים',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם מלא',
            subtitle: '✨ מעצב/ת | יוצר/ת | חדשן/ית ✨',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 8, suffix: '+', label: 'שנות ניסיון' },
              { id: '2', value: 50, suffix: '+', label: 'פרויקטים' },
              { id: '3', value: 100, suffix: '%', label: 'תשוקה' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'tabs',
          defaultData: {
            tabs: [
              { id: '1', label: 'מי אני', content: 'סיפור קצר על עצמי, המוטיבציה שלי והדרך שעברתי. מה מניע אותי ומה אני מחפש/ת.' },
              { id: '2', label: 'מה אני עושה', content: 'תיאור היכולות והמומחיות שלי. התחומים בהם אני מצטיין/ת.' },
              { id: '3', label: 'למה אני', content: 'מה מייחד אותי? מה הערך הייחודי שאני מביא/ה לצוות?' },
            ],
            variant: 'horizontal',
          },
        },
        {
          type: 'gallery',
          defaultData: {
            images: [
              { id: '1', src: '', alt: 'פרויקט 1', caption: 'תיאור פרויקט 1' },
              { id: '2', src: '', alt: 'פרויקט 2', caption: 'תיאור פרויקט 2' },
              { id: '3', src: '', alt: 'פרויקט 3', caption: 'תיאור פרויקט 3' },
            ],
            columns: 3,
            enableLightbox: true,
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: 'עכשיו', title: 'תפקיד נוכחי', description: 'חברה מגניבה', icon: '🚀' },
              { id: '2', date: '2020', title: 'צמיחה', description: 'חברה קודמת', icon: '📈' },
              { id: '3', date: '2018', title: 'התחלה', description: 'תחילת הדרך', icon: '🌱' },
            ],
            variant: 'alternating',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '🎯', title: 'אסטרטגיה', description: 'חשיבה מערכתית' },
              { id: '2', icon: '💡', title: 'חדשנות', description: 'פתרונות יצירתיים' },
              { id: '3', icon: '🤝', title: 'שיתוף פעולה', description: 'עבודת צוות' },
            ],
            columns: 3,
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'בואו נדבר',
            url: 'mailto:email@example.com',
            variant: 'primary',
            size: 'large',
            alignment: 'center',
            icon: '✉️',
          },
        },
      ],
    },
  ],
};
