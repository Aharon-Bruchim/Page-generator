import React, { useState } from 'react';
import styles from './shared.module.css';

const ICON_CATEGORIES = {
  general: ['✨', '⭐', '🎯', '💡', '🔥', '❤️', '✅', '🎉', '🏆', '💎'],
  business: ['💼', '📊', '💰', '📈', '🏢', '📋', '🤝', '📧', '☎️', '🔒'],
  tech: ['💻', '📱', '🔧', '⚙️', '🚀', '🔌', '📡', '🖥️', '🌐', '☁️'],
  social: ['👥', '👤', '💬', '📣', '🎤', '📺', '📸', '🎬', '🎵', '🎮'],
  nature: ['🌱', '🌿', '🌳', '🌸', '🌺', '🌻', '🍀', '🌈', '☀️', '🌙'],
  arrows: ['➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '🔄', '🔃'],
};

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
  label?: string;
}

export function IconPicker({ value, onChange, label = 'אייקון' }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof typeof ICON_CATEGORIES>('general');

  const categoryLabels: Record<keyof typeof ICON_CATEGORIES, string> = {
    general: 'כללי',
    business: 'עסקי',
    tech: 'טכנולוגיה',
    social: 'חברתי',
    nature: 'טבע',
    arrows: 'חיצים',
  };

  return (
    <div className={styles.iconPicker}>
      <label className={styles.label}>{label}</label>
      <div className={styles.iconPickerWrapper}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.selectedIcon}>{value || '📌'}</span>
          <span className={styles.dropdownArrow}>▼</span>
        </button>

        {isOpen && (
          <div className={styles.iconDropdown}>
            <div className={styles.categoryTabs}>
              {(Object.keys(ICON_CATEGORIES) as Array<keyof typeof ICON_CATEGORIES>).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`${styles.categoryTab} ${activeCategory === cat ? styles.active : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
            <div className={styles.iconsGrid}>
              {ICON_CATEGORIES[activeCategory].map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className={`${styles.iconOption} ${value === icon ? styles.selected : ''}`}
                  onClick={() => {
                    onChange(icon);
                    setIsOpen(false);
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const ICONS = ICON_CATEGORIES;
