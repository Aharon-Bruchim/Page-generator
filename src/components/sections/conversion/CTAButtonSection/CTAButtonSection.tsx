import React from 'react';
import { CTAButtonSection as CTAButtonSectionType } from '../../../../types';
import { IconPicker } from '../../shared';
import styles from './CTAButtonSection.module.css';

interface CTAButtonSectionProps {
  section: CTAButtonSectionType;
  isEditing?: boolean;
  onChange?: (section: CTAButtonSectionType) => void;
}

export function CTAButtonSection({ section, isEditing, onChange }: CTAButtonSectionProps) {
  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.field}>
          <label className={styles.label}>טקסט הכפתור</label>
          <input
            type="text"
            value={section.text}
            onChange={(e) => onChange({ ...section, text: e.target.value })}
            placeholder="לחץ כאן"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>קישור</label>
          <input
            type="text"
            value={section.url}
            onChange={(e) => onChange({ ...section, url: e.target.value })}
            placeholder="https://..."
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>סגנון</label>
            <select
              value={section.variant}
              onChange={(e) => onChange({ ...section, variant: e.target.value as 'primary' | 'secondary' | 'outline' })}
              className={styles.select}
            >
              <option value="primary">ראשי</option>
              <option value="secondary">משני</option>
              <option value="outline">מסגרת</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>גודל</label>
            <select
              value={section.size}
              onChange={(e) => onChange({ ...section, size: e.target.value as 'small' | 'medium' | 'large' })}
              className={styles.select}
            >
              <option value="small">קטן</option>
              <option value="medium">בינוני</option>
              <option value="large">גדול</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>יישור</label>
            <select
              value={section.alignment}
              onChange={(e) => onChange({ ...section, alignment: e.target.value as 'left' | 'center' | 'right' })}
              className={styles.select}
            >
              <option value="right">ימין</option>
              <option value="center">מרכז</option>
              <option value="left">שמאל</option>
            </select>
          </div>
        </div>

        <IconPicker
          value={section.icon || ''}
          onChange={(icon) => onChange({ ...section, icon })}
          label="אייקון (אופציונלי)"
        />
      </div>
    );
  }

  const alignmentClass = styles[`align${section.alignment.charAt(0).toUpperCase() + section.alignment.slice(1)}`];

  return (
    <div className={`${styles.ctaWrapper} ${alignmentClass}`}>
      <a
        href={section.url || '#'}
        className={`${styles.cta} ${styles[section.variant]} ${styles[section.size]}`}
      >
        {section.icon && <span className={styles.icon}>{section.icon}</span>}
        <span>{section.text || 'לחץ כאן'}</span>
      </a>
    </div>
  );
}
