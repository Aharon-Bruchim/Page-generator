import React from 'react';
import { Template, TEMPLATE_CATEGORIES } from '../../../types';
import styles from './TemplateGallery.module.css';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  onPreview: (template: Template) => void;
}

export function TemplateCard({ template, onSelect, onPreview }: TemplateCardProps) {
  const category = TEMPLATE_CATEGORIES.find(c => c.id === template.category);

  return (
    <div className={styles.card}>
      <div className={styles.cardThumbnail}>
        <span className={styles.thumbnailIcon}>{template.thumbnail}</span>
        <div className={styles.cardOverlay}>
          <button
            className={styles.previewBtn}
            onClick={() => onPreview(template)}
          >
            👁️ תצוגה מקדימה
          </button>
          <button
            className={styles.selectBtn}
            onClick={() => onSelect(template)}
          >
            ✓ בחר תבנית
          </button>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{template.nameHe}</h3>
          {category && (
            <span className={styles.cardCategory}>
              {category.icon} {category.nameHe}
            </span>
          )}
        </div>

        <p className={styles.cardDescription}>{template.descriptionHe}</p>

        <div className={styles.cardMeta}>
          <span className={styles.pageCount}>
            📄 {template.pages.length} {template.pages.length === 1 ? 'עמוד' : 'עמודים'}
          </span>
          <span className={styles.sectionCount}>
            🧩 {template.pages.reduce((acc, p) => acc + p.sections.length, 0)} סקשנים
          </span>
        </div>

        {template.tags.length > 0 && (
          <div className={styles.cardTags}>
            {template.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
