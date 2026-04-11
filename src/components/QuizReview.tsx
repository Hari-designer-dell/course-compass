import { motion } from "framer-motion";
import { ChevronRight, Edit2, Check, Sparkles } from "lucide-react";

interface AnswerSummary {
  step: number;
  label: string;
  value: string;
}

interface QuizReviewProps {
  answers: AnswerSummary[];
  onEditStep: (step: number) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const QuizReview = ({ answers, onEditStep, onConfirm, isLoading }: QuizReviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
        Review Your Answers
      </h2>
      <p className="text-muted-foreground mb-8 text-lg">
        Confirm or edit any answer before getting your AI recommendations.
      </p>

      <div className="space-y-3">
        {answers.map((answer, index) => (
          <motion.div
            key={answer.step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center justify-between p-4 rounded-xl border-2 border-border bg-card hover:border-primary/40 transition-all duration-200 shadow-card"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center font-mono">
                {answer.step}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                  {answer.label}
                </p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {answer.value || <span className="text-muted-foreground italic">Not answered</span>}
                </p>
              </div>
            </div>
            <button
              onClick={() => onEditStep(answer.step)}
              className="flex-shrink-0 ml-3 p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all opacity-60 group-hover:opacity-100"
              aria-label={`Edit ${answer.label}`}
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col items-center gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onConfirm}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-warm text-primary-foreground font-bold rounded-xl shadow-elevated hover:shadow-glow transition-all text-lg disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5" />
          {isLoading ? "Getting Recommendations..." : "Confirm & Get AI Recommendations"}
        </motion.button>
        <p className="text-xs text-muted-foreground font-mono">
          Click any answer above to edit it
        </p>
      </motion.div>
    </motion.div>
  );
};

export default QuizReview;
