import { Template } from '../../../types';

export const cvDeveloperTemplate: Template = {
  id: 'career-cv-developer',
  name: 'Developer CV',
  nameHe: 'CV מפתח/ת',
  description: 'Technical CV for software developers',
  descriptionHe: 'קורות חיים טכניים למפתחים',
  category: 'career',
  thumbnail: '👨‍💻',
  tags: ['מפתח', 'טכני', 'תוכנה', 'פיתוח'],
  suggestedPreset: 'modern',
  suggestedColorMode: 'dark',
  popularity: 94,
  pages: [
    {
      title: 'CV מפתח/ת',
      sections: [
        {
          type: 'hero',
          defaultData: {
            title: 'שם מלא',
            subtitle: 'Full Stack Developer | React | Node.js | TypeScript',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '📧 email@example.com | 📱 050-1234567 | 🌐 github.com/username | 💼 linkedin.com/in/username',
          },
        },
        {
          type: 'highlight',
          defaultData: {
            content: '**Summary**\n\nמפתח/ת Full Stack עם X שנות ניסיון בפיתוח אפליקציות web. מתמחה ב-React, Node.js ו-TypeScript. תשוקה לכתיבת קוד נקי, ארכיטקטורה נכונה ו-best practices.',
          },
        },
        {
          type: 'tabs',
          defaultData: {
            tabs: [
              { id: '1', label: 'Frontend', content: 'React, TypeScript, Next.js, Redux, TailwindCSS, HTML5, CSS3, Jest' },
              { id: '2', label: 'Backend', content: 'Node.js, Express, Python, PostgreSQL, MongoDB, Redis, GraphQL, REST API' },
              { id: '3', label: 'DevOps', content: 'Docker, Kubernetes, AWS, CI/CD, Git, Linux, Nginx' },
            ],
            variant: 'horizontal',
          },
        },
        {
          type: 'timeline',
          defaultData: {
            items: [
              { id: '1', date: '2022 - היום', title: 'Senior Developer', description: 'Company Name\n• הובלת פיתוח מערכת X\n• שיפור ביצועים ב-40%\n• Tech: React, Node, AWS', icon: '🚀' },
              { id: '2', date: '2019 - 2022', title: 'Full Stack Developer', description: 'Company Name\n• פיתוח מא׳ ועד ת׳\n• עבודה ב-Agile\n• Tech: Vue, Django', icon: '💻' },
              { id: '3', date: '2017 - 2019', title: 'Junior Developer', description: 'Company Name\n• פיתוח פיצ׳רים\n• Tech: JavaScript, PHP', icon: '🌱' },
            ],
            variant: 'right',
          },
        },
        {
          type: 'text',
          defaultData: {
            content: '## Projects\n\n**🔗 Project Name** | [github.com/...]()\nתיאור קצר. Tech: React, Node, MongoDB\n\n**🔗 Project Name** | [github.com/...]()\nתיאור קצר. Tech: Python, FastAPI\n\n## Education\n\n**B.Sc Computer Science** | אוניברסיטת תל אביב | 2017',
          },
        },
      ],
    },
  ],
};
