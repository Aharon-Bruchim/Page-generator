/**
 * Smart Paste Parser
 * מזהה אוטומטית אלמנטים מטקסט או HTML ומייצר HTML מעוצב
 */

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
  style: "glassmorphism" | "cards" | "minimal" | "neon" = "glassmorphism"
): string {
  const styleConfigs = {
    glassmorphism: {
      containerClass: "glass-container",
      cardClass: "glass-card",
      headingClass: "gradient-text",
      codeTheme: "atom-one-dark",
    },
    cards: {
      containerClass: "cards-container",
      cardClass: "modern-card",
      headingClass: "card-heading",
      codeTheme: "github-dark",
    },
    minimal: {
      containerClass: "minimal-container",
      cardClass: "minimal-section",
      headingClass: "minimal-heading",
      codeTheme: "github",
    },
    neon: {
      containerClass: "neon-container",
      cardClass: "neon-card",
      headingClass: "neon-text",
      codeTheme: "monokai",
    },
  };

  const config = styleConfigs[style];
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
  style: "glassmorphism" | "cards" | "minimal" | "neon" = "glassmorphism"
): string {
  const baseStyles = `
/* Base Styles */
.smart-page {
  font-family: 'Rubik', 'Segoe UI', sans-serif;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
}

.section-heading {
  margin: 2rem 0 1rem;
  color: var(--heading-color, #1a1a2e);
}

.content-paragraph {
  margin-bottom: 1rem;
  color: var(--text-color, #333);
}

.styled-list {
  margin: 1rem 0;
  padding-right: 2rem;
}

.styled-list li {
  margin-bottom: 0.5rem;
}

.link-container {
  margin: 1rem 0;
}

.styled-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-item {
  margin: 0.5rem 0;
}

.contact-item a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.contact-icon {
  font-size: 1.2rem;
}

.image-container {
  margin: 2rem 0;
  text-align: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}

.image-container figcaption {
  margin-top: 0.5rem;
  font-style: italic;
  opacity: 0.8;
}

.code-block {
  margin: 1.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  direction: ltr;
  text-align: left;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  font-size: 0.85rem;
}

.code-language {
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0.8;
}

.copy-button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: inherit;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.code-block pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.inline-code {
  font-family: 'Fira Code', monospace;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  direction: ltr;
  display: inline-block;
}

.styled-quote {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-right: 4px solid var(--accent-color, #4cc9f0);
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0 8px 8px 0;
  font-style: italic;
}

.styled-divider {
  border: none;
  height: 2px;
  margin: 2rem 0;
  background: linear-gradient(90deg, transparent, var(--accent-color, #4cc9f0), transparent);
}

.table-container {
  margin: 1.5rem 0;
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th,
.styled-table td {
  padding: 0.75rem 1rem;
  text-align: right;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.styled-table th {
  font-weight: 600;
  background: rgba(0, 0, 0, 0.05);
}

/* Copy Code Function */
@keyframes copySuccess {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.copy-success {
  animation: copySuccess 0.3s ease;
}

/* Page Navigation */
.page-navigation {
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.1);
}

.nav-pages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-active {
  background: var(--accent-color, #4cc9f0);
  color: #fff;
}

.nav-arrows {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.nav-arrow {
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
}

.nav-arrow:hover {
  background: var(--accent-color, #4cc9f0);
  color: #fff;
}

.nav-prev {
  margin-left: auto;
}

.nav-next {
  margin-right: auto;
}
`;

  const styleSpecific: Record<string, string> = {
    glassmorphism: `
/* Glassmorphism Style */
.glass-container {
  --accent-color: #4cc9f0;
  --heading-color: #fff;
  --text-color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: rgba(255, 255, 255, 0.9);
  min-height: 100vh;
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

.gradient-text {
  background: linear-gradient(135deg, #4cc9f0, #7b68ee, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
  font-weight: 700;
}

.glass-container .styled-link {
  background: rgba(76, 201, 240, 0.2);
  color: #4cc9f0;
  border: 1px solid rgba(76, 201, 240, 0.3);
}

.glass-container .styled-link:hover {
  background: rgba(76, 201, 240, 0.3);
  box-shadow: 0 0 20px rgba(76, 201, 240, 0.3);
}

.glass-container .code-block {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-container .inline-code {
  background: rgba(255, 255, 255, 0.15);
  color: #4cc9f0;
}

.glass-container .styled-quote {
  background: rgba(255, 255, 255, 0.05);
  border-right-color: #4cc9f0;
}

.glass-container .contact-item a {
  color: #4cc9f0;
}
`,
    cards: `
/* Cards Style */
.cards-container {
  --accent-color: #3b82f6;
  --heading-color: #1f2937;
  --text-color: #374151;
  background: #f3f4f6;
}

.modern-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.card-heading {
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 700;
}

.cards-container .styled-link {
  background: #3b82f6;
  color: #fff;
}

.cards-container .styled-link:hover {
  background: #2563eb;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.cards-container .code-block {
  background: #1f2937;
  color: #e5e7eb;
}

.cards-container .inline-code {
  background: #e5e7eb;
  color: #1f2937;
}
`,
    minimal: `
/* Minimal Style */
.minimal-container {
  --accent-color: #000;
  --heading-color: #000;
  --text-color: #333;
  background: #fff;
}

.minimal-section {
  border-bottom: 1px solid #eee;
  padding-bottom: 2rem;
}

.minimal-heading {
  color: #000;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: -0.02em;
}

.minimal-container .styled-link {
  background: transparent;
  color: #000;
  border: 1px solid #000;
}

.minimal-container .styled-link:hover {
  background: #000;
  color: #fff;
}

.minimal-container .code-block {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.minimal-container .inline-code {
  background: #f5f5f5;
  color: #333;
}
`,
    neon: `
/* Neon Style */
.neon-container {
  --accent-color: #00ff88;
  --heading-color: #fff;
  --text-color: rgba(255, 255, 255, 0.85);
  background: #0a0a0a;
  color: rgba(255, 255, 255, 0.85);
}

.neon-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.1);
}

.neon-text {
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3);
  font-size: 2.5rem;
  font-weight: 700;
}

.neon-container .styled-link {
  background: transparent;
  color: #00ff88;
  border: 1px solid #00ff88;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.neon-container .styled-link:hover {
  background: #00ff88;
  color: #0a0a0a;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
}

.neon-container .code-block {
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.neon-container .inline-code {
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
}

.neon-container .styled-quote {
  border-right-color: #00ff88;
  background: rgba(0, 255, 136, 0.05);
}

.neon-container .styled-divider {
  background: linear-gradient(90deg, transparent, #00ff88, transparent);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}
`,
  };

  return baseStyles + styleSpecific[style];
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
  style: "glassmorphism" | "cards" | "minimal" | "neon" = "glassmorphism",
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
  style: "glassmorphism" | "cards" | "minimal" | "neon" = "glassmorphism"
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
  style: "glassmorphism" | "cards" | "minimal" | "neon" = "glassmorphism"
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
