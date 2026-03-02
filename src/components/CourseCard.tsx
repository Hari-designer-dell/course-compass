import { motion } from "framer-motion";
import { Clock, Users, Bookmark, BookOpen, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Course } from "@/data/courses";
import { getPopScore } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  index: number;
  isBookmarked?: boolean;
  onToggleBookmark?: (courseId: string) => void;
}

const levelColors: Record<string, string> = {
  "All Levels": "bg-primary/15 text-primary border border-primary/20",
  "Beginner Level": "bg-green-500/15 text-green-400 border border-green-500/20",
  "Intermediate Level": "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  "Expert Level": "bg-primary/15 text-primary border border-primary/20",
};

const CourseCard = ({ course, index, isBookmarked = false, onToggleBookmark }: CourseCardProps) => {
  const navigate = useNavigate();
  const popScore = getPopScore(course);

  const formatSubscribers = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={() => navigate(`/course/${course.id}`)}
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer"
    >
      <div className="relative overflow-hidden h-44">
        <img
          src={course.image}
          alt={course.course_title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${levelColors[course.level] || "bg-secondary text-secondary-foreground"}`}>
            {course.level}
          </span>
        </div>
        {onToggleBookmark && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(course.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Save course"}
          >
            <Bookmark
              className={`w-4 h-4 transition-colors ${
                isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] font-mono">{course.subject}</p>
          <span className={`text-xs font-bold ${course.is_paid ? "text-foreground" : "text-green-400"}`}>
            {course.is_paid ? `$${course.price}` : "Free"}
          </span>
        </div>
        <h3 className="font-display text-base font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {course.course_title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {formatSubscribers(course.num_subscribers)}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.num_lectures}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.content_duration}h
          </span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-[10px] text-muted-foreground font-mono">
            {course.num_reviews.toLocaleString()} reviews
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-primary">
            <TrendingUp className="w-3 h-3" />
            {popScore.toFixed(0)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
