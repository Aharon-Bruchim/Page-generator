import { DividerSection as DividerSectionType } from '../../types';
import styles from './sections.module.css';

interface DividerSectionProps {
  section: DividerSectionType;
  isEditing?: boolean;
  onChange?: (section: DividerSectionType) => void;
}

export function DividerSection({ section, isEditing, onChange }: DividerSectionProps) {
  const dividerClass = `${styles.divider} ${styles[`divider${section.style.charAt(0).toUpperCase() + section.style.slice(1)}`]}`;

  if (isEditing && onChange) {
    return (
      <div className={styles.dividerEditor}>
        <hr className={dividerClass} aria-hidden="true" />
        <div className={styles.dividerStyleSelector}>
          <label htmlFor={`divider-style-${section.id}`} className={styles.dividerStyleLabel}>
            סגנון:
          </label>
          <select
            id={`divider-style-${section.id}`}
            value={section.style}
            onChange={(e) => onChange({ ...section, style: e.target.value as 'line' | 'dots' | 'space' })}
            className={styles.dividerStyleSelect}
          >
            <option value="line">קו</option>
            <option value="dots">נקודות</option>
            <option value="space">רווח</option>
          </select>
        </div>
      </div>
    );
  }

  return <hr className={dividerClass} aria-hidden="true" />;
}
