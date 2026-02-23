import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import CourseCard from "./CourseCard";
import type { Course } from "@/data/courses";
import { categories } from "@/data/courses";

interface RecommendationsProps {
  courses: Course[];
  onReset: () => void;
}

const Recommendations = ({ courses, onReset }: RecommendationsProps) => {
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const displayed = filterCategory === "All"
    ? courses
    : courses.filter((c) => c.category === filterCategory);

  const availableCategories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Retake Quiz
            </button>
          </div>
          <h1 className="font-display text-xl font-semibold text-foreground">
            Your <span className="text-gradient">Recommendations</span>
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <SlidersHorizontal className="w-4 h-4" />
            {displayed.length} courses
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filterCategory === cat
                  ? "bg-gradient-warm text-primary-foreground shadow-elevated"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No courses match this filter.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Recommendations;
