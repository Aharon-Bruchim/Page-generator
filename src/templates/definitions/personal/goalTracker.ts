import { Template } from '../../../types';

export const goalTrackerTemplate: Template = {
  id: 'personal-goal-tracker',
  name: 'Goal Tracker',
  nameHe: 'מעקב מטרות',
  description: 'Personal goal tracking',
  descriptionHe: 'מעקב מטרות אישיות',
  category: 'personal',
  thumbnail: '🎯',
  tags: ['מטרות', 'יעדים', 'מעקב', 'התפתחות'],
  suggestedPreset: 'modern',
  suggestedColorMode: 'light',
  popularity: 83,
  pages: [
    {
      title: 'מטרות',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '🎯 המטרות שלי',
            subtitle: 'שנת [שנה] | רבעון [X]',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**החזון שלי:**\n\n[משפט אחד שמתאר את החזון הגדול שלך לשנה הזו]',
          },
        },
        {
          type: 'tabs',
          defaultData: {
            tabs: [
              { id: '1', label: 'קריירה', content: '**מטרה:** [תיאור]\n\n**למה זה חשוב:** [סיבה]\n\n**צעדים:**\n1. צעד ראשון\n2. צעד שני\n3. צעד שלישי' },
              { id: '2', label: 'בריאות', content: '**מטרה:** [תיאור]\n\n**למה זה חשוב:** [סיבה]\n\n**צעדים:**\n1. צעד ראשון\n2. צעד שני\n3. צעד שלישי' },
              { id: '3', label: 'אישי', content: '**מטרה:** [תיאור]\n\n**למה זה חשוב:** [סיבה]\n\n**צעדים:**\n1. צעד ראשון\n2. צעד שני\n3. צעד שלישי' },
            ],
            variant: 'horizontal',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 3, label: 'מטרות עיקריות' },
              { id: '2', value: 0, suffix: '%', label: 'התקדמות כוללת' },
              { id: '3', value: 90, label: 'ימים נותרו' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: '📅 משימות שבועיות', content: '- [ ] משימה 1\n- [ ] משימה 2\n- [ ] משימה 3' },
              { id: '2', title: '🏆 הישגים עד כה', content: '- הישג 1\n- הישג 2' },
              { id: '3', title: '🚧 אתגרים', content: '- אתגר 1 ואיך להתמודד\n- אתגר 2 ואיך להתמודד' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: 'רבעון 1', title: 'שלב התחלתי', description: 'הנחת יסודות', icon: '🌱' },
              { id: '2', date: 'רבעון 2', title: 'בנייה', description: 'יצירת הרגלים', icon: '🔨' },
              { id: '3', date: 'רבעון 3', title: 'שיפור', description: 'אופטימיזציה', icon: '📈' },
              { id: '4', date: 'רבעון 4', title: 'סיום', description: 'השגת המטרה!', icon: '🎉' },
            ],
            variant: 'alternating',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '---\n\n**עדכון אחרון:** [תאריך]\n\n*"הדרך של אלף מיילים מתחילה בצעד אחד"*',
          },
        },
      ],
    },
  ],
};
