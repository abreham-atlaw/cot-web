const Button = ({ bg = 'dark', children }) => {
    const classes = `bg-${bg} py-4 px-12 rounded-full text-white`;
    return (
        <button className={classes}>
            {children}
        </button>
    );
};

export default Button;
