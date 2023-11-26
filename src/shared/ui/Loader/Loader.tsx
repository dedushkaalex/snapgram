import styles from './Loader.module.css';

export const Loader = () => {
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
