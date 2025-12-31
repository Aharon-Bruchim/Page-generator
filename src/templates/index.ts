import { Template } from '../types';

// Business templates
import {
  proposalTemplate,
  companyProfileTemplate,
  projectBriefTemplate,
  meetingSummaryTemplate,
  invoiceTemplate,
  contractTemplate,
  businessPlanTemplate,
  reportTemplate,
} from './definitions/business';

// Career templates
import {
  resumeClassicTemplate,
  resumeCreativeTemplate,
  resumeMinimalTemplate,
  coverLetterTemplate,
  portfolioTemplate,
  linkedinProfileTemplate,
  cvDeveloperTemplate,
  cvDesignerTemplate,
} from './definitions/career';

// Education templates
import {
  lessonPlanTemplate,
  courseOutlineTemplate,
  syllabusTemplate,
  worksheetTemplate,
  studyGuideTemplate,
  presentationTemplate,
  quizTemplate,
  certificateTemplate,
} from './definitions/education';

// Marketing templates
import {
  landingPageTemplate,
  productLaunchTemplate,
  newsletterTemplate,
  blogPostTemplate,
  socialMediaTemplate,
  pressReleaseTemplate,
  caseStudyTemplate,
  onePagerTemplate,
} from './definitions/marketing';

// Personal templates
import {
  eventInvitationTemplate,
  weddingInviteTemplate,
  birthdayCardTemplate,
  recipeTemplate,
  travelItineraryTemplate,
  journalTemplate,
  goalTrackerTemplate,
  thankYouNoteTemplate,
} from './definitions/personal';

// All templates array
const ALL_TEMPLATES: Template[] = [
  // Business (8)
  proposalTemplate,
  companyProfileTemplate,
  projectBriefTemplate,
  meetingSummaryTemplate,
  invoiceTemplate,
  contractTemplate,
  businessPlanTemplate,
  reportTemplate,
  // Career (8)
  resumeClassicTemplate,
  resumeCreativeTemplate,
  resumeMinimalTemplate,
  coverLetterTemplate,
  portfolioTemplate,
  linkedinProfileTemplate,
  cvDeveloperTemplate,
  cvDesignerTemplate,
  // Education (8)
  lessonPlanTemplate,
  courseOutlineTemplate,
  syllabusTemplate,
  worksheetTemplate,
  studyGuideTemplate,
  presentationTemplate,
  quizTemplate,
  certificateTemplate,
  // Marketing (8)
  landingPageTemplate,
  productLaunchTemplate,
  newsletterTemplate,
  blogPostTemplate,
  socialMediaTemplate,
  pressReleaseTemplate,
  caseStudyTemplate,
  onePagerTemplate,
  // Personal (8)
  eventInvitationTemplate,
  weddingInviteTemplate,
  birthdayCardTemplate,
  recipeTemplate,
  travelItineraryTemplate,
  journalTemplate,
  goalTrackerTemplate,
  thankYouNoteTemplate,
];

/**
 * Get all available templates
 */
export function getAllTemplates(): Template[] {
  return ALL_TEMPLATES;
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return ALL_TEMPLATES.find((t) => t.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): Template[] {
  return ALL_TEMPLATES.filter((t) => t.category === category);
}

// Re-export all templates for direct access
export {
  // Business
  proposalTemplate,
  companyProfileTemplate,
  projectBriefTemplate,
  meetingSummaryTemplate,
  invoiceTemplate,
  contractTemplate,
  businessPlanTemplate,
  reportTemplate,
  // Career
  resumeClassicTemplate,
  resumeCreativeTemplate,
  resumeMinimalTemplate,
  coverLetterTemplate,
  portfolioTemplate,
  linkedinProfileTemplate,
  cvDeveloperTemplate,
  cvDesignerTemplate,
  // Education
  lessonPlanTemplate,
  courseOutlineTemplate,
  syllabusTemplate,
  worksheetTemplate,
  studyGuideTemplate,
  presentationTemplate,
  quizTemplate,
  certificateTemplate,
  // Marketing
  landingPageTemplate,
  productLaunchTemplate,
  newsletterTemplate,
  blogPostTemplate,
  socialMediaTemplate,
  pressReleaseTemplate,
  caseStudyTemplate,
  onePagerTemplate,
  // Personal
  eventInvitationTemplate,
  weddingInviteTemplate,
  birthdayCardTemplate,
  recipeTemplate,
  travelItineraryTemplate,
  journalTemplate,
  goalTrackerTemplate,
  thankYouNoteTemplate,
};
