import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const experiences = [
    {
        role: "Line Cook",
        company: "Chop Steakhouse & Bar",
        period: "Nov 2024 - Present",
        location: "Winnipeg, Manitoba",
        description: "Executing complex menu items in a premium steakhouse. Maintaining rigorous food safety standards and collaborating with the brigade."
    },
    {
        role: "Line Cook",
        company: "Saburo Kitchen",
        period: "Dec 2019 - Jul 2022",
        location: "Winnipeg, Manitoba",
        description: "Prepared varied dishes, managed station inventory, and trained new staff. Demonstrated reliability over a multi-year tenure."
    }
];

const Timeline = () => {
    return (
        <div className="py-12">
            <h3 className="text-2xl font-bold text-center mb-10 text-orange-900">Culinary Journey</h3>
            <div className="max-w-3xl mx-auto px-4">
                {experiences.map((exp, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        key={index}
                        className="relative pl-8 pb-12 last:pb-0 border-l-2 border-orange-200"
                    >
                        <div className="absolute -left-[9px] top-0 bg-white border-2 border-orange-500 rounded-full p-1">
                            <Briefcase size={12} className="text-orange-600" />
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-orange-100 dark:border-orange-900/30 relative -top-2 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">{exp.role}</h4>
                                <span className="text-sm text-orange-600 dark:text-orange-400 font-medium px-2 py-1 bg-orange-50 dark:bg-orange-950/50 rounded mt-2 sm:mt-0 inline-block w-fit">
                                    {exp.period}
                                </span>
                            </div>
                            <p className="text-md text-gray-600 dark:text-gray-400 font-medium mb-2">{exp.company} | {exp.location}</p>
                            <p className="text-gray-500 dark:text-gray-400">{exp.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
