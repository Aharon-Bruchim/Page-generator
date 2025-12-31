import { Template } from '../../../types';

export const travelItineraryTemplate: Template = {
  id: 'personal-travel-itinerary',
  name: 'Travel Itinerary',
  nameHe: 'תכנון טיול',
  description: 'Travel planning itinerary',
  descriptionHe: 'תבנית תכנון טיול',
  category: 'personal',
  thumbnail: '✈️',
  tags: ['טיול', 'נסיעה', 'תכנון', 'חופשה'],
  suggestedPreset: 'modern',
  suggestedColorMode: 'light',
  popularity: 87,
  pages: [
    {
      title: 'סקירה',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '✈️ טיול ל[יעד]',
            subtitle: '[תאריכים] | [מספר] ימים',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 7, label: 'ימים' },
              { id: '2', value: 5, label: 'ערים' },
              { id: '3', value: 15, label: 'אטרקציות' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '✈️', title: 'טיסות', description: '[פרטי טיסה]' },
              { id: '2', icon: '🏨', title: 'לינה', description: '[שם המלון]' },
              { id: '3', icon: '🚗', title: 'תחבורה', description: '[רכב/רכבת]' },
            ],
            columns: 3,
          },
        },
        {
          type: 'mapEmbed',
          defaultData: {
            address: '[יעד]',
            zoom: 8,
            height: 300,
          },
        },
      ],
    },
    {
      title: 'יום 1-2',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'יום 1-2: [עיר]',
            subtitle: '',
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: 'בוקר', title: 'הגעה והתארגנות', description: 'צ׳ק-אין במלון, מנוחה קצרה', icon: '🌅' },
              { id: '2', date: 'צהריים', title: 'סיור בעיר', description: '[אטרקציה 1], [אטרקציה 2]', icon: '🏛️' },
              { id: '3', date: 'ערב', title: 'ארוחת ערב', description: '[שם מסעדה]', icon: '🍽️' },
            ],
            variant: 'right',
          },
        },
        {
          type: 'accordion',
          defaultData: {
            items: [
              { id: '1', title: '📍 מקומות לבקר', content: '- מקום 1\n- מקום 2\n- מקום 3' },
              { id: '2', title: '🍴 איפה לאכול', content: '- מסעדה 1\n- מסעדה 2' },
              { id: '3', title: '💰 תקציב משוער', content: 'כניסות: $X\nאוכל: $X\nתחבורה: $X' },
            ],
            allowMultiple: true,
          },
        },
      ],
    },
    {
      title: 'יום 3-4',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'יום 3-4: [עיר/אזור]',
            subtitle: '',
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: 'בוקר', title: 'יציאה לטיול יום', description: '[תיאור]', icon: '🌄' },
              { id: '2', date: 'צהריים', title: 'פעילות', description: '[תיאור]', icon: '🎯' },
              { id: '3', date: 'ערב', title: 'חזרה ללינה', description: '[תיאור]', icon: '🌙' },
            ],
            variant: 'right',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**💡 טיפ:**\n\nטיפ שימושי לאזור הזה',
          },
        },
      ],
    },
    {
      title: 'רשימות',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: '📝 רשימות וטיפים',
            subtitle: '',
          },
        },
        {
          type: 'tabs',
          defaultData: {
            tabs: [
              { id: '1', label: 'מה לארוז', content: '**בגדים:**\n- פריט 1\n- פריט 2\n\n**מסמכים:**\n- דרכון\n- ביטוח נסיעות\n- הזמנות' },
              { id: '2', label: 'אפליקציות', content: '- Maps.me (מפות אופליין)\n- Google Translate\n- XE (המרת מטבע)\n- TripIt' },
              { id: '3', label: 'מספרי חירום', content: '- שגרירות: XXX\n- חירום: XXX\n- ביטוח: XXX' },
            ],
            variant: 'horizontal',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## תקציב כולל\n\n| פריט | סכום |\n|------|------|\n| טיסות | $XXX |\n| לינה | $XXX |\n| אטרקציות | $XXX |\n| אוכל | $XXX |\n| **סה"כ** | **$XXX** |',
          },
        },
      ],
    },
  ],
};
