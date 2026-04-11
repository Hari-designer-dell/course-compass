import { useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Sparkles, GraduationCap, Users, Code2, Zap, BarChart3, Target, Brain } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import ParticlesBackground from "@/components/ParticlesBackground";
import QuizStep from "@/components/QuizStep";
import AIRecommendations from "@/components/AIRecommendations";
import QuizReview from "@/components/QuizReview";
import {
  subjects, purposes, skillLevels, learningStyles,
  timeAvailability, budgetOptions, careerObjectives,
  durationPreferences, languagePreferences, certificationRequirements,
  projectPreferences, subInterests, type QuizAnswers,
} from "@/data/quizOptions";
import { courses } from "@/data/courses";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AIRecommendation {
  id: string;
  reason: string;
  key_benefits: string[];
  match_score: number;
}

const TOTAL_STEPS = 8;
const REVIEW_STEP = 9;
const Index = () => {
  const [step, setStep] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedSubInterest, setSelectedSubInterest] = useState<string[]>([]);
  const [selectedCert, setSelectedCert] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string[]>([]);
  const [selectedLang, setSelectedLang] = useState<string[]>([]);

  const [editingFromReview, setEditingFromReview] = useState(false);

  const [aiResults, setAiResults] = useState<AIRecommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const subInterestOptions = useMemo(() => {
    if (selectedSubjects.length === 0) return [];
    const opts = new Set<string>();
    selectedSubjects.forEach((s) => {
      (subInterests[s] || []).forEach((si) => opts.add(si));
    });
    return Array.from(opts);
  }, [selectedSubjects]);

  const toggleMulti = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => (val: string) => {
      setter((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
    },
    []
  );

  const selectSingle = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => (val: string) => {
      setter([val]);
    },
    []
  );

  const handleNext = async () => {
    if (editingFromReview) {
      setEditingFromReview(false);
      setStep(REVIEW_STEP);
      return;
    }
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else if (step === TOTAL_STEPS) {
      setStep(REVIEW_STEP);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setStep(TOTAL_STEPS + 2);
    const answers: QuizAnswers = {
      subjects: selectedSubjects,
      purpose: selectedPurpose[0] || "",
      skillLevel: selectedLevel[0] || "",
      learningStyle: selectedStyle[0] || "",
      timeAvailability: selectedTime[0] || "",
      budget: selectedBudget[0] || "",
      subInterest: selectedSubInterest.join(", "),
      careerObjective: selectedCareer[0] || "",
      durationPreference: selectedDuration[0] || "",
      languagePreference: selectedLang[0] || "",
      certificationRequirement: selectedCert[0] || "",
      projectPreference: selectedProject[0] || "",
    };
    try {
      const { data, error } = await supabase.functions.invoke("recommend-courses", {
        body: { answers, courses },
      });
      if (error) throw error;
      setAiResults(data.recommendations || data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to get AI recommendations. Showing popularity-based results.");
      setAiResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditFromReview = (targetStep: number) => {
    setEditingFromReview(true);
    setStep(targetStep);
  };

  const reviewAnswers = [
    { step: 1, label: "Subjects", value: selectedSubjects.join(", ") },
    { step: 2, label: "Purpose", value: selectedPurpose[0] || "" },
    { step: 3, label: "Sub-interests", value: selectedSubInterest.join(", ") },
    { step: 4, label: "Skill Level", value: selectedLevel[0] || "" },
    { step: 5, label: "Learning Style", value: selectedStyle[0] || "" },
    { step: 6, label: "Time & Budget", value: `${selectedTime[0] || ""} · ${selectedBudget[0] || ""}` },
    { step: 7, label: "Career & Duration", value: `${selectedCareer[0] || ""} · ${selectedDuration[0] || ""}` },
    { step: 8, label: "Cert / Project / Language", value: `${selectedCert[0] || ""} · ${selectedProject[0] || ""} · ${selectedLang[0] || ""}` },
  ];

  const handleReset = () => {
    setStep(0);
    setSelectedSubjects([]);
    setSelectedPurpose([]);
    setSelectedLevel([]);
    setSelectedStyle([]);
    setSelectedTime([]);
    setSelectedBudget([]);
    setSelectedCareer([]);
    setSelectedDuration([]);
    setSelectedSubInterest([]);
    setSelectedCert([]);
    setSelectedProject([]);
    setSelectedLang([]);
    setAiResults(null);
  };

  const canProceed =
    (step === 1 && selectedSubjects.length > 0) ||
    (step === 2 && selectedPurpose.length > 0) ||
    (step === 3 && selectedSubInterest.length > 0) ||
    (step === 4 && selectedLevel.length > 0) ||
    (step === 5 && selectedStyle.length > 0) ||
    (step === 6 && selectedTime.length > 0 && selectedBudget.length > 0) ||
    (step === 7 && selectedCareer.length > 0 && selectedDuration.length > 0) ||
    (step === 8 && selectedCert.length > 0 && selectedProject.length > 0 && selectedLang.length > 0);

  // Results screen
  if (step === TOTAL_STEPS + 1) {
    return (
      <AIRecommendations
        aiResults={aiResults}
        isLoading={isLoading}
        courses={courses}
        onReset={handleReset}
        answers={{
          subjects: selectedSubjects,
          purpose: selectedPurpose[0] || "",
          skillLevel: selectedLevel[0] || "",
        }}
      />
    );
  }

  // Landing
  if (step === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
        <ParticlesBackground />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(0 85% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 55%) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
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
              <Brain className="w-3.5 h-3.5" />
              AI-Powered Recommendation Engine
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Personalized Course
              <br />
              <span className="text-gradient">Recommendation</span>
              <br />
              System
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Answer 8 quick questions and our <span className="text-foreground font-medium">AI engine</span> will analyze 12 factors to find your perfect courses.
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

            <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
              {[
                { icon: Brain, label: "AI Analysis" },
                { icon: Target, label: "12 Factors" },
                { icon: BarChart3, label: "Match Scoring" },
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

  // Quiz steps
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
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
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s <= step ? "w-6 bg-gradient-warm" : "w-6 bg-secondary"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-mono">{step}/{TOTAL_STEPS}</span>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <QuizStep key="subjects" title="What subjects interest you?" subtitle="Choose one or more domains to explore." options={[...subjects]} selected={selectedSubjects} onSelect={toggleMulti(setSelectedSubjects)} multiSelect />
          )}
          {step === 2 && (
            <QuizStep key="purpose" title="What's your purpose?" subtitle="Tell us why you want to study." options={[...purposes]} selected={selectedPurpose} onSelect={selectSingle(setSelectedPurpose)} />
          )}
          {step === 3 && (
            <QuizStep key="subinterest" title="Any specific sub-interest?" subtitle="Narrow down your focus area." options={subInterestOptions} selected={selectedSubInterest} onSelect={toggleMulti(setSelectedSubInterest)} multiSelect />
          )}
          {step === 4 && (
            <QuizStep key="level" title="What's your skill level?" subtitle="We'll match courses to your proficiency." options={[...skillLevels]} selected={selectedLevel} onSelect={selectSingle(setSelectedLevel)} />
          )}
          {step === 5 && (
            <QuizStep key="style" title="Preferred learning style?" subtitle="We'll prioritize the right format." options={[...learningStyles]} selected={selectedStyle} onSelect={selectSingle(setSelectedStyle)} />
          )}
          {step === 6 && (
            <div className="w-full max-w-2xl space-y-8">
              <QuizStep key="time" title="How much time can you dedicate?" subtitle="Per week availability." options={[...timeAvailability]} selected={selectedTime} onSelect={selectSingle(setSelectedTime)} />
              <QuizStep key="budget" title="What's your budget?" subtitle="We'll filter courses accordingly." options={[...budgetOptions]} selected={selectedBudget} onSelect={selectSingle(setSelectedBudget)} />
            </div>
          )}
          {step === 7 && (
            <div className="w-full max-w-2xl space-y-8">
              <QuizStep key="career" title="Career objective?" subtitle="What do you want to achieve?" options={[...careerObjectives]} selected={selectedCareer} onSelect={selectSingle(setSelectedCareer)} />
              <QuizStep key="duration" title="Preferred course duration?" subtitle="How long should the course be?" options={[...durationPreferences]} selected={selectedDuration} onSelect={selectSingle(setSelectedDuration)} />
            </div>
          )}
          {step === 8 && (
            <div className="w-full max-w-2xl space-y-8">
              <QuizStep key="cert" title="Do you need a certificate?" subtitle="Some courses offer completion certificates." options={[...certificationRequirements]} selected={selectedCert} onSelect={selectSingle(setSelectedCert)} />
              <QuizStep key="project" title="Learning approach preference?" subtitle="How do you like to learn best?" options={[...projectPreferences]} selected={selectedProject} onSelect={selectSingle(setSelectedProject)} />
              <QuizStep key="lang" title="Language preference?" subtitle="Choose your preferred course language." options={[...languagePreferences]} selected={selectedLang} onSelect={selectSingle(setSelectedLang)} />
            </div>
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
            {step === TOTAL_STEPS ? (
              <>
                <Sparkles className="w-4 h-4" />
                Get AI Recommendations
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Index;
