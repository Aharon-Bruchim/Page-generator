import { useDocument } from '../../context/DocumentContext';
import { SectionEditor } from './SectionEditor';
import styles from './ui.module.css';

export function DocumentBuilder() {
  const { currentPage } = useDocument();

  if (!currentPage || currentPage.sections.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📄</div>
        <h3 className={styles.emptyStateTitle}>הדף ריק</h3>
        <p className={styles.emptyStateText}>
          הוסף סקשנים מהתפריט בצד ימין כדי להתחיל לבנות את הדף
        </p>
      </div>
    );
  }

  return (
    <div className={styles.documentBuilder}>
      {currentPage.sections.map((section, index) => (
        <SectionEditor
          key={section.id}
          section={section}
          index={index}
          total={currentPage.sections.length}
        />
      ))}
    </div>
  );
}
