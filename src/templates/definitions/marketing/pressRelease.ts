import { Template } from '../../../types';

export const pressReleaseTemplate: Template = {
  id: 'marketing-press-release',
  name: 'Press Release',
  nameHe: 'הודעה לעיתונות',
  description: 'Professional press release',
  descriptionHe: 'הודעה לעיתונות מקצועית',
  category: 'marketing',
  thumbnail: '📰',
  tags: ['עיתונות', 'הודעה', 'יח"צ', 'מדיה'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 80,
  pages: [
    {
      title: 'הודעה לעיתונות',
      sections: [
        {
          type: 'text',
          defaultData: {
            content: '**הודעה לעיתונות**\n\n*לפרסום מיידי* | תאריך: [תאריך]',
          },
        },
        {
          type: 'hero',
          defaultData: {
            title: 'כותרת ראשית חזקה ותמציתית',
            subtitle: 'תת-כותרת שמרחיבה על הכותרת הראשית',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**[עיר], [תאריך]** — פסקה ראשונה שעונה על השאלות: מי, מה, מתי, איפה, למה. המידע החשוב ביותר צריך להיות כאן.',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '> "ציטוט מנציג החברה/הארגון שמוסיף נקודת מבט אישית ואנושית לסיפור."\n>\n> — **[שם]**, [תפקיד], [שם הארגון]',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## פרטים נוספים\n\nפסקה שנייה עם פרטים נוספים, רקע והקשר. מידע שמעמיק את ההבנה של הקורא.\n\nפסקה שלישית עם נתונים, עובדות או תוכניות לעתיד.',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 50, suffix: '%', label: 'נתון רלוונטי' },
              { id: '2', value: 1000, suffix: '+', label: 'נתון רלוונטי' },
              { id: '3', value: 25, label: 'נתון רלוונטי' },
            ],
            animate: false,
            columns: 3,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## אודות [שם הארגון]\n\n[תיאור קצר של הארגון - 2-3 משפטים. מה הארגון עושה, מתי הוקם, מה המשימה שלו.]\n\nלמידע נוסף: [כתובת אתר]',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'solid',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '### ליצירת קשר עם המדיה:\n\n**[שם איש/אשת קשר]**\n[תפקיד]\nטלפון: [מספר]\nדוא"ל: [אימייל]\n\n###',
          },
        },
      ],
    },
  ],
};
