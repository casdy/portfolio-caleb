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
            className={`mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[60vh] sm:h-[500px] flex flex-col rounded-xl overflow-hidden border shadow-lg ${
              isDark
                ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] bg-[#020410]'
                : 'border-zinc-300 shadow-zinc-200/50 bg-white'
            }`}
          >
            {/* ── Header ── */}
            <div className={`border-b p-4 flex justify-between items-center ${
              isDark
                ? 'bg-[#020410]/90 backdrop-blur-sm border-cyan-500/30'
                : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="flex flex-col">
                <div className={`flex items-center gap-2 font-mono text-sm font-bold tracking-wider ${
                  isDark ? 'text-cyan-400' : 'text-blue-600'
                }`}>
                  <Terminal size={18} />
                  <span>LABS_ASSISTANT_OS</span>
                </div>
                <div className={`flex items-center gap-1.5 font-mono text-[9px] mt-0.5 ${
                  isDark ? 'text-slate-500' : 'text-zinc-400'
                }`}>
                  <Clock size={10} className={isDark ? 'text-cyan-500/50' : 'text-blue-400/50'} />
                  <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                  <span className={isDark ? 'text-cyan-500/30' : 'text-zinc-300'}>|</span>
                  <span className="text-emerald-500/70">STABLE</span>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className={`transition-colors ${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-zinc-400 hover:text-blue-600'}`}
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Chat History ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div 
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end ml-auto' : 'self-start items-start'}`}
                  >
                    <div 
                      className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm
                        ${msg.sender === 'user' 
                          ? isDark
                            ? 'bg-fuchsia-600/20 text-fuchsia-50 border border-fuchsia-500/50 rounded-2xl rounded-tr-sm font-mono'
                            : 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                          : isDark
                            ? 'bg-[#0a0f2e]/80 text-cyan-50 border border-cyan-500/30 rounded-2xl rounded-tl-sm font-mono backdrop-blur-sm'
                            : 'bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-2xl rounded-tl-sm'
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
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                            isDark
                              ? 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/15 hover:border-cyan-400/60 font-mono'
                              : 'border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400'
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
                <div className={`self-start max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center ${
                  isDark
                    ? 'bg-[#0a0f2e]/80 text-cyan-50 border border-cyan-500/30 backdrop-blur-sm'
                    : 'bg-zinc-100 border border-zinc-200'
                }`}>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-blue-500'}`} />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-blue-500'}`} />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-blue-500'}`} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input Area ── */}
            <form 
              onSubmit={handleSend}
              className={`p-3 border-t flex gap-2 ${
                isDark
                  ? 'bg-[#020410]/90 backdrop-blur-sm border-cyan-500/30'
                  : 'bg-zinc-50 border-zinc-200'
              }`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className={`flex-1 rounded-md px-3 py-2 text-sm outline-none transition-all border ${
                  isDark
                    ? 'bg-[#0a0f2e]/60 text-cyan-50 placeholder-slate-500 border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono backdrop-blur-sm'
                    : 'bg-white text-zinc-900 placeholder-zinc-400 border-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className={`p-2 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10 border ${
                  isDark
                    ? 'bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border-cyan-500/50'
                    : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
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
            className={`w-14 h-14 border-2 rounded-full flex items-center justify-center transition-all z-50 ${
              isDark
                ? 'bg-[#020410] border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]'
                : 'bg-blue-600 border-blue-600 text-white shadow-lg hover:shadow-xl hover:bg-blue-700'
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
