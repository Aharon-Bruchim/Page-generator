import { Template } from '../../../types';

export const syllabusTemplate: Template = {
  id: 'education-syllabus',
  name: 'Syllabus',
  nameHe: 'תכנית לימודים',
  description: 'Academic syllabus template',
  descriptionHe: 'תבנית תכנית לימודים',
  category: 'education',
  thumbnail: '📖',
  tags: ['תכנית', 'לימודים', 'שנתי', 'אקדמי'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 85,
  pages: [
    {
      title: 'תכנית לימודים',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'תכנית לימודים שנתית',
            subtitle: 'מקצוע: [שם] | כיתה: [X]',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**מורה:** [שם]\n**שנת לימודים:** תשפ"ה\n**היקף שעות שנתי:** [X] שעות',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**מטרות העל**\n\n- פיתוח חשיבה ביקורתית\n- רכישת ידע בתחום\n- יישום בחיי היומיום',
          },
        },
        {
          type: 'tabs',
          defaultData: {
            tabs: [
              { id: '1', label: 'סמסטר א׳', content: '**יחידה 1:** נושא (X שעות)\n**יחידה 2:** נושא (X שעות)\n**יחידה 3:** נושא (X שעות)' },
              { id: '2', label: 'סמסטר ב׳', content: '**יחידה 4:** נושא (X שעות)\n**יחידה 5:** נושא (X שעות)\n**יחידה 6:** נושא (X שעות)' },
            ],
            variant: 'horizontal',
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: 'שיטות הוראה', content: '- הרצאות פרונטליות\n- דיונים בכיתה\n- עבודה בקבוצות\n- למידה מונחית מחשב' },
              { id: '2', title: 'שיטות הערכה', content: '- מבחנים\n- עבודות\n- פרויקטים\n- הערכת עמיתים' },
              { id: '3', title: 'חומרי לימוד', content: '- ספר לימוד\n- חוברת עבודה\n- משאבים דיגיטליים' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## לוח זמנים\n\n| חודש | נושא | הערות |\n|------|------|-------|\n| ספטמבר | מבוא | |\n| אוקטובר | יחידה 1 | |\n| נובמבר | יחידה 2 | מבחן |\n\n## התאמות והנגשה\n\nהתאמות יינתנו בהתאם לצורך',
          },
        },
      ],
    },
  ],
};
