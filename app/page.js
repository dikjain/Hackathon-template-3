"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRight, Star, Users, Zap, ChevronDown, Linkedin, Github } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from './utils/Context';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Navbar, BlurFade, Footer, BlurFadeText } from '@/components/ui/export';
import { teamMembers } from "./data/teamMembers";
import Link from 'next/link';

const STAGGER_DELAY = 0.1;


const neoBrutalismBoxShadow = "8px 8px 0px 0px rgba(0,0,0,0.9)";
const neoBrutalismBorder = "3px solid #000";

export default function Home() {
  const { user } = useUser();
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const CheckIsNewUser = async() => {
    await axios.post('/users', { user });
  }

  useEffect(() => {
    user && CheckIsNewUser()
  }, [user])

  return (
    <div 
      className={`min-h-screen px-4 relative z-40 sm:px-6 lg:px-10 ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#f0f0f0]'}`}
    >
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-3 z-50 origin-left ${theme === 'dark' ? 'bg-[#ff00ff]' : 'bg-[#ff00aa]'}`}
        style={{ scaleX }}
      />
      
      <Navbar />

      <main className="container mx-auto">
        <section 
          className="py-12 md:py-24 lg:py-32 flex items-center justify-center"
        >
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-8 text-center px-4">
            <div
              className={`p-6 ${theme === 'dark' ? 'bg-[#111]' : 'bg-white'} rounded-lg transform rotate-1`}
              style={{ 
                boxShadow: theme === 'dark' ? '8px 8px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <BlurFadeText
                delay={STAGGER_DELAY}
                className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
                text="ProjectX: Solving Real Problems"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  textShadow: theme === 'dark' ? '0 0 8px #ff00ff' : 'none'
                }}
              />
            </div>
            
            <div
              className={`p-4 ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#ff3300]'} rounded-lg transform -rotate-1 max-w-[800px]`}
              style={{ 
                boxShadow: theme === 'dark' ? '6px 6px 0px 0px #00ffaa' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <BlurFadeText
                delay={STAGGER_DELAY * 2}
                className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-[#00ffaa]' : 'text-white'} font-bold`}
                text="A revolutionary approach to modern development. Built with cutting-edge technology."
                style={{fontFamily: "var(--font-space-grotesk)"}}
              />
            </div>
            
            <BlurFade delay={STAGGER_DELAY * 3}>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/dashboard">
                    <Button 
                      className={`cursor-pointer text-lg px-8 py-6 font-bold rounded-lg transform ${theme === 'dark' ? 'bg-[#ff00ff] text-white hover:bg-[#ff33ff]' : 'bg-[#00ffaa] text-black hover:bg-[#33ffbb]'}`} 
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        boxShadow: neoBrutalismBoxShadow,
                        border: neoBrutalismBorder,
                        cursor: 'pointer'
                      }}
                    >
                      Try Demo
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/dashboard">
                    <Button 
                      variant="outline" 
                      className={`cursor-pointer text-lg px-8 py-6 font-bold rounded-lg ${theme === 'dark' ? 'bg-black text-[#00ffaa] border-[#00ffaa] hover:bg-[#111] hover:text-[#00ffaa] hover:text-2xl' : 'bg-white text-black border-black hover:bg-[#f0f0f0]'}`} 
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        boxShadow: theme === 'dark' ? '6px 6px 0px 0px #00ffaa' : neoBrutalismBoxShadow,
                        border: theme === 'dark' ? '3px solid #00ffaa' : neoBrutalismBorder,
                        cursor: 'pointer'
                      }}
                    >
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </BlurFade>
            <BlurFade delay={STAGGER_DELAY * 4}>
              <motion.div 
                className="mt-8"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown 
                  className={`h-10 w-10 rounded-full ${theme === 'dark' ? 'bg-[#222] text-[#ff00ff]' : 'bg-white text-black'}`}
                  style={{
                    boxShadow: theme === 'dark' ? '4px 4px 0px 0px #ff00ff' : '4px 4px 0px 0px rgba(0,0,0,0.9)',
                    border: theme === 'dark' ? '2px solid #ff00ff' : '2px solid #000'
                  }}
                />
              </motion.div>
            </BlurFade>
          </div>
        </section>

        <section 
          id="problem" 
          className={`py-16 md:py-20 lg:py-28 rounded-xl ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#00ffaa]'} transform rotate-1`}
          style={{ 
            boxShadow: theme === 'dark' ? '12px 12px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
            border: neoBrutalismBorder
          }}
        >
          <div className="container mx-auto grid max-w-5xl items-center gap-10 py-12 px-6 lg:grid-cols-2 lg:gap-16">
            <BlurFade delay={STAGGER_DELAY * 5}>
              <div 
                className="flex flex-col justify-center space-y-6"
              >
                <motion.div 
                  className={`p-4 ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#ff9900]'} rounded-lg transform -rotate-2`}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ 
                    boxShadow: theme === 'dark' ? '6px 6px 0px 0px #00ffaa' : neoBrutalismBoxShadow,
                    border: neoBrutalismBorder
                  }}
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" 
                    style={{
                      fontFamily: "var(--font-orbitron)",
                      textShadow: theme === 'dark' ? '0 0 8px #ff00ff' : 'none'
                    }}
                  >
                    The Problem
                  </h2>
                </motion.div>
                <motion.div 
                  className={`p-5 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'} rounded-lg transform rotate-1`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ 
                    boxShadow: theme === 'dark' ? '6px 6px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
                    border: neoBrutalismBorder
                  }}
                >
                  <p className={`max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${theme === 'dark' ? 'text-[#00ffaa]' : 'text-black'} font-bold`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                    We &apos; re solving critical development challenges that affect millions of developers worldwide.
                  </p>
                </motion.div>
                <motion.div 
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  whileHover={{ x: 5, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button 
                    className={`text-lg px-6 py-5 font-bold rounded-lg ${theme === 'dark' ? 'bg-[#ff00ff] text-white hover:bg-[#ff33ff]' : 'bg-[#ff3366] text-white hover:bg-[#ff5588]'}`} 
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      boxShadow: neoBrutalismBoxShadow,
                      border: neoBrutalismBorder,
                      cursor: 'pointer'
                    }}
                  >
                    Our Solution
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </BlurFade>
            <BlurFade delay={STAGGER_DELAY * 6}>
              <motion.div 
                className="flex justify-center"
                whileHover={{ scale: 1.03, rotate: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div 
                  className={`w-full max-w-[400px] overflow-hidden rounded-lg p-4 ${theme === 'dark' ? 'bg-[#222]' : 'bg-white'}`}
                  style={{ 
                    boxShadow: theme === 'dark' ? '8px 8px 0px 0px #00ffaa' : neoBrutalismBoxShadow,
                    border: neoBrutalismBorder
                  }}
                >
                  <div 
                    className={`flex h-[250px] w-full items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-[#1a1a1a] text-[#ff00ff]' : 'bg-[#00ccff] text-white'} font-bold text-xl`} 
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      boxShadow: theme === 'dark' ? '4px 4px 0px 0px #ff00ff' : '4px 4px 0px 0px #000',
                      border: neoBrutalismBorder
                    }}
                  >
                    [Problem Visualization]
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          </div>
        </section>
        <section 
          id="features" 
          className="py-16 md:py-24 lg:py-32"
        >
          <div className="container mx-auto flex max-w-[980px] flex-col items-center gap-12 text-center px-4">
            <div
              className={`p-5 ${theme === 'dark' ? 'bg-[#111]' : 'bg-white'} rounded-lg transform rotate-1`}
              style={{ 
                boxShadow: theme === 'dark' ? '8px 8px 0px 0px #00ffaa' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <BlurFadeText
                delay={STAGGER_DELAY * 7}
                className="text-3xl font-bold"
                text="Our Features"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  textShadow: theme === 'dark' ? '0 0 8px #00ffaa' : 'none'
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Feature One",
                  description: "Description of the first main feature and why users will love it. This feature provides exceptional value by streamlining complex processes and saving users valuable time. The intuitive interface makes it accessible for both beginners and advanced users.",
                  icon: <Zap className={`h-12 w-12 ${theme === 'dark' ? 'text-[#ff00ff]' : 'text-[#ff00aa]'}`} />,
                  color: theme === 'dark' ? '#ff00ff' : '#ff00aa'
                },
                {
                  title: "Feature Two",
                  description: "Description of the seccond main feature and why users will love it. This feature provides exceptional value by streamlining complex processes and saving users valuable time. The intuitive interface makes it accessible for both beginners and advanced users.",
                  icon: <Star className={`h-12 w-12 ${theme === 'dark' ? 'text-[#00ffaa]' : 'text-[#00ccff]'}`} />,
                  color: theme === 'dark' ? '#00ffaa' : '#00ccff'
                },
                {
                  title: "Feature Three",
                  description: "Description of the third main feature and why users will love it. This feature provides exceptional value by streamlining complex processes and saving users valuable time. The intuitive interface makes it accessible for both beginners and advanced users.",
                  icon: <Users className={`h-12 w-12 ${theme === 'dark' ? 'text-[#ffe500]' : 'text-[#ff3366]'}`} />,
                  color: theme === 'dark' ? '#ffe500' : '#ff3366'
                }
              ].map((feature, index) => (
                <BlurFade key={index} delay={STAGGER_DELAY * (8 + index)}>
                  <motion.div
                    whileHover={{ y: -8, rotate: index % 2 === 0 ? 2 : -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Card 
                      className={`${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'} border-0`}
                      style={{ 
                        boxShadow: theme === 'dark' 
                          ? `8px 8px 0px 0px ${feature.color}` 
                          : neoBrutalismBoxShadow,
                        border: neoBrutalismBorder,
                        transform: index % 2 === 0 ? 'rotate(1deg)' : 'rotate(-1deg)'
                      }}
                    >
                      <CardHeader className="text-center">
                        <motion.div 
                          className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-black' : 'bg-[#f0f0f0]'}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          style={{ 
                            boxShadow: `4px 4px 0px 0px ${feature.color}`,
                            border: neoBrutalismBorder
                          }}
                        >
                          {feature.icon}
                        </motion.div>
                        <CardTitle 
                          style={{fontFamily: "var(--font-orbitron)"}} 
                          className={`text-xl text-[${feature.color}]`}
                        >
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p 
                          className={`text-center font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`} 
                          style={{fontFamily: "var(--font-space-grotesk)"}}
                        >
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section 
          id="team" 
          className="py-16 md:py-24"
        >
          <div className="container mx-auto flex max-w-[980px] flex-col items-center gap-10 text-center px-4">
            <div
              className={`p-5 ${theme === 'dark' ? 'bg-[#111]' : 'bg-white'} rounded-lg transform -rotate-1`}
              style={{ 
                boxShadow: theme === 'dark' ? '8px 8px 0px 0px #ffe500' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <BlurFadeText
                delay={STAGGER_DELAY * 11}
                className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl"
                text="Meet Our Team"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  textShadow: theme === 'dark' ? '0 0 8px #ffe500' : 'none'
                }}
              />
            </div>
            <div 
              className={`p-4 ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#9900ff]'} rounded-lg transform rotate-1 max-w-[800px]`}
              style={{ 
                boxShadow: theme === 'dark' ? '6px 6px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <p className={`text-lg font-bold ${theme === 'dark' ? 'text-[#00ffaa]' : 'text-white'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                Our talented professionals are dedicated to bringing you the best experience possible
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
              {teamMembers.map((member, index) => (
                <BlurFade key={member.name} delay={STAGGER_DELAY * (12 + index)}>
                  <motion.div
                    whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? 2 : -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card 
                      className={`h-full ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'} border-0`}
                      style={{ 
                        boxShadow: theme === 'dark' 
                          ? index % 2 === 0 
                            ? '8px 8px 0px 0px #ff00ff' 
                            : '8px 8px 0px 0px #00ffaa' 
                          : neoBrutalismBoxShadow,
                        border: neoBrutalismBorder,
                        transform: index % 2 === 0 ? 'rotate(1deg)' : 'rotate(-1deg)'
                      }}
                    >
                      <CardHeader className="pb-2">
                        <motion.div 
                          className={`w-full h-4 rounded-lg mb-4 ${theme === 'dark' 
                            ? index % 2 === 0 
                              ? 'bg-[#ff00ff]' 
                              : 'bg-[#00ffaa]' 
                            : index % 2 === 0 
                              ? 'bg-[#ff00aa]' 
                              : 'bg-[#00ccff]'}`}
                          whileHover={{ scaleX: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          style={{ border: neoBrutalismBorder }}
                        ></motion.div>
                        <CardTitle 
                          style={{fontFamily: "var(--font-orbitron)"}} 
                          className={`text-xl ${theme === 'dark' 
                            ? index % 2 === 0 
                              ? 'text-[#ff00ff]' 
                              : 'text-[#00ffaa]' 
                            : index % 2 === 0 
                              ? 'text-[#ff00aa]' 
                              : 'text-[#00ccff]'}`}
                        >
                          {member.name}
                        </CardTitle>
                        <CardDescription 
                          className={`font-bold text-lg ${theme === 'dark' 
                            ? index % 2 === 0 
                              ? 'text-[#ff66ff]' 
                              : 'text-[#66ffcc]' 
                            : index % 2 === 0 
                              ? 'text-[#ff3366]' 
                              : 'text-[#33aaff]'}`} 
                          style={{fontFamily: "var(--font-space-grotesk)"}}
                        >
                          {member.role}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p 
                          className={`mb-6 font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`} 
                          style={{fontFamily: "var(--font-space-grotesk)"}}
                        >
                          {member.description}
                        </p>
                        <div className="space-y-3 mt-6">
                          {member.achievements.map((achievement) => (
                            <motion.div 
                              key={achievement} 
                              className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-black' : 'bg-[#f0f0f0]'}`}
                              whileHover={{ 
                                x: 5,
                                transition: { duration: 0.2, ease: "easeOut" }
                              }}
                              style={{ 
                                boxShadow: theme === 'dark' 
                                  ? index % 2 === 0 
                                    ? '4px 4px 0px 0px #ff00ff' 
                                    : '4px 4px 0px 0px #00ffaa' 
                                  : index % 2 === 0 
                                    ? '4px 4px 0px 0px #ff00aa' 
                                    : '4px 4px 0px 0px #00ccff',
                                border: neoBrutalismBorder
                              }}
                            >
                              <motion.div
                                className={`flex items-center justify-center h-8 w-8 rounded-lg ${theme === 'dark' 
                                  ? index % 2 === 0 
                                    ? 'bg-[#ff00ff]' 
                                    : 'bg-[#00ffaa]' 
                                  : index % 2 === 0 
                                    ? 'bg-[#ff00aa]' 
                                    : 'bg-[#00ccff]'}`}
                                whileHover={{ scale: 1.1 }}
                                style={{ border: neoBrutalismBorder }}
                              >
                                <Star className={`h-4 w-4 ${theme === 'dark' ? 'text-black' : 'text-black'}`} />
                              </motion.div>
                              <motion.span 
                                className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`} 
                                style={{fontFamily: "var(--font-space-grotesk)"}}
                              >
                                {achievement}
                              </motion.span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className={`flex justify-end gap-4 pt-2 ${theme === 'dark' 
                        ? index % 2 === 0 
                          ? 'text-[#ff00ff]' 
                          : 'text-[#00ffaa]' 
                        : index % 2 === 0 
                          ? 'text-[#ff00aa]' 
                          : 'text-[#00ccff]'}`}
                      >
                        <motion.a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center text-sm font-medium"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          style={{ cursor: 'pointer' }}
                        >
                          <Linkedin className="h-6 w-6" />
                        </motion.a>
                        <motion.a 
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center text-sm font-medium"
                          whileHover={{ scale: 1.2, rotate: -5 }}
                          style={{ cursor: 'pointer' }}
                        >
                          <Github className="h-6 w-6" />
                        </motion.a>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
