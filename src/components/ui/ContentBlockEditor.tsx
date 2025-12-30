import { useRef, useState } from "react";
import { ContentBlock, createContentBlock } from "../../utils/smartPasteParser";
import styles from "./ContentBlockEditor.module.css";

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function ContentBlockEditor({ blocks, onChange }: ContentBlockEditorProps) {
  const [showImageUrlInput, setShowImageUrlInput] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const addTextBlock = () => {
    const newBlock = createContentBlock("text", "");
    onChange([...blocks, newBlock]);
  };

  const addImageBlock = (src: string) => {
    const newBlock = createContentBlock("image", src);
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    onChange(
      blocks.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      )
    );
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter((block) => block.id !== id));
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      addImageBlock(result);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (!file) continue;

        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          addImageBlock(result);
        };
        reader.readAsDataURL(file);
        return;
      }
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrl.trim()) {
      addImageBlock(imageUrl.trim());
      setImageUrl("");
      setShowImageUrlInput(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          addImageBlock(result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onPaste={handlePaste}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* כפתורי הוספה */}
      <div className={styles.addButtons}>
        <button
          type="button"
          className={styles.addButton}
          onClick={addTextBlock}
          title="הוסף בלוק טקסט"
        >
          + טקסט
        </button>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => fileInputRef.current?.click()}
          title="העלה תמונה"
        >
          + תמונה
        </button>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => setShowImageUrlInput(showImageUrlInput ? null : "new")}
          title="הוסף תמונה מ-URL"
        >
          + URL
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* הודעת הדבקה */}
      <div className={styles.pasteHint}>
        Ctrl+V להדבקת תמונה מה-clipboard, או גרור תמונה לכאן
      </div>

      {/* שדה URL לתמונה */}
      {showImageUrlInput && (
        <div className={styles.urlInputWrapper}>
          <input
            type="text"
            className={styles.urlInput}
            placeholder="הכנס URL של תמונה..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddImageUrl();
              if (e.key === "Escape") {
                setShowImageUrlInput(null);
                setImageUrl("");
              }
            }}
            autoFocus
          />
          <button
            type="button"
            className={styles.urlAddButton}
            onClick={handleAddImageUrl}
          >
            הוסף
          </button>
          <button
            type="button"
            className={styles.urlCancelButton}
            onClick={() => {
              setShowImageUrlInput(null);
              setImageUrl("");
            }}
          >
            ביטול
          </button>
        </div>
      )}

      {/* רשימת הבלוקים */}
      <div className={styles.blocksList}>
        {blocks.length === 0 ? (
          <div className={styles.emptyState}>
            <p>אין בלוקים עדיין</p>
            <p className={styles.emptyHint}>
              הוסף בלוק טקסט או תמונה כדי להתחיל
            </p>
          </div>
        ) : (
          blocks.map((block, index) => (
            <div key={block.id} className={styles.blockWrapper}>
              {/* כפתורי פעולה */}
              <div className={styles.blockActions}>
                <span className={styles.blockType}>
                  {block.type === "text" ? "טקסט" : "תמונה"}
                </span>
                <div className={styles.blockButtons}>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => moveBlock(block.id, "up")}
                    disabled={index === 0}
                    title="הזז למעלה"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => moveBlock(block.id, "down")}
                    disabled={index === blocks.length - 1}
                    title="הזז למטה"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => removeBlock(block.id)}
                    title="מחק בלוק"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* תוכן הבלוק */}
              {block.type === "text" ? (
                <textarea
                  className={styles.textArea}
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                  placeholder="הכנס טקסט כאן...

טיפים:
• # כותרת ראשית
• ## כותרת משנה
• - פריט ברשימה
• > ציטוט
• ``` בלוק קוד ```"
                  dir="auto"
                />
              ) : (
                <div className={styles.imageBlock}>
                  {block.content ? (
                    <>
                      <img
                        src={block.content}
                        alt={block.alt || "תמונה"}
                        className={styles.imagePreview}
                      />
                      <div className={styles.imageFields}>
                        <input
                          type="text"
                          className={styles.imageInput}
                          placeholder="תיאור התמונה (alt)"
                          value={block.alt || ""}
                          onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
                        />
                        <input
                          type="text"
                          className={styles.imageInput}
                          placeholder="כיתוב (אופציונלי)"
                          value={block.caption || ""}
                          onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                        />
                      </div>
                    </>
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>אין תמונה</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
