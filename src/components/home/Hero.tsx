import { ArrowDown, Github, Linkedin } from 'lucide-react';
import Button from '../common/Button';
import ResumeDownloader from '../common/ResumeDownloader';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

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
                    className="text-5xl md:text-7xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mb-6"
                >
                    <span className="block mb-2">My Passion is</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                        <TypeAnimation
                            sequence={[
                                'Building Apps.',
                                2000,
                                'Solving Problems.',
                                2000,
                                'Great User Experience.',
                                2000,
                                'Clean Code.',
                                2000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-4 max-w-2xl mx-auto text-xl text-zinc-700 dark:text-zinc-200"
                >
                    Hi, I'm Caleb Ojukwu. I bridge the gap between complex problems and elegant solutions.
                    From full-stack applications to data-driven tools, I build with purpose and precision.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Work
                    </Button>
                    <ResumeDownloader
                        label="Download Resume"
                        filePath="/assets/resumes/resume_tech.pdf"
                        variant="outline"
                        className="text-zinc-700 dark:text-white border-zinc-300 dark:border-white hover:bg-zinc-100 dark:hover:bg-white/10"
                    />
                    <div className="flex gap-4 ml-0 sm:ml-4 mt-4 sm:mt-0 border-l-0 sm:border-l pl-0 sm:pl-4 border-zinc-200 dark:border-zinc-700">
                        <a href="https://github.com/casdy" target="_blank" rel="noopener noreferrer" className="text-zinc-400 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/calebojukwu/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-zinc-600">
                <ArrowDown size={24} />
            </div>
        </section>
    );
};

export default Hero;
