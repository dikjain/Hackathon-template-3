"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SignUpComponent from "@/app/(auth)/sign-up/[[...sign-up]]/page";
import SignInComponent from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import { motion } from "framer-motion";
import { BlurFadeText } from "@/components/ui/export";
import { ArrowRight, Star, Zap, Shield } from "lucide-react";
import { useTheme } from "@/app/utils/Context";

const STAGGER_DELAY = 0.1;
const neoBrutalismBoxShadow = "8px 8px 0px 0px rgba(0,0,0,0.9)";
const neoBrutalismBorder = "3px solid #000";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const { user } = useUser();
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]); 

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-[#f0f0f0]'} ${isDarkMode ? 'text-white' : 'text-black'} relative z-40 px-4 sm:px-6 lg:px-10`}
    >
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-3 z-50 origin-left ${isDarkMode ? 'bg-[#ff00ff]' : 'bg-[#ff00aa]'}`}
        style={{ scaleX: 1 }}
      />

      <main className="container mx-auto py-12 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-12 relative">
          {/* Divider between sections */}
          <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-[3px] z-10">
            <div className={`h-full w-[3px] ${
              isDarkMode 
                ? 'bg-[#ff00ff]' 
                : 'bg-[#00ffaa]'
            }`}></div>
          </div>

          {/* Left side - Project Info (60% on large screens) */}
          <motion.div 
            className="lg:w-[60%] mb-12 lg:mb-0 pr-0 lg:pr-12 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`p-6 ${isDarkMode ? 'bg-[#111]' : 'bg-white'} rounded-lg transform rotate-1`}
              style={{ 
                boxShadow: isDarkMode ? '8px 8px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <BlurFadeText
                delay={STAGGER_DELAY}
                className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
                text="ProjectX"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  textShadow: isDarkMode ? '0 0 8px #ff00ff' : 'none'
                }}
              />
            </div>
            
            <div
              className={`p-4 mt-6 ${isDarkMode ? 'bg-[#222]' : 'bg-[#ff3300]'} rounded-lg transform -rotate-1 max-w-[800px]`}
              style={{ 
                boxShadow: isDarkMode ? '6px 6px 0px 0px #00ffaa' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <BlurFadeText
                delay={STAGGER_DELAY * 2}
                className={`text-lg sm:text-xl ${isDarkMode ? 'text-[#00ffaa]' : 'text-white'} font-bold`}
                text="A revolutionary approach to modern development. Built with cutting-edge technology."
                style={{fontFamily: "var(--font-space-grotesk)"}}
              />
            </div>
            
            <motion.div 
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {[
                {
                  title: "Powerful Tools",
                  description: "Access our suite of advanced development tools designed for maximum productivity.",
                  icon: <Zap className={`h-8 w-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                },
                {
                  title: "Secure Platform",
                  description: "Your data is protected with enterprise-grade security and encryption.",
                  icon: <Shield className={`h-8 w-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                },
                {
                  title: "Premium Experience",
                  description: "Enjoy a seamless, intuitive interface built for developers by developers.",
                  icon: <Star className={`h-8 w-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                },
                {
                  title: "Continuous Updates",
                  description: "We're constantly improving with regular feature updates and enhancements.",
                  icon: <ArrowRight className={`h-8 w-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className={`
                    rounded-lg p-6 
                    ${isDarkMode 
                      ? index % 2 === 0 ? 'bg-[#111]' : 'bg-[#222]'
                      : index % 2 === 0 ? 'bg-white' : 'bg-[#f8f8f8]'
                    }
                  `}
                  style={{ 
                    boxShadow: isDarkMode 
                      ? index % 2 === 0 
                        ? '8px 8px 0px 0px #ff00ff' 
                        : '8px 8px 0px 0px #00ffaa' 
                      : neoBrutalismBoxShadow,
                    border: neoBrutalismBorder
                  }}
                  whileHover={{ y: -8, rotate: index % 2 === 0 ? 2 : -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`
                      p-3 rounded-lg mr-4
                      ${isDarkMode 
                        ? index % 2 === 0 ? 'bg-[#ff00ff]' : 'bg-[#00ffaa]'
                        : index % 2 === 0 ? 'bg-[#ff00aa]' : 'bg-[#00ccff]'
                      }
                    `}
                    style={{ border: neoBrutalismBorder }}
                    >
                      {feature.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${isDarkMode 
                      ? index % 2 === 0 ? 'text-[#ff00ff]' : 'text-[#00ffaa]'
                      : index % 2 === 0 ? 'text-[#ff00aa]' : 'text-[#00ccff]'
                    }`} style={{fontFamily: "var(--font-orbitron)"}}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className={isDarkMode ? 'text-white' : 'text-black'} style={{fontFamily: "var(--font-space-grotesk)"}}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right side - Auth Component (40% on large screens) */}
          <motion.div
            className="lg:w-[40%] lg:self-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`
              rounded-lg p-8 relative
              ${isDarkMode 
                ? 'bg-[#111]' 
                : 'bg-white'
              }
            `}
            style={{ 
              boxShadow: isDarkMode ? '8px 8px 0px 0px #00ffaa' : neoBrutalismBoxShadow,
              border: neoBrutalismBorder
            }}
            >
              <div className={`
                flex rounded-lg p-1 mb-8 relative z-10
                ${isDarkMode 
                  ? 'bg-black' 
                  : 'bg-[#f0f0f0]'
                }
              `}
              style={{ 
                border: neoBrutalismBorder
              }}
              >
                <motion.button
                  onClick={() => setActiveTab("signin")}
                  className={`
                    flex-1 py-3 rounded-lg text-center transition-all
                    ${activeTab === "signin"
                      ? isDarkMode
                        ? 'bg-[#ff00ff] text-black'
                        : 'bg-[#ff00aa] text-white'
                      : isDarkMode
                        ? 'text-white hover:bg-[#333]'
                        : 'text-black hover:bg-[#eee]'
                    }
                  `}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{fontFamily: "var(--font-orbitron)"}}
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab("signup")}
                  className={`
                    flex-1 py-3 rounded-lg text-center transition-all
                    ${activeTab === "signup"
                      ? isDarkMode
                        ? 'bg-[#00ffaa] text-black'
                        : 'bg-[#00ccff] text-white'
                      : isDarkMode
                        ? 'text-white hover:bg-[#333]'
                        : 'text-black hover:bg-[#eee]'
                    }
                  `}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{fontFamily: "var(--font-orbitron)"}}
                >
                  Sign Up
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`
                  p-4 rounded-lg relative z-10 min-h-[400px] overflow-y-auto
                  ${isDarkMode 
                    ? 'bg-black' 
                    : 'bg-[#f0f0f0]'
                  }
                `}
                style={{ 
                  border: neoBrutalismBorder
                }}
              >
                {activeTab === "signin" ? <SignInComponent /> : <SignUpComponent />}
              </motion.div>

              <motion.p 
                className={`mt-8 text-center ${isDarkMode ? 'text-white' : 'text-black'} relative z-10`}
                whileHover={{ scale: 1.02 }}
              >
                {activeTab === "signin" ? "Don't have an account? " : "Already have an account? "}
                <motion.button
                  onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
                  className={`${isDarkMode ? 'text-[#00ffaa] hover:text-[#33ffbb]' : 'text-[#ff00aa] hover:text-[#ff33bb]'} font-medium transition-colors duration-200`}
                  whileHover={{ scale: 1.05 }}
                  style={{fontFamily: "var(--font-orbitron)"}}
                >
                  {activeTab === "signin" ? "Sign up" : "Sign in"}
                </motion.button>
              </motion.p>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
