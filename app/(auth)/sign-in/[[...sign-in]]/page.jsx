"use client";

import { useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/utils/Context";
import { toast } from "sonner";

const neoBrutalismBoxShadow = "8px 8px 0px 0px rgba(0,0,0,0.9)";
const neoBrutalismBorder = "3px solid #000";

// Components
const GoogleButton = ({ onClick, isLoading, isDarkMode }) => (
  <motion.button 
    onClick={onClick}
    disabled={isLoading}
    className={`w-full ${isDarkMode 
      ? 'bg-[#222] text-white' 
      : 'bg-white text-black'} 
      rounded-lg p-4 flex items-center justify-center space-x-3 transition-all duration-300`}
    whileHover={{ scale: 1.02, rotate: 1 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    style={{ 
      boxShadow: isDarkMode ? '8px 8px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
      border: neoBrutalismBorder
    }}
  >
    <img src="/google.png" alt="Google" className="w-8 h-6" />
    <span style={{fontFamily: "var(--font-space-grotesk)", fontWeight: 500}}>Continue with Google</span>
  </motion.button>
);

const InputField = ({ type, id, value, onChange, label, isLoading, showPasswordToggle, onTogglePassword, showPassword, isDarkMode }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-2`} style={{fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.02em"}}>{label}</label>
    <div className="relative">
      <motion.input
        type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full ${isDarkMode 
          ? 'bg-[#333] text-white' 
          : 'bg-[#f0f0f0] text-black'} 
          rounded-lg p-4 focus:outline-none transition-all duration-300`}
        required
        disabled={isLoading}
        whileHover={{ scale: 1.01 }}
        style={{
          fontFamily: "var(--font-space-grotesk)",
          boxShadow: isDarkMode ? '4px 4px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
          border: neoBrutalismBorder
        }}
      />
      {showPasswordToggle && (
        <motion.button
          type="button"
          onClick={onTogglePassword}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/70 hover:text-white/90' : 'text-gray-500 hover:text-gray-700'}`}
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
    className={`w-full ${isDarkMode ? 'bg-[#ff00ff] text-white hover:bg-[#ff33ff]' : 'bg-[#00ffaa] text-black hover:bg-[#33ffbb]'} rounded-lg p-4 font-medium transition-all duration-300`}
    whileHover={{ scale: 1.05, rotate: 1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    style={{
      fontFamily: "var(--font-space-grotesk)",
      boxShadow: neoBrutalismBoxShadow,
      border: neoBrutalismBorder
    }}
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span style={{fontFamily: "var(--font-space-grotesk)", fontWeight: 500}}>Processing...</span>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <span style={{fontFamily: "var(--font-space-grotesk)", fontWeight: 500}}>{text}</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.div>
      </div>
    )}
  </motion.button>
);

export default function SignInComponent() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Successfully signed in!");
        router.push("/dashboard");
      } else {
        toast.error("Sign in failed. Please try again.");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      const errorMessage = err?.errors?.[0]?.message || "An error occurred during sign in";
      setError(errorMessage);
      
      if (errorMessage.includes("already exists")) {
        toast.error("This email is already registered. Please sign in instead.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
      toast.success("Redirecting to Google sign in...");
    } catch (err) {
      console.error("Google sign-in error:", err);
      const errorMessage = err?.errors?.[0]?.message || "Failed to sign in with Google";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className={`space-y-8 p-8 rounded-lg ${isDarkMode 
        ? 'bg-[#111]' 
        : 'bg-white'} transform rotate-1`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        boxShadow: isDarkMode ? '12px 12px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
        border: neoBrutalismBorder
      }}
    >
      <motion.div 
        className="space-y-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} isDarkMode={isDarkMode} />
      </motion.div>

      <motion.div 
        className={`w-full h-3 ${isDarkMode ? 'bg-[#ff00ff]' : 'bg-[#00ffaa]'} rounded-lg transform -rotate-1`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ border: neoBrutalismBorder }}
      />

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <InputField
          type="email"
          id="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
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
            className={`${isDarkMode 
              ? 'bg-[#330000] text-red-400' 
              : 'bg-[#ffdddd] text-red-600'} 
              px-4 py-3 rounded-lg transform rotate-1`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              boxShadow: isDarkMode ? '5px 5px 0px 0px #ff0000' : neoBrutalismBoxShadow,
              border: neoBrutalismBorder
            }}
          >
            <p style={{fontFamily: "var(--font-space-grotesk)"}}>{error}</p>
          </motion.div>
        )}

        <SubmitButton isLoading={isLoading} text="Sign In" isDarkMode={isDarkMode} />
      </motion.form>
    </motion.div>
  );
}