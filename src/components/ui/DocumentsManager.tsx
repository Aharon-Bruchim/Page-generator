import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { documentsApi, DocumentListItem } from "../../services";
import { useDocument } from "../../context/DocumentContext";
import { Document, createDocument } from "../../types";
import { ConfirmDialog } from "./ConfirmDialog";
import "./DocumentsManager.css";

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  variant: "danger" | "warning" | "info";
  onConfirm: () => void;
}

interface DocumentsManagerProps {
  onClose: () => void;
  onSaveSuccess?: (documentId: string) => void;
  inline?: boolean;
  onNewDocument?: () => void;
}

export function DocumentsManager({ onClose, inline = false, onNewDocument }: DocumentsManagerProps) {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    message: "",
    variant: "warning",
    onConfirm: () => {},
  });

  const { document: currentDocument, setDocument } = useDocument();

  const closeConfirm = () =>
    setConfirmState((prev) => ({ ...prev, isOpen: false }));

  // Load documents list
  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const docs = await documentsApi.list();
      setDocuments(docs);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "שגיאה בטעינת רשימת המסמכים"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  // Filter documents by search query (search in title and name)
  const filteredDocuments = documents.filter(
    (doc) =>
      (doc.title || doc.name)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load a document
  const handleLoad = async (documentId: string) => {
    try {
      setLoading(true);
      const { document, sha } = await documentsApi.get(documentId);

      // Convert createdAt back to Date if it's a string
      const docWithDate: Document = {
        ...document,
        createdAt: new Date(document.createdAt),
      };

      setDocument(docWithDate);
      toast.success(`המסמך "${document.title}" נטען בהצלחה`);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "שגיאה בטעינת המסמך");
    } finally {
      setLoading(false);
    }
  };

  // Delete a document
  const handleDelete = (documentId: string, sha: string, title: string) => {
    setConfirmState({
      isOpen: true,
      title: "מחיקת מסמך",
      message: `האם למחוק את המסמך "${title}"?`,
      variant: "danger",
      onConfirm: async () => {
        closeConfirm();
        try {
          setLoading(true);
          await documentsApi.delete(documentId, sha);

          await loadDocuments();
          toast.success("המסמך נמחק בהצלחה");
        } catch (err) {
          toast.error(
            err instanceof Error ? err.message : "שגיאה במחיקת המסמך"
          );
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Create new document
  const handleNew = () => {
    setConfirmState({
      isOpen: true,
      title: "מסמך חדש",
      message: "ליצור מסמך חדש? שינויים שלא נשמרו יאבדו.",
      variant: "warning",
      onConfirm: () => {
        closeConfirm();
        setDocument(createDocument());
        if (onNewDocument) {
          onNewDocument();
        }
        onClose();
      },
    });
  };

  const content = (
    <div className={`documents-manager ${inline ? 'documents-manager-inline' : ''}`} onClick={(e) => e.stopPropagation()}>
      <header className="documents-manager-header">
        <h2>המסמכים שלי</h2>
        <button className="new-doc-btn" onClick={handleNew}>
          + צור מסמך חדש
        </button>
      </header>

      <div className="documents-search">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="חפש מסמך..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">&#128269;</span>
        </div>
      </div>

      <div className="documents-grid">
        {loading ? (
          <div className="loading">טוען...</div>
        ) : filteredDocuments.length === 0 ? (
          <div className="empty-state">
            {searchQuery ? "לא נמצאו מסמכים" : "אין מסמכים שמורים"}
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div
              key={doc.path}
              className={`document-card ${
                currentDocument.id === doc.name ? "active" : ""
              }`}
            >
              <div className="card-icon">
                <span>&#128196;</span>
              </div>
              <div className="card-tag">מסמך</div>
              <h3 className="card-title">{doc.title || doc.name}</h3>
              <p className="card-description">מסמך שנוצר במחולל</p>
              <div className="card-footer">
                <span className="card-status">
                  <span className="status-dot"></span>
                  פעיל
                </span>
                <button
                  className="card-action-btn"
                  onClick={() => handleLoad(doc.name)}
                >
                  פתח מסמך ←
                </button>
              </div>
              <div className="card-actions">
                <button
                  className="icon-btn edit-btn"
                  onClick={() => handleLoad(doc.name)}
                  title="ערוך"
                >
                  &#9998;
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() =>
                    handleDelete(doc.name, doc.sha, doc.title || doc.name)
                  }
                  title="מחק"
                >
                  &#128465;
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        variant={confirmState.variant}
        onConfirm={confirmState.onConfirm}
        onCancel={closeConfirm}
        confirmText={confirmState.variant === "danger" ? "מחק" : "אישור"}
        cancelText="ביטול"
      />
    </div>
  );

  if (inline) {
    return content;
  }

  return (
    <div className="documents-manager-overlay" onClick={onClose}>
      {content}
    </div>
  );
}
