'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from '@/app/utils/Context'
import { Send, Bot, User, RefreshCw } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import BlurFade from '@/components/ui/blur-fade'
import { generateAIResponse } from '@/app/utils/Gemini'
import { Navbar } from '@/components/ui/navbar'

export default function Chatbot() {
  const router = useRouter()
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { user } = useUser()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  
  const neoBrutalismBoxShadow = "8px 8px 0px 0px rgba(0,0,0,0.9)"
  const neoBrutalismBorder = "3px solid #000"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputMessage.trim()) return
    
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    
    try {
      const response = await generateAIResponse({ 
        prompt: inputMessage,
        modelGiven: "gemini-1.5-flash"
      })
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot'
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      toast.error('Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    toast.success('Chat cleared!')
  }

  return (user && (
    <div 
      className={`min-h-screen px-4 relative z-40 sm:px-6 lg:px-10 ${isDarkMode ? 'bg-black text-white' : 'bg-[#f0f0f0]'}`}
    >
      <Navbar />
      <div className="container mx-auto py-8 h-screen flex flex-col">
        <div className="flex justify-between items-center mb-8 mt-20">
          <BlurFade>
            <div
              className={`p-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'} rounded-lg transform rotate-1`}
              style={{ 
                boxShadow: isDarkMode ? '8px 8px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
            >
              <h1 
                className="text-4xl font-bold tracking-tighter flex items-center"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  textShadow: isDarkMode ? '0 0 8px #ff00ff' : 'none'
                }}
              >
                <Bot className="mr-2" /> AI Chatbot
              </h1>
            </div>
          </BlurFade>
          
          <div className="flex gap-4">
            <BlurFade>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <button
                  onClick={clearChat}
                  className={`flex items-center px-6 py-3 rounded-lg font-bold ${
                    isDarkMode 
                      ? 'bg-[#00ffaa] text-black hover:bg-[#33ffbb]' 
                      : 'bg-[#ff00aa] text-white hover:bg-[#ff33bb]'
                  }`}
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    boxShadow: neoBrutalismBoxShadow,
                    border: neoBrutalismBorder
                  }}
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Clear Chat
                </button>
              </motion.div>
            </BlurFade>
          </div>
        </div>

        <div 
          className={`rounded-lg p-6 mb-6 flex-1 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}
          style={{ 
            boxShadow: isDarkMode ? '8px 8px 0px 0px #00ffaa' : neoBrutalismBoxShadow,
            border: neoBrutalismBorder,
            overflowY: 'auto'
          }}
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'} rounded-lg transform rotate-1 text-center max-w-md`}
                style={{ 
                  boxShadow: isDarkMode ? '6px 6px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
                  border: neoBrutalismBorder
                }}
              >
                <Bot className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-[#00ffaa]' : 'text-[#ff00aa]'}`} />
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{fontFamily: "var(--font-orbitron)"}}
                >
                  Start Chatting!
                </h3>
                <p 
                  className="font-bold"
                  style={{fontFamily: "var(--font-space-grotesk)"}}
                >
                  Ask me anything and I'll do my best to help you.
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.sender === 'user' 
                        ? isDarkMode 
                          ? 'bg-[#ff00ff]' 
                          : 'bg-[#00ffaa]'
                        : isDarkMode 
                          ? 'bg-[#1a1a1a]' 
                          : 'bg-[#f0f0f0]'
                    }`}
                    style={{ 
                      boxShadow: message.sender === 'user'
                        ? isDarkMode 
                          ? '4px 4px 0px 0px #00ffaa' 
                          : '4px 4px 0px 0px #000'
                        : isDarkMode 
                          ? '4px 4px 0px 0px #ff00ff' 
                          : '4px 4px 0px 0px #000',
                      border: neoBrutalismBorder,
                      transform: message.sender === 'user' ? 'rotate(1deg)' : 'rotate(-1deg)'
                    }}
                  >
                    <div className="flex items-center mb-2">
                      {message.sender === 'user' ? (
                        <>
                          <span 
                            className={`font-bold mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
                            style={{fontFamily: "var(--font-orbitron)"}}
                          >
                            You
                          </span>
                          <User className={`h-4 w-4 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                        </>
                      ) : (
                        <>
                          <Bot className={`h-4 w-4 mr-2 ${
                            isDarkMode ? 'text-[#00ffaa]' : 'text-[#ff00aa]'
                          }`} />
                          <span 
                            className={`font-bold ${
                              isDarkMode ? 'text-[#00ffaa]' : 'text-[#ff00aa]'
                            }`}
                            style={{fontFamily: "var(--font-orbitron)"}}
                          >
                            AI Assistant
                          </span>
                        </>
                      )}
                    </div>
                    <p 
                      className={`whitespace-pre-wrap font-bold ${
                        message.sender === 'user'
                          ? isDarkMode ? 'text-white' : 'text-black'
                          : isDarkMode ? 'text-white' : 'text-black'
                      }`}
                      style={{fontFamily: "var(--font-space-grotesk)"}}
                    >
                      {message.text}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-4 mb-4">
          <div 
            className="flex-1"
            style={{ 
              boxShadow: isDarkMode ? '8px 8px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
              border: neoBrutalismBorder,
              borderRadius: '0.5rem'
            }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className={`w-full p-4 rounded-lg font-bold ${
                isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'
              }`}
              style={{
                fontFamily: "var(--font-space-grotesk)",
                border: 'none',
                outline: 'none'
              }}
              disabled={isLoading}
            />
          </div>
          <BlurFade>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`px-6 py-4 rounded-lg font-bold flex items-center ${
                isDarkMode 
                  ? 'bg-[#00ffaa] text-black hover:bg-[#33ffbb]' 
                  : 'bg-[#ff00aa] text-white hover:bg-[#ff33bb]'
              }`}
              style={{
                fontFamily: "var(--font-space-grotesk)",
                boxShadow: neoBrutalismBoxShadow,
                border: neoBrutalismBorder
              }}
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <RefreshCw className="h-5 w-5" />
                </motion.div>
              ) : (
                <>
                  <span className="mr-2">Send</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </BlurFade>
        </form>
      </div>
    </div>
  ))
}
