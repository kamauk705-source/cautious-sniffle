
import { CourseModule } from './types';

export const SYSTEM_INSTRUCTION = `You are an expert graphic design tutor specializing in Adobe Creative Suite (Photoshop, Illustrator, InDesign). Your goal is to teach users graphic design principles and software skills in a clear, encouraging, and practical way.

- Provide step-by-step instructions.
- Explain complex concepts with simple analogies.
- Offer real-world examples and project ideas.
- Keep your tone friendly, professional, and motivational.
- Format your responses using Markdown for readability (e.g., use lists, bold text, and code blocks for shortcuts).
- When asked for a course lesson, provide a comprehensive overview of the topic with practical exercises.`;

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'intro-design',
    title: 'Introduction to Graphic Design',
    description: 'Core principles and elements.',
    software: 'general',
  },
  {
    id: 'photoshop-basics',
    title: 'Photoshop: The Basics',
    description: 'Layers, selections, and adjustments.',
    software: 'photoshop',
  },
  {
    id: 'illustrator-basics',
    title: 'Illustrator: The Basics',
    description: 'Vectors, paths, and shapes.',
    software: 'illustrator',
  },
  {
    id: 'typography',
    title: 'Typography Fundamentals',
    description: 'Choosing and pairing fonts.',
    software: 'general',
  },
  {
    id: 'color-theory',
    title: 'Color Theory in Practice',
    description: 'Creating effective color palettes.',
    software: 'general',
  },
  {
    id: 'indesign-layouts',
    title: 'InDesign: Page Layouts',
    description: 'Grids, master pages, and text flow.',
    software: 'indesign',
  },
    {
    id: 'photo-editing',
    title: 'Advanced Photo Editing',
    description: 'Retouching and compositing in Photoshop.',
    software: 'photoshop',
  },
  {
    id: 'logo-design',
    title: 'Logo Design with Illustrator',
    description: 'From sketch to vector masterpiece.',
    software: 'illustrator',
  },
];
