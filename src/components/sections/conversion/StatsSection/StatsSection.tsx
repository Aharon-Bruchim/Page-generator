import React, { useEffect, useState, useRef } from 'react';
import { StatsSection as StatsSectionType, StatItem } from '../../../../types';
import { ItemEditor, IconPicker } from '../../shared';
import styles from './StatsSection.module.css';

interface StatsSectionProps {
  section: StatsSectionType;
  isEditing?: boolean;
  onChange?: (section: StatsSectionType) => void;
}

function AnimatedNumber({ value, animate }: { value: number; animate: boolean }) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = Date.now();

          const animateValue = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(value * easeOut));

            if (progress < 1) {
              requestAnimationFrame(animateValue);
            }
          };

          requestAnimationFrame(animateValue);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, animate]);

  return <span ref={elementRef}>{displayValue.toLocaleString()}</span>;
}

export function StatsSection({ section, isEditing, onChange }: StatsSectionProps) {
  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.settings}>
          <div className={styles.settingItem}>
            <label className={styles.label}>עמודות</label>
            <select
              value={section.columns}
              onChange={(e) => onChange({ ...section, columns: Number(e.target.value) as 2 | 3 | 4 })}
              className={styles.select}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={section.animate}
              onChange={(e) => onChange({ ...section, animate: e.target.checked })}
            />
            <span>אנימציית ספירה</span>
          </label>
        </div>

        <ItemEditor
          items={section.items}
          onUpdate={(items) => onChange({ ...section, items })}
          createItem={() => ({
            id: crypto.randomUUID(),
            value: 0,
            label: '',
            suffix: '',
            prefix: '',
            icon: '',
          })}
          minItems={1}
          addLabel="הוסף סטטיסטיקה"
          itemLabel="סטטיסטיקה"
          renderItem={(item, _index, onItemChange) => (
            <div className={styles.itemEditor}>
              <div className={styles.row}>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => onItemChange({ ...item, value: Number(e.target.value) })}
                  placeholder="ערך"
                  className={styles.input}
                />
                <input
                  type="text"
                  value={item.prefix || ''}
                  onChange={(e) => onItemChange({ ...item, prefix: e.target.value })}
                  placeholder="קידומת"
                  className={`${styles.input} ${styles.small}`}
                />
                <input
                  type="text"
                  value={item.suffix || ''}
                  onChange={(e) => onItemChange({ ...item, suffix: e.target.value })}
                  placeholder="סיומת"
                  className={`${styles.input} ${styles.small}`}
                />
              </div>
              <div className={styles.row}>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => onItemChange({ ...item, label: e.target.value })}
                  placeholder="תווית"
                  className={styles.input}
                />
                <IconPicker
                  value={item.icon || ''}
                  onChange={(icon) => onItemChange({ ...item, icon })}
                  label="אייקון"
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={styles.stats}
      style={{ '--columns': section.columns } as React.CSSProperties}
    >
      {section.items.map((item) => (
        <div key={item.id} className={styles.stat}>
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <div className={styles.value}>
            {item.prefix}
            <AnimatedNumber value={item.value} animate={section.animate} />
            {item.suffix}
          </div>
          <div className={styles.label}>{item.label || 'תווית'}</div>
        </div>
      ))}
    </div>
  );
}
