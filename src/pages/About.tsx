import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap, Cpu, Database, BarChart3, Code2, Layers, Users, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const techStack = [
  { name: "React 18", desc: "Component-driven UI with hooks", icon: Code2 },
  { name: "TypeScript", desc: "Type-safe development", icon: Layers },
  { name: "Tailwind CSS", desc: "Utility-first styling system", icon: Zap },
  { name: "Framer Motion", desc: "Physics-based animations", icon: Cpu },
  { name: "React Router", desc: "Client-side routing & navigation", icon: Database },
  { name: "Vite", desc: "Lightning-fast HMR & bundling", icon: BarChart3 },
];

const About = () => {
  const navigate = useNavigate();

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(hsl(0 85% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 55%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <header className="relative px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <button onClick={() => navigate("/")} className="mr-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center">
            <GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground tracking-tight">CourseRec</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="relative max-w-4xl mx-auto px-6 pb-20">
        {/* Hero */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="pt-8 pb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            About <span className="text-gradient">CourseRec</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            A personalized course recommendation engine built as a BCA 6th Semester Major Project at CGC University, Mohali.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mb-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            System Architecture
          </h2>
          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-card">
            <div className="space-y-6">
              {/* User Input Layer */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-display font-semibold">
                  <Users className="w-4 h-4" />
                  User Input Layer
                </div>
                <p className="text-xs text-muted-foreground mt-2">Subjects · Skill Level · Learning Style</p>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-8 bg-border relative">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-b border-r border-border bg-card" />
                </div>
              </div>

              {/* Processing Layer */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "Subject Filter", desc: "Matches courses by selected topics" },
                  { title: "Level Matching", desc: "Filters by skill proficiency" },
                  { title: "Style Alignment", desc: "Prioritizes preferred format" },
                ].map((item) => (
                  <div key={item.title} className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
                    <p className="font-display font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <div className="w-px h-8 bg-border relative">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-b border-r border-border bg-card" />
                </div>
              </div>

              {/* Scoring Engine */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-warm text-primary-foreground font-display font-semibold shadow-elevated">
                  <BarChart3 className="w-4 h-4" />
                  Popularity Scoring Engine
                </div>
                <p className="text-xs text-muted-foreground mt-2">0.6 × subscribers + 0.4 × reviews</p>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-8 bg-border relative">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-b border-r border-border bg-card" />
                </div>
              </div>

              {/* Output */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-display font-semibold">
                  <GraduationCap className="w-4 h-4" />
                  Ranked Recommendations
                </div>
                <p className="text-xs text-muted-foreground mt-2">Top courses sorted by composite score</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Algorithm */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Recommendation Algorithm
          </h2>
          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-card space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              The system uses a <span className="text-foreground font-medium">popularity-based scoring model</span> to rank courses after filtering by the user's preferences. Each course receives a composite score based on two engagement metrics:
            </p>

            <div className="rounded-lg bg-secondary/50 border border-border p-5 font-mono text-center">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Scoring Formula</p>
              <p className="text-xl md:text-2xl text-foreground font-semibold">
                <span className="text-primary">score</span> = 0.6 × <span className="text-primary/80">subscribers</span> + 0.4 × <span className="text-primary/80">reviews</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="font-display font-semibold text-foreground mb-1">Subscriber Weight — 60%</p>
                <p className="text-sm text-muted-foreground">Reflects overall course adoption and reach. A higher subscriber count indicates sustained popularity and trust within the learning community.</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="font-display font-semibold text-foreground mb-1">Review Weight — 40%</p>
                <p className="text-sm text-muted-foreground">Captures active engagement and satisfaction. Reviews indicate learners who completed enough content to form an opinion, signaling quality.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              After filtering courses by the user's selected subjects, skill level, and learning style, the remaining courses are scored and sorted in descending order to produce the final ranked list.
            </p>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mb-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            Technology Stack
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map(({ name, desc, icon: Icon }) => (
              <motion.div
                key={name}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <p className="font-display font-semibold text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Project Team
          </h2>
          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-card">
            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              {["Shweta", "Shivani", "Simarpreet Kaur"].map((name) => (
                <div key={name} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-display font-bold text-lg">{name[0]}</span>
                  </div>
                  <p className="font-display font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">BCA Student</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-5 text-center">
              <p className="text-sm text-muted-foreground">
                Supervised by <span className="text-foreground font-medium">Mr. Mohit Ruhil</span> · Professor
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                CGC University, Mohali · Dept. of Computer Applications · Batch 2023-26
              </p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default About;
