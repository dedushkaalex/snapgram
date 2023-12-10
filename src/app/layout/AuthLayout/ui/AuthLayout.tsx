import { Navigate, Outlet } from 'react-router-dom';

import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
  const isAuth = false;

  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className={styles.content}>
            <Outlet />
          </section>
          <img
            className={styles.content__bg}
            src="/assets/images/side-img.svg"
            alt=""
          />
        </>
      )}
    </>
  );
};
