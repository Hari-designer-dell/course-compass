import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, BookOpen, PlayCircle, CheckCircle2, Bookmark, DollarSign, BarChart3 } from "lucide-react";
import { courses, getPopScore } from "@/data/courses";
import { useState } from "react";
import { toast } from "sonner";
import { useBookmarks } from "@/hooks/use-bookmarks";

const curriculumData: Record<string, { title: string; lessons: string[] }[]> = {
  "Web Development": [
    { title: "Getting Started", lessons: ["Environment Setup", "Project Scaffolding", "Core Concepts Overview"] },
    { title: "Fundamentals", lessons: ["Component Architecture", "State Management", "Routing & Navigation"] },
    { title: "Intermediate Techniques", lessons: ["API Integration", "Error Handling", "Performance Optimization"] },
    { title: "Advanced & Deployment", lessons: ["Testing Strategies", "CI/CD Pipelines", "Production Best Practices"] },
  ],
  "Business Finance": [
    { title: "Financial Foundations", lessons: ["Financial Statements", "Time Value of Money", "Risk & Return"] },
    { title: "Investment Analysis", lessons: ["Valuation Methods", "Portfolio Theory", "Market Analysis"] },
    { title: "Corporate Finance", lessons: ["Capital Budgeting", "Cost of Capital", "Dividend Policy"] },
    { title: "Advanced Topics", lessons: ["Mergers & Acquisitions", "Derivatives", "International Finance"] },
  ],
  "Graphic Design": [
    { title: "Design Fundamentals", lessons: ["Design Principles", "Color Theory", "Typography Basics"] },
    { title: "Digital Tools", lessons: ["Photoshop Essentials", "Illustrator Workflows", "Layout & Composition"] },
    { title: "Applied Design", lessons: ["Logo Design", "Brand Identity", "UI/UX Principles"] },
    { title: "Portfolio & Career", lessons: ["Building Your Portfolio", "Client Communication", "Freelancing Guide"] },
  ],
  "Musical Instruments": [
    { title: "Music Basics", lessons: ["Reading Notes", "Rhythm & Timing", "Scales & Chords"] },
    { title: "Technique Building", lessons: ["Finger Exercises", "Practice Routines", "Ear Training"] },
    { title: "Playing & Performance", lessons: ["Playing Songs", "Improvisation", "Stage Presence"] },
    { title: "Advanced Musicianship", lessons: ["Music Theory Deep Dive", "Composition", "Recording Basics"] },
  ],
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);
  const { toggle, isBookmarked } = useBookmarks();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-semibold text-foreground mb-2">Course not found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const curriculum = curriculumData[course.subject] || curriculumData["Web Development"];
  const totalLessons = curriculum.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const popScore = getPopScore(course);

  const handleEnroll = () => {
    setEnrolled(true);
    toast.success(`You've enrolled in "${course.course_title}"!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <img src={course.image} alt={course.course_title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium bg-foreground/20 backdrop-blur-sm rounded-lg px-3 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => toggle(course.id)}
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium bg-foreground/20 backdrop-blur-sm rounded-lg px-3 py-2"
            aria-label={isBookmarked(course.id) ? "Remove bookmark" : "Save course"}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked(course.id) ? "fill-primary-foreground" : ""}`} />
            {isBookmarked(course.id) ? "Saved" : "Save"}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-5xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {course.subject}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3 leading-tight">
            {course.course_title}
          </h1>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Stats */}
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">About this course</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                This comprehensive course covers {course.num_lectures} lectures over {course.content_duration} hours of content. 
                With {course.num_subscribers.toLocaleString()} enrolled students and {course.num_reviews.toLocaleString()} reviews, 
                it's one of the top-rated courses in {course.subject}.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Popularity Score: <span className="text-primary">{popScore.toFixed(0)}</span>
                </span>
                <span className="text-xs text-muted-foreground ml-2">(0.6 × subscribers + 0.4 × reviews)</span>
              </div>
            </motion.section>

            {/* Curriculum */}
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-1">Curriculum</h2>
              <p className="text-muted-foreground text-sm mb-5">{curriculum.length} modules · {totalLessons} lessons · {course.content_duration}h</p>
              <div className="space-y-3">
                {curriculum.map((module, mi) => (
                  <div key={mi} className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
                    <div className="flex items-center gap-3 px-5 py-4">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {mi + 1}
                      </span>
                      <h3 className="font-semibold text-foreground text-sm">{module.title}</h3>
                      <span className="ml-auto text-xs text-muted-foreground">{module.lessons.length} lessons</span>
                    </div>
                    <div className="border-t border-border px-5 py-3 space-y-2">
                      {module.lessons.map((lesson, li) => (
                        <div key={li} className="flex items-center gap-3 text-sm text-muted-foreground py-1">
                          <PlayCircle className="w-4 h-4 flex-shrink-0" />
                          {lesson}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.aside initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-xl border border-border shadow-card p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{course.content_duration}h total</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.num_lectures} lectures</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{(course.num_subscribers / 1000).toFixed(1)}k students</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>{course.is_paid ? `$${course.price}` : "Free"}</span>
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <div className="mb-4 text-center">
                  <span className="text-sm font-medium text-muted-foreground">{course.level}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEnroll}
                  disabled={enrolled}
                  className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
                    enrolled
                      ? "bg-green-100 text-green-800 cursor-default"
                      : "bg-gradient-warm text-primary-foreground shadow-elevated hover:shadow-lg"
                  }`}
                >
                  {enrolled ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Enrolled!
                    </>
                  ) : (
                    course.is_paid ? `Enroll Now — $${course.price}` : "Enroll Now — Free"
                  )}
                </motion.button>
              </div>

              {course.url && (
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs text-primary hover:underline"
                >
                  View on Udemy →
                </a>
              )}

              <p className="text-xs text-muted-foreground text-center">Full lifetime access · Certificate of completion</p>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
