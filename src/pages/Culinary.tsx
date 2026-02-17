import Timeline from '../components/culinary/Timeline';
import SkillsMenu from '../components/culinary/SkillsMenu';
import DishGallery from '../components/culinary/DishGallery';
import { Download } from 'lucide-react';
import Button from '../components/common/Button';

const Culinary = () => {
    return (
        <div className="bg-orange-50/30 dark:bg-zinc-900 min-h-screen pt-16 transition-colors duration-300">
            <div className="bg-orange-900 dark:bg-orange-950 text-white py-16 px-4 transition-colors duration-300">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white dark:text-orange-50">Culinary Excellence</h1>
                    <p className="text-orange-100 dark:text-orange-200/80 text-lg max-w-2xl mx-auto">
                        Precision, consistency, and leadership in high-volume kitchen environments.
                    </p>
                    <div className="mt-8">
                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-orange-900 dark:hover:text-orange-950" to="/assets/resumes/resume_culinary.pdf" target="_blank">
                            <Download size={18} className="mr-2" />
                            Download Culinary Resume
                        </Button>
                    </div>
                </div>
            </div>

            <Timeline />
            <SkillsMenu />
            <DishGallery />
        </div>
    );
};

export default Culinary;
