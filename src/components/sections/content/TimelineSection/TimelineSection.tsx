import React from 'react';
import { TimelineSection as TimelineSectionType, TimelineItem } from '../../../../types';
import { ItemEditor, IconPicker } from '../../shared';
import styles from './TimelineSection.module.css';

interface TimelineSectionProps {
  section: TimelineSectionType;
  isEditing?: boolean;
  onChange?: (section: TimelineSectionType) => void;
}

export function TimelineSection({ section, isEditing, onChange }: TimelineSectionProps) {
  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.settings}>
          <label className={styles.label}>סגנון תצוגה</label>
          <select
            value={section.variant}
            onChange={(e) => onChange({ ...section, variant: e.target.value as 'alternating' | 'left' | 'right' })}
            className={styles.select}
          >
            <option value="alternating">לסירוגין</option>
            <option value="right">ימין</option>
            <option value="left">שמאל</option>
          </select>
        </div>

        <ItemEditor
          items={section.items}
          onUpdate={(items) => onChange({ ...section, items })}
          createItem={() => ({
            id: crypto.randomUUID(),
            date: '',
            title: '',
            description: '',
            icon: '📌',
          })}
          minItems={1}
          addLabel="הוסף אירוע"
          itemLabel="אירוע"
          renderItem={(item, _index, onItemChange) => (
            <div className={styles.itemEditor}>
              <div className={styles.row}>
                <input
                  type="text"
                  value={item.date}
                  onChange={(e) => onItemChange({ ...item, date: e.target.value })}
                  placeholder="תאריך"
                  className={styles.input}
                />
                <IconPicker
                  value={item.icon || '📌'}
                  onChange={(icon) => onItemChange({ ...item, icon })}
                  label="אייקון"
                />
              </div>
              <input
                type="text"
                value={item.title}
                onChange={(e) => onItemChange({ ...item, title: e.target.value })}
                placeholder="כותרת"
                className={styles.input}
              />
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

  return (
    <div className={`${styles.timeline} ${styles[section.variant]}`}>
      <div className={styles.line} />
      {section.items.map((item, index) => (
        <div
          key={item.id}
          className={`${styles.item} ${section.variant === 'alternating' ? (index % 2 === 0 ? styles.right : styles.left) : ''}`}
        >
          <div className={styles.marker}>
            <span className={styles.icon}>{item.icon || '📌'}</span>
          </div>
          <div className={styles.content}>
            {item.date && <span className={styles.date}>{item.date}</span>}
            <h3 className={styles.title}>{item.title || 'כותרת'}</h3>
            {item.description && <p className={styles.description}>{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
