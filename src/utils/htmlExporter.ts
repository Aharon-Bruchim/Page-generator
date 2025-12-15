import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Document, Page, Section, HeroSection, TextSection, ImageSection, HighlightSection, DividerSection } from '../types';
import { createTheme, generateThemeCSS } from '../themes';

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderHeroSection(section: HeroSection): string {
  return `
    <header class="hero" role="banner">
      <h1 class="hero-title">${escapeHtml(section.title) || 'כותרת ראשית'}</h1>
      ${section.subtitle ? `<p class="hero-subtitle">${escapeHtml(section.subtitle)}</p>` : ''}
    </header>
  `;
}

function renderTextSection(section: TextSection): string {
  const paragraphs = section.content
    .split('\n')
    .filter(p => p.trim())
    .map(p => `<p>${escapeHtml(p)}</p>`)
    .join('\n        ');

  return `
    <article class="text-section">
      ${section.heading ? `<h2 class="text-heading">${escapeHtml(section.heading)}</h2>` : ''}
      <div class="text-content">
        ${paragraphs || '<p></p>'}
      </div>
    </article>
  `;
}

function renderImageSection(section: ImageSection, imageIndex: number): { html: string; imageName: string | null } {
  if (!section.src) {
    return {
      html: `
    <figure class="image-section">
      <div class="image-placeholder">אין תמונה</div>
      ${section.caption ? `<figcaption class="image-caption">${escapeHtml(section.caption)}</figcaption>` : ''}
    </figure>
      `,
      imageName: null
    };
  }

  const extension = section.src.split(';')[0].split('/')[1] || 'png';
  const imageName = `image-${imageIndex}.${extension}`;

  return {
    html: `
    <figure class="image-section">
      <img src="images/${imageName}" alt="${escapeHtml(section.alt) || 'תמונה'}" class="image">
      ${section.caption ? `<figcaption class="image-caption">${escapeHtml(section.caption)}</figcaption>` : ''}
    </figure>
    `,
    imageName
  };
}

function renderHighlightSection(section: HighlightSection): string {
  return `
    <blockquote class="highlight">
      <p class="highlight-content">${escapeHtml(section.content) || 'ציטוט או טקסט מודגש'}</p>
      ${section.author ? `<footer class="highlight-author">— ${escapeHtml(section.author)}</footer>` : ''}
    </blockquote>
  `;
}

function renderDividerSection(section: DividerSection): string {
  return `<hr class="divider divider-${section.style}" aria-hidden="true">`;
}

function renderSection(section: Section, imageIndex: number): { html: string; imageName: string | null } {
  switch (section.type) {
    case 'hero':
      return { html: renderHeroSection(section), imageName: null };
    case 'text':
      return { html: renderTextSection(section), imageName: null };
    case 'image':
      return renderImageSection(section, imageIndex);
    case 'highlight':
      return { html: renderHighlightSection(section), imageName: null };
    case 'divider':
      return { html: renderDividerSection(section), imageName: null };
    default:
      return { html: '', imageName: null };
  }
}

function generateNavigation(pages: Page[], currentPageIndex: number): string {
  if (pages.length <= 1) return '';

  const navItems = pages.map((page, index) => {
    const isActive = index === currentPageIndex;
    const fileName = index === 0 ? 'index.html' : `page-${index + 1}.html`;
    return `<a href="${fileName}" class="nav-link${isActive ? ' nav-link-active' : ''}">${escapeHtml(page.title)}</a>`;
  }).join('\n        ');

  return `
    <nav class="page-nav" aria-label="ניווט בין דפים">
      ${navItems}
    </nav>
  `;
}

function generateBaseCSS(): string {
  return `
/* Reset and Base Styles */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height);
  direction: rtl;
}

img {
  max-width: 100%;
  height: auto;
}

/* Page Navigation */
.page-nav {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-link {
  padding: 0.75rem 1.5rem;
  background: var(--color-background);
  border: 2px solid var(--color-border);
  color: var(--color-text);
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.nav-link-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* Main Layout */
.document-container {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: var(--spacing-section) var(--spacing-content);
}

/* Hero Section */
.hero {
  text-align: center;
  padding: var(--spacing-section) var(--spacing-content);
  margin-bottom: var(--spacing-section);
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-background) 100%);
  border-radius: var(--layout-border-radius);
}

.hero-title {
  font-family: var(--font-family-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: var(--line-height-heading);
  color: var(--color-text);
  margin: 0 0 var(--spacing-element) 0;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: var(--color-text-secondary);
  line-height: var(--line-height);
  max-width: 600px;
  margin: 0 auto;
}

/* Text Section */
.text-section {
  padding: var(--spacing-element) 0;
}

.text-heading {
  font-family: var(--font-family-heading);
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  line-height: var(--line-height-heading);
  color: var(--color-text);
  margin: 0 0 var(--spacing-content) 0;
}

.text-content p {
  margin: 0 0 var(--spacing-content) 0;
}

.text-content p:last-child {
  margin-bottom: 0;
}

/* Image Section */
.image-section {
  padding: var(--spacing-element) 0;
  margin: 0;
}

.image {
  width: 100%;
  height: auto;
  border-radius: var(--layout-border-radius);
  display: block;
}

.image-caption {
  margin-top: var(--spacing-content);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  text-align: center;
  font-style: italic;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  background: var(--color-background-secondary);
  border-radius: var(--layout-border-radius);
  color: var(--color-text-secondary);
}

/* Highlight Section */
.highlight {
  margin: var(--spacing-element) 0;
  padding: var(--spacing-element) var(--spacing-section);
  background: var(--color-highlight);
  border-radius: var(--layout-border-radius);
  border-right: 4px solid var(--color-primary);
}

.highlight-content {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  line-height: var(--line-height);
  color: var(--color-highlight-text);
  margin: 0;
  font-style: italic;
}

.highlight-author {
  margin-top: var(--spacing-content);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

/* Divider */
.divider {
  border: none;
  margin: var(--spacing-section) 0;
}

.divider-line {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-divider), transparent);
}

.divider-dots {
  height: 20px;
  background: transparent;
  position: relative;
}

.divider-dots::before {
  content: '• • •';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-divider);
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
}

.divider-space {
  height: var(--spacing-section);
  background: transparent;
}

/* Print Styles */
@media print {
  body {
    background: white;
    color: black;
  }

  .page-nav {
    display: none;
  }

  .document-container {
    max-width: 100%;
    padding: 0;
  }
}
`;
}

function generatePageHTML(doc: Document, page: Page, pageIndex: number, images: Map<string, string>, imageIndexRef: { current: number }): string {
  const sectionsHtml: string[] = [];

  for (const section of page.sections) {
    const { html, imageName } = renderSection(section, imageIndexRef.current);
    sectionsHtml.push(html);

    if (imageName && section.type === 'image' && (section as ImageSection).src) {
      const imgSection = section as ImageSection;
      const base64Data = imgSection.src.split(',')[1];
      images.set(imageName, base64Data);
      imageIndexRef.current++;
    }
  }

  const navigation = generateNavigation(doc.pages, pageIndex);

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(doc.title)} - ${escapeHtml(page.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Heebo:wght@400;500;600;700&family=David+Libre:wght@400;500;700&family=Playfair+Display:wght@400;500;600;700&family=Secular+One&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  ${navigation}
  <main class="document-container" role="main">
    ${sectionsHtml.join('\n    ')}
  </main>
</body>
</html>`;
}

export async function exportToHTML(doc: Document): Promise<void> {
  const zip = new JSZip();
  const theme = createTheme(doc.stylePreset, doc.colorMode);
  const themeCSS = generateThemeCSS(theme);

  const imagesFolder = zip.folder('images');
  const images: Map<string, string> = new Map();
  const imageIndexRef = { current: 0 };

  // Generate HTML for each page
  doc.pages.forEach((page, index) => {
    const html = generatePageHTML(doc, page, index, images, imageIndexRef);
    const fileName = index === 0 ? 'index.html' : `page-${index + 1}.html`;
    zip.file(fileName, html);
  });

  // Add images to ZIP
  images.forEach((base64Data, imageName) => {
    if (imagesFolder) {
      imagesFolder.file(imageName, base64Data, { base64: true });
    }
  });

  const css = `${themeCSS}
${generateBaseCSS()}`;

  zip.file('styles.css', css);

  const blob = await zip.generateAsync({ type: 'blob' });
  const fileName = doc.title.replace(/[^a-zA-Z0-9\u0590-\u05FF]/g, '-') || 'document';
  saveAs(blob, `${fileName}.zip`);
}
