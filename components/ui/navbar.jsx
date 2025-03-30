import { Zap, Github, Home, Moon, Sun, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useTheme } from '@/app/utils/Context';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const neoBrutalismBoxShadow = "4px 4px 0px 0px rgba(0,0,0,0.9)";
  const neoBrutalismBorder = "2px solid #000";
  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" /> },
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" /> },
    { href: "/chatbot", label: "Chatbot", icon: <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" /> },
    // { href: "#team", label: "Team", icon: <Users className="h-5 w-5 md:hidden" /> },
    { 
      href: "https://github.com/dikjain/Hackathon-template-3", 
      label: "GitHub", 
      icon: <Github className="h-4 w-4 sm:h-5 sm:w-5" />,
      isExternal: true,
      className: "inline-flex items-center justify-center"
    }
  ];

  return (
    <header className="fixed z-50 w-full px-2 sm:px-4 md:px-10 transition-all duration-300 bottom-2 sm:bottom-4 md:top-4 md:bottom-auto bg-transparent left-1/2 -translate-x-1/2">
      <div className="mx-auto max-w-5xl">
        <motion.div 
          className={`flex h-12 sm:h-14 items-center justify-between rounded-lg ${theme === 'dark' ? 'bg-[#111]' : 'bg-white'} px-3 sm:px-5`}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{ 
            boxShadow: theme === 'dark' ? '5px 5px 0px 0px #ff00ff' : neoBrutalismBoxShadow,
            border: neoBrutalismBorder
          }}
        >
          <div className="flex items-center">
            <motion.a 
              href="/" 
              className="flex items-center space-x-1 sm:space-x-2 group"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div 
                className={`p-1 rounded-md ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#f0f0f0]'}`}
                style={{ 
                  boxShadow: theme === 'dark' ? '2px 2px 0px 0px #ff00ff' : '2px 2px 0px 0px #000',
                  border: neoBrutalismBorder
                }}
              >
                <Zap className={`h-4 w-4 sm:h-5 sm:w-5 ${theme === 'dark' ? 'text-[#ff00ff]' : 'text-[#ff00aa]'}`} />
              </div>
              <span 
                className={`text-xs sm:text-sm font-bold inline ${theme === 'dark' ? 'text-white' : 'text-black'}`} 
                style={{fontFamily: "var(--font-orbitron)"}}
              >
                ProjectX
              </span>
            </motion.a>
          </div>
          
          <nav className="flex items-center space-x-3 sm:space-x-5">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 2 : -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  href={link.href} 
                  className={`text-xs sm:text-sm font-bold ${theme === 'dark' ? 'text-white hover:text-[#00ffaa]' : 'text-black hover:text-[#ff00aa]'} transition-colors ${link.className || ''}`}
                  {...(link.isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <div 
                    className={`flex items-center justify-center p-1 rounded-md ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#f0f0f0]'}`}
                    style={{ 
                      boxShadow: theme === 'dark' ? '2px 2px 0px 0px #00ffaa' : '2px 2px 0px 0px #000',
                      border: neoBrutalismBorder
                    }}
                  >
                    {link.icon}
                    <span className={`${link.isExternal ? 'ml-1 sm:ml-2' : ''} ${link.label === 'GitHub' ? '' : 'hidden'} md:inline`}>
                      {link.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <button
                onClick={toggleTheme}
                className={`p-1 sm:p-2 cursor-pointer rounded-md ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#f0f0f0]'}`}
                aria-label="Toggle theme"
                style={{ 
                  boxShadow: theme === 'dark' ? '2px 2px 0px 0px #ff00ff' : '2px 2px 0px 0px #000',
                  border: neoBrutalismBorder
                }}
              >
                {theme === 'light' ? (
                  <Moon className={`h-4 w-4 sm:h-5 sm:w-5 ${theme === 'dark' ? 'text-[#ff00ff]' : 'text-[#ff00aa]'}`} />
                ) : (
                  <Sun className={`h-4 w-4 sm:h-5 sm:w-5 ${theme === 'dark' ? 'text-[#ff00ff]' : 'text-[#ff00aa]'}`} />
                )}
              </button>
            </motion.div>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};