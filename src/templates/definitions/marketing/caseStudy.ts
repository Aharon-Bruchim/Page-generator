import { Template } from '../../../types';

export const caseStudyTemplate: Template = {
  id: 'marketing-case-study',
  name: 'Case Study',
  nameHe: 'Case Study',
  description: 'Customer success story',
  descriptionHe: 'סיפור הצלחה של לקוח',
  category: 'marketing',
  thumbnail: '📊',
  tags: ['case study', 'הצלחה', 'לקוח', 'עדות'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 84,
  pages: [
    {
      title: 'Case Study',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'איך [שם הלקוח] השיג [תוצאה]',
            subtitle: 'Case Study | [תחום/תעשייה]',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 150, suffix: '%', label: 'גידול בהכנסות' },
              { id: '2', value: 50, suffix: '%', label: 'חיסכון בזמן' },
              { id: '3', value: 3, suffix: 'x', label: 'ROI' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'tabs',
          defaultData: {
            tabs: [
              { id: '1', label: 'האתגר', content: '**הבעיה:**\n\n[תיאור המצב ההתחלתי והאתגרים שהלקוח התמודד איתם]\n\n**ההשפעה:**\n\n[איך הבעיה השפיעה על העסק]' },
              { id: '2', label: 'הפתרון', content: '**הגישה:**\n\n[איך ניגשנו לפתרון]\n\n**היישום:**\n\n[מה עשינו בפועל]' },
              { id: '3', label: 'התוצאות', content: '**תוצאות מדידות:**\n\n- תוצאה 1\n- תוצאה 2\n- תוצאה 3\n\n**השפעה ארוכת טווח:**\n\n[מה השתנה לטובה]' },
            ],
            variant: 'horizontal',
          },
        },
        {
          type: 'testimonials',
          defaultData: {
            testimonials: [
              {
                id: '1',
                quote: 'ציטוט מהלקוח שמתאר את החוויה והתוצאות בצורה אותנטית ומשכנעת.',
                authorName: 'שם הלקוח',
                authorRole: 'תפקיד, שם החברה',
                rating: 5,
              },
            ],
            variant: 'single',
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: 'חודש 1', title: 'אפיון וזיהוי', description: 'הבנת הצרכים והאתגרים', icon: '🔍' },
              { id: '2', date: 'חודש 2-3', title: 'יישום', description: 'הטמעת הפתרון', icon: '⚙️' },
              { id: '3', date: 'חודש 4+', title: 'תוצאות', description: 'מדידה ואופטימיזציה', icon: '📈' },
            ],
            variant: 'right',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**המפתח להצלחה:**\n\nמסקנה עיקרית או לקח שאפשר ללמוד מהסיפור הזה.',
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'רוצים תוצאות דומות?',
            url: '#contact',
            variant: 'primary',
            size: 'large',
            alignment: 'center',
          },
        },
      ],
    },
  ],
};
