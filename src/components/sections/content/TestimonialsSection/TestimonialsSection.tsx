import React from 'react';
import { TestimonialsSection as TestimonialsSectionType, Testimonial } from '../../../../types';
import { ItemEditor } from '../../shared';
import styles from './TestimonialsSection.module.css';

interface TestimonialsSectionProps {
  section: TestimonialsSectionType;
  isEditing?: boolean;
  onChange?: (section: TestimonialsSectionType) => void;
}

export function TestimonialsSection({ section, isEditing, onChange }: TestimonialsSectionProps) {
  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.settings}>
          <label className={styles.label}>סגנון תצוגה</label>
          <select
            value={section.variant}
            onChange={(e) => onChange({ ...section, variant: e.target.value as 'cards' | 'carousel' | 'single' })}
            className={styles.select}
          >
            <option value="cards">כרטיסים</option>
            <option value="single">בודד</option>
          </select>
        </div>

        <ItemEditor
          items={section.testimonials}
          onUpdate={(testimonials) => onChange({ ...section, testimonials })}
          createItem={() => ({
            id: crypto.randomUUID(),
            quote: '',
            authorName: '',
            authorRole: '',
            authorPhoto: '',
            rating: 5,
          })}
          addLabel="הוסף המלצה"
          itemLabel="המלצה"
          renderItem={(item, _index, onItemChange) => (
            <div className={styles.itemEditor}>
              <textarea
                value={item.quote}
                onChange={(e) => onItemChange({ ...item, quote: e.target.value })}
                placeholder="ציטוט ההמלצה"
                className={`${styles.input} ${styles.textarea}`}
              />
              <div className={styles.row}>
                <input
                  type="text"
                  value={item.authorName}
                  onChange={(e) => onItemChange({ ...item, authorName: e.target.value })}
                  placeholder="שם"
                  className={styles.input}
                />
                <input
                  type="text"
                  value={item.authorRole || ''}
                  onChange={(e) => onItemChange({ ...item, authorRole: e.target.value })}
                  placeholder="תפקיד"
                  className={styles.input}
                />
              </div>
              <div className={styles.row}>
                <input
                  type="text"
                  value={item.authorPhoto || ''}
                  onChange={(e) => onItemChange({ ...item, authorPhoto: e.target.value })}
                  placeholder="קישור לתמונה"
                  className={styles.input}
                />
                <div className={styles.ratingInput}>
                  <label className={styles.label}>דירוג</label>
                  <select
                    value={item.rating || 5}
                    onChange={(e) => onItemChange({ ...item, rating: Number(e.target.value) })}
                    className={styles.select}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n} כוכבים</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  if (section.testimonials.length === 0) {
    return <div className={styles.empty}>הוסף המלצות...</div>;
  }

  return (
    <div className={`${styles.testimonials} ${styles[section.variant]}`}>
      {section.testimonials.map((testimonial) => (
        <div key={testimonial.id} className={styles.card}>
          {testimonial.rating && (
            <div className={styles.stars}>
              {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
            </div>
          )}
          <blockquote className={styles.quote}>
            "{testimonial.quote || 'ציטוט המלצה...'}"
          </blockquote>
          <div className={styles.author}>
            {testimonial.authorPhoto ? (
              <img src={testimonial.authorPhoto} alt={testimonial.authorName} className={styles.photo} />
            ) : (
              <div className={styles.photoPlaceholder}>👤</div>
            )}
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{testimonial.authorName || 'שם'}</span>
              {testimonial.authorRole && (
                <span className={styles.authorRole}>{testimonial.authorRole}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
