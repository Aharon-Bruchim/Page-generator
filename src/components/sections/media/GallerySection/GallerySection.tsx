import React, { useState } from 'react';
import { GallerySection as GallerySectionType, GalleryImage } from '../../../../types';
import { ItemEditor } from '../../shared';
import styles from './GallerySection.module.css';

interface GallerySectionProps {
  section: GallerySectionType;
  isEditing?: boolean;
  onChange?: (section: GallerySectionType) => void;
}

export function GallerySection({ section, isEditing, onChange }: GallerySectionProps) {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.settings}>
          <div className={styles.settingItem}>
            <label className={styles.label}>עמודות</label>
            <select
              value={section.columns}
              onChange={(e) => onChange({ ...section, columns: Number(e.target.value) as 2 | 3 | 4 })}
              className={styles.select}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={section.enableLightbox}
              onChange={(e) => onChange({ ...section, enableLightbox: e.target.checked })}
            />
            <span>הפעל תצוגה מוגדלת</span>
          </label>
        </div>

        <ItemEditor
          items={section.images}
          onUpdate={(images) => onChange({ ...section, images })}
          createItem={() => ({
            id: crypto.randomUUID(),
            src: '',
            alt: '',
            caption: '',
          })}
          addLabel="הוסף תמונה"
          itemLabel="תמונה"
          renderItem={(item, _index, onItemChange) => (
            <div className={styles.itemEditor}>
              <input
                type="text"
                value={item.src}
                onChange={(e) => onItemChange({ ...item, src: e.target.value })}
                placeholder="קישור לתמונה"
                className={styles.input}
              />
              <input
                type="text"
                value={item.alt}
                onChange={(e) => onItemChange({ ...item, alt: e.target.value })}
                placeholder="תיאור (alt)"
                className={styles.input}
              />
              <input
                type="text"
                value={item.caption || ''}
                onChange={(e) => onItemChange({ ...item, caption: e.target.value })}
                placeholder="כיתוב (אופציונלי)"
                className={styles.input}
              />
            </div>
          )}
        />
      </div>
    );
  }

  if (section.images.length === 0) {
    return <div className={styles.empty}>הוסף תמונות לגלריה...</div>;
  }

  return (
    <>
      <div
        className={styles.gallery}
        style={{ '--columns': section.columns } as React.CSSProperties}
      >
        {section.images.map((image) => (
          <figure
            key={image.id}
            className={styles.imageWrapper}
            onClick={() => section.enableLightbox && setLightboxImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={styles.image}
              loading="lazy"
            />
            {image.caption && (
              <figcaption className={styles.caption}>{image.caption}</figcaption>
            )}
            {section.enableLightbox && (
              <div className={styles.overlay}>
                <span className={styles.zoomIcon}>🔍</span>
              </div>
            )}
          </figure>
        ))}
      </div>

      {lightboxImage && (
        <div className={styles.lightbox} onClick={() => setLightboxImage(null)}>
          <button className={styles.closeButton} onClick={() => setLightboxImage(null)}>
            ×
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className={styles.lightboxImage}
          />
          {lightboxImage.caption && (
            <div className={styles.lightboxCaption}>{lightboxImage.caption}</div>
          )}
        </div>
      )}
    </>
  );
}
