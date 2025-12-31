import React from 'react';
import { Template } from '../../../types';
import { TemplateCard } from './TemplateCard';
import styles from './TemplateGallery.module.css';

interface TemplateGalleryProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  onPreviewTemplate: (template: Template) => void;
}

export function TemplateGallery({ templates, onSelectTemplate, onPreviewTemplate }: TemplateGalleryProps) {
  if (templates.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>📭</span>
        <h3 className={styles.emptyTitle}>לא נמצאו תבניות</h3>
        <p className={styles.emptyText}>נסה לשנות את מסנני החיפוש</p>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onSelect={onSelectTemplate}
          onPreview={onPreviewTemplate}
        />
      ))}
    </div>
  );
}
