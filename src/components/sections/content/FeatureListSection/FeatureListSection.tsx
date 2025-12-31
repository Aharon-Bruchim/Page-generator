import React from 'react';
import { FeatureListSection as FeatureListSectionType, FeatureItem } from '../../../../types';
import { ItemEditor, IconPicker } from '../../shared';
import styles from './FeatureListSection.module.css';

interface FeatureListSectionProps {
  section: FeatureListSectionType;
  isEditing?: boolean;
  onChange?: (section: FeatureListSectionType) => void;
}

export function FeatureListSection({ section, isEditing, onChange }: FeatureListSectionProps) {
  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.settings}>
          <div className={styles.settingItem}>
            <label className={styles.label}>עמודות</label>
            <select
              value={section.columns}
              onChange={(e) => onChange({ ...section, columns: Number(e.target.value) as 1 | 2 | 3 })}
              className={styles.select}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.label}>מיקום אייקון</label>
            <select
              value={section.iconPosition}
              onChange={(e) => onChange({ ...section, iconPosition: e.target.value as 'top' | 'left' })}
              className={styles.select}
            >
              <option value="top">למעלה</option>
              <option value="left">בצד</option>
            </select>
          </div>
        </div>

        <ItemEditor
          items={section.features}
          onUpdate={(features) => onChange({ ...section, features })}
          createItem={() => ({
            id: crypto.randomUUID(),
            icon: '✨',
            title: '',
            description: '',
          })}
          addLabel="הוסף פיצ'ר"
          itemLabel="פיצ'ר"
          renderItem={(item, _index, onItemChange) => (
            <div className={styles.itemEditor}>
              <div className={styles.row}>
                <IconPicker
                  value={item.icon}
                  onChange={(icon) => onItemChange({ ...item, icon })}
                  label="אייקון"
                />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => onItemChange({ ...item, title: e.target.value })}
                  placeholder="כותרת"
                  className={styles.input}
                />
              </div>
              <textarea
                value={item.description}
                onChange={(e) => onItemChange({ ...item, description: e.target.value })}
                placeholder="תיאור"
                className={`${styles.input} ${styles.textarea}`}
              />
            </div>
          )}
        />
      </div>
    );
  }

  if (section.features.length === 0) {
    return <div className={styles.empty}>הוסף פיצ'רים...</div>;
  }

  return (
    <div
      className={`${styles.featureList} ${styles[section.iconPosition]}`}
      style={{ '--columns': section.columns } as React.CSSProperties}
    >
      {section.features.map((feature) => (
        <div key={feature.id} className={styles.feature}>
          <span className={styles.icon}>{feature.icon}</span>
          <div className={styles.content}>
            <h3 className={styles.title}>{feature.title || 'כותרת'}</h3>
            <p className={styles.description}>{feature.description || 'תיאור הפיצ\'ר...'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
