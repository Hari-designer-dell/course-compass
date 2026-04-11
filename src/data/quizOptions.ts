export const subjects = [
  "Web Development",
  "Programming Languages",
  "Business Finance",
  "Graphic Design",
  "Musical Instruments",
] as const;

export const purposes = [
  "Career Switch",
  "Skill Upgrade",
  "Academic / College",
  "Freelancing / Side Income",
  "Hobby / Personal Interest",
] as const;

export const skillLevels = [
  "All Levels",
  "Beginner Level",
  "Intermediate Level",
  "Expert Level",
] as const;

export const learningStyles = [
  "Visual (Videos & Diagrams)",
  "Hands-on (Projects & Labs)",
  "Reading (Articles & Books)",
  "Interactive (Quizzes & Games)",
] as const;

export const timeAvailability = [
  "Less than 5 hours/week",
  "5-10 hours/week",
  "10-20 hours/week",
  "20+ hours/week",
] as const;

export const budgetOptions = [
  "Free only",
  "Under ₹500",
  "Under ₹2000",
  "Any budget",
] as const;

export const careerObjectives = [
  "Get a job / internship",
  "Freelance / start a business",
  "Academic excellence",
  "Build personal projects",
  "General knowledge",
] as const;

export const durationPreferences = [
  "Short (under 5 hours)",
  "Medium (5-20 hours)",
  "Long (20-40 hours)",
  "Comprehensive (40+ hours)",
] as const;

export const languagePreferences = [
  "English",
  "Hindi",
  "Any language",
] as const;

export const certificationRequirements = [
  "Yes, I need a certificate",
  "Nice to have, not required",
  "No, just learning",
] as const;

export const projectPreferences = [
  "Project-based (learn by building)",
  "Theory-first (concepts then practice)",
  "Mixed (theory + projects)",
  "Assessment-based (quizzes & exams)",
] as const;

export interface QuizAnswers {
  subjects: string[];
  purpose: string;
  skillLevel: string;
  learningStyle: string;
  timeAvailability: string;
  budget: string;
  subInterest: string;
  careerObjective: string;
  durationPreference: string;
  languagePreference: string;
  certificationRequirement: string;
  projectPreference: string;
}

export const subInterests: Record<string, string[]> = {
  "Web Development": ["Frontend (React, Vue)", "Backend (Node, Django)", "Full Stack", "WordPress / CMS", "UI/UX Design"],
  "Programming Languages": ["Python", "Java", "C/C++", "JavaScript/TypeScript", "Go / Rust / Kotlin"],
  "Business Finance": ["Stock Market & Trading", "Accounting & Tax", "Financial Modeling", "Cryptocurrency", "MBA / Management"],
  "Graphic Design": ["Photoshop / Illustrator", "UI/UX Design", "Motion Graphics", "Photography", "Logo & Branding"],
  "Musical Instruments": ["Guitar", "Piano / Keyboard", "Drums & Percussion", "Music Production", "Singing & Vocals"],
};
