import { FC, PropsWithChildren } from 'react';

import cn from 'classnames';

import styles from './Form.module.css';

interface FormProps {
  handleSubmit: () => void;
  className?: string;
}

export const Form: FC<PropsWithChildren<FormProps>> = ({ children, handleSubmit, className }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={cn(styles.form, className)}
    >
      {children}
    </form>
  );
};
