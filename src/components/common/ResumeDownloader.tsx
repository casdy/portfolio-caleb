import React, { useState, useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';
import Button from './Button';
import type { ResumeDownloaderProps } from '../../types';
import { supabase } from '../../lib/supabase';

const ResumeDownloader: React.FC<ResumeDownloaderProps> = ({ 
    label, 
    sector, 
    variant = 'outline', 
    className = '' 
}) => {
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchResume = async () => {
            try {
                const { data, error } = await supabase
                    .from('resumes')
                    .select('file_url')
                    .eq('sector', sector)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (error) {
                    console.error('Error fetching resume for sector', sector, error);
                } else if (data && isMounted) {
                    setUrl(data.file_url);
                }
            } catch (err) {
                console.error('Failed to fetch resume', err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchResume();

        return () => { isMounted = false; };
    }, [sector]);

    if (loading) {
        return (
            <Button variant={variant} className={`opacity-70 cursor-not-allowed ${className}`} disabled>
                <Loader2 size={18} className="mr-2 animate-spin" />
                {label}
            </Button>
        );
    }

    if (!url) {
         // Fallback if no resume found for this sector yet
         return (
             <Button variant={variant} className={`opacity-50 cursor-not-allowed ${className}`} disabled>
                 <Download size={18} className="mr-2" />
                 Unavailable
             </Button>
         );
    }

    return (
        <Button
            variant={variant}
            className={className}
            to={url}
            target="_blank"
            download
        >
            <Download size={18} className="mr-2" />
            {label}
        </Button>
    );
};

export default ResumeDownloader;
