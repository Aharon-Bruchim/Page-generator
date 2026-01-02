import { useEffect, useRef } from 'react';
import './FilePreviewModal.css';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    fileName: string;
    mimeType: string;
    size: number;
    content: string;
    uploadedAt: string;
  } | null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith('image/')) return '🖼️';
  if (mimeType.startsWith('video/')) return '🎬';
  if (mimeType.startsWith('audio/')) return '🎵';
  if (mimeType === 'application/pdf') return '📄';
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📽️';
  if (mimeType.startsWith('text/') || mimeType === 'application/json') return '📃';
  return '📁';
}

export function FilePreviewModal({ isOpen, onClose, file }: FilePreviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !file) return null;

  const dataUrl = `data:${file.mimeType};base64,${file.content}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderPreview = () => {
    const { mimeType } = file;

    // Images
    if (mimeType.startsWith('image/')) {
      return (
        <div className="preview-image-container">
          <img src={dataUrl} alt={file.fileName} className="preview-image" />
        </div>
      );
    }

    // PDF
    if (mimeType === 'application/pdf') {
      return (
        <div className="preview-pdf-container">
          <embed src={dataUrl} type="application/pdf" className="preview-pdf" />
        </div>
      );
    }

    // Video
    if (mimeType.startsWith('video/')) {
      return (
        <div className="preview-video-container">
          <video src={dataUrl} controls className="preview-video" />
        </div>
      );
    }

    // Audio
    if (mimeType.startsWith('audio/')) {
      return (
        <div className="preview-audio-container">
          <audio src={dataUrl} controls className="preview-audio" />
        </div>
      );
    }

    // Text/Code
    if (mimeType.startsWith('text/') || mimeType === 'application/json' || mimeType === 'application/javascript') {
      try {
        const textContent = atob(file.content);
        return (
          <div className="preview-text-container">
            <pre className="preview-text">{textContent}</pre>
          </div>
        );
      } catch {
        // Failed to decode, show fallback
      }
    }

    // Fallback - no preview available
    return (
      <div className="preview-fallback">
        <span className="fallback-icon">{getFileIcon(mimeType)}</span>
        <p className="fallback-text">לא ניתן להציג תצוגה מקדימה לסוג קובץ זה</p>
        <p className="fallback-hint">לחץ על "הורד" כדי לצפות בקובץ</p>
      </div>
    );
  };

  return (
    <div className="file-preview-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="file-preview-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="file-preview-title"
        tabIndex={-1}
      >
        <header className="file-preview-header">
          <div className="file-preview-title-section">
            <span className="file-icon">{getFileIcon(file.mimeType)}</span>
            <div className="file-info">
              <h3 id="file-preview-title" className="file-name">{file.fileName}</h3>
              <p className="file-meta">
                {formatFileSize(file.size)} • {file.mimeType}
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="סגור">
            ✕
          </button>
        </header>

        <div className="file-preview-content">
          {renderPreview()}
        </div>

        <footer className="file-preview-footer">
          <button className="download-btn" onClick={handleDownload}>
            ⬇️ הורד קובץ
          </button>
          <button className="cancel-btn" onClick={onClose}>
            סגור
          </button>
        </footer>
      </div>
    </div>
  );
}
