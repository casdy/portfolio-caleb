import { Download } from 'lucide-react';
import Button from '../components/common/Button';
import ServiceHighlights from '../components/service/ServiceHighlights';
import CompanyLogos from '../components/service/CompanyLogos';

const Service = () => {
    return (
        <div className="pt-16 min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
            <div className="bg-blue-900 dark:bg-blue-950 text-white py-20 px-4 transition-colors duration-300">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-blue-50">Client Success & Relations</h1>
                    <p className="text-blue-100 dark:text-blue-200/80 text-lg max-w-2xl mx-auto mb-8">
                        Building lasting relationships through empathy, strategic problem-solving, and dedication to customer satisfaction.
                    </p>
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900 dark:hover:text-blue-950" to="/assets/resumes/resume_service.pdf" target="_blank">
                        <Download size={18} className="mr-2" />
                        Download Service Resume
                    </Button>
                </div>
            </div>

            <ServiceHighlights />
            <CompanyLogos />
        </div>
    );
};

export default Service;
