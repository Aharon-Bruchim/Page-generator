import { Section } from '../../types';

// Basic sections
import { HeroSection } from './HeroSection';
import { TextSection } from './TextSection';
import { ImageSection } from './ImageSection';
import { HighlightSection } from './HighlightSection';
import { DividerSection } from './DividerSection';

// Interactive sections
import { AccordionSection } from './interactive/AccordionSection';
import { TabsSection } from './interactive/TabsSection';

// Content sections
import { TimelineSection } from './content/TimelineSection';
import { TeamCardsSection } from './content/TeamCardsSection';
import { TestimonialsSection } from './content/TestimonialsSection';
import { FeatureListSection } from './content/FeatureListSection';

// Media sections
import { GallerySection } from './media/GallerySection';
import { VideoEmbedSection } from './media/VideoEmbedSection';
import { MapEmbedSection } from './media/MapEmbedSection';

// Conversion sections
import { StatsSection } from './conversion/StatsSection';
import { PricingTableSection } from './conversion/PricingTableSection';
import { CTAButtonSection } from './conversion/CTAButtonSection';

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
    // Basic sections
    case 'hero':
      return <HeroSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'text':
      return <TextSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'image':
      return <ImageSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'highlight':
      return <HighlightSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'divider':
      return <DividerSection section={section} isEditing={isEditing} onChange={handleChange} />;

    // Interactive sections
    case 'accordion':
      return <AccordionSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'tabs':
      return <TabsSection section={section} isEditing={isEditing} onChange={handleChange} />;

    // Content sections
    case 'timeline':
      return <TimelineSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'teamCards':
      return <TeamCardsSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'testimonials':
      return <TestimonialsSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'featureList':
      return <FeatureListSection section={section} isEditing={isEditing} onChange={handleChange} />;

    // Media sections
    case 'gallery':
      return <GallerySection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'videoEmbed':
      return <VideoEmbedSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'mapEmbed':
      return <MapEmbedSection section={section} isEditing={isEditing} onChange={handleChange} />;

    // Conversion sections
    case 'stats':
      return <StatsSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'pricingTable':
      return <PricingTableSection section={section} isEditing={isEditing} onChange={handleChange} />;
    case 'ctaButton':
      return <CTAButtonSection section={section} isEditing={isEditing} onChange={handleChange} />;

    default:
      // TypeScript exhaustiveness check
      const _exhaustiveCheck: never = section;
      return null;
  }
}
