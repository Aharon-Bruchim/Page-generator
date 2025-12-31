import React from 'react';
import { PricingTableSection as PricingTableSectionType, PricingPlan, PricingFeature } from '../../../../types';
import { ItemEditor } from '../../shared';
import styles from './PricingTableSection.module.css';

interface PricingTableSectionProps {
  section: PricingTableSectionType;
  isEditing?: boolean;
  onChange?: (section: PricingTableSectionType) => void;
}

export function PricingTableSection({ section, isEditing, onChange }: PricingTableSectionProps) {
  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.settings}>
          <label className={styles.label}>מטבע</label>
          <input
            type="text"
            value={section.currency || '₪'}
            onChange={(e) => onChange({ ...section, currency: e.target.value })}
            className={`${styles.input} ${styles.small}`}
            placeholder="₪"
          />
        </div>

        <ItemEditor
          items={section.plans}
          onUpdate={(plans) => onChange({ ...section, plans })}
          createItem={() => ({
            id: crypto.randomUUID(),
            name: 'חבילה חדשה',
            price: '0',
            period: 'לחודש',
            description: '',
            features: [],
            isHighlighted: false,
            ctaText: 'בחר',
            ctaUrl: '#',
          })}
          minItems={1}
          maxItems={4}
          addLabel="הוסף חבילה"
          itemLabel="חבילה"
          renderItem={(plan, _index, onPlanChange) => (
            <div className={styles.planEditor}>
              <div className={styles.row}>
                <input
                  type="text"
                  value={plan.name}
                  onChange={(e) => onPlanChange({ ...plan, name: e.target.value })}
                  placeholder="שם החבילה"
                  className={styles.input}
                />
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={plan.isHighlighted}
                    onChange={(e) => onPlanChange({ ...plan, isHighlighted: e.target.checked })}
                  />
                  <span>מודגש</span>
                </label>
              </div>
              <div className={styles.row}>
                <input
                  type="text"
                  value={plan.price}
                  onChange={(e) => onPlanChange({ ...plan, price: e.target.value })}
                  placeholder="מחיר"
                  className={styles.input}
                />
                <input
                  type="text"
                  value={plan.period || ''}
                  onChange={(e) => onPlanChange({ ...plan, period: e.target.value })}
                  placeholder="תקופה (לחודש)"
                  className={styles.input}
                />
              </div>
              <textarea
                value={plan.description || ''}
                onChange={(e) => onPlanChange({ ...plan, description: e.target.value })}
                placeholder="תיאור קצר"
                className={`${styles.input} ${styles.textarea}`}
              />
              <div className={styles.featuresEditor}>
                <label className={styles.label}>פיצ'רים (אחד בכל שורה)</label>
                <textarea
                  value={plan.features.map(f => (f.included ? '✓ ' : '✗ ') + f.text).join('\n')}
                  onChange={(e) => {
                    const features = e.target.value.split('\n').filter(l => l.trim()).map(line => {
                      const included = line.startsWith('✓') || !line.startsWith('✗');
                      const text = line.replace(/^[✓✗]\s*/, '').trim();
                      return { id: crypto.randomUUID(), text, included };
                    });
                    onPlanChange({ ...plan, features });
                  }}
                  placeholder="✓ פיצ'ר כלול&#10;✗ פיצ'ר לא כלול"
                  className={`${styles.input} ${styles.textarea}`}
                />
              </div>
              <div className={styles.row}>
                <input
                  type="text"
                  value={plan.ctaText}
                  onChange={(e) => onPlanChange({ ...plan, ctaText: e.target.value })}
                  placeholder="טקסט כפתור"
                  className={styles.input}
                />
                <input
                  type="text"
                  value={plan.ctaUrl || ''}
                  onChange={(e) => onPlanChange({ ...plan, ctaUrl: e.target.value })}
                  placeholder="קישור"
                  className={styles.input}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={styles.pricingTable}
      style={{ '--plan-count': section.plans.length } as React.CSSProperties}
    >
      {section.plans.map((plan) => (
        <div
          key={plan.id}
          className={`${styles.plan} ${plan.isHighlighted ? styles.highlighted : ''}`}
        >
          {plan.isHighlighted && <div className={styles.badge}>הכי פופולרי</div>}
          <h3 className={styles.planName}>{plan.name}</h3>
          {plan.description && <p className={styles.planDescription}>{plan.description}</p>}
          <div className={styles.price}>
            <span className={styles.currency}>{section.currency || '₪'}</span>
            <span className={styles.amount}>{plan.price}</span>
            {plan.period && <span className={styles.period}>/{plan.period}</span>}
          </div>
          <ul className={styles.features}>
            {plan.features.map((feature) => (
              <li
                key={feature.id}
                className={`${styles.feature} ${feature.included ? styles.included : styles.excluded}`}
              >
                <span className={styles.featureIcon}>{feature.included ? '✓' : '✗'}</span>
                {feature.text}
              </li>
            ))}
          </ul>
          <a
            href={plan.ctaUrl || '#'}
            className={`${styles.cta} ${plan.isHighlighted ? styles.ctaHighlighted : ''}`}
          >
            {plan.ctaText}
          </a>
        </div>
      ))}
    </div>
  );
}
