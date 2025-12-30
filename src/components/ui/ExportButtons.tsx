import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDocument } from '../../context/DocumentContext';
import { exportToHTML } from '../../utils/htmlExporter';
import { documentsApi } from '../../services';
import styles from './ui.module.css';

export function ExportButtons() {
  const { document } = useDocument();
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  const handleSave = async () => {
    if (!hasContent) {
      toast.error('אין תוכן לשמור');
      return;
    }

    setIsSaving(true);

    try {
      await documentsApi.save(document);
      toast.success('המסמך נשמר בהצלחה!');
      navigate(`/document/${document.id}`);
    } catch (error) {
      toast.error('שגיאה בשמירת המסמך');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.exportSection}>
      <h3 className={styles.exportTitle}>שמירה וייצוא</h3>
      <div className={styles.exportButtons}>
        <button
          type="button"
          className={`${styles.exportBtn} ${styles.exportBtnSave}`}
          onClick={handleSave}
          disabled={isSaving || !hasContent}
          aria-busy={isSaving}
        >
          {isSaving ? '💾 שומר...' : '💾 שמור מסמך'}
        </button>
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
