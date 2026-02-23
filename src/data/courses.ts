export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  rating: number;
  enrolled: number;
  instructor: string;
  tags: string[];
  image: string;
}

export const categories = [
  "Web Development",
  "Data Science",
  "Design",
  "Business",
  "Marketing",
  "Photography",
  "Music",
  "Health & Fitness",
] as const;

export const skillLevels = ["beginner", "intermediate", "advanced"] as const;

export const learningStyles = [
  "Visual (Videos & Diagrams)",
  "Hands-on (Projects & Labs)",
  "Reading (Articles & Books)",
  "Interactive (Quizzes & Games)",
] as const;

export const courses: Course[] = [
  {
    id: "1",
    title: "Modern React & TypeScript Mastery",
    description: "Build production-ready apps with React 18, TypeScript, and modern tooling. From hooks to server components.",
    category: "Web Development",
    level: "intermediate",
    duration: "32 hours",
    rating: 4.9,
    enrolled: 14200,
    instructor: "Sarah Chen",
    tags: ["React", "TypeScript", "Frontend"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Master Python, pandas, NumPy, and scikit-learn. Analyze real datasets and build predictive models.",
    category: "Data Science",
    level: "beginner",
    duration: "40 hours",
    rating: 4.8,
    enrolled: 23400,
    instructor: "Dr. James Liu",
    tags: ["Python", "ML", "Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Learn design thinking, wireframing, prototyping, and user research to create delightful experiences.",
    category: "Design",
    level: "beginner",
    duration: "24 hours",
    rating: 4.7,
    enrolled: 18600,
    instructor: "Maria Santos",
    tags: ["UX", "Figma", "Prototyping"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Full-Stack JavaScript Bootcamp",
    description: "Go from zero to full-stack developer. Node.js, Express, MongoDB, React — build and deploy real apps.",
    category: "Web Development",
    level: "beginner",
    duration: "60 hours",
    rating: 4.8,
    enrolled: 31200,
    instructor: "Alex Rivera",
    tags: ["Node.js", "MongoDB", "Full-Stack"],
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Advanced Machine Learning",
    description: "Deep learning, neural networks, and NLP. Build AI systems with TensorFlow and PyTorch.",
    category: "Data Science",
    level: "advanced",
    duration: "48 hours",
    rating: 4.9,
    enrolled: 8900,
    instructor: "Dr. Priya Sharma",
    tags: ["Deep Learning", "TensorFlow", "NLP"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Brand Identity & Visual Design",
    description: "Create compelling brand systems. Typography, color theory, logo design, and brand guidelines.",
    category: "Design",
    level: "intermediate",
    duration: "20 hours",
    rating: 4.6,
    enrolled: 12300,
    instructor: "Tom Nakamura",
    tags: ["Branding", "Typography", "Identity"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    title: "Digital Marketing Strategy",
    description: "SEO, social media, email marketing, and analytics. Build campaigns that drive real results.",
    category: "Marketing",
    level: "beginner",
    duration: "28 hours",
    rating: 4.5,
    enrolled: 19800,
    instructor: "Emma Wright",
    tags: ["SEO", "Social Media", "Analytics"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: "8",
    title: "Startup & Entrepreneurship",
    description: "Validate ideas, build MVPs, find product-market fit, and raise funding for your startup.",
    category: "Business",
    level: "intermediate",
    duration: "22 hours",
    rating: 4.7,
    enrolled: 15600,
    instructor: "David Okonkwo",
    tags: ["Startup", "MVP", "Fundraising"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
  },
  {
    id: "9",
    title: "Photography Masterclass",
    description: "From composition to post-processing. Capture stunning photos with any camera.",
    category: "Photography",
    level: "beginner",
    duration: "18 hours",
    rating: 4.8,
    enrolled: 22100,
    instructor: "Leila Abbas",
    tags: ["Composition", "Lightroom", "Portrait"],
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop",
  },
  {
    id: "10",
    title: "Music Production with Ableton",
    description: "Produce professional tracks from scratch. Sound design, mixing, mastering, and arrangement.",
    category: "Music",
    level: "intermediate",
    duration: "36 hours",
    rating: 4.6,
    enrolled: 9400,
    instructor: "Jordan Miles",
    tags: ["Ableton", "Mixing", "Sound Design"],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
  },
  {
    id: "11",
    title: "CSS & Animation Wizardry",
    description: "Advanced CSS, animations, and creative coding. Build stunning visual experiences for the web.",
    category: "Web Development",
    level: "advanced",
    duration: "26 hours",
    rating: 4.7,
    enrolled: 7800,
    instructor: "Nina Petrova",
    tags: ["CSS", "Animation", "Creative"],
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop",
  },
  {
    id: "12",
    title: "Yoga & Mindfulness",
    description: "Build a daily practice. Flexibility, strength, breathwork, and meditation for busy people.",
    category: "Health & Fitness",
    level: "beginner",
    duration: "14 hours",
    rating: 4.9,
    enrolled: 28300,
    instructor: "Ananya Gupta",
    tags: ["Yoga", "Meditation", "Wellness"],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
];

export function getRecommendations(
  selectedCategories: string[],
  selectedLevel: string,
  _learningStyle: string
): Course[] {
  let filtered = courses;

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((c) => selectedCategories.includes(c.category));
  }

  if (selectedLevel) {
    filtered = filtered.filter((c) => c.level === selectedLevel);
  }

  // Sort by rating, then by enrollment
  filtered.sort((a, b) => b.rating - a.rating || b.enrolled - a.enrolled);

  return filtered;
}
