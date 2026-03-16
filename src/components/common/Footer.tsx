import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white/80 dark:bg-transparent border-t border-zinc-200 dark:border-zinc-800/50 py-12 relative overflow-hidden">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                            Caleb Ojukwu
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-300 font-medium">Building Digital Experiences.</p>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center space-x-8">
                        <Link to="/" className="text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Tech</Link>
                        <Link to="/culinary" className="text-zinc-600 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Culinary</Link>
                        <Link to="/service" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Service</Link>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col items-center md:items-end space-y-4">
                        <div className="flex space-x-6">
                            <a href="https://github.com/casdy" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-110">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/calebojukwu/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400 transition-all hover:scale-110">
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:caleb@example.com" className="text-zinc-500 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-all hover:scale-110">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 dark:text-zinc-400">
                    <p>&copy; {new Date().getFullYear()} Caleb Ojukwu. All rights reserved.</p>
                    <button
                        onClick={scrollToTop}
                        className="mt-4 md:mt-0 flex items-center hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                        Back to Top <ArrowUp size={14} className="ml-1" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
