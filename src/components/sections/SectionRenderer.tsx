import { Section } from '../../types';
import { HeroSection } from './HeroSection';
import { TextSection } from './TextSection';
import { ImageSection } from './ImageSection';
import { HighlightSection } from './HighlightSection';
import { DividerSection } from './DividerSection';

interface SectionRendererProps {
  section: Section;
  isEditing?: boolean;
  onChange?: (section: Section) => void;
}

export function SectionRenderer({ section, isEditing, onChange }: SectionRendererProps) {
  const handleChange = (updatedSection: Section) => {
    if (onChange) {
      onChange(updatedSection);
    }
  };

  switch (section.type) {
    case 'hero':
      return (
        <HeroSection
          section={section}
          isEditing={isEditing}
          onChange={handleChange}
        />
      );
    case 'text':
      return (
        <TextSection
          section={section}
          isEditing={isEditing}
          onChange={handleChange}
        />
      );
    case 'image':
      return (
        <ImageSection
          section={section}
          isEditing={isEditing}
          onChange={handleChange}
        />
      );
    case 'highlight':
      return (
        <HighlightSection
          section={section}
          isEditing={isEditing}
          onChange={handleChange}
        />
      );
    case 'divider':
      return (
        <DividerSection
          section={section}
          isEditing={isEditing}
          onChange={handleChange}
        />
      );
    default:
      return null;
  }
}
