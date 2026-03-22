import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import ParticlesBackground from "@/components/ParticlesBackground";
import ThemeToggle from "@/components/ThemeToggle";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a recovery session
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");
    if (type !== "recovery") {
      // Also check query params
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.get("type") !== "recovery") {
        // Let Supabase handle the token exchange via onAuthStateChange
      }
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      toast.success("Password updated successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticlesBackground />
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <motion.a href="/" className="text-xl font-bold font-display tracking-tight" whileHover={{ scale: 1.05 }}>
          <span className="text-primary">Course</span>
          <span className="text-foreground">Finder</span>
        </motion.a>
        <ThemeToggle />
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
            {success ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-bold font-display mb-2">Password Updated!</h1>
                <p className="text-muted-foreground text-sm">Redirecting you to the app...</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold font-display mb-2">Set New Password</h1>
                  <p className="text-muted-foreground text-sm">Enter your new password below</p>
                </div>

                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <Label htmlFor="new-password" className="text-sm text-muted-foreground">New Password</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="pl-10 h-12 bg-secondary/50 border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirm-password" className="text-sm text-muted-foreground">Confirm Password</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="pl-10 h-12 bg-secondary/50 border-border"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                      <>Update Password <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
