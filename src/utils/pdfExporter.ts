import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Page, Section, HeroSection, TextSection, ImageSection, HighlightSection, DividerSection } from '../types';
import { createTheme, themeToCSSVariables } from '../themes';

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderHeroSectionHTML(section: HeroSection): string {
  return `
    <header style="text-align: center; padding: 2rem 1rem; margin-bottom: 2rem; background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-background) 100%); border-radius: 12px; overflow: hidden;">
      <h1 style="font-family: var(--font-family-heading); font-size: 2rem; line-height: 1.25; color: var(--color-text); margin: 0 0 1rem 0; word-wrap: break-word; overflow-wrap: break-word;">${escapeHtml(section.title) || 'כותרת ראשית'}</h1>
      ${section.subtitle ? `<p style="font-size: 1.1rem; color: var(--color-text-secondary); line-height: 1.6; max-width: 100%; margin: 0 auto; word-wrap: break-word; overflow-wrap: break-word;">${escapeHtml(section.subtitle)}</p>` : ''}
    </header>
  `;
}

function renderTextSectionHTML(section: TextSection): string {
  const paragraphs = section.content
    .split('\n')
    .filter(p => p.trim())
    .map(p => `<p style="margin: 0 0 1rem 0; word-wrap: break-word; overflow-wrap: break-word;">${escapeHtml(p)}</p>`)
    .join('');

  return `
    <article style="padding: 1.5rem 0; overflow: hidden;">
      ${section.heading ? `<h2 style="font-family: var(--font-family-heading); font-size: 1.4rem; line-height: 1.25; color: var(--color-text); margin: 0 0 1rem 0; word-wrap: break-word; overflow-wrap: break-word;">${escapeHtml(section.heading)}</h2>` : ''}
      <div style="font-size: 16px; line-height: 1.7; color: var(--color-text);">
        ${paragraphs || '<p></p>'}
      </div>
    </article>
  `;
}

function renderImageSectionHTML(section: ImageSection): string {
  return `
    <figure style="padding: 1.5rem 0; margin: 0; overflow: hidden;">
      ${section.src
        ? `<img src="${section.src}" alt="${escapeHtml(section.alt) || 'תמונה'}" style="width: 100%; max-width: 100%; height: auto; border-radius: 12px; display: block;">`
        : '<div style="display: flex; align-items: center; justify-content: center; min-height: 150px; background: var(--color-background-secondary); border-radius: 12px; color: var(--color-text-secondary);">אין תמונה</div>'}
      ${section.caption ? `<figcaption style="margin-top: 1rem; font-size: 0.9rem; color: var(--color-text-secondary); text-align: center; font-style: italic; word-wrap: break-word; overflow-wrap: break-word;">${escapeHtml(section.caption)}</figcaption>` : ''}
    </figure>
  `;
}

function renderHighlightSectionHTML(section: HighlightSection): string {
  return `
    <blockquote style="margin: 1.5rem 0; padding: 1.5rem 2rem; background: var(--color-highlight); border-radius: 12px; border-right: 4px solid var(--color-primary); overflow: hidden;">
      <p style="font-size: 1.1rem; line-height: 1.6; color: var(--color-highlight-text); margin: 0; font-style: italic; word-wrap: break-word; overflow-wrap: break-word;">${escapeHtml(section.content) || 'ציטוט או טקסט מודגש'}</p>
      ${section.author ? `<footer style="margin-top: 1rem; font-size: 0.95rem; color: var(--color-text-secondary); word-wrap: break-word; overflow-wrap: break-word;">— ${escapeHtml(section.author)}</footer>` : ''}
    </blockquote>
  `;
}

function renderDividerSectionHTML(section: DividerSection): string {
  let dividerStyle = '';

  switch (section.style) {
    case 'line':
      dividerStyle = 'height: 2px; background: linear-gradient(90deg, transparent, var(--color-divider), transparent); border: none;';
      break;
    case 'dots':
      return `<div style="margin: 2rem 0; text-align: center; color: var(--color-divider); font-size: 1.5rem; letter-spacing: 0.5rem;">• • •</div>`;
    case 'space':
      dividerStyle = 'height: 2rem; background: transparent; border: none;';
      break;
  }

  return `<hr style="margin: 2rem 0; ${dividerStyle}">`;
}

function renderSectionHTML(section: Section): string {
  switch (section.type) {
    case 'hero':
      return renderHeroSectionHTML(section);
    case 'text':
      return renderTextSectionHTML(section);
    case 'image':
      return renderImageSectionHTML(section);
    case 'highlight':
      return renderHighlightSectionHTML(section);
    case 'divider':
      return renderDividerSectionHTML(section);
    default:
      return '';
  }
}

function renderPageHTML(page: Page, pageIndex: number, totalPages: number): string {
  const sectionsHTML = page.sections.map(section => renderSectionHTML(section)).join('');

  return `
    <div style="page-break-after: ${pageIndex < totalPages - 1 ? 'always' : 'auto'}; padding: 20px 0;">
      ${totalPages > 1 ? `<div style="text-align: center; padding: 1rem; margin-bottom: 1.5rem; background: var(--color-background-secondary); border-radius: 8px; font-weight: 500; color: var(--color-text);">${escapeHtml(page.title)}</div>` : ''}
      ${sectionsHTML}
    </div>
  `;
}

export async function exportToPDF(doc: Document): Promise<void> {
  const theme = createTheme(doc.stylePreset, doc.colorMode);
  const cssVars = themeToCSSVariables(theme);

  // Create temporary container
  const container = window.document.createElement('div');
  container.id = 'pdf-export-container';

  // Apply CSS variables
  let cssVarsString = '';
  Object.entries(cssVars).forEach(([key, value]) => {
    cssVarsString += `${key}: ${value}; `;
  });

  container.style.cssText = `
    position: absolute;
    left: -9999px;
    top: 0;
    width: 794px;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.baseFontSize};
    line-height: ${theme.typography.lineHeight};
    direction: rtl;
    overflow: hidden;
    ${cssVarsString}
  `;

  // Add Google Fonts
  const fontLink = window.document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Heebo:wght@400;500;600;700&family=David+Libre:wght@400;500;700&family=Playfair+Display:wght@400;500;600;700&family=Secular+One&display=swap';
  fontLink.rel = 'stylesheet';
  window.document.head.appendChild(fontLink);

  // Build HTML content for all pages
  const pagesHTML = doc.pages.map((page, index) =>
    renderPageHTML(page, index, doc.pages.length)
  ).join('');

  container.innerHTML = `
    <div style="max-width: 700px; margin: 0 auto; padding: 40px 30px; overflow: hidden; box-sizing: border-box;">
      ${pagesHTML}
    </div>
  `;

  window.document.body.appendChild(container);

  // Wait for fonts and images to load
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: theme.colors.background,
      logging: false,
      width: 794,
      windowWidth: 794,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const ratio = canvasWidth / canvasHeight;

    let imgWidth = pageWidth;
    let imgHeight = pageWidth / ratio;

    if (imgHeight > pageHeight) {
      // Need multiple pages
      const totalPages = Math.ceil(imgHeight / pageHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        const srcY = (page * pageHeight * canvasWidth) / pageWidth;
        const srcHeight = Math.min(
          (pageHeight * canvasWidth) / pageWidth,
          canvasHeight - srcY
        );

        // Create a temporary canvas for this page
        const tempCanvas = window.document.createElement('canvas');
        tempCanvas.width = canvasWidth;
        tempCanvas.height = srcHeight;

        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            canvas,
            0, srcY, canvasWidth, srcHeight,
            0, 0, canvasWidth, srcHeight
          );

          const pageImgData = tempCanvas.toDataURL('image/png');
          const pageImgHeight = (srcHeight * pageWidth) / canvasWidth;

          pdf.addImage(pageImgData, 'PNG', 0, 0, pageWidth, pageImgHeight);
        }
      }
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    const fileName = doc.title.replace(/[^a-zA-Z0-9\u0590-\u05FF]/g, '-') || 'document';
    pdf.save(`${fileName}.pdf`);
  } finally {
    window.document.body.removeChild(container);
    window.document.head.removeChild(fontLink);
  }
}
