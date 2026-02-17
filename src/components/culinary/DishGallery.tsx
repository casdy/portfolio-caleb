import { motion } from 'framer-motion';

const dishes = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Salad
    "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Steak
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Sushi/Asian
];

const DishGallery = () => {
    return (
        <div className="py-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-orange-900">Plating Gallery</h3>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dishes.map((src, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                        <img src={src} alt={`Dish ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DishGallery;
