import { motion } from 'framer-motion';

const skills = [
    "React", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion", "PostgreSQL",
    "Next.js", "GraphQL", "UI/UX Design", "System Architecture", "API Design"
];

const InfiniteMarquee = () => {
    return (
        <div className="w-full overflow-hidden bg-slate-900 py-4 absolute bottom-0 z-20 border-t border-slate-800">
            <div className="relative flex max-w-[100vw] overflow-hidden">
                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
                        <span key={index} className="text-slate-400 font-semibold text-lg uppercase tracking-wider">
                            {skill}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default InfiniteMarquee;
