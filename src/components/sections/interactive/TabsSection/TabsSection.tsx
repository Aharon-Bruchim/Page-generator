import React, { useState } from 'react';
import { TabsSection as TabsSectionType, TabItem } from '../../../../types';
import { ItemEditor } from '../../shared';
import styles from './TabsSection.module.css';

interface TabsSectionProps {
  section: TabsSectionType;
  isEditing?: boolean;
  onChange?: (section: TabsSectionType) => void;
}

export function TabsSection({ section, isEditing, onChange }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState(section.tabs[0]?.id || '');

  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.settings}>
          <label className={styles.label}>סגנון תצוגה</label>
          <select
            value={section.variant}
            onChange={(e) => onChange({ ...section, variant: e.target.value as 'horizontal' | 'vertical' })}
            className={styles.select}
          >
            <option value="horizontal">אופקי</option>
            <option value="vertical">אנכי</option>
          </select>
        </div>

        <ItemEditor
          items={section.tabs}
          onUpdate={(tabs) => onChange({ ...section, tabs })}
          createItem={() => ({
            id: crypto.randomUUID(),
            label: 'כרטיסיה חדשה',
            content: '',
          })}
          minItems={1}
          addLabel="הוסף כרטיסיה"
          itemLabel="כרטיסיה"
          renderItem={(item, _index, onItemChange) => (
            <div className={styles.itemEditor}>
              <input
                type="text"
                value={item.label}
                onChange={(e) => onItemChange({ ...item, label: e.target.value })}
                placeholder="שם הכרטיסיה"
                className={styles.input}
              />
              <textarea
                value={item.content}
                onChange={(e) => onItemChange({ ...item, content: e.target.value })}
                placeholder="תוכן"
                className={`${styles.input} ${styles.textarea}`}
              />
            </div>
          )}
        />
      </div>
    );
  }

  const activeTabContent = section.tabs.find(t => t.id === activeTab)?.content || '';

  return (
    <div className={`${styles.tabs} ${styles[section.variant]}`}>
      <div className={styles.tabList} role="tablist">
        {section.tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label || 'כרטיסיה'}
          </button>
        ))}
      </div>
      <div className={styles.tabPanel} role="tabpanel">
        {activeTabContent || 'תוכן הכרטיסיה...'}
      </div>
    </div>
  );
}
