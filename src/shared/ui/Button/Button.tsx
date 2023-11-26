import { FC, HTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './button.module.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'button' | 'reset' | 'submit' | undefined;
}

export const Button: FC<ButtonProps> = ({ className, children, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className={cn(styles.button, className)}
    >
      {children}
    </button>
  );
};
