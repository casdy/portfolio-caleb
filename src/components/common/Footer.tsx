import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800 py-12 relative overflow-hidden transition-colors duration-300">
            {/* Soft Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                            Caleb Ojukwu
                        </h3>
                        <p className="text-gray-500 dark:text-zinc-400 font-medium">Building Digital Experiences.</p>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center space-x-8">
                        <Link to="/" className="text-gray-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tech</Link>
                        <Link to="/culinary" className="text-gray-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Culinary</Link>
                        <Link to="/service" className="text-gray-500 dark:text-zinc-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Service</Link>
                    </div>

                    {/* Socials & Action */}
                    <div className="flex flex-col items-center md:items-end space-y-4">
                        <div className="flex space-x-6">
                            <a href="https://github.com/casdy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-all hover:scale-110">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/calebojukwu/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-all hover:scale-110">
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:caleb@example.com" className="text-gray-400 hover:text-red-500 transition-all hover:scale-110">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} Caleb Ojukwu. All rights reserved.</p>
                    <button
                        onClick={scrollToTop}
                        className="mt-4 md:mt-0 flex items-center hover:text-blue-600 transition-colors"
                    >
                        Back to Top <ArrowUp size={14} className="ml-1" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
