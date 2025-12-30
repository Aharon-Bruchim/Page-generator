/**
 * Smart Paste Parser
 * מזהה אוטומטית אלמנטים מטקסט או HTML ומייצר HTML מעוצב
 */

// טיפוסים לבלוקי תוכן
export type ContentBlockType = 'text' | 'image';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string; // טקסט או base64/URL לתמונה
  alt?: string; // תיאור לתמונה
  caption?: string; // כיתוב לתמונה
}

export function createContentBlock(type: ContentBlockType, content: string = ''): ContentBlock {
  return {
    id: crypto.randomUUID(),
    type,
    content,
    alt: type === 'image' ? 'תמונה' : undefined,
  };
}

// המרת בלוקי תוכן לאלמנטים מפורסים
export function contentBlocksToElements(blocks: ContentBlock[]): ParsedElement[] {
  const elements: ParsedElement[] = [];

  for (const block of blocks) {
    if (block.type === 'text' && block.content.trim()) {
      // פירוס הטקסט לאלמנטים
      const parsed = parseInput(block.content);
      elements.push(...parsed);
    } else if (block.type === 'image' && block.content) {
      elements.push({
        type: 'image',
        content: '',
        metadata: {
          url: block.content,
          alt: block.alt || 'תמונה',
        },
      });
      if (block.caption) {
        elements.push({
          type: 'paragraph',
          content: block.caption,
        });
      }
    }
  }

  return elements;
}

export interface ParsedElement {
  type:
    | "heading"
    | "subheading"
    | "paragraph"
    | "list"
    | "link"
    | "image"
    | "code"
    | "codeblock"
    | "quote"
    | "divider"
    | "email"
    | "phone"
    | "table"
    | "pagebreak";
  content: string;
  metadata?: {
    level?: number; // for headings
    language?: string; // for code
    items?: string[]; // for lists
    ordered?: boolean; // for lists
    url?: string; // for links/images
    alt?: string; // for images
    rows?: string[][]; // for tables
  };
}

export interface ParsedPage {
  title: string;
  slug: string;
  elements: ParsedElement[];
}

// הגדרות פיצול דפים
const PAGE_SPLIT_CONFIG = {
  maxCharsPerPage: 4000, // מקסימום תווים לפני פיצול אוטומטי
  splitOnH1: true, // פיצול על כותרת ראשית
  splitOnH2AfterMax: true, // פיצול על H2 אם עברנו את המקסימום
};

// זיהוי שפת תכנות
function detectLanguage(code: string): string {
  const patterns: Record<string, RegExp[]> = {
    javascript: [
      /\bconst\b/,
      /\blet\b/,
      /\bvar\b/,
      /=>/,
      /console\.log/,
      /function\s*\(/,
      /async\s+function/,
    ],
    typescript: [
      /:\s*(string|number|boolean|any)\b/,
      /interface\s+\w+/,
      /<\w+>/,
      /as\s+\w+/,
    ],
    python: [
      /\bdef\s+\w+/,
      /\bprint\s*\(/,
      /\bimport\s+\w+/,
      /:\s*$/,
      /\bself\b/,
    ],
    html: [/<\/?[a-z]+[^>]*>/i, /<!DOCTYPE/i, /<html/i],
    css: [/[.#][\w-]+\s*\{/, /:\s*[\w-]+;/, /@media/, /display\s*:/],
    sql: [/\bSELECT\b/i, /\bFROM\b/i, /\bWHERE\b/i, /\bINSERT\b/i],
    json: [/^\s*[{[]/, /"[\w]+"\s*:/, /^\s*"[\w]+"/],
    bash: [/^#!/, /\$\w+/, /\becho\b/, /\bsudo\b/],
    php: [/<\?php/, /\$\w+\s*=/, /\becho\b/, /\bfunction\b/],
    java: [/public\s+class/, /public\s+static\s+void/, /System\.out/],
    go: [/\bfunc\b/, /\bpackage\b/, /\bfmt\./, /\bgo\b\s+\w+/],
    rust: [/\bfn\b/, /\blet\s+mut\b/, /\bimpl\b/, /\b->\b/],
  };

  for (const [lang, regexes] of Object.entries(patterns)) {
    const matches = regexes.filter((regex) => regex.test(code)).length;
    if (matches >= 2) return lang;
  }

  return "plaintext";
}

// ניקוי HTML מ-Word/Google Docs
function cleanWordHtml(html: string): string {
  return html
    .replace(/class="[^"]*Mso[^"]*"/gi, "")
    .replace(/style="[^"]*"/gi, "")
    .replace(/<o:p>.*?<\/o:p>/gi, "")
    .replace(/<span[^>]*>(\s*)<\/span>/gi, "$1")
    .replace(/<font[^>]*>(.*?)<\/font>/gi, "$1")
    .replace(/<!--.*?-->/gs, "")
    .replace(/<xml>.*?<\/xml>/gis, "")
    .replace(/<style>.*?<\/style>/gis, "")
    .replace(/\s+/g, " ")
    .trim();
}

// זיהוי סוג הקלט
function detectInputType(input: string): "html" | "markdown" | "plain" {
  if (/<[a-z]+[^>]*>/i.test(input)) {
    return "html";
  }
  if (/^#{1,6}\s|^\*\*|^```|\[.*\]\(.*\)/.test(input)) {
    return "markdown";
  }
  return "plain";
}

// חילוץ טקסט מ-HTML
function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// פירוק HTML לאלמנטים
function parseHtml(html: string): ParsedElement[] {
  const elements: ParsedElement[] = [];
  const cleaned = cleanWordHtml(html);
  const div = document.createElement("div");
  div.innerHTML = cleaned;

  function processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        elements.push({ type: "paragraph", content: text });
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;
    const tagName = el.tagName.toLowerCase();

    switch (tagName) {
      case "h1":
        elements.push({
          type: "heading",
          content: el.textContent || "",
          metadata: { level: 1 },
        });
        break;
      case "h2":
        elements.push({
          type: "subheading",
          content: el.textContent || "",
          metadata: { level: 2 },
        });
        break;
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        elements.push({
          type: "subheading",
          content: el.textContent || "",
          metadata: { level: parseInt(tagName[1]) },
        });
        break;
      case "p":
        const text = el.textContent?.trim();
        if (text) {
          elements.push({ type: "paragraph", content: text });
        }
        break;
      case "ul":
      case "ol":
        const items = Array.from(el.querySelectorAll("li")).map(
          (li) => li.textContent?.trim() || ""
        );
        if (items.length > 0) {
          elements.push({
            type: "list",
            content: "",
            metadata: { items, ordered: tagName === "ol" },
          });
        }
        break;
      case "a":
        const href = el.getAttribute("href");
        if (href) {
          elements.push({
            type: "link",
            content: el.textContent || href,
            metadata: { url: href },
          });
        }
        break;
      case "img":
        const src = el.getAttribute("src");
        if (src) {
          elements.push({
            type: "image",
            content: "",
            metadata: { url: src, alt: el.getAttribute("alt") || "" },
          });
        }
        break;
      case "pre":
      case "code":
        const code = el.textContent || "";
        elements.push({
          type: "codeblock",
          content: code,
          metadata: { language: detectLanguage(code) },
        });
        break;
      case "blockquote":
        elements.push({ type: "quote", content: el.textContent || "" });
        break;
      case "hr":
        elements.push({ type: "divider", content: "" });
        break;
      case "table":
        const rows: string[][] = [];
        el.querySelectorAll("tr").forEach((tr) => {
          const cells = Array.from(tr.querySelectorAll("td, th")).map(
            (cell) => cell.textContent?.trim() || ""
          );
          if (cells.length > 0) rows.push(cells);
        });
        if (rows.length > 0) {
          elements.push({ type: "table", content: "", metadata: { rows } });
        }
        break;
      default:
        // Process children for other elements
        el.childNodes.forEach((child) => processNode(child));
    }
  }

  div.childNodes.forEach((child) => processNode(child));
  return elements;
}

// פירוק טקסט רגיל לאלמנטים
function parsePlainText(text: string): ParsedElement[] {
  const elements: ParsedElement[] = [];
  const lines = text.split("\n");

  let currentList: string[] = [];
  let listOrdered = false;
  let codeBlock = "";
  let codeLanguage = "";
  let inCodeBlock = false;
  let isFirstNonEmpty = true;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push({
        type: "list",
        content: "",
        metadata: { items: [...currentList], ordered: listOrdered },
      });
      currentList = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeBlock) {
      elements.push({
        type: "codeblock",
        content: codeBlock.trim(),
        metadata: { language: codeLanguage || detectLanguage(codeBlock) },
      });
      codeBlock = "";
      codeLanguage = "";
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // בלוק קוד עם ```
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        flushCodeBlock();
      } else {
        flushList();
        inCodeBlock = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlock += line + "\n";
      continue;
    }

    // שורה ריקה
    if (!trimmed) {
      flushList();
      continue;
    }

    // כותרת ראשית - שורה ראשונה קצרה
    if (isFirstNonEmpty && trimmed.length < 60 && !trimmed.includes("http")) {
      flushList();
      elements.push({
        type: "heading",
        content: trimmed,
        metadata: { level: 1 },
      });
      isFirstNonEmpty = false;
      continue;
    }
    isFirstNonEmpty = false;

    // כותרת Markdown (#)
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      elements.push({
        type: level === 1 ? "heading" : "subheading",
        content: headingMatch[2],
        metadata: { level },
      });
      continue;
    }

    // מעבר דף (===)
    if (/^={3,}$/.test(trimmed)) {
      flushList();
      flushCodeBlock();
      elements.push({ type: "pagebreak", content: "" });
      continue;
    }

    // קו הפרדה
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flushList();
      elements.push({ type: "divider", content: "" });
      continue;
    }

    // ציטוט
    if (trimmed.startsWith(">")) {
      flushList();
      elements.push({ type: "quote", content: trimmed.slice(1).trim() });
      continue;
    }

    // רשימה לא ממוספרת
    const unorderedMatch = trimmed.match(/^[-*•]\s+(.+)$/);
    if (unorderedMatch) {
      if (currentList.length > 0 && listOrdered) flushList();
      listOrdered = false;
      currentList.push(unorderedMatch[1]);
      continue;
    }

    // רשימה ממוספרת
    const orderedMatch = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (orderedMatch) {
      if (currentList.length > 0 && !listOrdered) flushList();
      listOrdered = true;
      currentList.push(orderedMatch[1]);
      continue;
    }

    // קוד inline (שורה עם הזחה)
    if (line.startsWith("    ") || line.startsWith("\t")) {
      flushList();
      codeBlock += line.slice(line.startsWith("\t") ? 1 : 4) + "\n";
      continue;
    }

    // URL של תמונה
    if (/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(trimmed)) {
      flushList();
      flushCodeBlock();
      elements.push({
        type: "image",
        content: "",
        metadata: { url: trimmed, alt: "תמונה" },
      });
      continue;
    }

    // URL בודד בשורה
    if (/^https?:\/\/\S+$/.test(trimmed)) {
      flushList();
      flushCodeBlock();
      elements.push({
        type: "link",
        content: trimmed,
        metadata: { url: trimmed },
      });
      continue;
    }

    // אימייל
    const emailMatch = trimmed.match(/^([\w.-]+@[\w.-]+\.\w+)$/);
    if (emailMatch) {
      flushList();
      elements.push({
        type: "email",
        content: emailMatch[1],
        metadata: { url: `mailto:${emailMatch[1]}` },
      });
      continue;
    }

    // טלפון
    const phoneMatch = trimmed.match(/^(\+?[\d-]{9,})$/);
    if (phoneMatch) {
      flushList();
      elements.push({
        type: "phone",
        content: phoneMatch[1],
        metadata: { url: `tel:${phoneMatch[1].replace(/-/g, "")}` },
      });
      continue;
    }

    // כותרת משנה - שורה קצרה לאחר רווח
    if (
      trimmed.length < 50 &&
      !trimmed.includes("http") &&
      i > 0 &&
      !lines[i - 1].trim()
    ) {
      flushList();
      flushCodeBlock();
      elements.push({
        type: "subheading",
        content: trimmed,
        metadata: { level: 2 },
      });
      continue;
    }

    // פסקה רגילה
    flushList();
    flushCodeBlock();
    elements.push({ type: "paragraph", content: trimmed });
  }

  // סגירת אלמנטים פתוחים
  flushList();
  flushCodeBlock();

  return elements;
}

// פירוק Markdown
function parseMarkdown(text: string): ParsedElement[] {
  // בינתיים נשתמש בפירוק טקסט רגיל שכבר תומך ב-Markdown בסיסי
  return parsePlainText(text);
}

// תיקון Bidi לסוגריים עם תוכן אנגלי
function fixBidiParentheses(text: string): string {
  // משתמש באלמנט bdi עם dir=ltr ו-display:inline-block
  return text.replace(
    /\(([A-Za-z][A-Za-z0-9\s\-_.,]*)\)/g,
    '<bdi style="direction:ltr;display:inline-block">($1)</bdi>'
  );
}

// עיבוד טקסט בתוך פסקה - זיהוי לינקים, קוד inline וכו'
function processInlineElements(text: string): string {
  let processed = text;

  // תיקון Bidi לסוגריים
  processed = fixBidiParentheses(processed);

  // לינקים בפורמט Markdown [text](url)
  processed = processed.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>'
  );

  // לינקים רגילים
  processed = processed.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>'
  );

  // אימייל
  processed = processed.replace(
    /([\w.-]+@[\w.-]+\.\w+)/g,
    '<a href="mailto:$1">$1</a>'
  );

  // קוד inline
  processed = processed.replace(
    /`([^`]+)`/g,
    '<code class="inline-code">$1</code>'
  );

  // בולד
  processed = processed.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // איטליק
  processed = processed.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return processed;
}

// יצירת HTML מעוצב מהאלמנטים
export function generateStyledHtml(
  elements: ParsedElement[],
  style: "aurora" | "midnight" | "sunset" | "ocean" | "forest" | "cyberpunk" | "lavender" | "monochrome" | "candy" | "coffee" = "aurora"
): string {
  const styleConfigs: Record<string, { containerClass: string; cardClass: string; headingClass: string; codeTheme: string }> = {
    aurora: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "atom-one-dark" },
    midnight: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "atom-one-dark" },
    sunset: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "atom-one-dark" },
    ocean: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "atom-one-dark" },
    forest: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "atom-one-dark" },
    cyberpunk: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "atom-one-dark" },
    lavender: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "atom-one-dark" },
    monochrome: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "github" },
    candy: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "atom-one-dark" },
    coffee: { containerClass: "smart-page", cardClass: "hero-section", headingClass: "heading", codeTheme: "atom-one-dark" },
  };

  const config = styleConfigs[style] || styleConfigs.aurora;
  let html = `<article class="smart-page ${config.containerClass}" dir="rtl">\n`;

  for (const element of elements) {
    switch (element.type) {
      case "heading":
        html += `  <header class="${config.cardClass} hero-section">\n`;
        html += `    <h1 class="${config.headingClass}">${fixBidiParentheses(
          escapeHtml(element.content)
        )}</h1>\n`;
        html += `  </header>\n\n`;
        break;

      case "subheading":
        const level = element.metadata?.level || 2;
        html += `  <h${level} class="section-heading">${fixBidiParentheses(
          escapeHtml(element.content)
        )}</h${level}>\n\n`;
        break;

      case "paragraph":
        html += `  <p class="content-paragraph">${processInlineElements(
          escapeHtml(element.content)
        )}</p>\n\n`;
        break;

      case "list":
        const tag = element.metadata?.ordered ? "ol" : "ul";
        html += `  <${tag} class="styled-list">\n`;
        for (const item of element.metadata?.items || []) {
          html += `    <li>${processInlineElements(escapeHtml(item))}</li>\n`;
        }
        html += `  </${tag}>\n\n`;
        break;

      case "link":
        html += `  <div class="link-container">\n`;
        html += `    <a href="${escapeHtml(
          element.metadata?.url || "#"
        )}" class="styled-link" target="_blank" rel="noopener">\n`;
        html += `      ${escapeHtml(
          element.content
        )} <span class="link-icon">↗</span>\n`;
        html += `    </a>\n`;
        html += `  </div>\n\n`;
        break;

      case "email":
        html += `  <div class="contact-item">\n`;
        html += `    <a href="${element.metadata?.url}" class="email-link">\n`;
        html += `      <span class="contact-icon">✉</span> ${escapeHtml(
          element.content
        )}\n`;
        html += `    </a>\n`;
        html += `  </div>\n\n`;
        break;

      case "phone":
        html += `  <div class="contact-item">\n`;
        html += `    <a href="${element.metadata?.url}" class="phone-link">\n`;
        html += `      <span class="contact-icon">📞</span> ${escapeHtml(
          element.content
        )}\n`;
        html += `    </a>\n`;
        html += `  </div>\n\n`;
        break;

      case "image":
        html += `  <figure class="image-container">\n`;
        html += `    <img src="${escapeHtml(
          element.metadata?.url || ""
        )}" alt="${escapeHtml(
          element.metadata?.alt || "תמונה"
        )}" loading="lazy">\n`;
        if (element.metadata?.alt) {
          html += `    <figcaption>${escapeHtml(
            element.metadata.alt
          )}</figcaption>\n`;
        }
        html += `  </figure>\n\n`;
        break;

      case "codeblock":
        const lang = element.metadata?.language || "plaintext";
        html += `  <div class="code-block" data-language="${lang}" dir="ltr">\n`;
        html += `    <div class="code-header">\n`;
        html += `      <span class="code-language">${lang}</span>\n`;
        html += `      <button class="copy-button" onclick="copyCode(this)">📋 copy</button>\n`;
        html += `    </div>\n`;
        html += `    <pre><code class="language-${lang}">${escapeHtml(
          element.content
        )}</code></pre>\n`;
        html += `  </div>\n\n`;
        break;

      case "code":
        html += `  <code class="inline-code">${escapeHtml(
          element.content
        )}</code>\n\n`;
        break;

      case "quote":
        html += `  <blockquote class="styled-quote">\n`;
        html += `    <p>${processInlineElements(
          escapeHtml(element.content)
        )}</p>\n`;
        html += `  </blockquote>\n\n`;
        break;

      case "divider":
        html += `  <hr class="styled-divider">\n\n`;
        break;

      case "table":
        html += `  <div class="table-container">\n`;
        html += `    <table class="styled-table">\n`;
        const rows = element.metadata?.rows || [];
        if (rows.length > 0) {
          html += `      <thead>\n        <tr>\n`;
          for (const cell of rows[0]) {
            html += `          <th>${escapeHtml(cell)}</th>\n`;
          }
          html += `        </tr>\n      </thead>\n`;
          if (rows.length > 1) {
            html += `      <tbody>\n`;
            for (let i = 1; i < rows.length; i++) {
              html += `        <tr>\n`;
              for (const cell of rows[i]) {
                html += `          <td>${escapeHtml(cell)}</td>\n`;
              }
              html += `        </tr>\n`;
            }
            html += `      </tbody>\n`;
          }
        }
        html += `    </table>\n`;
        html += `  </div>\n\n`;
        break;
    }
  }

  html += `</article>`;
  return html;
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// פונקציה ראשית לפירוק קלט
export function parseInput(input: string): ParsedElement[] {
  const inputType = detectInputType(input);

  switch (inputType) {
    case "html":
      return parseHtml(input);
    case "markdown":
      return parseMarkdown(input);
    default:
      return parsePlainText(input);
  }
}

// יצירת slug מכותרת
function createSlug(title: string, index: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s\u0590-\u05FF]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 30);
  return slug || `page-${index + 1}`;
}

// חישוב אורך תוכן של אלמנטים
function calculateContentLength(elements: ParsedElement[]): number {
  return elements.reduce((total, el) => {
    let len = el.content.length;
    if (el.metadata?.items) {
      len += el.metadata.items.join("").length;
    }
    return total + len;
  }, 0);
}

// פיצול אלמנטים לדפים
export function splitIntoPages(elements: ParsedElement[]): ParsedPage[] {
  const pages: ParsedPage[] = [];
  let currentPageElements: ParsedElement[] = [];
  let currentPageTitle = "עמוד ראשי";
  let currentContentLength = 0;
  let isFirstHeading = true;

  const flushPage = () => {
    if (currentPageElements.length > 0) {
      pages.push({
        title: currentPageTitle,
        slug: createSlug(currentPageTitle, pages.length),
        elements: [...currentPageElements],
      });
      currentPageElements = [];
      currentContentLength = 0;
    }
  };

  for (const element of elements) {
    // מעבר דף מפורש (===)
    if (element.type === "pagebreak") {
      flushPage();
      currentPageTitle = "עמוד " + (pages.length + 1);
      isFirstHeading = true;
      continue;
    }

    // כותרת ראשית = דף חדש (אלא אם זו הכותרת הראשונה)
    if (element.type === "heading" && PAGE_SPLIT_CONFIG.splitOnH1) {
      if (!isFirstHeading) {
        flushPage();
      }
      currentPageTitle = element.content;
      isFirstHeading = false;
    }

    // אם עברנו את המקסימום וזו כותרת משנה - פיצול
    if (
      element.type === "subheading" &&
      PAGE_SPLIT_CONFIG.splitOnH2AfterMax &&
      currentContentLength > PAGE_SPLIT_CONFIG.maxCharsPerPage
    ) {
      flushPage();
      currentPageTitle = element.content;
    }

    // הוספת האלמנט לדף הנוכחי
    currentPageElements.push(element);
    currentContentLength += element.content.length;
    if (element.metadata?.items) {
      currentContentLength += element.metadata.items.join("").length;
    }
  }

  // שמירת הדף האחרון
  flushPage();

  // אם אין דפים, יצירת דף ריק
  if (pages.length === 0) {
    pages.push({
      title: "עמוד ראשי",
      slug: "index",
      elements: [],
    });
  }

  return pages;
}

// יצירת ניווט בין דפים
function generateNavigation(
  pages: ParsedPage[],
  currentIndex: number,
  style: string
): string {
  if (pages.length <= 1) return "";

  let nav = `<nav class="page-navigation">\n`;
  nav += `  <div class="nav-pages">\n`;

  pages.forEach((page, index) => {
    const isActive = index === currentIndex;
    const fileName = index === 0 ? "index.html" : `${page.slug}.html`;
    nav += `    <a href="${fileName}" class="nav-link ${
      isActive ? "nav-active" : ""
    }">${page.title}</a>\n`;
  });

  nav += `  </div>\n`;

  // כפתורי קודם/הבא
  nav += `  <div class="nav-arrows">\n`;
  if (currentIndex > 0) {
    const prevPage = pages[currentIndex - 1];
    const prevFile =
      currentIndex === 1 ? "index.html" : `${prevPage.slug}.html`;
    nav += `    <a href="${prevFile}" class="nav-arrow nav-prev">→ ${prevPage.title}</a>\n`;
  }
  if (currentIndex < pages.length - 1) {
    const nextPage = pages[currentIndex + 1];
    nav += `    <a href="${nextPage.slug}.html" class="nav-arrow nav-next">${nextPage.title} ←</a>\n`;
  }
  nav += `  </div>\n`;
  nav += `</nav>\n`;

  return nav;
}

// יצירת CSS לסגנונות
export function generateStyles(
  style: "aurora" | "midnight" | "sunset" | "ocean" | "forest" | "cyberpunk" | "lavender" | "monochrome" | "candy" | "coffee" = "aurora"
): string {
  const baseStyles = `
/* Base Styles */
* { box-sizing: border-box; }

body {
  margin: 0;
  padding: 0;
}

.smart-page {
  font-family: 'Rubik', 'Segoe UI', sans-serif;
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 3rem;
  border-radius: 24px;
}

.section-heading {
  margin: 2.5rem 0 1rem;
  font-size: 1.75rem;
  font-weight: 600;
}

.content-paragraph {
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
  line-height: 1.9;
}

.styled-list {
  margin: 1.5rem 0;
  padding-right: 1.5rem;
}

.styled-list li {
  margin-bottom: 0.75rem;
  padding-right: 0.5rem;
}

.link-container {
  margin: 1.5rem 0;
}

.styled-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-item {
  margin: 0.75rem 0;
}

.contact-item a {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-size: 1.05rem;
  transition: all 0.2s;
}

.contact-icon {
  font-size: 1.3rem;
}

.image-container {
  margin: 2.5rem 0;
  text-align: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.image-container figcaption {
  margin-top: 1rem;
  font-style: italic;
  opacity: 0.75;
  font-size: 0.95rem;
}

.code-block {
  margin: 2rem 0;
  border-radius: 16px;
  overflow: hidden;
  direction: ltr;
  text-align: left;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  font-size: 0.85rem;
}

.code-language {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.copy-button {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: inherit;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.25);
}

.code-block pre {
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;
}

.code-block code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.7;
}

.inline-code {
  font-family: 'JetBrains Mono', monospace;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.88em;
  direction: ltr;
  display: inline-block;
}

.styled-quote {
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  border-right: 5px solid var(--accent-color);
  border-radius: 0 16px 16px 0;
  font-style: italic;
  font-size: 1.1rem;
}

.styled-divider {
  border: none;
  height: 3px;
  margin: 3rem 0;
  border-radius: 2px;
}

.table-container {
  margin: 2rem 0;
  overflow-x: auto;
  border-radius: 12px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th,
.styled-table td {
  padding: 1rem 1.25rem;
  text-align: right;
}

.styled-table th {
  font-weight: 600;
}

/* Animations */
@keyframes copySuccess {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.copy-success {
  animation: copySuccess 0.3s ease;
}

/* Page Navigation */
.page-navigation {
  margin: 2.5rem 0;
  padding: 1.25rem;
  border-radius: 16px;
}

.nav-pages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.nav-link {
  padding: 0.6rem 1.25rem;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-arrows {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.nav-arrow {
  padding: 0.85rem 1.5rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.nav-prev { margin-left: auto; }
.nav-next { margin-right: auto; }
`;

  const styleSpecific: Record<string, string> = {
    aurora: `
/* Aurora - Northern Lights */
.smart-page {
  --accent-color: #06b6d4;
  --heading-color: #fff;
  --text-color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}

.smart-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(167, 139, 250, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.smart-page > * { position: relative; z-index: 1; }

.hero-section {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(167, 139, 250, 0.2));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-section h1 {
  background: linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3rem;
  font-weight: 800;
}

.styled-link {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(167, 139, 250, 0.3));
  color: #22d3ee;
  border: 1px solid rgba(34, 211, 238, 0.3);
}

.styled-link:hover {
  background: linear-gradient(135deg, #06b6d4, #a78bfa);
  color: #fff;
  box-shadow: 0 0 40px rgba(6, 182, 212, 0.4);
  transform: translateY(-2px);
}

.code-block {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(34, 211, 238, 0.2);
}

.code-header { background: rgba(6, 182, 212, 0.2); }

.inline-code {
  background: rgba(34, 211, 238, 0.15);
  color: #22d3ee;
}

.styled-quote {
  background: rgba(167, 139, 250, 0.1);
  border-right-color: #a78bfa;
}

.styled-divider {
  background: linear-gradient(90deg, transparent, #22d3ee, #a78bfa, transparent);
}

.contact-item a { color: #22d3ee; }
.contact-item a:hover { color: #a78bfa; }

.styled-table th { background: rgba(6, 182, 212, 0.2); }
.styled-table td { border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
`,

    midnight: `
/* Midnight - Starry Night */
.smart-page {
  --accent-color: #8b5cf6;
  --heading-color: #fff;
  --text-color: rgba(255, 255, 255, 0.85);
  background: linear-gradient(180deg, #0c0a1d 0%, #1a103d 50%, #0c0a1d 100%);
  color: rgba(255, 255, 255, 0.85);
  position: relative;
}

.smart-page::before {
  content: '';
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image:
    radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
    radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.2), transparent),
    radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.3), transparent);
  background-size: 200px 200px;
  animation: twinkle 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.smart-page > * { position: relative; z-index: 1; }

.hero-section {
  background: radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.hero-section h1 {
  color: #fff;
  text-shadow: 0 0 60px rgba(139, 92, 246, 0.5);
  font-size: 3rem;
  font-weight: 700;
}

.styled-link {
  background: rgba(139, 92, 246, 0.2);
  color: #c4b5fd;
  border: 1px solid rgba(139, 92, 246, 0.4);
}

.styled-link:hover {
  background: #8b5cf6;
  color: #fff;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
}

.code-block {
  background: rgba(12, 10, 29, 0.9);
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.code-header { background: rgba(139, 92, 246, 0.2); }

.inline-code {
  background: rgba(139, 92, 246, 0.2);
  color: #c4b5fd;
}

.styled-quote {
  background: rgba(139, 92, 246, 0.1);
  border-right-color: #8b5cf6;
}

.styled-divider {
  background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

.contact-item a { color: #c4b5fd; }
`,

    sunset: `
/* Sunset - Warm Glow */
.smart-page {
  --accent-color: #f97316;
  --heading-color: #1f2937;
  --text-color: #374151;
  background: linear-gradient(180deg, #fef3c7 0%, #fde68a 30%, #fed7aa 70%, #fecaca 100%);
  color: #374151;
}

.hero-section {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(239, 68, 68, 0.15));
  border: none;
  box-shadow: 0 8px 32px rgba(249, 115, 22, 0.2);
}

.hero-section h1 {
  background: linear-gradient(135deg, #ea580c, #dc2626);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3rem;
  font-weight: 800;
}

.styled-link {
  background: linear-gradient(135deg, #f97316, #ef4444);
  color: #fff;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
}

.styled-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(249, 115, 22, 0.4);
}

.code-block {
  background: #1f2937;
  color: #fef3c7;
}

.code-header { background: rgba(249, 115, 22, 0.3); color: #fff; }

.inline-code {
  background: rgba(249, 115, 22, 0.15);
  color: #c2410c;
}

.styled-quote {
  background: rgba(249, 115, 22, 0.1);
  border-right-color: #f97316;
  color: #9a3412;
}

.styled-divider {
  background: linear-gradient(90deg, transparent, #f97316, #ef4444, transparent);
}

.section-heading { color: #9a3412; }
.contact-item a { color: #ea580c; }
.styled-table th { background: rgba(249, 115, 22, 0.15); }
.styled-table td { border-bottom: 1px solid rgba(249, 115, 22, 0.2); }
`,

    ocean: `
/* Ocean - Deep Blue */
.smart-page {
  --accent-color: #0ea5e9;
  --heading-color: #fff;
  --text-color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(180deg, #0c4a6e 0%, #075985 40%, #0369a1 100%);
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}

.smart-page::after {
  content: '';
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to top, rgba(14, 165, 233, 0.2), transparent);
  pointer-events: none;
}

.hero-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-section h1 {
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 0 4px 30px rgba(14, 165, 233, 0.5);
}

.styled-link {
  background: rgba(14, 165, 233, 0.3);
  color: #7dd3fc;
  border: 1px solid rgba(125, 211, 252, 0.3);
}

.styled-link:hover {
  background: #0ea5e9;
  color: #fff;
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.5);
}

.code-block {
  background: rgba(7, 89, 133, 0.8);
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.code-header { background: rgba(14, 165, 233, 0.3); }

.inline-code {
  background: rgba(14, 165, 233, 0.2);
  color: #7dd3fc;
}

.styled-quote {
  background: rgba(14, 165, 233, 0.15);
  border-right-color: #38bdf8;
}

.styled-divider {
  background: linear-gradient(90deg, transparent, #38bdf8, #0ea5e9, transparent);
}

.contact-item a { color: #7dd3fc; }
.styled-table th { background: rgba(14, 165, 233, 0.25); }
.styled-table td { border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
`,

    forest: `
/* Forest - Natural Green */
.smart-page {
  --accent-color: #22c55e;
  --heading-color: #14532d;
  --text-color: #166534;
  background: linear-gradient(180deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%);
  color: #166534;
}

.hero-section {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(21, 128, 61, 0.2));
  border: 2px solid rgba(34, 197, 94, 0.3);
}

.hero-section h1 {
  color: #14532d;
  font-size: 3rem;
  font-weight: 700;
}

.styled-link {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
}

.styled-link:hover {
  background: linear-gradient(135deg, #16a34a, #15803d);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(34, 197, 94, 0.4);
}

.code-block {
  background: #14532d;
  color: #d1fae5;
}

.code-header { background: rgba(34, 197, 94, 0.4); color: #fff; }

.inline-code {
  background: rgba(34, 197, 94, 0.2);
  color: #15803d;
}

.styled-quote {
  background: rgba(34, 197, 94, 0.15);
  border-right-color: #22c55e;
}

.styled-divider {
  background: linear-gradient(90deg, transparent, #22c55e, #16a34a, transparent);
}

.section-heading { color: #14532d; }
.contact-item a { color: #16a34a; }
.styled-table th { background: rgba(34, 197, 94, 0.2); color: #14532d; }
.styled-table td { border-bottom: 1px solid rgba(34, 197, 94, 0.2); }
`,

    cyberpunk: `
/* Cyberpunk - Neon Future */
.smart-page {
  --accent-color: #f0abfc;
  --heading-color: #fff;
  --text-color: rgba(255, 255, 255, 0.9);
  background: #09090b;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}

.smart-page::before {
  content: '';
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background:
    linear-gradient(90deg, rgba(236, 72, 153, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
}

.smart-page > * { position: relative; z-index: 1; }

.hero-section {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(34, 211, 238, 0.2));
  border: 2px solid;
  border-image: linear-gradient(135deg, #ec4899, #22d3ee) 1;
  border-radius: 0;
}

.hero-section h1 {
  background: linear-gradient(135deg, #f0abfc, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.styled-link {
  background: transparent;
  color: #f0abfc;
  border: 2px solid #f0abfc;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.styled-link:hover {
  background: #f0abfc;
  color: #09090b;
  box-shadow: 0 0 30px #f0abfc, 0 0 60px rgba(240, 171, 252, 0.5);
}

.code-block {
  background: rgba(9, 9, 11, 0.95);
  border: 1px solid #22d3ee;
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
}

.code-header {
  background: linear-gradient(90deg, rgba(236, 72, 153, 0.3), rgba(34, 211, 238, 0.3));
}

.inline-code {
  background: rgba(34, 211, 238, 0.15);
  color: #22d3ee;
  border: 1px solid rgba(34, 211, 238, 0.3);
}

.styled-quote {
  background: rgba(240, 171, 252, 0.1);
  border-right: 4px solid #ec4899;
}

.styled-divider {
  background: linear-gradient(90deg, #ec4899, #22d3ee);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
}

.section-heading {
  color: #22d3ee;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-item a { color: #f0abfc; }
.contact-item a:hover { text-shadow: 0 0 10px #f0abfc; }
`,

    lavender: `
/* Lavender - Soft Romance */
.smart-page {
  --accent-color: #a855f7;
  --heading-color: #581c87;
  --text-color: #6b21a8;
  background: linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%);
  color: #6b21a8;
}

.hero-section {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(192, 132, 252, 0.15));
  border: 1px solid rgba(168, 85, 247, 0.2);
  box-shadow: 0 8px 40px rgba(168, 85, 247, 0.15);
}

.hero-section h1 {
  color: #581c87;
  font-size: 3rem;
  font-weight: 600;
}

.styled-link {
  background: linear-gradient(135deg, #a855f7, #c084fc);
  color: #fff;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
}

.styled-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(168, 85, 247, 0.4);
}

.code-block {
  background: #3b0764;
  color: #f3e8ff;
}

.code-header { background: rgba(168, 85, 247, 0.4); color: #fff; }

.inline-code {
  background: rgba(168, 85, 247, 0.15);
  color: #7c3aed;
}

.styled-quote {
  background: rgba(168, 85, 247, 0.1);
  border-right-color: #a855f7;
}

.styled-divider {
  background: linear-gradient(90deg, transparent, #c084fc, #a855f7, transparent);
}

.section-heading { color: #581c87; }
.contact-item a { color: #9333ea; }
.styled-table th { background: rgba(168, 85, 247, 0.15); }
.styled-table td { border-bottom: 1px solid rgba(168, 85, 247, 0.15); }
`,

    monochrome: `
/* Monochrome - Elegant B&W */
.smart-page {
  --accent-color: #000;
  --heading-color: #000;
  --text-color: #262626;
  background: #fafafa;
  color: #262626;
}

.hero-section {
  background: #000;
  color: #fff;
}

.hero-section h1 {
  color: #fff;
  font-size: 3.5rem;
  font-weight: 200;
  letter-spacing: -0.03em;
}

.styled-link {
  background: #000;
  color: #fff;
}

.styled-link:hover {
  background: #262626;
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.code-block {
  background: #18181b;
  color: #e4e4e7;
  border: none;
}

.code-header { background: #27272a; }

.inline-code {
  background: #e4e4e7;
  color: #18181b;
}

.styled-quote {
  background: #f4f4f5;
  border-right-color: #000;
}

.styled-divider {
  background: #000;
  height: 1px;
}

.section-heading {
  font-weight: 300;
  letter-spacing: -0.02em;
}

.contact-item a { color: #000; }
.styled-table th { background: #e4e4e7; }
.styled-table td { border-bottom: 1px solid #e4e4e7; }

.image-container img {
  border-radius: 0;
  box-shadow: none;
  border: 1px solid #e4e4e7;
}
`,

    candy: `
/* Candy - Playful Colors */
.smart-page {
  --accent-color: #f43f5e;
  --heading-color: #1f2937;
  --text-color: #374151;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #e0f2fe 50%, #f0fdf4 75%, #fefce8 100%);
  color: #374151;
}

.hero-section {
  background: linear-gradient(135deg, #f43f5e, #8b5cf6, #06b6d4, #22c55e);
  color: #fff;
  border: none;
}

.hero-section h1 {
  color: #fff;
  font-size: 3rem;
  font-weight: 800;
  text-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.styled-link {
  background: linear-gradient(135deg, #f43f5e, #ec4899);
  color: #fff;
  box-shadow: 0 4px 20px rgba(244, 63, 94, 0.3);
}

.styled-link:hover {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  transform: translateY(-3px) rotate(-1deg);
  box-shadow: 0 8px 30px rgba(244, 63, 94, 0.4);
}

.code-block {
  background: linear-gradient(135deg, #1f2937, #374151);
  border: 3px solid #8b5cf6;
}

.code-header {
  background: linear-gradient(90deg, #f43f5e, #8b5cf6);
  color: #fff;
}

.inline-code {
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(139, 92, 246, 0.15));
  color: #be185d;
}

.styled-quote {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(34, 197, 94, 0.1));
  border-right: 5px solid;
  border-image: linear-gradient(180deg, #06b6d4, #22c55e) 1;
}

.styled-divider {
  background: linear-gradient(90deg, #f43f5e, #8b5cf6, #06b6d4, #22c55e, #eab308);
  height: 4px;
  border-radius: 2px;
}

.section-heading {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-item a { color: #8b5cf6; }
`,

    coffee: `
/* Coffee - Warm & Cozy */
.smart-page {
  --accent-color: #92400e;
  --heading-color: #451a03;
  --text-color: #78350f;
  background: linear-gradient(180deg, #fef3c7 0%, #fde68a 30%, #fcd34d 100%);
  color: #78350f;
}

.hero-section {
  background: linear-gradient(135deg, #92400e, #78350f);
  color: #fef3c7;
  border: none;
}

.hero-section h1 {
  color: #fef3c7;
  font-size: 3rem;
  font-weight: 700;
}

.styled-link {
  background: #92400e;
  color: #fef3c7;
  box-shadow: 0 4px 20px rgba(146, 64, 14, 0.3);
}

.styled-link:hover {
  background: #78350f;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(146, 64, 14, 0.4);
}

.code-block {
  background: #451a03;
  color: #fef3c7;
}

.code-header { background: rgba(146, 64, 14, 0.5); color: #fef3c7; }

.inline-code {
  background: rgba(146, 64, 14, 0.15);
  color: #92400e;
}

.styled-quote {
  background: rgba(146, 64, 14, 0.1);
  border-right-color: #92400e;
}

.styled-divider {
  background: linear-gradient(90deg, transparent, #92400e, #78350f, transparent);
}

.section-heading { color: #451a03; }
.contact-item a { color: #92400e; }
.styled-table th { background: rgba(146, 64, 14, 0.2); color: #451a03; }
.styled-table td { border-bottom: 1px solid rgba(146, 64, 14, 0.2); }

.image-container img {
  border: 3px solid rgba(146, 64, 14, 0.2);
}
`,
  };

  return baseStyles + (styleSpecific[style] || styleSpecific.aurora);
}

// יצירת סקריפט להעתקת קוד
export function generateCopyScript(): string {
  return `
<script>
function copyCode(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    button.classList.add('copy-success');
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copy-success');
    }, 2000);
  });
}
</script>
`;
}

// יצירת דף HTML מלא
export function generateFullHtml(
  input: string,
  style: "aurora" | "midnight" | "sunset" | "ocean" | "forest" | "cyberpunk" | "lavender" | "monochrome" | "candy" | "coffee" = "aurora",
  title: string = "Smart Page"
): string {
  const elements = parseInput(input);
  const htmlContent = generateStyledHtml(elements, style);
  const styles = generateStyles(style);
  const copyScript = generateCopyScript();

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
  <style>${styles}</style>
</head>
<body>
${htmlContent}
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
${copyScript}
</body>
</html>`;
}

// יצירת HTML לדף בודד מתוך ריבוי דפים (עם ניווט)
export function generatePageHtml(
  page: ParsedPage,
  pages: ParsedPage[],
  pageIndex: number,
  style: "aurora" | "midnight" | "sunset" | "ocean" | "forest" | "cyberpunk" | "lavender" | "monochrome" | "candy" | "coffee" = "aurora"
): string {
  const htmlContent = generateStyledHtml(page.elements, style);
  const styles = generateStyles(style);
  const copyScript = generateCopyScript();
  const navigation = generateNavigation(pages, pageIndex, style);

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
  <style>${styles}</style>
</head>
<body>
${navigation}
${htmlContent}
${navigation}
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
${copyScript}
</body>
</html>`;
}

// ייצור ריבוי דפים כמערך של קבצים
export interface GeneratedFile {
  filename: string;
  content: string;
}

export function generateMultiPageHtml(
  input: string,
  style: "aurora" | "midnight" | "sunset" | "ocean" | "forest" | "cyberpunk" | "lavender" | "monochrome" | "candy" | "coffee" = "aurora"
): GeneratedFile[] {
  const elements = parseInput(input);
  const pages = splitIntoPages(elements);

  // אם יש רק דף אחד, נחזיר אותו בלי ניווט
  if (pages.length === 1) {
    return [
      {
        filename: "index.html",
        content: generateFullHtml(input, style, pages[0].title),
      },
    ];
  }

  // יצירת קבצי HTML לכל דף
  return pages.map((page, index) => {
    const filename = index === 0 ? "index.html" : `${page.slug}.html`;
    return {
      filename,
      content: generatePageHtml(page, pages, index, style),
    };
  });
}
