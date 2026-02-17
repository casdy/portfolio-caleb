import { motion } from 'framer-motion';
import { Database, Layout, Smartphone, Server, Terminal, Globe } from 'lucide-react';

const bentoItems = [
    {
        title: "Frontend",
        icon: Layout,
        desc: "React, HTML, Tailwind, Next.js, TypeScript",
        colSpan: "col-span-1",
        // Primary Gradient: Deep Indigo to Purple
        bg: "bg-gradient-to-br from-blue-500 to-red-400",
        text: "text-white"
    },
    {
        title: "Mobile Dev",
        icon: Smartphone,
        desc: "React Native, Expo",
        colSpan: "col-span-1 md:col-span-1",
        // Secondary Gradient: Lighter Blue to Cyan
        bg: "bg-gradient-to-br from-red-400 to-blue-600",
        text: "text-white"
    },
    {
        title: "API",
        icon: Globe,
        desc: "REST, FastAPI",
        colSpan: "col-span-1",
        // Lighter Accent: Soft gray for balance
        bg: "bg-gradient-to-br from-green-400 to-blue-600",
        text: "text-white"
    },
    {
        title: "Backend",
        icon: Server,
        desc: "Node.js, Express, Python",
        colSpan: "col-span-1",
        // Solid Dark: Provides contrast to the gradient next to it
        bg: "bg-gradient-to-br from-black to-blue-900",
        text: "text-slate-100"
    },
    {
        title: "Database",
        icon: Database,
        desc: "PostgreSQL, MySQL, Firebase",
        colSpan: "col-span-1",
        // Darkest Tone: Anchors the bottom of the grid
        bg: "bg-gradient-to-br from-slate-300 to-red-900",
        text: "text-white-300"
    },

    {
        title: "DevOps",
        icon: Terminal,
        desc: "Git, Docker, AWS, CI/CD",
        colSpan: "col-span-1",
        // Neutral Dark: Distinct from the Database box
        bg: "bg-black border border-white/10",
        text: "text-gray-300"
    },

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
                            className={`${item.colSpan} ${item.bg} rounded-3xl p-6 relative overflow-hidden group shadow-lg cursor-pointer`}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                <item.icon size={120} />
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <div className="mb-auto p-2 bg-white/10 backdrop-blur-sm rounded-lg w-fit">
                                    <item.icon size={24} className={item.text} />
                                </div>
                                <h3 className={`text-2xl font-bold ${item.text}`}>{item.title}</h3>
                                <p className={`font-medium opacity-80 ${item.text}`}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
