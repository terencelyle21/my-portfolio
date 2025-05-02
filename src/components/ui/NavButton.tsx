import React from 'react';
import '../../styles/NavButton.css';

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'default' | 'contact';
}

const NavButton: React.FC<NavButtonProps> = ({ children, className, variant = 'default', ...props }) => {
    const baseClass = 'nav-button';
    const variantClass = variant === 'contact' ? 'nav-button--contact' : '';
    const combinedClassName = `${baseClass} ${variantClass} ${className || ''}`.trim();

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};

export default NavButton;