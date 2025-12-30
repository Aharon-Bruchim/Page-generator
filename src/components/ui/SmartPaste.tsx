import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  parseInput,
  generateStyledHtml,
  generateFullHtml,
  splitIntoPages,
  generateMultiPageHtml,
  generatePageHtml,
  generateStyles,
  generateCopyScript,
  ParsedElement,
  ParsedPage,
  ContentBlock,
  contentBlocksToElements,
  createContentBlock,
} from "../../utils/smartPasteParser";
import { ContentBlockEditor } from "./ContentBlockEditor";
import { useDocument } from "../../context/DocumentContext";
import { documentsApi } from "../../services";
import { createDocument, createPage, createSection } from "../../types";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import styles from "./SmartPaste.module.css";

type StylePreset = "glassmorphism" | "cards" | "minimal" | "neon";
type EditorMode = "simple" | "blocks";

export function SmartPaste() {
  const navigate = useNavigate();
  const { setDocument } = useDocument();
  const [editorMode, setEditorMode] = useState<EditorMode>("blocks");
  const [inputText, setInputText] = useState("");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    createContentBlock("text", ""),
  ]);
  const [parsedElements, setParsedElements] = useState<ParsedElement[]>([]);
  const [pages, setPages] = useState<ParsedPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [stylePreset, setStylePreset] = useState<StylePreset>("glassmorphism");
  const [pageTitle, setPageTitle] = useState("העמוד שלי");
  const [showCode, setShowCode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  // עדכון התצוגה כשמשתנה הקלט או הסגנון
  useEffect(() => {
    let elements: ParsedElement[] = [];

    if (editorMode === "simple") {
      if (inputText.trim()) {
        elements = parseInput(inputText);
      }
    } else {
      // מצב בלוקים - המרת בלוקים לאלמנטים
      elements = contentBlocksToElements(contentBlocks);
    }

    if (elements.length > 0) {
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
  }, [inputText, stylePreset, editorMode, contentBlocks]);

  // פונקציית עזר להשגת התוכן הנוכחי לפי מצב העריכה
  const getCurrentInputContent = (): string => {
    if (editorMode === "simple") {
      return inputText;
    }
    // במצב בלוקים, מייצרים טקסט מהבלוקים
    return contentBlocks
      .filter((b) => b.type === "text" && b.content.trim())
      .map((b) => b.content)
      .join("\n\n===\n\n");
  };

  // עדכון ה-iframe והדגשת קוד
  useEffect(() => {
    if (previewIframeRef.current && pages.length > 0) {
      let fullHtml: string;

      if (pages.length === 1) {
        // במצב בלוקים, משתמשים ב-parsedElements ישירות
        if (editorMode === "blocks") {
          const htmlContent = generateStyledHtml(parsedElements, stylePreset);
          fullHtml = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle || pages[0].title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
  <style>${generateStyles(stylePreset)}</style>
</head>
<body>
${htmlContent}
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
${generateCopyScript()}
</body>
</html>`;
        } else {
          fullHtml = generateFullHtml(
            inputText,
            stylePreset,
            pageTitle || pages[0].title
          );
        }
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
    editorMode,
    parsedElements,
    contentBlocks,
  ]);

  // הדגשת קוד בתצוגת HTML
  useEffect(() => {
    if (showCode) {
      document.querySelectorAll(".html-preview-code code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [showCode, generatedHtml, currentPageIndex]);

  // יצירת HTML מלא מהאלמנטים הנוכחיים
  const generateCurrentHtml = (title: string): string => {
    const htmlContent = generateStyledHtml(parsedElements, stylePreset);
    return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
  <style>${generateStyles(stylePreset)}</style>
</head>
<body>
${htmlContent}
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
${generateCopyScript()}
</body>
</html>`;
  };

  const handleExportHtml = async () => {
    if (editorMode === "blocks") {
      // במצב בלוקים - ייצוא ישיר מהאלמנטים
      const html = generateCurrentHtml(pageTitle || "smart-page");
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      saveAs(blob, `${pageTitle || "smart-page"}.html`);
    } else {
      // במצב פשוט - משתמשים בייצוא רב-דפים
      const files = generateMultiPageHtml(inputText, stylePreset);

      if (files.length === 1) {
        const blob = new Blob([files[0].content], {
          type: "text/html;charset=utf-8",
        });
        saveAs(blob, `${pageTitle || "smart-page"}.html`);
      } else {
        const zip = new JSZip();
        files.forEach((file) => {
          zip.file(file.filename, file.content);
        });
        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, `${pageTitle || "website"}.zip`);
      }
    }
  };

  const handleSave = async () => {
    if (!generatedHtml) {
      toast.error("אין תוכן לשמור");
      return;
    }

    setIsSaving(true);

    try {
      // יצירת מסמך חדש עם התוכן
      const newDoc = createDocument();
      newDoc.title = pageTitle || "מסמך חדש";

      // יצירת סקשן טקסט עם התוכן
      const textSection = createSection("text");
      textSection.content = parsedElements.map(el => el.content).join("\n\n");

      // עדכון העמוד הראשון
      newDoc.pages[0].title = pageTitle || "עמוד ראשי";
      newDoc.pages[0].sections = [textSection];

      await documentsApi.save(newDoc);
      toast.success("המסמך נשמר בהצלחה!");
      navigate(`/document/${newDoc.id}`);
    } catch (error) {
      toast.error("שגיאה בשמירת המסמך");
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
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
    if (editorMode === "blocks") {
      return generateCurrentHtml(pageTitle || "smart-page");
    }
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
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>תוכן</h3>
            <div className={styles.modeToggle}>
              <button
                type="button"
                className={`${styles.modeButton} ${editorMode === "blocks" ? styles.modeActive : ""}`}
                onClick={() => setEditorMode("blocks")}
              >
                בלוקים
              </button>
              <button
                type="button"
                className={`${styles.modeButton} ${editorMode === "simple" ? styles.modeActive : ""}`}
                onClick={() => setEditorMode("simple")}
              >
                טקסט
              </button>
            </div>
          </div>

          {editorMode === "blocks" ? (
            <ContentBlockEditor
              blocks={contentBlocks}
              onChange={setContentBlocks}
            />
          ) : (
            <>
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
            </>
          )}
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
          <h3 className={styles.sectionTitle}>שמירה וייצוא</h3>
          <div className={styles.exportButtons}>
            <button
              className={`${styles.exportButton} ${styles.saveButton}`}
              onClick={handleSave}
              disabled={!generatedHtml || isSaving}
            >
              {isSaving ? "💾 שומר..." : "💾 שמור"}
            </button>
            <button
              className={styles.exportButton}
              onClick={handleExportHtml}
              disabled={!generatedHtml}
            >
              {pages.length > 1 ? "📦 ZIP" : "📥 HTML"}
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
