import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Star, Users, BookOpen, PlayCircle, CheckCircle2, Bookmark } from "lucide-react";
import { courses } from "@/data/courses";
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
  "Data Science": [
    { title: "Data Foundations", lessons: ["Data Types & Structures", "Data Collection Methods", "Cleaning & Preprocessing"] },
    { title: "Analysis & Visualization", lessons: ["Exploratory Data Analysis", "Statistical Methods", "Data Visualization"] },
    { title: "Modeling", lessons: ["Regression Techniques", "Classification Models", "Model Evaluation"] },
    { title: "Advanced Topics", lessons: ["Feature Engineering", "Ensemble Methods", "Real-world Case Studies"] },
  ],
  default: [
    { title: "Introduction", lessons: ["Welcome & Overview", "Tools & Setup", "Key Terminology"] },
    { title: "Core Skills", lessons: ["Foundational Techniques", "Hands-on Practice", "Building Confidence"] },
    { title: "Applied Learning", lessons: ["Real-world Projects", "Feedback & Iteration", "Portfolio Building"] },
    { title: "Mastery", lessons: ["Advanced Concepts", "Industry Standards", "Final Capstone Project"] },
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

  const curriculum = curriculumData[course.category] || curriculumData.default;
  const totalLessons = curriculum.reduce((sum, mod) => sum + mod.lessons.length, 0);

  const handleEnroll = () => {
    setEnrolled(true);
    toast.success(`You've enrolled in "${course.title}"!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
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
            {course.category}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3 leading-tight">
            {course.title}
          </h1>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">About this course</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{course.description}</p>
              <p className="text-muted-foreground leading-relaxed text-base mt-3">
                This comprehensive course takes you from foundational concepts to advanced techniques through hands-on projects and real-world examples. You'll gain practical skills that you can immediately apply to your work or personal projects.
              </p>
            </motion.section>

            {/* Instructor */}
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Instructor</h2>
              <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border shadow-card">
                <div className="w-14 h-14 rounded-full bg-gradient-warm flex items-center justify-center flex-shrink-0 text-primary-foreground font-display text-xl font-bold">
                  {course.instructor.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{course.instructor}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Expert instructor with years of industry experience. Passionate about making complex topics accessible and helping students reach their full potential.
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-primary fill-primary" /> {course.rating} rating</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {(course.enrolled / 1000).toFixed(1)}k students</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Curriculum */}
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-1">Curriculum</h2>
              <p className="text-muted-foreground text-sm mb-5">{curriculum.length} modules · {totalLessons} lessons · {course.duration}</p>
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
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span className="capitalize">{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span>{course.rating} rating</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{(course.enrolled / 1000).toFixed(1)}k enrolled</span>
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {course.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md">{tag}</span>
                  ))}
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
                    "Enroll Now — Free"
                  )}
                </motion.button>
              </div>

              <p className="text-xs text-muted-foreground text-center">Full lifetime access · Certificate of completion</p>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
