<<<<<<< HEAD
const Button = ({ bg = 'dark', children ,onClick = ()=>{}}) => {
    const classes = `bg-${bg} py-4 px-12 rounded-full text-white`;
=======
import React, { ReactNode } from 'react';

interface ButtonProps {
    bg?: string;
    children: ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ bg = 'dark', children, className = '' }) => {
    const classes = `bg-${bg} py-4 px-12 rounded-full text-white ${className}`;
>>>>>>> 9eae48818fc4550ca61f2da16fc22e1c8ed0bc66
    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
