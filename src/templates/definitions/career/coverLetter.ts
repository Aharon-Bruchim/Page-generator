import { Template } from '../../../types';

export const coverLetterTemplate: Template = {
  id: 'career-cover-letter',
  name: 'Cover Letter',
  nameHe: 'מכתב מלווה',
  description: 'Professional cover letter template',
  descriptionHe: 'תבנית מכתב מלווה מקצועי',
  category: 'career',
  thumbnail: '✉️',
  tags: ['מכתב', 'מלווה', 'עבודה', 'פנייה'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 85,
  pages: [
    {
      title: 'מכתב מלווה',
      sections: [
        {
          type: 'text',
          defaultData: {
            content: '**שם מלא**\nכתובת מלאה\nטלפון: 050-1234567\nדוא"ל: email@example.com\n\nתאריך: [תאריך]',
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
            content: 'לכבוד\n[שם המגייס/ת]\n[שם החברה]\n[כתובת]\n\n**הנדון: מועמדות לתפקיד [שם התפקיד]**',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: 'שלום רב,\n\nאני פונה אליכם בעקבות המשרה שפורסמה ל[שם התפקיד]. לאחר שקראתי את דרישות התפקיד, אני משוכנע/ת שהרקע והניסיון שלי מתאימים מאוד לאתגר.\n\n**למה אני?**\n\nבתפקידי הנוכחי/הקודם ב[שם החברה], הובלתי [הישג מרכזי]. ניסיון זה פיתח אצלי יכולות [מיומנויות רלוונטיות] שיתרמו לצוות שלכם.\n\n**מה אני מביא:**\n\n- ניסיון של [X] שנים בתחום\n- יכולת [מיומנות ספציפית]\n- תשוקה ל[תחום רלוונטי]\n\nאשמח להזדמנות לפגוש אתכם ולשמוע עוד על האתגרים והחזון של החברה.',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: 'בברכה,\n\n[שם מלא]\n\n---\n\n*מצורפים קורות חיים לעיונכם*',
          },
        },
      ],
    },
  ],
};
