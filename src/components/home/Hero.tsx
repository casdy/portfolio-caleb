import { ArrowDown, Github, Linkedin } from 'lucide-react';
import Button from '../common/Button';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-transparent">
            {/* Background orbs */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30"
                />
                <motion.div
                    animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30"
                />
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-600/10 rounded-full mix-blend-screen filter blur-xl opacity-30"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 uppercase flex items-center justify-center"
                >
                    Caleb Labs
                    <span className="terminal-cursor text-cyber-cyan opacity-80" />
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-4 max-w-3xl mx-auto text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed"
                >
                    Full-Stack Engineer specializing in high-performance React architectures, AI-integrated tooling, and real-time data orchestration.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Button 
                        to="https://github.com/casdy" 
                        target="_blank" 
                        className="font-mono uppercase tracking-wider text-base px-8 py-4 bg-zinc-900 border border-white/10 text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all group"
                    >
                        <Github size={20} className="mr-3 group-hover:scale-110 transition-transform" />
                        View GitHub
                    </Button>
                    
                    <Button 
                        to="https://www.linkedin.com/in/calebojukwu/" 
                        target="_blank" 
                        className="font-mono uppercase tracking-wider text-base px-8 py-4 bg-zinc-900 border border-white/10 text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all group"
                    >
                        <Linkedin size={20} className="mr-3 group-hover:scale-110 transition-transform text-cyan-400" />
                        LinkedIn
                    </Button>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-zinc-600">
                <ArrowDown size={24} />
            </div>
        </section>
    );
};

export default Hero;
