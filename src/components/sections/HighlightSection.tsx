import { HighlightSection as HighlightSectionType } from '../../types';
import styles from './sections.module.css';

interface HighlightSectionProps {
  section: HighlightSectionType;
  isEditing?: boolean;
  onChange?: (section: HighlightSectionType) => void;
}

export function HighlightSection({ section, isEditing, onChange }: HighlightSectionProps) {
  if (isEditing && onChange) {
    return (
      <blockquote className={styles.highlight}>
        <textarea
          className={styles.highlightContentInput}
          value={section.content}
          onChange={(e) => onChange({ ...section, content: e.target.value })}
          placeholder="ציטוט או טקסט מודגש..."
          aria-label="תוכן הציטוט"
          rows={3}
        />
        <input
          type="text"
          className={styles.highlightAuthorInput}
          value={section.author || ''}
          onChange={(e) => onChange({ ...section, author: e.target.value })}
          placeholder="מקור או מחבר (אופציונלי)"
          aria-label="מקור"
        />
      </blockquote>
    );
  }

  return (
    <blockquote className={styles.highlight}>
      <p className={styles.highlightContent}>{section.content || 'ציטוט או טקסט מודגש'}</p>
      {section.author && (
        <footer className={styles.highlightAuthor}>— {section.author}</footer>
      )}
    </blockquote>
  );
}
