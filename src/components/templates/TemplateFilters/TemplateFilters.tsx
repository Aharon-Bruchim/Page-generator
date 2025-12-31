import React from 'react';
import { TemplateCategory, TEMPLATE_CATEGORIES, TemplateFilters as TemplateFiltersType } from '../../../types';
import styles from './TemplateFilters.module.css';

interface TemplateFiltersProps {
  filters: TemplateFiltersType;
  onFiltersChange: (filters: TemplateFiltersType) => void;
  templateCounts: Record<TemplateCategory | 'all', number>;
}

export function TemplateFilters({ filters, onFiltersChange, templateCounts }: TemplateFiltersProps) {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="חיפוש תבניות..."
          value={filters.searchQuery}
          onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      <div className={styles.categorySection}>
        <button
          className={`${styles.categoryBtn} ${filters.category === 'all' ? styles.categoryBtnActive : ''}`}
          onClick={() => onFiltersChange({ ...filters, category: 'all' })}
        >
          <span className={styles.categoryIcon}>📁</span>
          <span className={styles.categoryName}>הכל</span>
          <span className={styles.categoryCount}>{templateCounts.all}</span>
        </button>

        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryBtn} ${filters.category === cat.id ? styles.categoryBtnActive : ''}`}
            onClick={() => onFiltersChange({ ...filters, category: cat.id })}
          >
            <span className={styles.categoryIcon}>{cat.icon}</span>
            <span className={styles.categoryName}>{cat.nameHe}</span>
            <span className={styles.categoryCount}>{templateCounts[cat.id] || 0}</span>
          </button>
        ))}
      </div>

      <div className={styles.sortSection}>
        <label className={styles.sortLabel}>מיין לפי:</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as TemplateFiltersType['sortBy'] })}
          className={styles.sortSelect}
        >
          <option value="name">שם</option>
          <option value="popularity">פופולריות</option>
          <option value="category">קטגוריה</option>
        </select>
      </div>
    </div>
  );
}
