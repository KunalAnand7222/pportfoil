import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const { user, signIn, signUp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      emailSchema.parse(email);
    } catch {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    try {
      passwordSchema.parse(password);
    } catch {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    if (!isLogin && !fullName.trim()) {
      toast.error('Please enter your name');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else if (error.message.includes('Email not confirmed')) {
            toast.error('Please verify your email first');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back!');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('An account with this email already exists');
          } else {
            toast.error(error.message);
          }
        } else {
          setShowOtpInput(true);
          toast.success('Check your email for the verification code!');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit code');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await verifyOtp(email, otp);
      if (error) {
        toast.error(error.message || 'Invalid verification code');
      } else {
        toast.success('Email verified! Welcome!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: '0 0 20px hsl(152 76% 50% / 0.3)' },
  };

  return (
    <div className="min-h-screen flex">
      {/* Left visual section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(270 50% 15%) 50%, hsl(230 50% 20%) 100%)' 
        }}
      >
        {/* Floating shapes */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/20 blur-3xl"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -10, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-primary/30 to-teal-500/20 blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/10 blur-3xl"
          />
        </div>

        {/* Text overlay */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl font-display font-bold text-white mb-4"
            style={{ textShadow: '0 0 40px hsl(152 76% 50% / 0.5)' }}
          >
            {showOtpInput ? 'Verify Email' : (isLogin ? 'Welcome Back' : 'Join Us')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-white/70"
          >
            {showOtpInput 
              ? 'Enter the code sent to your email' 
              : (isLogin ? 'Sign in to continue your journey' : 'Create an account to get started')}
          </motion.p>
        </div>
      </motion.div>

      {/* Right form section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px]"
        >
          {/* Back button */}
          <motion.button
            onClick={() => showOtpInput ? setShowOtpInput(false) : navigate('/')}
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {showOtpInput ? 'Back to signup' : 'Back to home'}
          </motion.button>

          <div className="glass-panel p-8 rounded-2xl">
            <AnimatePresence mode="wait">
              {showOtpInput ? (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-display font-bold mb-2">
                    Verify Your Email
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    We sent a 6-digit code to <span className="text-foreground font-medium">{email}</span>
                  </p>

                  <div className="flex justify-center mb-6">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleVerifyOtp}
                      disabled={isSubmitting || otp.length !== 6}
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-emerald-400 hover:opacity-90 transition-all"
                      style={{ boxShadow: '0 0 30px hsl(152 76% 50% / 0.3)' }}
                    >
                      {isSubmitting ? 'Verifying...' : 'Verify Email'}
                    </Button>
                  </motion.div>

                  <p className="text-center mt-6 text-muted-foreground">
                    Didn't receive the code?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setShowOtpInput(false);
                        handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                      }}
                      className="text-primary hover:underline font-medium"
                    >
                      Resend
                    </button>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-display font-bold mb-2">
                    {isLogin ? 'Login' : 'Create Account'}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {isLogin ? 'Enter your credentials to continue' : 'Fill in your details to get started'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <motion.div whileFocus="focus" variants={inputVariants} className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Your name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="pl-10 h-12 bg-muted/50 border-border focus:border-primary transition-all"
                          />
                        </motion.div>
                      </motion.div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <motion.div whileFocus="focus" variants={inputVariants} className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 bg-muted/50 border-border focus:border-primary transition-all"
                        />
                      </motion.div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium">Password</label>
                        {isLogin && (
                          <button type="button" className="text-sm text-primary hover:underline">
                            Forgot Password?
                          </button>
                        )}
                      </div>
                      <motion.div whileFocus="focus" variants={inputVariants} className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 h-12 bg-muted/50 border-border focus:border-primary transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-emerald-400 hover:opacity-90 transition-all"
                        style={{ boxShadow: '0 0 30px hsl(152 76% 50% / 0.3)' }}
                      >
                        {isSubmitting ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
                      </Button>
                    </motion.div>
                  </form>

                  <p className="text-center mt-6 text-muted-foreground">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-primary hover:underline font-medium"
                    >
                      {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
