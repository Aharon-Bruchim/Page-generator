import { Template } from '../../../types';

export const lessonPlanTemplate: Template = {
  id: 'education-lesson-plan',
  name: 'Lesson Plan',
  nameHe: 'מערך שיעור',
  description: 'Structured lesson plan template',
  descriptionHe: 'תבנית מערך שיעור מובנה',
  category: 'education',
  thumbnail: '📚',
  tags: ['שיעור', 'תכנון', 'הוראה', 'למידה'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 92,
  pages: [
    {
      title: 'מערך שיעור',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם השיעור',
            subtitle: 'מקצוע | כיתה | משך: 45 דקות',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**מטרות השיעור**\n\nבסיום השיעור התלמידים יוכלו:\n- מטרה 1\n- מטרה 2\n- מטרה 3',
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: 'רקע וידע קודם', content: 'מה התלמידים צריכים לדעת לפני השיעור?' },
              { id: '2', title: 'חומרים ואמצעים', content: '- ספר לימוד עמודים X-Y\n- דפי עבודה\n- מחשב/מקרן\n- לוח' },
              { id: '3', title: 'מילות מפתח', content: 'מונח 1, מונח 2, מונח 3' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: '5 דק׳', title: 'פתיחה', description: 'שאלת פתיחה / סיפור / הקשר לחיים', icon: '🎯' },
              { id: '2', date: '15 דק׳', title: 'הצגת החומר', description: 'הסבר מרכזי, דוגמאות, הדגמה', icon: '📖' },
              { id: '3', date: '15 דק׳', title: 'תרגול', description: 'עבודה עצמאית / קבוצתית', icon: '✏️' },
              { id: '4', date: '10 דק׳', title: 'סיכום', description: 'חזרה על עיקרי הדברים, שאלות', icon: '✅' },
            ],
            variant: 'right',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## הערכה\n\n- שאלות בכיתה\n- דף עבודה\n- שיעורי בית\n\n## התאמות\n\n**לתלמידים מתקשים:**\n- התאמה 1\n\n**לתלמידים מצטיינים:**\n- העשרה 1\n\n## הערות\n\n[הערות נוספות לשיעור]',
          },
        },
      ],
    },
  ],
};
