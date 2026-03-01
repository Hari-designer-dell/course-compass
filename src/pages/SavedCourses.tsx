import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Bookmark, ArrowLeft } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { useBookmarks } from "@/hooks/use-bookmarks";

const SavedCourses = () => {
  const navigate = useNavigate();
  const { bookmarks, toggle, isBookmarked } = useBookmarks();

  const savedCourses = courses.filter((c) => bookmarks.includes(c.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </button>
          </div>
          <h1 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-primary fill-primary" />
            Saved Courses
          </h1>
          <span className="text-muted-foreground text-sm">{savedCourses.length} saved</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {savedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCourses.map((course, i) => (
              <CourseCard
                key={course.id}
                course={course}
                index={i}
                isBookmarked={isBookmarked(course.id)}
                onToggleBookmark={toggle}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Bookmark className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">No saved courses yet</h2>
            <p className="text-muted-foreground mb-6">Browse courses and tap the bookmark icon to save them here.</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gradient-warm text-primary-foreground font-semibold rounded-xl shadow-elevated"
            >
              Explore Courses
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default SavedCourses;
