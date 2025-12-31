import { Template } from '../../../types';

export const blogPostTemplate: Template = {
  id: 'marketing-blog-post',
  name: 'Blog Post',
  nameHe: 'פוסט בלוג',
  description: 'Engaging blog post structure',
  descriptionHe: 'מבנה פוסט בלוג מושך',
  category: 'marketing',
  thumbnail: '✍️',
  tags: ['בלוג', 'תוכן', 'כתיבה', 'SEO'],
  suggestedPreset: 'minimal',
  suggestedColorMode: 'light',
  popularity: 88,
  pages: [
    {
      title: 'פוסט בלוג',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'כותרת מושכת שמכילה מילות מפתח',
            subtitle: 'מאת [שם הכותב] | [תאריך] | [קטגוריה]',
          },
        },
        {
          type: 'image',
          defaultData: {
            src: '',
            alt: 'תמונה ראשית',
            caption: 'קרדיט לתמונה',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**TL;DR** (סיכום בשורה)\n\nהמסר המרכזי של הפוסט ב-2-3 משפטים.',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## מבוא\n\nפסקת פתיחה שמושכת את הקורא ומציגה את הנושא. למה זה רלוונטי? למה כדאי להמשיך לקרוא?\n\nבפוסט הזה נלמד:\n- נקודה 1\n- נקודה 2\n- נקודה 3',
          },
        },
        {
          type: 'divider',
          defaultData: {
            style: 'dashed',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## נושא ראשון\n\nתוכן מעמיק על הנושא הראשון. השתמש בדוגמאות, נתונים וסיפורים.\n\n### תת-נושא\n\nפירוט נוסף...',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '💡 **טיפ חשוב:**\n\nמשהו שכדאי לזכור או ליישם.',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## נושא שני\n\nהמשך התוכן. גיוון בפורמט שומר על עניין.\n\n> "ציטוט רלוונטי מאדם מוכר"',
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '1️⃣', title: 'צעד ראשון', description: 'הסבר' },
              { id: '2', icon: '2️⃣', title: 'צעד שני', description: 'הסבר' },
              { id: '3', icon: '3️⃣', title: 'צעד שלישי', description: 'הסבר' },
            ],
            columns: 1,
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## סיכום\n\nחזרה על הנקודות המרכזיות. מה הקורא צריך לקחת מהפוסט הזה?\n\n---\n\n**מה אתם חושבים?** שתפו בתגובות!\n\n---\n\n*תגיות: #תג1 #תג2 #תג3*',
          },
        },
        {
          type: 'ctaButton',
          defaultData: {
            text: 'הירשם לניוזלטר',
            url: '#subscribe',
            variant: 'outline',
            size: 'medium',
            alignment: 'center',
          },
        },
      ],
    },
  ],
};
