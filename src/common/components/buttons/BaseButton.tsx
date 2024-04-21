const Button = ({ bg = 'dark', children ,onClick = ()=>{}}) => {
    const classes = `bg-${bg} py-4 px-12 rounded-full text-white`;
    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
