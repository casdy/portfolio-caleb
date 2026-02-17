
import { Building2 } from 'lucide-react';

const companies = [
    { name: "IG Wealth Management", role: "Senior Client Relations", period: "2022-2023" },
    { name: "7x Powered Group", role: "Client Success Specialist", period: "2022" },
    { name: "24-7 Intouch", role: "Customer Service Rep", period: "2020" }
];

const CompanyLogos = () => {
    return (
        <div className="py-16 bg-gray-50 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-8">Trusted by Industry Leaders</h3>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                    {companies.map((company, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Building2 className="text-gray-400 group-hover:text-blue-600" size={32} />
                            </div>
                            <span className="font-bold text-gray-800">{company.name}</span>
                            <span className="text-sm text-gray-500">{company.role}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyLogos;
