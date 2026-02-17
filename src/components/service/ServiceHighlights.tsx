import { MessageCircle, Heart, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
    {
        icon: MessageCircle,
        title: "Communication",
        description: "Expertise in active listening and clear verbal/written communication to resolve conflicts and build trust."
    },
    {
        icon: Heart,
        title: "Empathy",
        description: "Deep understanding of client needs, ensuring they feel heard and valued in every interaction."
    },
    {
        icon: Users,
        title: "Client Relations",
        description: "Proven track record of managing high-value accounts and fostering long-term relationships."
    },
    {
        icon: Target,
        title: "Success Strategy",
        description: "Proactive identification of opportunities to enhance client satisfaction and retention."
    }
];

const ServiceHighlights = () => {
    return (
        <div className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Service Excellence</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 bg-blue-50 dark:bg-slate-900 rounded-xl hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceHighlights;
