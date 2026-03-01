import { motion } from "framer-motion";
import { Clock, Users, Bookmark, BookOpen, DollarSign } from "lucide-react";
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
  "All Levels": "bg-primary/10 text-primary",
  "Beginner Level": "bg-green-100 text-green-800",
  "Intermediate Level": "bg-amber-100 text-amber-800",
  "Expert Level": "bg-red-100 text-red-800",
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
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300 border border-border cursor-pointer"
    >
      <div className="relative overflow-hidden h-44">
        <img
          src={course.image}
          alt={course.course_title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[course.level] || "bg-secondary text-secondary-foreground"}`}>
            {course.level}
          </span>
        </div>
        {onToggleBookmark && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(course.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
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
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">{course.subject}</p>
          <span className={`text-xs font-semibold ${course.is_paid ? "text-foreground" : "text-green-600"}`}>
            {course.is_paid ? `$${course.price}` : "Free"}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {course.course_title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {formatSubscribers(course.num_subscribers)}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.num_lectures} lectures
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.content_duration}h
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {course.num_reviews.toLocaleString()} reviews
          </span>
          <span className="text-xs font-medium text-primary">
            Score: {popScore.toFixed(0)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
