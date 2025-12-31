import { useState } from 'react';
import { useDocument } from '../../context/DocumentContext';
import {
  SectionType,
  StylePreset,
  SectionCategory,
  SECTION_REGISTRY,
  CATEGORY_LABELS,
  getSectionsByCategory,
  getAllCategories
} from '../../types';
import { PageManager } from './PageManager';
import styles from './ui.module.css';

const presetOptions: { value: StylePreset; label: string }[] = [
  { value: 'minimal', label: 'מינימלי' },
  { value: 'modern', label: 'מודרני' },
  { value: 'elegant', label: 'אלגנטי' },
  { value: 'creative', label: 'יצירתי' },
];

export function EditorPanel() {
  const [activeCategory, setActiveCategory] = useState<SectionCategory>('basic');

  const {
    document,
    currentPage,
    setTitle,
    addSection,
    setStylePreset,
    setColorMode,
    reset,
  } = useDocument();

  const categories = getAllCategories();
  const currentCategorySections = getSectionsByCategory(activeCategory);

  return (
    <aside className={styles.editorPanel} aria-label="עורך מסמך">
      <div className={styles.editorHeader}>
        <h2 className={styles.editorTitle}>הגדרות מסמך</h2>
        <button
          type="button"
          className={styles.resetButton}
          onClick={reset}
          aria-label="אפס למסמך חדש"
        >
          מסמך חדש
        </button>
      </div>

      <div className={styles.editorSection}>
        <label htmlFor="doc-title" className={styles.editorLabel}>
          שם המסמך
        </label>
        <input
          id="doc-title"
          type="text"
          className={styles.editorInput}
          value={document.title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="הזן שם למסמך"
        />
      </div>

      {/* Page Manager */}
      <PageManager />

      <div className={styles.editorSection}>
        <label htmlFor="style-preset" className={styles.editorLabel}>
          סגנון עיצוב
        </label>
        <select
          id="style-preset"
          className={styles.editorSelect}
          value={document.stylePreset}
          onChange={(e) => setStylePreset(e.target.value as StylePreset)}
        >
          {presetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.editorSection}>
        <span className={styles.editorLabel}>מצב צבע</span>
        <div className={styles.colorModeToggle}>
          <button
            type="button"
            className={`${styles.colorModeBtn} ${
              document.colorMode === 'light' ? styles.colorModeActive : ''
            }`}
            onClick={() => setColorMode('light')}
            aria-pressed={document.colorMode === 'light'}
          >
            ☀️ בהיר
          </button>
          <button
            type="button"
            className={`${styles.colorModeBtn} ${
              document.colorMode === 'dark' ? styles.colorModeActive : ''
            }`}
            onClick={() => setColorMode('dark')}
            aria-pressed={document.colorMode === 'dark'}
          >
            🌙 כהה
          </button>
        </div>
      </div>

      <div className={styles.editorSection}>
        <span className={styles.editorLabel}>
          הוסף סקשן לדף: {currentPage?.title}
        </span>

        {/* Category tabs */}
        <div className={styles.categoryTabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.categoryTab} ${activeCategory === cat ? styles.categoryTabActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {CATEGORY_LABELS[cat].icon} {CATEGORY_LABELS[cat].labelHe}
            </button>
          ))}
        </div>

        {/* Section buttons for active category */}
        <div className={styles.sectionButtons}>
          {currentCategorySections.map((section) => (
            <button
              key={section.type}
              type="button"
              className={styles.addSectionBtn}
              onClick={() => addSection(section.type)}
              aria-label={`הוסף סקשן ${section.labelHe}`}
              title={section.descriptionHe}
            >
              <span className={styles.addSectionIcon}>{section.icon}</span>
              <span className={styles.addSectionLabel}>{section.labelHe}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.editorStats}>
        <span>סקשנים בדף: {currentPage?.sections.length || 0}</span>
      </div>
    </aside>
  );
}
