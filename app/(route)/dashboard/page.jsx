'use client'

import React, { useEffect, useState } from 'react'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from '@/app/utils/Context'
import { ArrowRight, LogOut, ChevronRight, Star, Menu, X, Home, MessageCircle, Settings } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import BlurFade from '@/components/ui/blur-fade'
import Link from 'next/link'
import { Navbar } from '@/components/ui/navbar'

export default function Dashboard() {
  const { signOut } = useClerk()
  const router = useRouter()
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { user } = useUser()
  
  const neoBrutalismBoxShadow = "8px 8px 0px 0px rgba(0,0,0,0.9)";
  const neoBrutalismBorder = "3px solid #000";

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/')
    } catch (error) {
      toast.error('Error signing out. Please try again.')
    }
  }

  // useEffect(() => {
  //   if (!user) {
  //     toast.error('Session expired. Please sign in again.')
  //     router.replace('/auth')
  //   }
  // }, [user, router])

  return (user && (
    <div 
      className={`min-h-screen px-4 relative z-40 sm:px-6 lg:px-10 ${isDarkMode ? 'bg-black text-white' : 'bg-[#f0f0f0]'}`}
    >
      <Navbar />
      <div className="container mx-auto py-8 pt-30">
        <div className="flex justify-between items-center mb-8">
          <BlurFade>
            <div
              className={`p-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'} rounded-lg transform rotate-1`}
              style={{ 
                boxShadow: isDarkMode ? '8px 8px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <h1 
                className="text-4xl font-bold tracking-tighter"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  textShadow: isDarkMode ? '0 0 8px #ff00ff' : 'none'
                }}
              >
                Dashboard
              </h1>
            </div>
          </BlurFade>
          
          <BlurFade>
            <div
              className={`p-4 ${isDarkMode ? 'bg-[#222]' : 'bg-[#ff3300]'} rounded-lg transform -rotate-1`}
              style={{ 
                boxShadow: isDarkMode ? '6px 6px 0px 0px #00ffaa' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <h1 
                className={`text-xl font-bold ${isDarkMode ? 'text-[#00ffaa]' : 'text-white'}`}
                style={{fontFamily: "var(--font-space-grotesk)"}}
              >
                Hey {user.firstName}!
              </h1>
            </div>
          </BlurFade>
          
          <BlurFade>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <button
                onClick={handleSignOut}
                className={`flex items-center px-6 py-3 rounded-lg font-bold cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#ff00ff] text-white hover:bg-[#ff33ff]' 
                    : 'bg-[#00ffaa] text-black hover:bg-[#33ffbb]'
                }`}
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  boxShadow: neoBrutalismBoxShadow,
                  border: neoBrutalismBorder
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </motion.div>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((item, index) => (
            <BlurFade key={item} delay={0.1 * (index + 1)}>
              <motion.div
                whileHover={{ y: -8, rotate: index % 2 === 0 ? 2 : -2 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`rounded-lg p-6 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1a1a1a]'
                    : 'bg-white'
                }`}
                style={{ 
                  boxShadow: isDarkMode 
                    ? index % 2 === 0 
                      ? '8px 8px 0px 0px #ff00ff' 
                      : '8px 8px 0px 0px #00ffaa' 
                    : neoBrutalismBoxShadow,
                  border: neoBrutalismBorder,
                  transform: index % 2 === 0 ? 'rotate(1deg)' : 'rotate(2deg)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className={`p-2 ${isDarkMode ? 'bg-black' : 'bg-[#f0f0f0]'} rounded-lg cursor-pointer`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    style={{ 
                      boxShadow: isDarkMode 
                        ? index % 2 === 0 
                          ? '4px 4px 0px 0px #ff00ff' 
                          : '4px 4px 0px 0px #00ffaa' 
                        : '4px 4px 0px 0px #000',
                      border: neoBrutalismBorder
                    }}
                  >
                    <Star className={`h-5 w-5 ${
                      isDarkMode 
                        ? index % 2 === 0 
                          ? 'text-[#ff00ff]' 
                          : 'text-[#00ffaa]' 
                        : index % 2 === 0 
                          ? 'text-[#ff00aa]' 
                          : 'text-[#00ccff]'
                    }`} />
                  </motion.div>
                  <h3 
                    className={`text-xl font-bold ${
                      isDarkMode 
                        ? index % 2 === 0 
                          ? 'text-[#ff00ff]' 
                          : 'text-[#00ffaa]' 
                        : index % 2 === 0 
                          ? 'text-[#ff00aa]' 
                          : 'text-[#00ccff]'
                    }`} 
                    style={{fontFamily: "var(--font-orbitron)"}}
                  >
                    Card Title {item}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="cursor-pointer"
                  >
                    <ChevronRight className={`h-5 w-5 ${
                      isDarkMode 
                        ? index % 2 === 0 
                          ? 'text-[#ff00ff]' 
                          : 'text-[#00ffaa]' 
                        : index % 2 === 0 
                          ? 'text-[#ff00aa]' 
                          : 'text-[#00ccff]'
                    }`} />
                  </motion.div>
                </div>
                <p 
                  className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`} 
                  style={{fontFamily: "var(--font-space-grotesk)"}}
                >
                  This is a sample card with some content. You can customize this based on your needs.
                </p>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  ))
}
