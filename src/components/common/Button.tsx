import React from 'react';
import { Link } from 'react-router-dom';
import type { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    className = '', 
    to, 
    type = 'button',
    disabled = false,
    target,
    rel,
    download,
}) => {
    const baseClasses = "inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-600/30 focus:ring-blue-500",
        secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:ring-zinc-500",
        outline: "border-2 border-current text-current hover:bg-zinc-100/10 dark:hover:bg-zinc-50/10 shadow-sm dark:shadow-none",
        ghost: "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800",
    };

    const classes = `${baseClasses} ${variants[variant ?? 'primary']} ${className}`;

    if (to) {
        // External link (has target="_blank" or starts with http)
        if (target === '_blank' || to.startsWith('http') || to.startsWith('/assets')) {
            return (
                <a href={to} className={classes} target={target} rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)} download={download}>
                    {children}
                </a>
            );
        }
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} type={type} disabled={disabled} className={classes}>
            {children}
        </button>
    );
};

export default Button;
