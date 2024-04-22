import React, { ReactNode } from 'react';

interface ButtonProps {
    bg?: string;
    children: ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ bg = 'dark', children, className = '' }) => {
    const classes = `bg-${bg} py-4 px-12 rounded-full text-white ${className}`;
    return (
        <button className={classes}>
            {children}
        </button>
    );
};

export default Button;
