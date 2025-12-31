import { Template } from '../../../types';

export const invoiceTemplate: Template = {
  id: 'business-invoice',
  name: 'Invoice',
  nameHe: 'חשבונית',
  description: 'Professional invoice template',
  descriptionHe: 'תבנית חשבונית מקצועית',
  category: 'business',
  thumbnail: '🧾',
  tags: ['חשבונית', 'תשלום', 'פיננסי', 'עסק'],
  suggestedPreset: 'professional',
  suggestedColorMode: 'light',
  popularity: 88,
  pages: [
    {
      title: 'חשבונית',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'חשבונית מס',
            subtitle: 'שם העסק שלך',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**מספר חשבונית:** INV-001\n**תאריך:** [תאריך]\n**תאריך תשלום:** [תאריך]\n\n---\n\n**פרטי הספק:**\nשם העסק\nרחוב כתובת 123\nע.מ. / ח.פ. 123456789\n\n**פרטי הלקוח:**\nשם הלקוח\nכתובת הלקוח',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'solid',
          },
        },
        {
          type: 'pricingTable',
          defaultData: {
            plans: [
              {
                id: '1',
                name: 'פירוט השירותים',
                price: '',
                features: [
                  { text: 'שירות/מוצר 1 - ₪500', included: true },
                  { text: 'שירות/מוצר 2 - ₪300', included: true },
                  { text: 'שירות/מוצר 3 - ₪200', included: true },
                ],
                isHighlighted: false,
                ctaText: '',
              },
            ],
            currency: '₪',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**סה"כ לפני מע"מ:** ₪1,000\n**מע"מ (17%):** ₪170\n**סה"כ לתשלום:** ₪1,170',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '**אמצעי תשלום:**\n- העברה בנקאית: בנק הפועלים, סניף 123, חשבון 456789\n- צ\'ק לפקודת: שם העסק\n- ביט/פייבוקס: 050-1234567\n\n*תודה על עסקתך!*',
          },
        },
      ],
    },
  ],
};
