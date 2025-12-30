import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { documentsApi, DocumentListItem } from '../../services';
import { useDocument } from '../../context/DocumentContext';
import { Document, createDocument } from '../../types';
import './DocumentsManager.css';

interface DocumentsManagerProps {
  onClose: () => void;
}

export function DocumentsManager({ onClose }: DocumentsManagerProps) {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);
  const [currentSha, setCurrentSha] = useState<string | null>(null);

  const { document: currentDocument, setDocument } = useDocument();

  // Load documents list
  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const docs = await documentsApi.list();
      setDocuments(docs);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'שגיאה בטעינת רשימת המסמכים');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  // Filter documents by search query (search in title and name)
  const filteredDocuments = documents.filter(doc =>
    (doc.title || doc.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Save current document
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      const result = await documentsApi.save(currentDocument, currentSha || undefined);
      setCurrentSha(result.sha);
      await loadDocuments();
      toast.success('המסמך נשמר בהצלחה!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'שגיאה בשמירת המסמך');
    } finally {
      setSaving(false);
    }
  };

  // Load a document
  const handleLoad = async (documentId: string) => {
    try {
      setLoading(true);
      setError(null);
      const { document, sha } = await documentsApi.get(documentId);

      // Convert createdAt back to Date if it's a string
      const docWithDate: Document = {
        ...document,
        createdAt: new Date(document.createdAt),
      };

      setDocument(docWithDate);
      setCurrentSha(sha);
      toast.success(`המסמך "${document.title}" נטען בהצלחה`);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'שגיאה בטעינת המסמך');
    } finally {
      setLoading(false);
    }
  };

  // Delete a document
  const handleDelete = async (documentId: string, sha: string) => {
    if (!confirm('האם למחוק את המסמך?')) return;

    try {
      setLoading(true);
      setError(null);
      await documentsApi.delete(documentId, sha);

      // If we deleted the current document, reset sha
      if (currentDocument.id === documentId) {
        setCurrentSha(null);
      }

      await loadDocuments();
      toast.success('המסמך נמחק בהצלחה');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'שגיאה במחיקת המסמך');
    } finally {
      setLoading(false);
    }
  };

  // Create new document
  const handleNew = () => {
    if (confirm('ליצור מסמך חדש? שינויים שלא נשמרו יאבדו.')) {
      setDocument(createDocument());
      setCurrentSha(null);
      onClose();
    }
  };

  return (
    <div className="documents-manager-overlay" onClick={onClose}>
      <div className="documents-manager" onClick={e => e.stopPropagation()}>
        <header className="documents-manager-header">
          <h2>ניהול מסמכים</h2>
          <button className="close-button" onClick={onClose} aria-label="סגור">
            &times;
          </button>
        </header>

        <div className="documents-manager-actions">
          <button
            className="action-button save-button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'שומר...' : 'שמור מסמך נוכחי'}
          </button>
          <button className="action-button new-button" onClick={handleNew}>
            מסמך חדש
          </button>
        </div>

        <div className="documents-search">
          <input
            type="text"
            placeholder="חיפוש מסמכים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="documents-list">
          {loading ? (
            <div className="loading">טוען...</div>
          ) : filteredDocuments.length === 0 ? (
            <div className="empty-state">
              {searchQuery ? 'לא נמצאו מסמכים' : 'אין מסמכים שמורים'}
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div
                key={doc.path}
                className={`document-item ${currentDocument.id === doc.name ? 'active' : ''}`}
              >
                <div className="document-info">
                  <span className="document-name">{doc.title || doc.name}</span>
                </div>
                <div className="document-actions">
                  <button
                    className="doc-action-btn load-btn"
                    onClick={() => handleLoad(doc.name)}
                    title="פתח"
                  >
                    פתח
                  </button>
                  <button
                    className="doc-action-btn delete-btn"
                    onClick={() => handleDelete(doc.name, doc.sha)}
                    title="מחק"
                  >
                    מחק
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="documents-manager-footer">
          <small>המסמכים נשמרים ב-GitHub: rafi053/page-generator-docs</small>
        </footer>
      </div>
    </div>
  );
}
