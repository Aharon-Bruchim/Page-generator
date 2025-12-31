import { Template } from '../../../types';

export const cvDesignerTemplate: Template = {
  id: 'career-cv-designer',
  name: 'Designer CV',
  nameHe: 'CV מעצב/ת',
  description: 'Creative CV for designers',
  descriptionHe: 'קורות חיים יצירתיים למעצבים',
  category: 'career',
  thumbnail: '🎨',
  tags: ['מעצב', 'עיצוב', 'יצירתי', 'UX/UI'],
  suggestedPreset: 'creative',
  suggestedColorMode: 'light',
  popularity: 89,
  pages: [
    {
      title: 'CV מעצב/ת',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם מלא',
            subtitle: 'UX/UI Designer | Visual Designer | Brand Expert',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '✨ יוצר/ת חוויות דיגיטליות שאנשים אוהבים\n\n📧 email@example.com | 🎨 behance.net/username | 📱 dribbble.com/username',
          },
        },
        {
          type: 'stats',
          defaultData: {
            items: [
              { id: '1', value: 6, suffix: '+', label: 'שנות עיצוב' },
              { id: '2', value: 150, suffix: '+', label: 'פרויקטים' },
              { id: '3', value: 25, suffix: '+', label: 'מותגים' },
            ],
            animate: true,
            columns: 3,
          },
        },
        {
          type: 'featureList',
          defaultData: {
            features: [
              { id: '1', icon: '🎯', title: 'UX Design', description: 'User Research, Wireframes, Prototyping' },
              { id: '2', icon: '💎', title: 'UI Design', description: 'Visual Design, Design Systems, Responsive' },
              { id: '3', icon: '✏️', title: 'Brand Design', description: 'Logo, Identity, Guidelines' },
              { id: '4', icon: '📱', title: 'Mobile Design', description: 'iOS, Android, Cross-platform' },
            ],
            columns: 2,
          },
        },
        {
          type: 'gallery',
          defaultData: {
            images: [
              { id: '1', src: '', alt: 'עבודה 1', caption: 'פרויקט מיתוג | לקוח' },
              { id: '2', src: '', alt: 'עבודה 2', caption: 'עיצוב אפליקציה | לקוח' },
              { id: '3', src: '', alt: 'עבודה 3', caption: 'אתר | לקוח' },
            ],
            columns: 3,
            enableLightbox: true,
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: '2021 - היום', title: 'Lead Designer', description: 'Studio/Agency Name', icon: '⭐' },
              { id: '2', date: '2018 - 2021', title: 'Senior UX Designer', description: 'Company Name', icon: '🎨' },
              { id: '3', date: '2016 - 2018', title: 'UI Designer', description: 'Company Name', icon: '🌱' },
            ],
            variant: 'alternating',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## כלים\n\nFigma • Sketch • Adobe XD • Photoshop • Illustrator • After Effects • Principle\n\n## השכלה\n\n**B.Des Visual Communication** | שנקר | 2016',
          },
        },
      ],
    },
  ],
};
