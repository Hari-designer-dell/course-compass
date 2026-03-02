import { motion } from "framer-motion";

interface QuizStepProps {
  title: string;
  subtitle: string;
  options: readonly string[] | string[];
  selected: string[];
  onSelect: (value: string) => void;
  multiSelect?: boolean;
}

const QuizStep = ({ title, subtitle, options, selected, onSelect, multiSelect = false }: QuizStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">{title}</h2>
      <p className="text-muted-foreground mb-8 text-lg">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <motion.button
              key={option}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option)}
              className={`p-4 rounded-xl border-2 text-left font-body text-sm font-semibold transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/10 text-foreground shadow-glow"
                  : "border-border bg-card text-foreground hover:border-primary/40 shadow-card"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                  }`}
                >
                  {isSelected && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      className="text-primary-foreground"
                    >
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </motion.svg>
                  )}
                </span>
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>
      {multiSelect && (
        <p className="text-muted-foreground text-sm mt-4 font-mono">Select as many as you like</p>
      )}
    </motion.div>
  );
};

export default QuizStep;
