import { Template } from '../../../types';

export const proposalTemplate: Template = {
  id: 'business-proposal',
  name: 'Business Proposal',
  nameHe: 'הצעת מחיר',
  description: 'Professional business proposal template',
  descriptionHe: 'תבנית מקצועית להצעת מחיר עסקית',
  category: 'business',
  thumbnail: '💼',
  tags: ['עסקי', 'הצעה', 'מחיר', 'מכירות'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 95,
  pages: [
    {
      title: 'הצעת מחיר',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'הצעת מחיר',
            subtitle: 'שם החברה שלך',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: 'לכבוד: [שם הלקוח]\n\nתודה על פנייתך. להלן הצעת המחיר המפורטת עבור הפרויקט המבוקש.',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '✓', title: 'שירות/מוצר 1', description: 'תיאור השירות הראשון' },
              { id: '2', icon: '✓', title: 'שירות/מוצר 2', description: 'תיאור השירות השני' },
              { id: '3', icon: '✓', title: 'שירות/מוצר 3', description: 'תיאור השירות השלישי' },
            ],
            columns: 1,
          },
        },
        {
          type: 'pricingTable',
          defaultData: {
            plans: [
              {
                id: '1',
                name: 'חבילה בסיסית',
                price: '₪1,000',
                features: [
                  { text: 'תכונה 1', included: true },
                  { text: 'תכונה 2', included: true },
                  { text: 'תכונה 3', included: false },
                ],
                isHighlighted: false,
                ctaText: 'בחר חבילה',
              },
              {
                id: '2',
                name: 'חבילה מקצועית',
                price: '₪2,500',
                features: [
                  { text: 'תכונה 1', included: true },
                  { text: 'תכונה 2', included: true },
                  { text: 'תכונה 3', included: true },
                ],
                isHighlighted: true,
                ctaText: 'בחר חבילה',
              },
            ],
            currency: '₪',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**תנאי תשלום:**\n- 50% מקדמה עם חתימת ההסכם\n- 50% עם סיום הפרויקט\n\n**תוקף ההצעה:** 30 ימים',
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'אשר הצעה',
            url: '#',
            variant: 'primary',
            size: 'large',
            alignment: 'center',
          },
        },
      ],
    },
  ],
};
