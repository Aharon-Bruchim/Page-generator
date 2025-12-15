import { ImageSection as ImageSectionType } from '../../types';
import styles from './sections.module.css';

interface ImageSectionProps {
  section: ImageSectionType;
  isEditing?: boolean;
  onChange?: (section: ImageSectionType) => void;
}

export function ImageSection({ section, isEditing, onChange }: ImageSectionProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onChange) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onChange({ ...section, src: result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (isEditing && onChange) {
    return (
      <figure className={styles.imageSection}>
        {section.src ? (
          <div className={styles.imagePreviewContainer}>
            <img
              src={section.src}
              alt={section.alt || 'תמונה'}
              className={styles.imagePreview}
            />
            <button
              type="button"
              className={styles.imageRemoveBtn}
              onClick={() => onChange({ ...section, src: '' })}
              aria-label="הסר תמונה"
            >
              ✕
            </button>
          </div>
        ) : (
          <label className={styles.imageUploadLabel}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.imageUploadInput}
              aria-label="העלה תמונה"
            />
            <span className={styles.imageUploadText}>
              <span className={styles.imageUploadIcon}>📷</span>
              לחץ להעלאת תמונה
            </span>
          </label>
        )}
        <input
          type="text"
          className={styles.imageAltInput}
          value={section.alt}
          onChange={(e) => onChange({ ...section, alt: e.target.value })}
          placeholder="תיאור תמונה (חובה לנגישות)"
          aria-label="תיאור תמונה"
          required
        />
        <input
          type="text"
          className={styles.imageCaptionInput}
          value={section.caption || ''}
          onChange={(e) => onChange({ ...section, caption: e.target.value })}
          placeholder="כיתוב (אופציונלי)"
          aria-label="כיתוב תמונה"
        />
      </figure>
    );
  }

  return (
    <figure className={styles.imageSection}>
      {section.src ? (
        <img
          src={section.src}
          alt={section.alt || 'תמונה'}
          className={styles.image}
        />
      ) : (
        <div className={styles.imagePlaceholder}>
          <span>אין תמונה</span>
        </div>
      )}
      {section.caption && (
        <figcaption className={styles.imageCaption}>{section.caption}</figcaption>
      )}
    </figure>
  );
}
