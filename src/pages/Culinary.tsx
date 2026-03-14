import Timeline from '../components/culinary/Timeline';
import SkillsMenu from '../components/culinary/SkillsMenu';
import DishGallery from '../components/culinary/DishGallery';
import ResumeDownloader from '../components/common/ResumeDownloader';

const Culinary = () => {
    return (
        <div className="bg-zinc-900 min-h-screen pt-16 transition-colors duration-300">
            <div className="bg-gradient-to-br from-orange-950 to-zinc-950 text-white py-16 px-4 transition-colors duration-300">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-orange-50">Culinary Excellence</h1>
                    <p className="text-orange-200/80 text-lg max-w-2xl mx-auto">
                        Precision, consistency, and leadership in high-volume kitchen environments.
                    </p>
                    <div className="mt-8">
                        <ResumeDownloader
                            label="Download Culinary Resume"
                            filePath="/assets/resumes/resume_culinary.pdf"
                            variant="outline"
                            className="text-white border-white hover:bg-white hover:text-orange-950"
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
