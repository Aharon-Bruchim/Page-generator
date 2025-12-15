import { TextSection as TextSectionType } from '../../types';
import styles from './sections.module.css';

interface TextSectionProps {
  section: TextSectionType;
  isEditing?: boolean;
  onChange?: (section: TextSectionType) => void;
}

export function TextSection({ section, isEditing, onChange }: TextSectionProps) {
  if (isEditing && onChange) {
    return (
      <article className={styles.textSection}>
        <input
          type="text"
          className={styles.textHeadingInput}
          value={section.heading || ''}
          onChange={(e) => onChange({ ...section, heading: e.target.value })}
          placeholder="כותרת משנה (אופציונלי)"
          aria-label="כותרת משנה"
        />
        <textarea
          className={styles.textContentInput}
          value={section.content}
          onChange={(e) => onChange({ ...section, content: e.target.value })}
          placeholder="תוכן הפסקה..."
          aria-label="תוכן"
          rows={5}
        />
      </article>
    );
  }

  return (
    <article className={styles.textSection}>
      {section.heading && (
        <h2 className={styles.textHeading}>{section.heading}</h2>
      )}
      <div className={styles.textContent}>
        {section.content.split('\n').map((paragraph, index) => (
          paragraph.trim() && <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
