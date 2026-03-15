import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, Bookmark, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import type { Course } from "@/data/courses";
import { useBookmarks } from "@/hooks/use-bookmarks";

interface RecommendationsProps {
  courses: Course[];
  onReset: () => void;
}

const Recommendations = ({ courses, onReset }: RecommendationsProps) => {
  const [filterSubject, setFilterSubject] = useState<string>("All");
  const [filterPurpose, setFilterPurpose] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toggle, isBookmarked } = useBookmarks();

  const displayed = useMemo(() => {
    let filtered = courses;
    if (filterSubject !== "All") {
      filtered = filtered.filter((c) => c.subject === filterSubject);
    }
    if (filterPurpose !== "All") {
      filtered = filtered.filter((c) => c.purpose === filterPurpose);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.course_title.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [courses, filterSubject, filterPurpose, searchQuery]);

  const availableSubjects = ["All", ...Array.from(new Set(courses.map((c) => c.subject)))];
  const availablePurposes = ["All", ...Array.from(new Set(courses.map((c) => c.purpose)))];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
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
          <h1 className="font-display text-xl font-bold text-foreground tracking-tight">
            Your <span className="text-gradient">Recommendations</span>
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/saved")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              <Bookmark className="w-4 h-4" />
              Saved
            </button>
            <span className="text-muted-foreground text-sm flex items-center gap-1.5 font-mono">
              <SlidersHorizontal className="w-4 h-4" />
              {displayed.length}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course title or subject..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {availableSubjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setFilterSubject(sub)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                filterSubject === sub
                  ? "bg-gradient-warm text-primary-foreground shadow-elevated"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
              }`}
            >
              {sub}
            </button>
          ))}
        </motion.div>

        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} isBookmarked={isBookmarked(course.id)} onToggleBookmark={toggle} />
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
