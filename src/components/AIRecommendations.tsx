import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, Star, Clock, Users, Sparkles, Loader2, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "@/hooks/use-bookmarks";
import type { Course } from "@/data/courses";

interface AIRecommendation {
  id: string;
  reason: string;
  key_benefits: string[];
  match_score: number;
}

interface AIRecommendationsProps {
  aiResults: AIRecommendation[] | null;
  isLoading: boolean;
  courses: Course[];
  onReset: () => void;
  answers: { subjects: string[]; purpose: string; skillLevel: string };
}

const AIRecommendations = ({ aiResults, isLoading, courses, onReset, answers }: AIRecommendationsProps) => {
  const navigate = useNavigate();
  const { toggle, isBookmarked } = useBookmarks();

  const getCourse = (id: string) => courses.find((c) => c.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="relative mx-auto w-20 h-20">
            <Loader2 className="w-20 h-20 text-primary animate-spin" />
            <Sparkles className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">AI is analyzing your profile...</h2>
            <p className="text-muted-foreground">Matching 12 factors against our course catalog</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Fallback if AI failed
  const fallbackCourses = aiResults
    ? aiResults.map((r) => ({ ...r, course: getCourse(r.id) })).filter((r) => r.course)
    : courses
        .filter((c) => answers.subjects.includes(c.subject))
        .slice(0, 5)
        .map((c) => ({
          id: c.id,
          reason: "Matched based on your subject and popularity.",
          key_benefits: ["Popular course", "Matches your subject", "Well-reviewed"],
          match_score: 75,
          course: c,
        }));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retake Quiz
          </button>
          <h1 className="font-display text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI <span className="text-gradient">Recommendations</span>
          </h1>
          <button
            onClick={() => navigate("/saved")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            <Bookmark className="w-4 h-4" />
            Saved
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground mb-10"
        >
          Based on your {answers.subjects.join(", ")} interest · {answers.purpose} · {answers.skillLevel}
        </motion.p>

        <div className="space-y-6">
          {fallbackCourses.map((rec, i) => {
            const course = rec.course!;
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded-2xl bg-card overflow-hidden hover:border-primary/30 transition-all cursor-pointer group"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-72 h-48 md:h-auto relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.course_title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {rec.match_score}% Match
                    </div>
                    <div className="absolute top-3 right-3 text-xs font-bold bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full">
                      #{i + 1}
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {course.subject}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                            {course.level}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {course.course_title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          <Sparkles className="w-3.5 h-3.5 inline mr-1 text-primary" />
                          {rec.reason}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle(course.id);
                        }}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Bookmark
                          className={`w-5 h-5 ${isBookmarked(course.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {rec.key_benefits.map((b, j) => (
                        <span key={j} className="text-xs bg-accent/50 text-accent-foreground px-2.5 py-1 rounded-full">
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {(course.num_subscribers / 1000).toFixed(1)}k students
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        {course.num_reviews.toLocaleString()} reviews
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.content_duration}h
                      </span>
                      <span className="font-bold text-foreground">
                        {course.price === 0 ? "Free" : `₹${course.price}`}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AIRecommendations;
