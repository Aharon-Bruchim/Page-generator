import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { documentsApi } from '../services';
import { Document } from '../types';
import { createTheme, themeToCSSVariables } from '../themes';
import { SectionRenderer } from '../components/sections';
import styles from '../components/ui/ui.module.css';
import layoutStyles from '../components/layout/layout.module.css';
import '../App.css';

export function DocumentView() {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  useEffect(() => {
    async function loadDocument() {
      if (!id) {
        setError('מזהה מסמך חסר');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { document: doc } = await documentsApi.get(id);
        setDocument({
          ...doc,
          createdAt: new Date(doc.createdAt),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'שגיאה בטעינת המסמך');
      } finally {
        setLoading(false);
      }
    }

    loadDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="document-view-loading">
        <p>טוען מסמך...</p>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="document-view-error">
        <p>{error || 'המסמך לא נמצא'}</p>
        <Link to="/">חזרה לדף הבית</Link>
      </div>
    );
  }

  const theme = createTheme(document.stylePreset as any, document.colorMode as any);
  const cssVars = themeToCSSVariables(theme);

  const style: Record<string, string> = {};
  Object.entries(cssVars).forEach(([key, value]) => {
    style[key] = value;
  });

  const hasContent = document.pages.some(page => page.sections.length > 0);
  const activePage = document.pages[activePageIndex];

  return (
    <div className="document-view-page">
      <header className="document-view-header">
        <Link to="/" className="back-link">← חזרה</Link>
        <h1>{document.title}</h1>
      </header>

      <main
        className={layoutStyles.previewLayout}
        style={style as React.CSSProperties}
        role="main"
        aria-label={document.title}
      >
        <div className={layoutStyles.previewContent}>
          {!hasContent ? (
            <div className={styles.previewEmpty}>
              <p>מסמך ריק</p>
            </div>
          ) : (
            <>
              {document.pages.length > 1 && (
                <nav className={styles.previewNav} aria-label="ניווט בין דפים">
                  {document.pages.map((page, index) => (
                    <button
                      key={page.id}
                      type="button"
                      className={`${styles.previewNavBtn} ${index === activePageIndex ? styles.previewNavBtnActive : ''}`}
                      onClick={() => setActivePageIndex(index)}
                      aria-current={index === activePageIndex ? 'page' : undefined}
                    >
                      {page.title}
                    </button>
                  ))}
                </nav>
              )}

              <article aria-label={activePage?.title || document.title}>
                {activePage?.sections.map((section) => (
                  <SectionRenderer key={section.id} section={section} />
                ))}
                {(!activePage || activePage.sections.length === 0) && (
                  <div className={styles.previewEmpty}>
                    <p>דף ריק</p>
                  </div>
                )}
              </article>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
