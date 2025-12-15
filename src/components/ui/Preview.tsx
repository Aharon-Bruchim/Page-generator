import { useState } from 'react';
import { useDocument } from '../../context/DocumentContext';
import { PreviewLayout } from '../layout';
import { SectionRenderer } from '../sections';
import styles from './ui.module.css';

export function Preview() {
  const { document } = useDocument();
  const [activePageIndex, setActivePageIndex] = useState(0);

  const hasContent = document.pages.some(page => page.sections.length > 0);

  if (!hasContent) {
    return (
      <PreviewLayout>
        <div className={styles.previewEmpty}>
          <p>התצוגה המקדימה תופיע כאן</p>
        </div>
      </PreviewLayout>
    );
  }

  const activePage = document.pages[activePageIndex];

  return (
    <PreviewLayout>
      {/* Navigation Bar */}
      {document.pages.length > 1 && (
        <nav className={styles.previewNav} aria-label="ניווט בין דפים">
          {document.pages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              className={`${styles.previewNavBtn} ${index === activePageIndex ? styles.previewNavBtnActive : ''}`}
              onClick={() => setActivePageIndex(index)}
              aria-current={index === activePageIndex ? 'page' : undefined}
            >
              {page.title}
            </button>
          ))}
        </nav>
      )}

      {/* Page Content */}
      <article aria-label={activePage?.title || document.title}>
        {activePage?.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
        {(!activePage || activePage.sections.length === 0) && (
          <div className={styles.previewEmpty}>
            <p>דף ריק</p>
          </div>
        )}
      </article>
    </PreviewLayout>
  );
}
