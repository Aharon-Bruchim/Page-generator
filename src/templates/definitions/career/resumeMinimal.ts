import { Template } from '../../../types';

export const resumeMinimalTemplate: Template = {
  id: 'career-resume-minimal',
  name: 'Minimal Resume',
  nameHe: 'קורות חיים מינימלי',
  description: 'Clean and minimal resume design',
  descriptionHe: 'קורות חיים נקיים ומינימליסטיים',
  category: 'career',
  thumbnail: '📝',
  tags: ['קורות חיים', 'מינימלי', 'נקי', 'פשוט'],
  suggestedPreset: 'minimal',
  suggestedColorMode: 'light',
  popularity: 88,
  pages: [
    {
      title: 'קורות חיים',
      sections: [
        {
          type: 'text',
          defaultData: {
            content: '# שם מלא\n\n**תפקיד מקצועי**\n\nemail@example.com • 050-1234567 • תל אביב',
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
            content: '## פרופיל\n\nתיאור תמציתי של הניסיון והמומחיות שלך ב-2-3 שורות.',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## ניסיון תעסוקתי\n\n**תפקיד נוכחי** | שם החברה | 2022-היום\n- הישג מרכזי עם תוצאות מדידות\n- הישג נוסף\n\n**תפקיד קודם** | שם החברה | 2019-2022\n- הישג מרכזי\n- הישג נוסף',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## השכלה\n\n**תואר** | מוסד לימודים | שנה\n\n## מיומנויות\n\nמיומנות 1 • מיומנות 2 • מיומנות 3 • מיומנות 4\n\n## שפות\n\nעברית (שפת אם) • אנגלית (גבוהה)',
          },
        },
      ],
    },
  ],
};
