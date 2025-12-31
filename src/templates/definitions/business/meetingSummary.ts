import { Template } from '../../../types';

export const meetingSummaryTemplate: Template = {
  id: 'business-meeting-summary',
  name: 'Meeting Summary',
  nameHe: 'סיכום פגישה',
  description: 'Professional meeting minutes template',
  descriptionHe: 'תבנית סיכום פגישה מקצועית',
  category: 'business',
  thumbnail: '📝',
  tags: ['פגישה', 'סיכום', 'פרוטוקול', 'ישיבה'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 80,
  pages: [
    {
      title: 'סיכום פגישה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'סיכום פגישה',
            subtitle: 'תאריך: [הכנס תאריך]',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**נושא הפגישה:** [נושא]\n\n**משתתפים:**\n- שם 1\n- שם 2\n- שם 3\n\n**מקום:** [מיקום/זום]',
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
              { id: '1', title: 'סדר יום', content: '1. פתיחה\n2. סקירת התקדמות\n3. דיון בנושאים פתוחים\n4. סיכום והחלטות' },
              { id: '2', title: 'דיון עיקרי', content: 'תיאור הנושאים שנדונו בפגישה.' },
              { id: '3', title: 'החלטות', content: '- החלטה 1\n- החלטה 2\n- החלטה 3' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**משימות להמשך:**\n\n1. [משימה] - אחראי: [שם] - תאריך יעד: [תאריך]\n2. [משימה] - אחראי: [שם] - תאריך יעד: [תאריך]',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**פגישה הבאה:** [תאריך ושעה]\n\n---\n\n*סיכום זה נכתב על ידי [שם]*',
          },
        },
      ],
    },
  ],
};
