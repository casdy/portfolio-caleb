import React from 'react';
import { Download } from 'lucide-react';
import Button from './Button';
import type { ResumeDownloaderProps } from '../../types';

const ResumeDownloader: React.FC<ResumeDownloaderProps> = ({ 
    label, 
    filePath, 
    variant = 'outline', 
    className = '' 
}) => {
    return (
        <Button
            variant={variant}
            className={className}
            to={filePath}
            target="_blank"
            download
        >
            <Download size={18} className="mr-2" />
            {label}
        </Button>
    );
};

export default ResumeDownloader;
