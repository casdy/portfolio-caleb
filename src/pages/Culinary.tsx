import Timeline from '../components/culinary/Timeline';
import SkillsMenu from '../components/culinary/SkillsMenu';
import DishGallery from '../components/culinary/DishGallery';
import ResumeDownloader from '../components/common/ResumeDownloader';

const Culinary = () => {
    return (
        <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen pt-16">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-950 dark:to-zinc-950 text-zinc-900 dark:text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-orange-900 dark:text-orange-50">Culinary Excellence</h1>
                    <p className="text-orange-700/80 dark:text-orange-200/80 text-lg max-w-2xl mx-auto">
                        Precision, consistency, and leadership in high-volume kitchen environments.
                    </p>
                    <div className="mt-8">
                        <ResumeDownloader
                            label="Download Culinary Resume"
                            sector="Culinary"
                            variant="outline"
                            className="text-orange-900 dark:text-white border-orange-900 dark:border-white hover:bg-orange-900 dark:hover:bg-white hover:text-white dark:hover:text-orange-950"
                        />
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
