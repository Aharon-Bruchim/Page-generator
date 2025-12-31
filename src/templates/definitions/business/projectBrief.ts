import { Template } from '../../../types';

export const projectBriefTemplate: Template = {
  id: 'business-project-brief',
  name: 'Project Brief',
  nameHe: 'תקציר פרויקט',
  description: 'Concise project brief template',
  descriptionHe: 'תבנית תקציר פרויקט ממוקדת',
  category: 'business',
  thumbnail: '📋',
  tags: ['פרויקט', 'תקציר', 'תכנון', 'ניהול'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 85,
  pages: [
    {
      title: 'תקציר פרויקט',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם הפרויקט',
            subtitle: 'תקציר מנהלים',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: 'מטרת הפרויקט: תיאור קצר של מטרת הפרויקט והתוצאות הצפויות.',
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: 'רקע', content: 'תיאור הרקע והצורך בפרויקט. מהי הבעיה שהפרויקט בא לפתור?' },
              { id: '2', title: 'יעדים', content: '- יעד 1\n- יעד 2\n- יעד 3' },
              { id: '3', title: 'היקף הפרויקט', content: 'מה כלול בפרויקט ומה לא כלול. גבולות ברורים.' },
              { id: '4', title: 'אבני דרך', content: 'שלבי הפרויקט ולוחות זמנים משוערים.' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: 'שבוע 1-2', title: 'שלב התכנון', description: 'אפיון ותכנון מפורט' },
              { id: '2', date: 'שבוע 3-6', title: 'שלב הפיתוח', description: 'ביצוע ופיתוח' },
              { id: '3', date: 'שבוע 7-8', title: 'בדיקות', description: 'בדיקות ותיקונים' },
              { id: '4', date: 'שבוע 9', title: 'השקה', description: 'עלייה לאוויר' },
            ],
            variant: 'right',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## צוות הפרויקט\n\n- **מנהל פרויקט:** שם\n- **מוביל טכני:** שם\n- **נציג לקוח:** שם',
          },
        },
      ],
    },
  ],
};
