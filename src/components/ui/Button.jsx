export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    type = 'button',
    ...props
    }) {
    const base =
        'inline-flex items-center justify-center font-semibold rounded transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-light',
        accent: 'bg-accent text-primary hover:bg-accent-hover',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
        ghost: 'text-primary hover:bg-blue-50',
        white: 'bg-white text-primary border border-gray-200 hover:bg-gray-50',
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
    }

    return (
        <button
        type={type}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
        >
        {children}
        </button>
    )
}
