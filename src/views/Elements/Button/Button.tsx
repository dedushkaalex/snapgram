import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import cn from 'classnames';

import styles from './button.module.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(styles.button, className)}
    >
      {children}
    </button>
  );
};
