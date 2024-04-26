import React, { ReactNode } from 'react';

interface ButtonProps {
    bg?: string;
    children: ReactNode;
    className?: string;
    onClick?:()=>void
}

const Button: React.FC<ButtonProps> = ({ bg = 'dark', children, className = '',onClick }) => {
    const classes = `bg-${bg} py-4 px-12 rounded-full text-white ${className}`;
    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
