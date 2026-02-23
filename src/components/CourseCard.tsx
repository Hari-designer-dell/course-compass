import { motion } from "framer-motion";
import { Clock, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  index: number;
}

const levelColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-primary/10 text-primary",
  advanced: "bg-accent/10 text-accent",
};

const CourseCard = ({ course, index }: CourseCardProps) => {
  const navigate = useNavigate();

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
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[course.level]}`}>
            {course.level}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">{course.category}</p>
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {(course.enrolled / 1000).toFixed(1)}k
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {course.tags.map((tag) => (
            <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
