import { Template } from '../../../types';

export const recipeTemplate: Template = {
  id: 'personal-recipe',
  name: 'Recipe',
  nameHe: 'מתכון',
  description: 'Recipe card template',
  descriptionHe: 'תבנית כרטיס מתכון',
  category: 'personal',
  thumbnail: '🍳',
  tags: ['מתכון', 'בישול', 'אוכל', 'מטבח'],
  suggestedPreset: 'minimal',
  suggestedColorMode: 'light',
  popularity: 85,
  pages: [
    {
      title: 'מתכון',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '🍽️ שם המתכון',
            subtitle: '[קטגוריה] | [רמת קושי] | [זמן הכנה]',
          },
        },
        {
          type: 'image',
          defaultData: {
            src: '',
            alt: 'תמונת המנה',
            caption: '',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 30, suffix: ' דק׳', label: 'הכנה' },
              { id: '2', value: 45, suffix: ' דק׳', label: 'בישול' },
              { id: '3', value: 4, label: 'מנות' },
            ],
            animate: false,
            columns: 3,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## תיאור\n\nתיאור קצר של המנה, מאיפה היא, למה היא מיוחדת.',
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: '🛒 מצרכים', content: '- מצרך 1 - כמות\n- מצרך 2 - כמות\n- מצרך 3 - כמות\n- מצרך 4 - כמות\n- מצרך 5 - כמות' },
              { id: '2', title: '📝 הערות והמלצות', content: '- טיפ 1\n- טיפ 2\n- תחליף אפשרי' },
            ],
            allowMultiple: true,
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: 'שלב 1', title: 'הכנה מקדימה', description: 'לקצוץ את הירקות, להכין את המצרכים', icon: '1️⃣' },
              { id: '2', date: 'שלב 2', title: 'בישול', description: 'לחמם מחבת, להוסיף שמן...', icon: '2️⃣' },
              { id: '3', date: 'שלב 3', title: 'המשך', description: 'להוסיף את שאר המצרכים...', icon: '3️⃣' },
              { id: '4', date: 'שלב 4', title: 'הגשה', description: 'להגיש חם עם תוספות', icon: '4️⃣' },
            ],
            variant: 'right',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**💡 טיפ של שף:**\n\nטיפ מיוחד שישדרג את המנה',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '---\n\n*בתיאבון!* 🍽️\n\n*מתכון של: [שם]*',
          },
        },
      ],
    },
  ],
};
