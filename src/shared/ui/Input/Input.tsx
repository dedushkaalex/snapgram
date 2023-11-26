import { FC, HTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './Input.module.css';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  placeholder?: string;
  onChange: () => void;
  value: string;
}

export const Input: FC<InputProps> = ({
  className = '',
  type = 'text',
  placeholder = '',
  onChange,
  value,
}) => {
  return (
    <div>
      <label className={styles.label}>
        <input
          type={type}
          className={cn(styles.input, className)}
          autoComplete="off"
          placeholder=""
          value={value}
          onChange={onChange}
        />
        <span className={cn(styles.placeholder)}>{placeholder}</span>
      </label>
    </div>
  );
};
