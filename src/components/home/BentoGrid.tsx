import { motion } from 'framer-motion';
import { Database, Layout, Smartphone, Server, Terminal, Globe } from 'lucide-react';

const bentoItems = [
    {
        title: "Frontend",
        icon: Layout,
        desc: "React, HTML, Tailwind, Next.js, TypeScript",
        colSpan: "col-span-1 border border-white/10 bg-[#0a0a0a] hover:border-white/30 transition-colors duration-300"
    },
    {
        title: "Mobile Dev",
        icon: Smartphone,
        desc: "React Native, Expo",
        colSpan: "col-span-1 md:col-span-1 border border-white/10 bg-[#0a0a0a] hover:border-white/30 transition-colors duration-300"
    },
    {
        title: "API",
        icon: Globe,
        desc: "REST, FastAPI",
        colSpan: "col-span-1 border border-white/10 bg-[#0a0a0a] hover:border-white/30 transition-colors duration-300"
    },
    {
        title: "Backend",
        icon: Server,
        desc: "Node.js, Express, Python",
        colSpan: "col-span-1 border border-white/10 bg-[#0a0a0a] hover:border-white/30 transition-colors duration-300"
    },
    {
        title: "Database",
        icon: Database,
        desc: "PostgreSQL, MySQL, Firebase",
        colSpan: "col-span-1 border border-white/10 bg-[#0a0a0a] hover:border-white/30 transition-colors duration-300"
    },
    {
        title: "DevOps",
        icon: Terminal,
        desc: "Git, Docker, AWS, CI/CD",
        colSpan: "col-span-1 border border-white/10 bg-[#0a0a0a] hover:border-white/30 transition-colors duration-300"
    }

];


const BentoGrid = () => {
    return (
        <section className="py-20 bg-transparent px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold font-display text-center mb-12 text-zinc-900 dark:text-white"
                >
                    Tech Stack
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {bentoItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`${item.colSpan} rounded-3xl p-8 relative overflow-hidden group shadow-lg cursor-pointer`}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                <item.icon size={120} className="text-white" />
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <div className="mb-auto p-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg w-fit">
                                    <item.icon size={24} className="text-white" />
                                </div>
                                <h3 className={`text-2xl font-bold font-mono tracking-tight text-white mb-2 uppercase`}>{item.title}</h3>
                                <p className={`font-mono text-sm tracking-wide text-zinc-400 leading-relaxed font-medium`}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
