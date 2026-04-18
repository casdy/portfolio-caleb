import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/10 pt-20 pb-10 relative overflow-hidden mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
                
                {/* Top Section: Links & Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Connect</h2>
                        <ul className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-white font-mono text-sm tracking-wide">
                            <li>
                                <a href="https://github.com/casdy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors decoration-1 underline-offset-4 hover:underline">
                                    GitHub <ArrowUpRight size={14} className="opacity-50" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/calebojukwu/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors decoration-1 underline-offset-4 hover:underline">
                                    LinkedIn <ArrowUpRight size={14} className="opacity-50" />
                                </a>
                            </li>
                            <li>
                                <a href="mailto:caleb@example.com" className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors decoration-1 underline-offset-4 hover:underline">
                                    Email <ArrowUpRight size={14} className="opacity-50" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="text-left md:text-right font-mono text-zinc-600 text-xs uppercase tracking-wider">
                        <p>&copy; {new Date().getFullYear()} Caleb Ojukwu.</p>
                        <p className="mt-2">Engineered with precision.</p>
                    </div>
                </div>

                {/* Bottom Section: Massive Brand Name */}
                <div className="w-full border-t border-white/5 pt-8 overflow-hidden flex items-center justify-center md:justify-start">
                    <h1 className="text-[14vw] md:text-[11vw] leading-none font-sans font-black tracking-tighter text-white/5 uppercase select-none w-full text-center">
                        CALEB OJUKWU
                    </h1>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
