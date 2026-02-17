

const skillCategories = [
    {
        title: "Mains (Operations)",
        items: [
            { name: "Station Management", desc: "Efficient organization of workflow" },
            { name: "Inventory Control", desc: "Minimizing waste & stock rotation" },
            { name: "Team Leadership", desc: "Coordinating service during rush" }
        ]
    },
    {
        title: "Sides (Technique)",
        items: [
            { name: "Knife Skills", desc: "Precision cutting and prep" },
            { name: "Plating & Presentation", desc: "Visual appeal consistency" },
            { name: "HACCP & Safety", desc: "Strict sanitation adherence" }
        ]
    }
];

const SkillsMenu = () => {
    return (
        <div className="py-12 bg-orange-50">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Skills Menu</span>
                    <h3 className="text-3xl font-serif font-bold text-gray-800 mt-2">Chef's Specialties</h3>
                    <div className="w-24 h-1 bg-orange-400 mx-auto mt-4"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {skillCategories.map((category, idx) => (
                        <div key={idx}>
                            <h4 className="text-xl font-bold text-orange-800 border-b border-orange-200 pb-2 mb-6 text-center font-serif">
                                {category.title}
                            </h4>
                            <ul className="space-y-6">
                                {category.items.map((item, i) => (
                                    <li key={i} className="flex justify-between items-baseline group hover:bg-white p-2 rounded transition-colors">
                                        <div className="flex-1">
                                            <span className="font-bold text-gray-800">{item.name}</span>
                                            <div className="text-sm text-gray-500 italic">{item.desc}</div>
                                        </div>
                                        <div className="hidden sm:block flex-1 border-b border-dotted border-gray-300 mx-2 relative -top-1"></div>
                                        <span className="font-bold text-orange-600">✯✯✯</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsMenu;
