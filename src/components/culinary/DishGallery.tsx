import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

interface CulinaryItem {
    id: string;
    caption: string;
    image_url: string;
    created_at: string;
}

const DishGallery = () => {
    const [dishes, setDishes] = useState<CulinaryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const { data, error } = await supabase
                    .from('culinary_items')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                if (data) setDishes(data);
            } catch (err) {
                console.error('Failed to load culinary gallery:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    return (
        <div className="py-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-orange-900 dark:text-orange-100">Plating Gallery</h3>
            
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
            ) : dishes.length === 0 ? (
                <p className="text-center text-zinc-500">No dishes uploaded yet.</p>
            ) : (
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {dishes.map((dish) => (
                        <div key={dish.id} className="group relative aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            <img src={dish.image_url} alt={dish.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <p className="text-white font-medium text-sm">{dish.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DishGallery;
