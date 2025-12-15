import { Section } from '../../types';
import { useDocument } from '../../context/DocumentContext';
import { SectionRenderer } from '../sections';
import styles from './ui.module.css';

interface SectionEditorProps {
  section: Section;
  index: number;
  total: number;
}

const sectionTypeLabels: Record<string, string> = {
  hero: 'כותרת ראשית',
  text: 'טקסט',
  image: 'תמונה',
  highlight: 'ציטוט',
  divider: 'מפריד',
};

export function SectionEditor({ section, index, total }: SectionEditorProps) {
  const { updateSection, removeSection, moveSection } = useDocument();

  return (
    <section
      className={styles.sectionEditor}
      aria-label={`סקשן ${index + 1}: ${sectionTypeLabels[section.type]}`}
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionType}>
          {sectionTypeLabels[section.type]}
        </span>
        <div className={styles.sectionActions}>
          <button
            type="button"
            className={styles.sectionActionBtn}
            onClick={() => moveSection(section.id, 'up')}
            disabled={index === 0}
            aria-label="העבר למעלה"
            title="העבר למעלה"
          >
            ↑
          </button>
          <button
            type="button"
            className={styles.sectionActionBtn}
            onClick={() => moveSection(section.id, 'down')}
            disabled={index === total - 1}
            aria-label="העבר למטה"
            title="העבר למטה"
          >
            ↓
          </button>
          <button
            type="button"
            className={`${styles.sectionActionBtn} ${styles.sectionDeleteBtn}`}
            onClick={() => removeSection(section.id)}
            aria-label="מחק סקשן"
            title="מחק סקשן"
          >
            ✕
          </button>
        </div>
      </div>
      <div className={styles.sectionContent}>
        <SectionRenderer
          section={section}
          isEditing={true}
          onChange={updateSection}
        />
      </div>
    </section>
  );
}
