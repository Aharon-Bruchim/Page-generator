import { useState } from 'react';
import { useDocument } from '../../context/DocumentContext';
import { exportToHTML } from '../../utils/htmlExporter';
import styles from './ui.module.css';

export function ExportButtons() {
  const { document } = useDocument();
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const hasContent = document.pages.some(page => page.sections.length > 0);

  const handleExportHTML = async () => {
    if (!hasContent) {
      setExportStatus('אין סקשנים לייצא');
      setTimeout(() => setExportStatus(null), 3000);
      return;
    }

    setIsExporting(true);
    setExportStatus('מייצא HTML...');

    try {
      await exportToHTML(document);
      setExportStatus('הייצוא הושלם בהצלחה!');
    } catch (error) {
      setExportStatus('שגיאה בייצוא');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportStatus(null), 3000);
    }
  };

  return (
    <div className={styles.exportSection}>
      <h3 className={styles.exportTitle}>ייצוא</h3>
      <div className={styles.exportButtons}>
        <button
          type="button"
          className={`${styles.exportBtn} ${styles.exportBtnHTML}`}
          onClick={handleExportHTML}
          disabled={isExporting}
          aria-busy={isExporting}
        >
          📁 ייצוא HTML
        </button>
      </div>
      {exportStatus && (
        <p className={styles.exportStatus} role="status" aria-live="polite">
          {exportStatus}
        </p>
      )}
    </div>
  );
}
