import { FC } from 'react';

import styles from './Loader.module.css';

interface LoaderProps {}

export const Loader: FC<LoaderProps> = () => {
  return (
    <div className={styles.loader}>
      <img
        src="/assets/icons/loader.svg"
        width={24}
        height={24}
        alt=""
      />
    </div>
  );
};
