import React from 'react';
import { TeamCardsSection as TeamCardsSectionType, TeamMember } from '../../../../types';
import { ItemEditor } from '../../shared';
import styles from './TeamCardsSection.module.css';

interface TeamCardsSectionProps {
  section: TeamCardsSectionType;
  isEditing?: boolean;
  onChange?: (section: TeamCardsSectionType) => void;
}

export function TeamCardsSection({ section, isEditing, onChange }: TeamCardsSectionProps) {
  if (isEditing && onChange) {
    return (
      <div className={styles.editor}>
        <div className={styles.settings}>
          <div className={styles.settingItem}>
            <label className={styles.label}>עמודות</label>
            <select
              value={section.columns}
              onChange={(e) => onChange({ ...section, columns: Number(e.target.value) as 2 | 3 | 4 })}
              className={styles.select}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={section.showBio}
              onChange={(e) => onChange({ ...section, showBio: e.target.checked })}
            />
            <span>הצג ביוגרפיה</span>
          </label>
        </div>

        <ItemEditor
          items={section.members}
          onUpdate={(members) => onChange({ ...section, members })}
          createItem={() => ({
            id: crypto.randomUUID(),
            name: '',
            role: '',
            photo: '',
            bio: '',
          })}
          addLabel="הוסף חבר צוות"
          itemLabel="חבר צוות"
          renderItem={(item, _index, onItemChange) => (
            <div className={styles.itemEditor}>
              <input
                type="text"
                value={item.name}
                onChange={(e) => onItemChange({ ...item, name: e.target.value })}
                placeholder="שם"
                className={styles.input}
              />
              <input
                type="text"
                value={item.role}
                onChange={(e) => onItemChange({ ...item, role: e.target.value })}
                placeholder="תפקיד"
                className={styles.input}
              />
              <input
                type="text"
                value={item.photo}
                onChange={(e) => onItemChange({ ...item, photo: e.target.value })}
                placeholder="קישור לתמונה"
                className={styles.input}
              />
              {section.showBio && (
                <textarea
                  value={item.bio || ''}
                  onChange={(e) => onItemChange({ ...item, bio: e.target.value })}
                  placeholder="ביוגרפיה"
                  className={`${styles.input} ${styles.textarea}`}
                />
              )}
            </div>
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={styles.teamCards}
      style={{ '--columns': section.columns } as React.CSSProperties}
    >
      {section.members.length === 0 ? (
        <div className={styles.empty}>הוסף חברי צוות...</div>
      ) : (
        section.members.map((member) => (
          <div key={member.id} className={styles.card}>
            <div className={styles.photoWrapper}>
              {member.photo ? (
                <img src={member.photo} alt={member.name} className={styles.photo} />
              ) : (
                <div className={styles.placeholder}>👤</div>
              )}
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{member.name || 'שם'}</h3>
              <span className={styles.role}>{member.role || 'תפקיד'}</span>
              {section.showBio && member.bio && (
                <p className={styles.bio}>{member.bio}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
