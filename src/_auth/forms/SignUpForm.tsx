import { createPortal } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { createUserAccount } from 'lib/appwrite/api';
import { SignupValidation } from 'lib/validation';
import { Form } from 'views/Components/Form';
import { Button } from 'views/Elements/Button/Button';
import { Input } from 'views/Elements/Input/Input';
import { Loader } from 'views/Elements/Loader';
import { Toast } from 'views/Elements/Toast/Toast';

import { yupResolver } from '@hookform/resolvers/yup';

import styles from './SignUpForm.module.css';

type FormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export const SignUpForm = () => {
  const isLoading = false;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(SignupValidation),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
  const onSubmit = async (data: FormValues) => {
    const { email, name, password, username } = data;
    const newUser = await createUserAccount({
      email,
      name,
      password,
      username,
    });
    if (newUser) {
      return 'asd';
    }
  };

  return (
    <div className={styles.form__container}>
      <h2 className={styles.form__title}>Create a new account</h2>
      <p className={styles.form__subtitle}>To use snapgram, Please enter your details</p>
      <Form
        handleSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <div className={styles.form__item}>
              <Input
                placeholder="Name"
                onChange={onChange}
                value={value}
                className={cn({ [styles.invalid__field]: errors.name })}
              />
              {errors.name && <p className={styles.error__notify}>{errors.name?.message}</p>}
            </div>
          )}
        />

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <div className={styles.form__item}>
              <Input
                placeholder="Username"
                onChange={onChange}
                value={value}
                className={cn({ [styles.invalid__field]: errors.username })}
              />
              {errors.username && (
                <p className={styles.error__notify}>{errors.username?.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <div className={styles.form__item}>
              <Input
                placeholder="Email"
                onChange={onChange}
                value={value}
                type="email"
                className={cn({ [styles.invalid__field]: errors.email })}
              />
              {errors.email && <p className={styles.error__notify}>{errors.email?.message}</p>}
            </div>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <div className={styles.form__item}>
              <Input
                placeholder="Password"
                onChange={onChange}
                value={value}
                type="password"
                className={cn({ [styles.invalid__field]: errors.password })}
              />
              {errors.password && (
                <p className={styles.error__notify}> {errors.password?.message}</p>
              )}
            </div>
          )}
        />

        <Button type="submit">
          {isLoading ? (
            <div className={styles.loader__wrapper}>
              <Loader /> Loading...
            </div>
          ) : (
            'Sign Up'
          )}
        </Button>
      </Form>
      <p className={styles.already__account}>
        <span>Already have an account?</span>
        <Link to="/sign-in">Log in </Link>
      </p>
    </div>
  );
};
