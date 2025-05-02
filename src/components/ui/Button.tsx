import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  const baseClass = 'button';
  const variantClass = variant === 'secondary' ? 'button-secondary' : 'button-primary';

  const combinedClassName = `${baseClass} ${variantClass} ${className || ''}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
