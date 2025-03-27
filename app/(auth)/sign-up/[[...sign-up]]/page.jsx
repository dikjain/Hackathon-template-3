"use client";

import { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/utils/Context";
import { toast } from "sonner";

// Neobrutalism styling constants
const neoBrutalismBoxShadow = "8px 8px 0px 0px rgba(0,0,0,0.9)";
const neoBrutalismBorder = "3px solid #000";

// Components
const GoogleButton = ({ onClick, isLoading, isDarkMode }) => (
  <motion.button 
    onClick={onClick}
    disabled={isLoading}
    className={`w-full ${
      isDarkMode 
        ? 'bg-[#222]' 
        : 'bg-white'
    } rounded-lg p-4 flex items-center justify-center space-x-3 transition-all duration-300`}
    style={{ 
      boxShadow: isDarkMode ? '8px 8px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
      border: neoBrutalismBorder
    }}
    whileHover={{ scale: 1.02, rotate: 1 }}
    whileTap={{ scale: 0.98, rotate: -1 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <img src="/google.png" alt="Google" className="w-8 h-6" />
    <span style={{fontFamily: "var(--font-space-grotesk)"}} className="font-bold">Continue with Google</span>
  </motion.button>
);

const InputField = ({ type, id, value, onChange, label, isLoading, showPasswordToggle, onTogglePassword, showPassword, isDarkMode }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-2`} style={{fontFamily: "var(--font-space-grotesk)"}}>{label}</label>
    <div className="relative">
      <motion.input
        type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full ${
          isDarkMode 
            ? 'bg-[#333] text-white' 
            : 'bg-[#f0f0f0] text-black'
        } rounded-lg p-4 focus:outline-none transition-all duration-300`}
        style={{ 
          boxShadow: isDarkMode ? '4px 4px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
          border: neoBrutalismBorder,
          fontFamily: "var(--font-space-grotesk)"
        }}
        required
        disabled={isLoading}
        whileFocus={{ scale: 1.01 }}
      />
      {showPasswordToggle && (
        <motion.button
          type="button"
          onClick={onTogglePassword}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-black'}`}
          disabled={isLoading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </motion.button>
      )}
    </div>
  </div>
);

const SubmitButton = ({ isLoading, text, isDarkMode }) => (
  <motion.button
    type="submit"
    disabled={isLoading}
    className={`w-full ${
      isDarkMode 
        ? 'bg-[#ff00ff] text-white hover:bg-[#ff33ff]' 
        : 'bg-[#00ffaa] text-black hover:bg-[#33ffbb]'
    } rounded-lg p-4 font-bold transition-all duration-300`}
    style={{ 
      boxShadow: neoBrutalismBoxShadow,
      border: neoBrutalismBorder,
      fontFamily: "var(--font-space-grotesk)"
    }}
    whileHover={{ scale: 1.03, rotate: 1 }}
    whileTap={{ scale: 0.97, rotate: -1 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span style={{fontFamily: "var(--font-space-grotesk)"}} className="font-bold">Processing...</span>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <span style={{fontFamily: "var(--font-space-grotesk)"}} className="font-bold">{text}</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.div>
      </div>
    )}
  </motion.button>
);

export default function SignUpComponent() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");


  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.update({
        unsafeMetadata: { name }
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      toast.success("Verification email sent successfully!");
    } catch (err) {
      console.error("Sign-up error:", err);
      const errorMessage = err?.errors?.[0]?.message || "An unexpected error occurred.";
      
      if (errorMessage.includes("already exists")) {
        toast.error("This email is already registered. Please sign in instead.");
        setTimeout(() => {
          router.push("/auth");
        }, 2000);
      } else {
        toast.error(errorMessage);
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Email verified successfully! Redirecting...");
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      const errorMessage = err?.errors?.[0]?.message || "Verification failed";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error("Google sign-up error:", err);
      const errorMessage = err?.errors?.[0]?.message || "Failed to sign up with Google";
      toast.error(errorMessage);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className={`space-y-8 ${isDarkMode ? 'bg-black' : 'bg-[#f0f0f0]'} p-6 rounded-lg transform ${isDarkMode ? 'rotate-1' : 'rotate-1'}`}
      style={{ 
        boxShadow: isDarkMode ? '8px 8px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
        border: neoBrutalismBorder
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!pendingVerification ? (
        <>
          <motion.div 
            className="space-y-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <GoogleButton onClick={handleGoogleSignUp} isLoading={isLoading} isDarkMode={isDarkMode} />
          </motion.div>

          <motion.div 
            className={`flex items-center my-6 ${isDarkMode ? 'text-white' : 'text-black'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <div className={`flex-grow h-px ${isDarkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
            <span className="px-3 text-sm font-bold" style={{fontFamily: "var(--font-space-grotesk)"}}>or continue with email</span>
            <div className={`flex-grow h-px ${isDarkMode ? 'bg-white/30' : 'bg-black/30'}`}></div>
          </motion.div>

          <motion.form 
            onSubmit={handleSignUp} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <InputField
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Full Name"
              isLoading={isLoading}
              isDarkMode={isDarkMode}
            />
            
            <InputField
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              isLoading={isLoading}
              isDarkMode={isDarkMode}
            />

            <InputField
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              isLoading={isLoading}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              isDarkMode={isDarkMode}
            />

            {error && (
              <motion.div 
                className={`${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-lg p-4 transform -rotate-1`}
                style={{ 
                  boxShadow: isDarkMode ? '4px 4px 0px 0px #ff0000' : '4px 4px 0px 0px rgba(220,38,38,0.9)',
                  border: '3px solid #ff0000'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{fontFamily: "var(--font-space-grotesk)"}} className={`font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
              </motion.div>
            )}

            <SubmitButton isLoading={isLoading} text="Create Account" isDarkMode={isDarkMode} />
          </motion.form>
        </>
      ) : (
        <motion.form 
          onSubmit={handleVerification} 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`${isDarkMode ? 'bg-[#222]' : 'bg-white'} rounded-lg p-5 transform rotate-1`}
            style={{ 
              boxShadow: isDarkMode ? '6px 6px 0px 0px #00ffaa' : '6px 6px 0px 0px rgba(0,0,0,0.9)',
              border: neoBrutalismBorder
            }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start space-x-3">
              <CheckCircle className={`h-6 w-6 mt-0.5 ${isDarkMode ? 'text-[#00ffaa]' : 'text-[#00ccff]'}`} />
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                  Verification email sent
                </h3>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-black'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                  We've sent a verification code to your email. Please enter it below to complete your registration.
                </p>
              </div>
            </div>
          </motion.div>
          
          <InputField
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            label="Verification Code"
            isLoading={isLoading}
            isDarkMode={isDarkMode}
          />

          {error && (
            <motion.div 
              className={`${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-lg p-4 transform -rotate-1`}
              style={{ 
                boxShadow: isDarkMode ? '4px 4px 0px 0px #ff0000' : '4px 4px 0px 0px rgba(220,38,38,0.9)',
                border: '3px solid #ff0000'
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{fontFamily: "var(--font-space-grotesk)"}} className={`font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
            </motion.div>
          )}

          <SubmitButton isLoading={isLoading} text="Verify Email" isDarkMode={isDarkMode} />
        </motion.form>
      )}
    </motion.div>
  );
}