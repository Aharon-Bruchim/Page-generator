import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { documentsApi, DocumentListItem, filesApi, FileListItem, UploadedFile } from "../../services";
import { useDocument } from "../../context/DocumentContext";
import { Document, createDocument } from "../../types";
import { useFileUpload } from "../../hooks";
import { ConfirmDialog } from "./ConfirmDialog";
import { FilePreviewModal } from "./FilePreviewModal";
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

type CombinedItem =
  | (DocumentListItem & { itemType: 'document' })
  | (FileListItem & { itemType: 'file' });

export function DocumentsManager({ onClose, inline = false, onNewDocument }: DocumentsManagerProps) {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [files, setFiles] = useState<FileListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    message: "",
    variant: "warning",
    onConfirm: () => {},
  });
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = useFileUpload();

  const { document: currentDocument, setDocument } = useDocument();

  const closeConfirm = () =>
    setConfirmState((prev) => ({ ...prev, isOpen: false }));

  // Load documents list
  const loadDocuments = useCallback(async () => {
    try {
      const docs = await documentsApi.list();
      setDocuments(docs);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "שגיאה בטעינת רשימת המסמכים"
      );
    }
  }, []);

  // Load files list
  const loadFiles = useCallback(async () => {
    try {
      const filesList = await filesApi.list();
      setFiles(filesList);
    } catch (err) {
      // Silent fail for files - might not exist yet
      setFiles([]);
    }
  }, []);

  // Load all data
  const loadAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([loadDocuments(), loadFiles()]);
    setLoading(false);
  }, [loadDocuments, loadFiles]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Combine documents and files
  const allItems: CombinedItem[] = [
    ...documents.map((doc) => ({ ...doc, itemType: 'document' as const })),
    ...files.map((file) => ({ ...file, itemType: 'file' as const })),
  ];

  // Filter by search query
  const filteredItems = allItems.filter((item) => {
    const query = searchQuery.toLowerCase();
    if (item.itemType === 'document') {
      return (
        (item.title || item.name).toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
      );
    } else {
      return item.fileName.toLowerCase().includes(query);
    }
  });

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

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileData = await uploadFile(file);

      const uploadedFile: UploadedFile = {
        id: crypto.randomUUID(),
        fileName: fileData.fileName,
        mimeType: fileData.mimeType,
        size: fileData.size,
        content: fileData.content,
        uploadedAt: new Date().toISOString(),
      };

      await filesApi.upload(uploadedFile);
      toast.success(`הקובץ "${file.name}" הועלה בהצלחה`);
      await loadFiles();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "שגיאה בהעלאת הקובץ");
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Open file preview
  const handleFileClick = async (fileId: string) => {
    try {
      setLoading(true);
      const { file } = await filesApi.get(fileId);
      setPreviewFile(file);
      setIsPreviewOpen(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "שגיאה בטעינת הקובץ");
    } finally {
      setLoading(false);
    }
  };

  // Delete a file
  const handleFileDelete = (fileId: string, sha: string, fileName: string) => {
    setConfirmState({
      isOpen: true,
      title: "מחיקת קובץ",
      message: `האם למחוק את הקובץ "${fileName}"?`,
      variant: "danger",
      onConfirm: async () => {
        closeConfirm();
        try {
          setLoading(true);
          await filesApi.delete(fileId, sha);
          await loadFiles();
          toast.success("הקובץ נמחק בהצלחה");
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "שגיאה במחיקת הקובץ");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Get file icon based on mime type
  const getFileIcon = (mimeType: string): string => {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.startsWith('video/')) return '🎬';
    if (mimeType.startsWith('audio/')) return '🎵';
    if (mimeType === 'application/pdf') return '📄';
    if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📽️';
    return '📁';
  };

  const content = (
    <div className={`documents-manager ${inline ? 'documents-manager-inline' : ''}`} onClick={(e) => e.stopPropagation()}>
      <header className="documents-manager-header">
        <h2>המסמכים שלי</h2>
        <div className="header-actions">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button
            className="upload-file-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? '⏳ מעלה...' : '📤 העלה קובץ'}
          </button>
          <button className="new-doc-btn" onClick={handleNew}>
            + צור מסמך חדש
          </button>
        </div>
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
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            {searchQuery ? "לא נמצאו פריטים" : "אין מסמכים או קבצים שמורים"}
          </div>
        ) : (
          filteredItems.map((item) =>
            item.itemType === 'document' ? (
              <div
                key={item.path}
                className={`document-card ${
                  currentDocument.id === item.name ? "active" : ""
                }`}
              >
                <div className="card-icon">
                  <span>📄</span>
                </div>
                <div className="card-tag">מסמך</div>
                <h3 className="card-title">{item.title || item.name}</h3>
                <p className="card-description">מסמך שנוצר במחולל</p>
                <div className="card-footer">
                  <span className="card-status">
                    <span className="status-dot"></span>
                    פעיל
                  </span>
                  <button
                    className="card-action-btn"
                    onClick={() => handleLoad(item.name)}
                  >
                    פתח מסמך ←
                  </button>
                </div>
                <div className="card-actions">
                  <button
                    className="icon-btn edit-btn"
                    onClick={() => handleLoad(item.name)}
                    title="ערוך"
                  >
                    ✎
                  </button>
                  <button
                    className="icon-btn delete-btn"
                    onClick={() =>
                      handleDelete(item.name, item.sha, item.title || item.name)
                    }
                    title="מחק"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={item.id}
                className="document-card file-card"
              >
                <div className="card-icon file-icon-bg">
                  <span>{getFileIcon(item.mimeType)}</span>
                </div>
                <div className="card-tag file-tag">קובץ</div>
                <h3 className="card-title">{item.fileName}</h3>
                <p className="card-description">{item.mimeType}</p>
                <div className="card-footer">
                  <span className="card-status">
                    <span className="status-dot file-dot"></span>
                    זמין
                  </span>
                  <button
                    className="card-action-btn"
                    onClick={() => handleFileClick(item.id)}
                  >
                    צפה בקובץ ←
                  </button>
                </div>
                <div className="card-actions">
                  <button
                    className="icon-btn edit-btn"
                    onClick={() => handleFileClick(item.id)}
                    title="צפה"
                  >
                    👁
                  </button>
                  <button
                    className="icon-btn delete-btn"
                    onClick={() =>
                      handleFileDelete(item.id, item.sha, item.fileName)
                    }
                    title="מחק"
                  >
                    🗑
                  </button>
                </div>
              </div>
            )
          )
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

      <FilePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewFile(null);
        }}
        file={previewFile}
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
