import { useState, useEffect, useRef } from "react";
import {
  parseInput,
  generateStyledHtml,
  generateFullHtml,
  splitIntoPages,
  generateMultiPageHtml,
  generatePageHtml,
  ParsedElement,
  ParsedPage,
  GeneratedFile,
} from "../../utils/smartPasteParser";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import styles from "./SmartPaste.module.css";

type StylePreset = "glassmorphism" | "cards" | "minimal" | "neon";

export function SmartPaste() {
  const [inputText, setInputText] = useState("");
  const [parsedElements, setParsedElements] = useState<ParsedElement[]>([]);
  const [pages, setPages] = useState<ParsedPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [stylePreset, setStylePreset] = useState<StylePreset>("glassmorphism");
  const [pageTitle, setPageTitle] = useState("העמוד שלי");
  const [showCode, setShowCode] = useState(false);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  // עדכון התצוגה כשמשתנה הקלט או הסגנון
  useEffect(() => {
    if (inputText.trim()) {
      const elements = parseInput(inputText);
      setParsedElements(elements);

      const parsedPages = splitIntoPages(elements);
      setPages(parsedPages);

      // איפוס לדף הראשון
      if (currentPageIndex >= parsedPages.length) {
        setCurrentPageIndex(0);
      }

      const html = generateStyledHtml(elements, stylePreset);
      setGeneratedHtml(html);
    } else {
      setParsedElements([]);
      setPages([]);
      setGeneratedHtml("");
    }
  }, [inputText, stylePreset]);

  // עדכון ה-iframe והדגשת קוד
  useEffect(() => {
    if (previewIframeRef.current && pages.length > 0) {
      let fullHtml: string;

      if (pages.length === 1) {
        fullHtml = generateFullHtml(
          inputText,
          stylePreset,
          pageTitle || pages[0].title
        );
      } else {
        fullHtml = generatePageHtml(
          pages[currentPageIndex],
          pages,
          currentPageIndex,
          stylePreset
        );
      }

      const iframe = previewIframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(fullHtml);
        doc.close();
      }
    }
  }, [
    generatedHtml,
    inputText,
    stylePreset,
    pageTitle,
    pages,
    currentPageIndex,
  ]);

  // הדגשת קוד בתצוגת HTML
  useEffect(() => {
    if (showCode) {
      document.querySelectorAll(".html-preview-code code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [showCode, generatedHtml, currentPageIndex]);

  const handleExportHtml = async () => {
    const files = generateMultiPageHtml(inputText, stylePreset);

    if (files.length === 1) {
      // דף יחיד - הורדה ישירה
      const blob = new Blob([files[0].content], {
        type: "text/html;charset=utf-8",
      });
      saveAs(blob, `${pageTitle || "smart-page"}.html`);
    } else {
      // ריבוי דפים - יצירת ZIP
      const zip = new JSZip();

      files.forEach((file) => {
        zip.file(file.filename, file.content);
      });

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `${pageTitle || "website"}.zip`);
    }
  };

  const handleCopyHtml = async () => {
    let htmlToCopy: string;

    if (pages.length === 1) {
      htmlToCopy = generateFullHtml(inputText, stylePreset, pageTitle);
    } else {
      htmlToCopy = generatePageHtml(
        pages[currentPageIndex],
        pages,
        currentPageIndex,
        stylePreset
      );
    }

    await navigator.clipboard.writeText(htmlToCopy);
    alert("הקוד הועתק ללוח!");
  };

  const stylePresets: {
    value: StylePreset;
    label: string;
    description: string;
  }[] = [
    {
      value: "glassmorphism",
      label: "Glassmorphism",
      description: "רקע שקוף עם blur וגרדיאנטים",
    },
    {
      value: "cards",
      label: "Cards Modern",
      description: "כרטיסים מודרניים עם צללים",
    },
    { value: "minimal", label: "Minimal", description: "נקי ופשוט" },
    { value: "neon", label: "Neon", description: "אפקטים זוהרים על רקע כהה" },
  ];

  const exampleText = `שלום לכולם!

זהו מחולל העמודים החכם

כאן תוכלו להדביק טקסט והמערכת תזהה אוטומטית:
- כותרות
- פסקאות
- רשימות
- לינקים

צרו קשר: info@example.com
או התקשרו: 052-1234567

===

עמוד שני - קוד לדוגמה

הנה קטע קוד ב-JavaScript:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('World');
\`\`\`

בקרו באתר שלנו: https://example.com

> זה ציטוט לדוגמה שמראה איך טקסט מיוחד יוצג בצורה יפה.

===

סיכום

תודה שביקרתם באתר שלנו!

---

בהצלחה!`;

  const getCurrentPageHtml = () => {
    if (pages.length === 0) return "";
    if (pages.length === 1) {
      return generateFullHtml(inputText, stylePreset, pageTitle);
    }
    return generatePageHtml(
      pages[currentPageIndex],
      pages,
      currentPageIndex,
      stylePreset
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarSection}>
          <h3 className={styles.sectionTitle}>הגדרות</h3>

          <label className={styles.label}>
            כותרת העמוד
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className={styles.input}
              placeholder="שם העמוד"
            />
          </label>

          <label className={styles.label}>
            סגנון עיצוב
            <select
              value={stylePreset}
              onChange={(e) => setStylePreset(e.target.value as StylePreset)}
              className={styles.select}
            >
              {stylePresets.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label} - {preset.description}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.sidebarSection}>
          <h3 className={styles.sectionTitle}>טקסט להמרה</h3>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={styles.textarea}
            placeholder="הדבק כאן טקסט, HTML, או Markdown...

טיפים:
• כותרת ראשית (#) = דף חדש
• === = מעבר דף ידני
• --- = קו הפרדה"
            dir="auto"
          />
          <button
            className={styles.exampleButton}
            onClick={() => setInputText(exampleText)}
          >
            טען דוגמה (3 דפים)
          </button>
        </div>

        {/* מידע על דפים */}
        {pages.length > 1 && (
          <div className={styles.sidebarSection}>
            <h3 className={styles.sectionTitle}>דפים ({pages.length})</h3>
            <div className={styles.pagesList}>
              {pages.map((page, index) => (
                <button
                  key={index}
                  className={`${styles.pageItem} ${
                    index === currentPageIndex ? styles.pageItemActive : ""
                  }`}
                  onClick={() => setCurrentPageIndex(index)}
                >
                  <span className={styles.pageNumber}>{index + 1}</span>
                  <span className={styles.pageTitle}>{page.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.sidebarSection}>
          <h3 className={styles.sectionTitle}>אלמנטים שזוהו</h3>
          <div className={styles.elementsList}>
            {parsedElements.length === 0 ? (
              <p className={styles.emptyMessage}>
                הדבק טקסט כדי לראות את האלמנטים שזוהו
              </p>
            ) : (
              parsedElements.slice(0, 15).map((el, index) => (
                <div key={index} className={styles.elementItem}>
                  <span className={styles.elementType}>{el.type}</span>
                  <span className={styles.elementContent}>
                    {el.content.slice(0, 25)}
                    {el.content.length > 25 ? "..." : ""}
                  </span>
                </div>
              ))
            )}
            {parsedElements.length > 15 && (
              <p className={styles.emptyMessage}>
                +{parsedElements.length - 15} נוספים...
              </p>
            )}
          </div>
        </div>

        <div className={styles.sidebarSection}>
          <h3 className={styles.sectionTitle}>ייצוא</h3>
          <div className={styles.exportButtons}>
            <button
              className={styles.exportButton}
              onClick={handleExportHtml}
              disabled={!generatedHtml}
            >
              {pages.length > 1 ? "📦 הורד ZIP" : "📥 הורד HTML"}
            </button>
            <button
              className={styles.exportButton}
              onClick={handleCopyHtml}
              disabled={!generatedHtml}
            >
              📋copy
            </button>
          </div>
          {pages.length > 1 && (
            <p className={styles.exportNote}>
              יורדים {pages.length} קבצי HTML בקובץ ZIP
            </p>
          )}
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>
            תצוגה מקדימה
            {pages.length > 1 && (
              <span className={styles.pageIndicator}>
                (דף {currentPageIndex + 1} מתוך {pages.length})
              </span>
            )}
          </h2>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleButton} ${
                !showCode ? styles.toggleActive : ""
              }`}
              onClick={() => setShowCode(false)}
            >
              👁️ תצוגה
            </button>
            <button
              className={`${styles.toggleButton} ${
                showCode ? styles.toggleActive : ""
              }`}
              onClick={() => setShowCode(true)}
            >
              {"</>"} קוד
            </button>
          </div>
        </div>

        {/* ניווט בין דפים */}
        {pages.length > 1 && !showCode && (
          <div className={styles.pageNavigation}>
            <button
              className={styles.navButton}
              onClick={() =>
                setCurrentPageIndex(Math.max(0, currentPageIndex - 1))
              }
              disabled={currentPageIndex === 0}
            >
              → הקודם
            </button>
            <span className={styles.navInfo}>
              {pages[currentPageIndex]?.title}
            </span>
            <button
              className={styles.navButton}
              onClick={() =>
                setCurrentPageIndex(
                  Math.min(pages.length - 1, currentPageIndex + 1)
                )
              }
              disabled={currentPageIndex === pages.length - 1}
            >
              הבא ←
            </button>
          </div>
        )}

        <div className={styles.previewContainer}>
          {!showCode ? (
            <iframe
              ref={previewIframeRef}
              className={styles.previewIframe}
              title="תצוגה מקדימה"
            />
          ) : (
            <div className={styles.codePreview}>
              <pre className="html-preview-code">
                <code className="language-html">{getCurrentPageHtml()}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
