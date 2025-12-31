import React from 'react';
import styles from './shared.module.css';

interface ItemEditorProps<T extends { id: string }> {
  items: T[];
  onUpdate: (items: T[]) => void;
  renderItem: (item: T, index: number, onChange: (updated: T) => void) => React.ReactNode;
  createItem: () => T;
  minItems?: number;
  maxItems?: number;
  addLabel?: string;
  itemLabel?: string;
}

export function ItemEditor<T extends { id: string }>({
  items,
  onUpdate,
  renderItem,
  createItem,
  minItems = 0,
  maxItems = Infinity,
  addLabel = 'הוסף פריט',
  itemLabel = 'פריט',
}: ItemEditorProps<T>) {
  const handleAdd = () => {
    if (items.length < maxItems) {
      onUpdate([...items, createItem()]);
    }
  };

  const handleRemove = (id: string) => {
    if (items.length > minItems) {
      onUpdate(items.filter(item => item.id !== id));
    }
  };

  const handleChange = (index: number, updated: T) => {
    const newItems = [...items];
    newItems[index] = updated;
    onUpdate(newItems);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newItems = [...items];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      onUpdate(newItems);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < items.length - 1) {
      const newItems = [...items];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      onUpdate(newItems);
    }
  };

  return (
    <div className={styles.itemEditor}>
      <div className={styles.itemsList}>
        {items.map((item, index) => (
          <div key={item.id} className={styles.itemWrapper}>
            <div className={styles.itemHeader}>
              <span className={styles.itemLabel}>
                {itemLabel} {index + 1}
              </span>
              <div className={styles.itemActions}>
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className={styles.iconButton}
                  title="הזז למעלה"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === items.length - 1}
                  className={styles.iconButton}
                  title="הזז למטה"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  disabled={items.length <= minItems}
                  className={`${styles.iconButton} ${styles.deleteButton}`}
                  title="מחק"
                >
                  ×
                </button>
              </div>
            </div>
            <div className={styles.itemContent}>
              {renderItem(item, index, (updated) => handleChange(index, updated))}
            </div>
          </div>
        ))}
      </div>

      {items.length < maxItems && (
        <button
          type="button"
          onClick={handleAdd}
          className={styles.addButton}
        >
          + {addLabel}
        </button>
      )}
    </div>
  );
}
