import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Clock } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useChatbot } from '../bot/useChatbot';

export const GlobalChatbot: React.FC = () => {
  const { isOpen, messages, toggleChat, addMessage } = useChatStore();
  const { getAnswer } = useChatbot();
  const { pathname } = useLocation();
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update real-time clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    
    // 1. Add User Message
    addMessage({ sender: 'user', text: userText });
    setInput('');
    setIsTyping(true);

    // 2. Simulate Network/Thinking Delay
    setTimeout(() => {
      // 3. Get Context-Aware Answer
      const answer = getAnswer(userText, pathname);
      addMessage({ sender: 'bot', text: answer });
      setIsTyping(false);
    }, 600);
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
            className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[60vh] sm:h-[500px] flex flex-col bg-slate-950/90 backdrop-blur-md border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 border-b border-cyan-500/30 p-4 flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold tracking-wider">
                  <Terminal size={18} />
                  <span>LABS_ASSISTANT_OS</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[9px] mt-0.5">
                  <Clock size={10} className="text-cyan-500/50" />
                  <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                  <span className="text-cyan-500/30">|</span>
                  <span className="text-emerald-500/70">STABLE</span>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end ml-auto' : 'self-start items-start'}`}
                >
                  <div 
                    className={`px-4 py-2 text-sm font-mono leading-relaxed shadow-sm
                      ${msg.sender === 'user' 
                        ? 'bg-fuchsia-600/20 text-fuchsia-50 border border-fuchsia-500/50 rounded-2xl rounded-tr-sm' 
                        : 'bg-slate-800 text-cyan-50 border border-cyan-500/30 rounded-2xl rounded-tl-sm'
                      }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-zinc-300 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </span>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="self-start max-w-[85%] bg-slate-800 text-cyan-50 border border-cyan-500/30 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSend}
              className="p-3 bg-slate-900 border-t border-cyan-500/30 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-950 text-cyan-50 placeholder-slate-500 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-md px-3 py-2 font-mono text-sm outline-none transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-500/50 p-2 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10"
                aria-label="Send Message"
              >
                <Send size={18} className="ml-1" />
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
            className="w-14 h-14 bg-slate-900 border-2 border-cyan-500 text-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all z-50"
            aria-label="Open Chat"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
