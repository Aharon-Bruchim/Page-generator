import React from 'react';
import { VideoEmbedSection as VideoEmbedSectionType } from '../../../../types';
import styles from './VideoEmbedSection.module.css';

interface VideoEmbedSectionProps {
  section: VideoEmbedSectionType;
  isEditing?: boolean;
  onChange?: (section: VideoEmbedSectionType) => void;
}

function getVideoId(url: string, provider: 'youtube' | 'vimeo' | 'custom'): string | null {
  if (provider === 'youtube') {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }
  if (provider === 'vimeo') {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? match[1] : null;
  }
  return null;
}

function getEmbedUrl(url: string, provider: 'youtube' | 'vimeo' | 'custom', showControls: boolean): string {
  const videoId = getVideoId(url, provider);

  if (provider === 'youtube' && videoId) {
    const controls = showControls ? '1' : '0';
    return `https://www.youtube.com/embed/${videoId}?rel=0&controls=${controls}`;
  }
  if (provider === 'vimeo' && videoId) {
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
}

export function VideoEmbedSection({ section, isEditing, onChange }: VideoEmbedSectionProps) {
  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.field}>
          <label className={styles.label}>קישור לסרטון</label>
          <input
            type="text"
            value={section.url}
            onChange={(e) => onChange({ ...section, url: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=..."
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>פלטפורמה</label>
            <select
              value={section.provider}
              onChange={(e) => onChange({ ...section, provider: e.target.value as 'youtube' | 'vimeo' | 'custom' })}
              className={styles.select}
            >
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="custom">אחר</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>יחס תצוגה</label>
            <select
              value={section.aspectRatio}
              onChange={(e) => onChange({ ...section, aspectRatio: e.target.value as '16:9' | '4:3' | '1:1' })}
              className={styles.select}
            >
              <option value="16:9">16:9</option>
              <option value="4:3">4:3</option>
              <option value="1:1">1:1</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>כותרת (אופציונלי)</label>
          <input
            type="text"
            value={section.title || ''}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
            placeholder="כותרת הסרטון"
            className={styles.input}
          />
        </div>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={section.showControls}
            onChange={(e) => onChange({ ...section, showControls: e.target.checked })}
          />
          <span>הצג בקרי נגינה</span>
        </label>
      </div>
    );
  }

  if (!section.url) {
    return <div className={styles.empty}>הוסף קישור לסרטון...</div>;
  }

  const aspectRatioClass = styles[`aspect${section.aspectRatio.replace(':', '')}`];
  const embedUrl = getEmbedUrl(section.url, section.provider, section.showControls);

  return (
    <div className={styles.videoContainer}>
      {section.title && <h3 className={styles.title}>{section.title}</h3>}
      <div className={`${styles.videoWrapper} ${aspectRatioClass}`}>
        <iframe
          src={embedUrl}
          title={section.title || 'Video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
        />
      </div>
    </div>
  );
}
