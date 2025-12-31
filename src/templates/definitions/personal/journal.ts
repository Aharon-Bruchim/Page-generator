import { Template } from '../../../types';

export const journalTemplate: Template = {
  id: 'personal-journal',
  name: 'Journal Entry',
  nameHe: 'יומן',
  description: 'Personal journal entry',
  descriptionHe: 'רשומת יומן אישית',
  category: 'personal',
  thumbnail: '📔',
  tags: ['יומן', 'אישי', 'כתיבה', 'רפלקציה'],
  suggestedPreset: 'minimal',
  suggestedColorMode: 'light',
  popularity: 78,
  pages: [
    {
      title: 'יומן',
      sections: [
        {
          type: 'text',
          defaultData: {
            content: '# יום [X], [תאריך]\n\n**מזג אוויר:** ☀️/🌧️/❄️\n**מצב רוח:** 😊/😐/😔',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'solid',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**✨ רגע טוב מהיום:**\n\n[תאר רגע חיובי שחווית היום]',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## מה קרה היום\n\n[סיפור היום שלך. מה עשית? את מי פגשת? מה חשבת?]\n\n## מה למדתי\n\n[תובנה או לקח מהיום]\n\n## מה אני אסיר/ת תודה עליו\n\n1. [דבר ראשון]\n2. [דבר שני]\n3. [דבר שלישי]',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'dashed',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## מחשבות וכוונות למחר\n\n[מה ברצונך להשיג מחר? על מה לשים דגש?]\n\n---\n\n*"ציטוט מעורר השראה"*',
          },
        },
      ],
    },
  ],
};
