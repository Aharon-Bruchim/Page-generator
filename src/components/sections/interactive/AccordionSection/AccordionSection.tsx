import React, { useState } from 'react';
import { AccordionSection as AccordionSectionType, AccordionItem } from '../../../../types';
import { ItemEditor } from '../../shared';
import styles from './AccordionSection.module.css';

interface AccordionSectionProps {
  section: AccordionSectionType;
  isEditing?: boolean;
  onChange?: (section: AccordionSectionType) => void;
}

export function AccordionSection({ section, isEditing, onChange }: AccordionSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(section.items.filter(item => item.isOpen).map(item => item.id))
  );

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!section.allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.settings}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={section.allowMultiple}
              onChange={(e) => onChange({ ...section, allowMultiple: e.target.checked })}
            />
            <span>אפשר פתיחת מספר פריטים במקביל</span>
          </label>
        </div>

        <ItemEditor
          items={section.items}
          onUpdate={(items) => onChange({ ...section, items })}
          createItem={() => ({
            id: crypto.randomUUID(),
            title: 'פריט חדש',
            content: '',
            isOpen: false,
          })}
          minItems={1}
          addLabel="הוסף פריט"
          itemLabel="פריט"
          renderItem={(item, _index, onItemChange) => (
            <div className={styles.itemEditor}>
              <input
                type="text"
                value={item.title}
                onChange={(e) => onItemChange({ ...item, title: e.target.value })}
                placeholder="כותרת"
                className={styles.input}
              />
              <textarea
                value={item.content}
                onChange={(e) => onItemChange({ ...item, content: e.target.value })}
                placeholder="תוכן"
                className={`${styles.input} ${styles.textarea}`}
              />
            </div>
          )}
        />
      </div>
    );
  }

  return (
    <div className={styles.accordion}>
      {section.items.map((item) => (
        <div
          key={item.id}
          className={`${styles.item} ${openItems.has(item.id) ? styles.open : ''}`}
        >
          <button
            className={styles.header}
            onClick={() => toggleItem(item.id)}
            aria-expanded={openItems.has(item.id)}
          >
            <span className={styles.title}>{item.title || 'כותרת'}</span>
            <span className={styles.icon}>{openItems.has(item.id) ? '−' : '+'}</span>
          </button>
          <div className={styles.content}>
            <div className={styles.contentInner}>
              {item.content || 'תוכן הפריט...'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
