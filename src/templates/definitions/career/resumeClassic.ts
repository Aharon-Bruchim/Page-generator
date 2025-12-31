import { Template } from '../../../types';

export const resumeClassicTemplate: Template = {
  id: 'career-resume-classic',
  name: 'Classic Resume',
  nameHe: 'קורות חיים קלאסי',
  description: 'Traditional professional resume',
  descriptionHe: 'קורות חיים מסורתיים ומקצועיים',
  category: 'career',
  thumbnail: '📄',
  tags: ['קורות חיים', 'CV', 'מקצועי', 'עבודה'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 98,
  pages: [
    {
      title: 'קורות חיים',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם מלא',
            subtitle: 'תפקיד / תואר מקצועי',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '📧 email@example.com | 📱 050-1234567 | 📍 תל אביב | 🔗 linkedin.com/in/username',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**אודות**\n\nתיאור קצר של עצמך, הניסיון שלך והיעדים המקצועיים. 2-3 משפטים שמתארים את הערך שאתה מביא.',
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: '2022 - היום', title: 'תפקיד נוכחי', description: 'שם החברה\n- הישג מרכזי 1\n- הישג מרכזי 2', icon: '💼' },
              { id: '2', date: '2019 - 2022', title: 'תפקיד קודם', description: 'שם החברה\n- הישג מרכזי 1\n- הישג מרכזי 2', icon: '💼' },
              { id: '3', date: '2016 - 2019', title: 'תפקיד התחלתי', description: 'שם החברה\n- הישג מרכזי 1', icon: '💼' },
            ],
            variant: 'right',
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
            content: '## השכלה\n\n**תואר ראשון/שני** - שם המוסד | שנים\nתחום הלימוד, ציון גמר',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '⭐', title: 'מיומנות 1', description: 'רמת מומחיות' },
              { id: '2', icon: '⭐', title: 'מיומנות 2', description: 'רמת מומחיות' },
              { id: '3', icon: '⭐', title: 'מיומנות 3', description: 'רמת מומחיות' },
            ],
            columns: 3,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## שפות\n\n- עברית - שפת אם\n- אנגלית - רמה גבוהה\n\n## קורסים והכשרות\n\n- שם הקורס | מוסד | שנה',
          },
        },
      ],
    },
  ],
};
