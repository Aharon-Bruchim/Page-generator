import React from 'react';
import { MapEmbedSection as MapEmbedSectionType } from '../../../../types';
import styles from './MapEmbedSection.module.css';

interface MapEmbedSectionProps {
  section: MapEmbedSectionType;
  isEditing?: boolean;
  onChange?: (section: MapEmbedSectionType) => void;
}

function getMapUrl(section: MapEmbedSectionType): string {
  const baseUrl = 'https://www.google.com/maps/embed/v1/place';
  const apiKey = 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'; // Public embed key

  if (section.address) {
    return `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(section.address)}&zoom=${section.zoom}`;
  }
  if (section.coordinates) {
    return `${baseUrl}?key=${apiKey}&q=${section.coordinates.lat},${section.coordinates.lng}&zoom=${section.zoom}`;
  }
  return '';
}

export function MapEmbedSection({ section, isEditing, onChange }: MapEmbedSectionProps) {
  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.field}>
          <label className={styles.label}>כתובת</label>
          <input
            type="text"
            value={section.address || ''}
            onChange={(e) => onChange({ ...section, address: e.target.value })}
            placeholder="הזן כתובת מלאה"
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>זום</label>
            <input
              type="range"
              min="1"
              max="20"
              value={section.zoom}
              onChange={(e) => onChange({ ...section, zoom: Number(e.target.value) })}
              className={styles.range}
            />
            <span className={styles.rangeValue}>{section.zoom}</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>גובה (פיקסלים)</label>
            <input
              type="number"
              min="200"
              max="800"
              step="50"
              value={section.height}
              onChange={(e) => onChange({ ...section, height: Number(e.target.value) })}
              className={styles.input}
            />
          </div>
        </div>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={section.showMarker}
            onChange={(e) => onChange({ ...section, showMarker: e.target.checked })}
          />
          <span>הצג סמן מיקום</span>
        </label>
      </div>
    );
  }

  if (!section.address && !section.coordinates) {
    return <div className={styles.empty}>הזן כתובת להצגת המפה...</div>;
  }

  const mapUrl = getMapUrl(section);

  return (
    <div className={styles.mapContainer}>
      <iframe
        src={mapUrl}
        width="100%"
        height={section.height}
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      />
    </div>
  );
}
