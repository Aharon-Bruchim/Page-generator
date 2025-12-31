import { Template } from '../../../types';

export const contractTemplate: Template = {
  id: 'business-contract',
  name: 'Contract',
  nameHe: 'חוזה/הסכם',
  description: 'Business contract template',
  descriptionHe: 'תבנית חוזה עסקי',
  category: 'business',
  thumbnail: '📄',
  tags: ['חוזה', 'הסכם', 'משפטי', 'עסק'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 82,
  pages: [
    {
      title: 'הסכם התקשרות',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'הסכם התקשרות',
            subtitle: 'שנערך ונחתם ביום [תאריך]',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**בין:**\n[שם הצד הראשון]\nע.מ./ח.פ. [מספר]\nמרחוב [כתובת]\n(להלן: "הספק")\n\n**לבין:**\n[שם הצד השני]\nע.מ./ח.פ. [מספר]\nמרחוב [כתובת]\n(להלן: "הלקוח")',
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
              { id: '1', title: '1. הואיל', content: 'והספק עוסק ב[תחום העיסוק];\nוהלקוח מעוניין לקבל שירותים מהספק;\nולפיכך הוסכם בין הצדדים כדלקמן:' },
              { id: '2', title: '2. מהות ההסכם', content: 'הספק יספק ללקוח את השירותים הבאים:\n- שירות 1\n- שירות 2\n- שירות 3' },
              { id: '3', title: '3. תקופת ההסכם', content: 'הסכם זה יהיה בתוקף מיום [תאריך התחלה] ועד [תאריך סיום].' },
              { id: '4', title: '4. תמורה ותנאי תשלום', content: 'בתמורה לשירותים, ישלם הלקוח לספק סך של ₪[סכום].\nהתשלום יבוצע ב[תנאי תשלום].' },
              { id: '5', title: '5. סודיות', content: 'כל צד מתחייב לשמור בסודיות כל מידע שיימסר לו על ידי הצד השני.' },
              { id: '6', title: '6. סיום ההסכם', content: 'כל צד רשאי לסיים הסכם זה בהודעה מוקדמת של [מספר] ימים.' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '---\n\n**ולראיה באו הצדדים על החתום:**\n\n\n__________________          __________________\nהספק                                    הלקוח\n\nתאריך: ____________',
          },
        },
      ],
    },
  ],
};
