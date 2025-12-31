import React, { useState, useMemo } from 'react';
import { Template, TemplateCategory, TemplateFilters as TemplateFiltersType } from '../../../types';
import { TemplateFilters } from '../TemplateFilters';
import { TemplateGallery } from '../TemplateGallery';
import { TemplatePreview } from '../TemplatePreview';
import { useDocument } from '../../../context/DocumentContext';
import { getAllTemplates } from '../../../templates';
import styles from './TemplateBrowser.module.css';

interface TemplateBrowserProps {
  onTemplateApplied?: () => void;
}

export function TemplateBrowser({ onTemplateApplied }: TemplateBrowserProps) {
  const { applyTemplate } = useDocument();
  const [filters, setFilters] = useState<TemplateFiltersType>({
    category: 'all',
    searchQuery: '',
    sortBy: 'name',
  });
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const allTemplates = useMemo(() => getAllTemplates(), []);

  const templateCounts = useMemo(() => {
    const counts: Record<TemplateCategory | 'all', number> = {
      all: allTemplates.length,
      business: 0,
      career: 0,
      education: 0,
      marketing: 0,
      personal: 0,
    };

    allTemplates.forEach((t) => {
      counts[t.category]++;
    });

    return counts;
  }, [allTemplates]);

  const filteredTemplates = useMemo(() => {
    let result = [...allTemplates];

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.nameHe.toLowerCase().includes(query) ||
          t.descriptionHe.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.nameHe.localeCompare(b.nameHe, 'he'));
        break;
      case 'popularity':
        result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return result;
  }, [allTemplates, filters]);

  const handleSelectTemplate = (template: Template, replaceExisting: boolean) => {
    applyTemplate(template, replaceExisting);
    setPreviewTemplate(null);
    onTemplateApplied?.();
  };

  const handleQuickSelect = (template: Template) => {
    setPreviewTemplate(template);
  };

  return (
    <div className={styles.browser}>
      <div className={styles.header}>
        <h2 className={styles.title}>ספריית תבניות</h2>
        <p className={styles.subtitle}>
          בחר תבנית מוכנה והתחל לעבוד מיד - {allTemplates.length} תבניות זמינות
        </p>
      </div>

      <TemplateFilters
        filters={filters}
        onFiltersChange={setFilters}
        templateCounts={templateCounts}
      />

      <TemplateGallery
        templates={filteredTemplates}
        onSelectTemplate={handleQuickSelect}
        onPreviewTemplate={setPreviewTemplate}
      />

      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelect={handleSelectTemplate}
        />
      )}
    </div>
  );
}
