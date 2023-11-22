import { FC, useEffect, useState } from 'react';

import cn from 'classnames';

import styles from './Toast.module.css';

interface ToastProps {
  variant?: 'destructive' | 'default';
  title: string;
  description?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Toast = ({ description, title, variant = 'default' }: ToastProps) => {
  const [show, setShow] = useState(true);
  const [animation, setAnimation] = useState(true);

  // eslint-disable-next-line consistent-return
  const handleClose = async (ms: number) => {
    setAnimation(false);
    await new Promise((r) => setTimeout(r, ms));
    setShow(false);
  };

  useEffect(() => {
    const hideToast = async () => {
      await new Promise((r) => setTimeout(r, 5000));
      setAnimation(false);
      await new Promise((r) => setTimeout(r, 300));
      setShow(false);
    };
    hideToast();
  }, []);

  if (!show) return null;

  return (
    <div
      className={cn(styles.toast, {
        [styles.hide__toast]: !animation,
        [styles.destructive__type]: variant === 'destructive',
      })}
    >
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <button className={styles.main__button}>Try again</button>
      <button
        className={styles.close}
        onClick={() => handleClose(600)}
      >
        X
      </button>
    </div>
  );
};
