import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronRight, Sparkles } from "lucide-react";
import QuizStep from "@/components/QuizStep";
import Recommendations from "@/components/Recommendations";
import { categories, skillLevels, learningStyles, getRecommendations, type Course } from "@/data/courses";

const Index = () => {
  const [step, setStep] = useState(0); // 0 = landing, 1-3 = quiz, 4 = results
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [results, setResults] = useState<Course[]>([]);

  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const selectLevel = useCallback((level: string) => {
    setSelectedLevel([level]);
  }, []);

  const selectStyle = useCallback((style: string) => {
    setSelectedStyle([style]);
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const recs = getRecommendations(selectedCategories, selectedLevel[0] || "", selectedStyle[0] || "");
      setResults(recs);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedCategories([]);
    setSelectedLevel([]);
    setSelectedStyle([]);
    setResults([]);
  };

  const canProceed =
    (step === 1 && selectedCategories.length > 0) ||
    (step === 2 && selectedLevel.length > 0) ||
    (step === 3 && selectedStyle.length > 0);

  if (step === 4) {
    return <Recommendations courses={results} onReset={handleReset} />;
  }

  if (step === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-display text-xl font-semibold text-foreground">CourseMatch</span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mx-auto mb-8 shadow-elevated"
            >
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Find your perfect
              <br />
              <span className="text-gradient">learning path</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
              Answer three quick questions and we'll recommend courses tailored to your interests, level, and style.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-warm text-primary-foreground font-semibold rounded-xl shadow-elevated hover:shadow-lg transition-shadow text-lg"
            >
              Get Started
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            <p className="text-muted-foreground text-sm mt-6">Takes less than 30 seconds</p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-semibold text-foreground">CourseMatch</span>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s <= step ? "w-8 bg-gradient-warm" : "w-8 bg-secondary"
              }`}
            />
          ))}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <QuizStep
              key="categories"
              title="What interests you?"
              subtitle="Pick the topics you'd love to explore."
              options={categories}
              selected={selectedCategories}
              onSelect={toggleCategory}
              multiSelect
            />
          )}
          {step === 2 && (
            <QuizStep
              key="level"
              title="What's your level?"
              subtitle="We'll match courses to where you are."
              options={["beginner", "intermediate", "advanced"]}
              selected={selectedLevel}
              onSelect={selectLevel}
            />
          )}
          {step === 3 && (
            <QuizStep
              key="style"
              title="How do you learn best?"
              subtitle="We'll prioritize the right format for you."
              options={learningStyles}
              selected={selectedStyle}
              onSelect={selectStyle}
            />
          )}
        </AnimatePresence>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setStep(step - 1)}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Back
          </button>
          <motion.button
            whileHover={canProceed ? { scale: 1.03 } : {}}
            whileTap={canProceed ? { scale: 0.97 } : {}}
            onClick={handleNext}
            disabled={!canProceed}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              canProceed
                ? "bg-gradient-warm text-primary-foreground shadow-elevated"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            }`}
          >
            {step === 3 ? "See Recommendations" : "Continue"}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Index;
