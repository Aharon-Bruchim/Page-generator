import { useState } from 'react';
import { useDocument } from '../../context/DocumentContext';
import styles from './ui.module.css';

export function PageManager() {
  const {
    document,
    currentPageIndex,
    setCurrentPage,
    addPage,
    removePage,
    renamePage,
    movePage,
  } = useDocument();

  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartEdit = (pageId: string, title: string) => {
    setEditingPageId(pageId);
    setEditTitle(title);
  };

  const handleSaveEdit = (pageId: string) => {
    if (editTitle.trim()) {
      renamePage(pageId, editTitle.trim());
    }
    setEditingPageId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, pageId: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(pageId);
    } else if (e.key === 'Escape') {
      setEditingPageId(null);
    }
  };

  return (
    <div className={styles.pageManager}>
      <div className={styles.pageManagerHeader}>
        <h3 className={styles.pageManagerTitle}>דפים</h3>
        <button
          type="button"
          className={styles.addPageBtn}
          onClick={() => addPage()}
          aria-label="הוסף דף חדש"
        >
          + דף חדש
        </button>
      </div>

      <nav className={styles.pageList} aria-label="ניווט בין דפים">
        {document.pages.map((page, index) => (
          <div
            key={page.id}
            className={`${styles.pageItem} ${index === currentPageIndex ? styles.pageItemActive : ''}`}
          >
            <button
              type="button"
              className={styles.pageNavBtn}
              onClick={() => setCurrentPage(index)}
              aria-current={index === currentPageIndex ? 'page' : undefined}
            >
              <span className={styles.pageNumber}>{index + 1}</span>
              {editingPageId === page.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => handleSaveEdit(page.id)}
                  onKeyDown={(e) => handleKeyDown(e, page.id)}
                  className={styles.pageEditInput}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span
                  className={styles.pageTitle}
                  onDoubleClick={() => handleStartEdit(page.id, page.title)}
                >
                  {page.title}
                </span>
              )}
            </button>

            <div className={styles.pageActions}>
              <button
                type="button"
                className={styles.pageActionBtn}
                onClick={() => movePage(page.id, 'up')}
                disabled={index === 0}
                aria-label="העבר שמאלה"
                title="העבר שמאלה"
              >
                ←
              </button>
              <button
                type="button"
                className={styles.pageActionBtn}
                onClick={() => movePage(page.id, 'down')}
                disabled={index === document.pages.length - 1}
                aria-label="העבר ימינה"
                title="העבר ימינה"
              >
                →
              </button>
              <button
                type="button"
                className={`${styles.pageActionBtn} ${styles.pageDeleteBtn}`}
                onClick={() => removePage(page.id)}
                disabled={document.pages.length <= 1}
                aria-label="מחק דף"
                title="מחק דף"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </nav>

      <div className={styles.pageStats}>
        דף {currentPageIndex + 1} מתוך {document.pages.length}
      </div>
    </div>
  );
}
