import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Clock } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useChatbot } from '../bot/useChatbot';
import { useThemeStore } from '../hooks/useDarkMode';

export const GlobalChatbot: React.FC = () => {
  const { isOpen, messages, toggleChat, addMessage } = useChatStore();
  const { getAnswer } = useChatbot();
  const { pathname } = useLocation();
  const { isDark } = useThemeStore();
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const userText = (overrideText || input).trim();
    if (!userText) return;

    addMessage({ sender: 'user', text: userText });
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { answer, suggestions } = getAnswer(userText, pathname);
      addMessage({ sender: 'bot', text: answer, suggestions });
      setIsTyping(false);
    }, 600);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(undefined, suggestion);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`mb-4 w-[calc(100vw-2rem)] sm:w-[400px] h-[60vh] sm:h-[500px] flex flex-col rounded-xl overflow-hidden border transition-all ${
              isDark
                ? 'border-white/10 shadow-2xl bg-[#0a0a0a]'
                : 'border-zinc-200 shadow-xl bg-white'
            }`}
          >
            {/* ── Header ── */}
            <div className={`border-b px-5 py-4 flex justify-between items-center ${
              isDark
                ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-white/10'
                : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="flex flex-col">
                <div className={`flex items-center gap-2 font-mono text-sm font-bold tracking-wider uppercase ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  <Terminal size={16} />
                  <span>Caleb_Assistant</span>
                </div>
                <div className={`flex items-center gap-2 font-mono text-[10px] mt-1 ${
                  isDark ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  <Clock size={10} />
                  <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                  <span className="opacity-50">|</span>
                  <span className={isDark ? 'text-white' : 'text-black'}>SYS.STABLE</span>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className={`transition-colors ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-black'}`}
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Chat History ── */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div 
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end ml-auto' : 'self-start items-start'}`}
                  >
                    <div 
                      className={`px-4 py-3 text-sm leading-relaxed font-mono
                        ${msg.sender === 'user' 
                          ? isDark
                            ? 'bg-white text-black rounded-lg rounded-tr-sm'
                            : 'bg-black text-white rounded-lg rounded-tr-sm'
                          : isDark
                            ? 'bg-zinc-900 text-zinc-300 border border-white/10 rounded-lg rounded-tl-sm'
                            : 'bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-lg rounded-tl-sm'
                        }`}
                    >
                      {msg.text}
                    </div>
                    <span className={`text-[10px] mt-1 px-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                  </div>

                  {/* Suggestion Chips — show on bot messages */}
                  {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 ml-1 mt-1">
                      {msg.suggestions.map((s, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i + 0.3 }}
                          onClick={() => handleSuggestionClick(s)}
                          disabled={isTyping}
                          className={`text-[10px] px-3 py-1.5 rounded-full border transition-all uppercase tracking-wider font-mono disabled:opacity-40 disabled:cursor-not-allowed ${
                            isDark
                              ? 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:bg-zinc-900'
                              : 'border-zinc-300 text-zinc-600 hover:text-black hover:border-zinc-400 hover:bg-zinc-50'
                          }`}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className={`self-start max-w-[85%] rounded-lg rounded-tl-sm px-4 py-4 flex gap-1.5 items-center ${
                  isDark
                    ? 'bg-zinc-900 border border-white/10'
                    : 'bg-zinc-100 border border-zinc-200'
                }`}>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-zinc-500' : 'bg-zinc-400'}`} />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-zinc-500' : 'bg-zinc-400'}`} />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-zinc-500' : 'bg-zinc-400'}`} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input Area ── */}
            <form 
              onSubmit={handleSend}
              className={`p-4 border-t flex gap-3 ${
                isDark
                  ? 'bg-[#0a0a0a] border-white/10'
                  : 'bg-zinc-50 border-zinc-200'
              }`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Command input..."
                className={`flex-1 rounded-md px-4 py-2 text-sm outline-none transition-all border font-mono ${
                  isDark
                    ? 'bg-zinc-900 border-white/10 text-white placeholder-zinc-600 focus:border-white/30'
                    : 'bg-white border-zinc-300 text-black placeholder-zinc-400 focus:border-zinc-500'
                }`}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className={`rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-11 h-11 border ${
                  isDark
                    ? 'bg-white hover:bg-zinc-200 text-black border-white'
                    : 'bg-black hover:bg-zinc-800 text-white border-black'
                }`}
                aria-label="Send Message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className={`w-14 h-14 border rounded-full flex items-center justify-center transition-all z-50 ${
              isDark
                ? 'bg-zinc-900 border-white/10 text-white shadow-xl hover:bg-zinc-800 hover:border-white/30 hover:scale-105'
                : 'bg-black border-black text-white shadow-lg hover:bg-zinc-800'
            }`}
            aria-label="Open Chat"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
