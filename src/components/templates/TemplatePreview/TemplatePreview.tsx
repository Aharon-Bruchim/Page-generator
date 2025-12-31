import React from 'react';
import { Template, TEMPLATE_CATEGORIES } from '../../../types';
import styles from './TemplatePreview.module.css';

interface TemplatePreviewProps {
  template: Template;
  onClose: () => void;
  onSelect: (template: Template, replaceExisting: boolean) => void;
}

export function TemplatePreview({ template, onClose, onSelect }: TemplatePreviewProps) {
  const category = TEMPLATE_CATEGORIES.find(c => c.id === template.category);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.header}>
          <div className={styles.thumbnailLarge}>
            <span>{template.thumbnail}</span>
          </div>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>{template.nameHe}</h2>
            {category && (
              <span className={styles.category}>
                {category.icon} {category.nameHe}
              </span>
            )}
            <p className={styles.description}>{template.descriptionHe}</p>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{template.pages.length}</span>
              <span className={styles.statLabel}>עמודים</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {template.pages.reduce((acc, p) => acc + p.sections.length, 0)}
              </span>
              <span className={styles.statLabel}>סקשנים</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{template.suggestedPreset}</span>
              <span className={styles.statLabel}>סגנון מומלץ</span>
            </div>
          </div>

          <div className={styles.pagesSection}>
            <h3 className={styles.sectionTitle}>מבנה התבנית</h3>
            <div className={styles.pagesList}>
              {template.pages.map((page, pageIdx) => (
                <div key={pageIdx} className={styles.pageItem}>
                  <div className={styles.pageHeader}>
                    <span className={styles.pageNumber}>{pageIdx + 1}</span>
                    <span className={styles.pageTitle}>{page.title}</span>
                  </div>
                  <div className={styles.sectionsList}>
                    {page.sections.map((section, sectionIdx) => (
                      <span key={sectionIdx} className={styles.sectionBadge}>
                        {section.type}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {template.tags.length > 0 && (
            <div className={styles.tagsSection}>
              <h3 className={styles.sectionTitle}>תגיות</h3>
              <div className={styles.tagsList}>
                {template.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.replaceBtn}
            onClick={() => onSelect(template, true)}
          >
            החלף מסמך קיים
          </button>
          <button
            className={styles.appendBtn}
            onClick={() => onSelect(template, false)}
          >
            הוסף למסמך קיים
          </button>
        </div>
      </div>
    </div>
  );
}
