import { Template } from '../../../types';

export const newsletterTemplate: Template = {
  id: 'marketing-newsletter',
  name: 'Newsletter',
  nameHe: 'ניוזלטר',
  description: 'Email newsletter template',
  descriptionHe: 'תבנית ניוזלטר לדוא"ל',
  category: 'marketing',
  thumbnail: '📧',
  tags: ['ניוזלטר', 'אימייל', 'עדכון', 'תוכן'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 85,
  pages: [
    {
      title: 'ניוזלטר',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם הניוזלטר',
            subtitle: 'גיליון #[X] | [חודש שנה]',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: 'שלום [שם],\n\nמשפט פתיחה מעניין שגורם לקורא להמשיך לקרוא. סיכום קצר של מה שימצאו בגיליון הזה.',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**📌 הכותרת הראשית השבוע**\n\nסיפור/עדכון/תובנה מרכזית. פסקה קצרה שמסבירה את העיקר.',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'solid',
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: '📰 חדשות ועדכונים', content: 'עדכון 1: תיאור קצר\n\nעדכון 2: תיאור קצר\n\nעדכון 3: תיאור קצר' },
              { id: '2', title: '💡 טיפ השבוע', content: 'טיפ שימושי עם הסבר כיצד ליישם אותו.' },
              { id: '3', title: '📚 המלצת קריאה', content: 'שם הספר/המאמר\nלמה כדאי לקרוא אותו?' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '🎯', title: 'קישור 1', description: 'תיאור קצר' },
              { id: '2', icon: '📈', title: 'קישור 2', description: 'תיאור קצר' },
              { id: '3', icon: '🔗', title: 'קישור 3', description: 'תיאור קצר' },
            ],
            columns: 3,
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'קרא עוד באתר',
            url: '#',
            variant: 'primary',
            size: 'medium',
            alignment: 'center',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '---\n\nתודה שקראת! 🙏\n\nנתראה בגיליון הבא,\n[שם]\n\n---\n\n*להסרה מרשימת התפוצה: [קישור]*',
          },
        },
      ],
    },
  ],
};
