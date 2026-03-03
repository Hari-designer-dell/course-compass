import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Sparkles, GraduationCap, Users, Code2, Zap, BarChart3 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import ParticlesBackground from "@/components/ParticlesBackground";
import QuizStep from "@/components/QuizStep";
import Recommendations from "@/components/Recommendations";
import { subjects, skillLevels, learningStyles, getRecommendations, type Course } from "@/data/courses";

const Index = () => {
  const [step, setStep] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [results, setResults] = useState<Course[]>([]);

  const toggleSubject = useCallback((sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
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
      const recs = getRecommendations(selectedSubjects, selectedLevel[0] || "", selectedStyle[0] || "");
      setResults(recs);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedSubjects([]);
    setSelectedLevel([]);
    setSelectedStyle([]);
    setResults([]);
  };

  const canProceed =
    (step === 1 && selectedSubjects.length > 0) ||
    (step === 2 && selectedLevel.length > 0) ||
    (step === 3 && selectedStyle.length > 0);

  if (step === 4) {
    return <Recommendations courses={results} onReset={handleReset} />;
  }

  if (step === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
        {/* Animated particles + code snippets */}
        <ParticlesBackground />
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(0 85% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 55%) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        {/* Glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

        <header className="relative px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center">
              <GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground tracking-tight">CourseRec</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block font-mono">BCA 6th Sem · Major Project</span>
            <ThemeToggle />
          </div>
        </header>

        <main className="relative flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <Zap className="w-3.5 h-3.5" />
              Intelligent Clustering Engine
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Personalized Course
              <br />
              <span className="text-gradient">Recommendation</span>
              <br />
              System
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Select your interests and we'll match you with relevant courses using
              <span className="text-foreground font-medium"> popularity-based scoring</span> — no more manual browsing.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep(1)}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-warm text-primary-foreground font-bold rounded-xl shadow-elevated hover:shadow-glow transition-all text-lg animate-pulse-glow"
            >
              Get Started
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <div className="flex items-center justify-center gap-8 mt-12">
              {[
                { icon: Code2, label: "4 Subjects" },
                { icon: BarChart3, label: "Pop. Scoring" },
                { icon: Users, label: "Real Data" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Icon className="w-4 h-4 text-primary/70" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-20 border-t border-border pt-8"
            >
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-[0.2em] font-medium font-mono">
                CGC University, Mohali · Dept. of Computer Applications
              </p>
              <p className="text-xs text-muted-foreground">
                Supervised by <span className="text-foreground font-medium">Mr. Mohit Ruhil</span> · Professor
              </p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" /> Shweta · Shivani · Simarpreet Kaur
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-mono">Batch 2023-26</p>
            </motion.div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(hsl(0 85% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 55%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <header className="relative px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center">
            <GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground tracking-tight">CourseRec</span>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s <= step ? "w-10 bg-gradient-warm" : "w-10 bg-secondary"
              }`}
            />
          ))}
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <QuizStep
              key="subjects"
              title="Select your interests"
              subtitle="Choose the subjects you'd like to explore courses in."
              options={subjects}
              selected={selectedSubjects}
              onSelect={toggleSubject}
              multiSelect
            />
          )}
          {step === 2 && (
            <QuizStep
              key="level"
              title="What's your skill level?"
              subtitle="We'll match courses to your current proficiency."
              options={skillLevels}
              selected={selectedLevel}
              onSelect={selectLevel}
            />
          )}
          {step === 3 && (
            <QuizStep
              key="style"
              title="Preferred learning style?"
              subtitle="We'll prioritize the right format for you."
              options={learningStyles}
              selected={selectedStyle}
              onSelect={selectStyle}
            />
          )}
        </AnimatePresence>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/90 backdrop-blur-md border-t border-border">
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
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all ${
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
