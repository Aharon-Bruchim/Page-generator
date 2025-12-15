import { HeroSection as HeroSectionType } from '../../types';
import styles from './sections.module.css';

interface HeroSectionProps {
  section: HeroSectionType;
  isEditing?: boolean;
  onChange?: (section: HeroSectionType) => void;
}

export function HeroSection({ section, isEditing, onChange }: HeroSectionProps) {
  if (isEditing && onChange) {
    return (
      <header className={styles.hero} role="banner">
        <input
          type="text"
          className={styles.heroTitleInput}
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          placeholder="כותרת ראשית"
          aria-label="כותרת ראשית"
        />
        <textarea
          className={styles.heroSubtitleInput}
          value={section.subtitle}
          onChange={(e) => onChange({ ...section, subtitle: e.target.value })}
          placeholder="תיאור קצר או משפט פתיחה"
          aria-label="תיאור"
          rows={2}
        />
      </header>
    );
  }

  return (
    <header className={styles.hero} role="banner">
      <h1 className={styles.heroTitle}>{section.title || 'כותרת ראשית'}</h1>
      {section.subtitle && (
        <p className={styles.heroSubtitle}>{section.subtitle}</p>
      )}
    </header>
  );
}
