import ResumeDownloader from '../components/common/ResumeDownloader';
import ServiceHighlights from '../components/service/ServiceHighlights';
import CompanyLogos from '../components/service/CompanyLogos';

const Service = () => {
    return (
        <div className="pt-16 min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950 dark:to-zinc-950 text-zinc-900 dark:text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900 dark:text-blue-50">Client Success & Relations</h1>
                    <p className="text-blue-700/80 dark:text-blue-200/80 text-lg max-w-2xl mx-auto mb-8">
                        Building lasting relationships through empathy, strategic problem-solving, and dedication to customer satisfaction.
                    </p>
                    <ResumeDownloader
                        label="Download Service Resume"
                        sector="Service"
                        variant="outline"
                        className="text-blue-900 dark:text-white border-blue-900 dark:border-white hover:bg-blue-900 dark:hover:bg-white hover:text-white dark:hover:text-blue-950"
                    />
                </div>
            </div>

            <ServiceHighlights />
            <CompanyLogos />
        </div>
    );
};

export default Service;
