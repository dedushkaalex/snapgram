import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import cn from 'classnames';
import { useSignInAccount } from 'lib/react-query/queriesAndMutations';
import { SigninValidation } from 'lib/validation';

import { useUserContext } from '@app/providers/AuthProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Loader, Toast } from '@shared/ui';

import styles from './SignUpForm.module.css';

type FormValues = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const {
    mutateAsync: signInAccount,
    isPending: isSigningUser,
    isError: signError,
  } = useSignInAccount();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { checkAuthUser, isLoading: isUserLoading, setIsAuthenticated, setUser } = useUserContext();
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(SigninValidation),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;
    const session = await signInAccount({ email, password });

    if (!session) {
      console.log('Sign In Failed. Please try again');
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      reset();

      navigate('/');
    } else {
      console.log('Sign In Failed. Please try again');
    }
  };

  return (
    <div className={styles.form__container}>
      <h2 className={styles.form__title}>Log in to your account</h2>
      <p className={styles.form__subtitle}>Welcome back! Please enter your details</p>
      <Form
        handleSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
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
          {isSigningUser ? (
            <div className={styles.loader__wrapper}>
              <Loader /> Loading...
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </Form>
      <p className={styles.already__account}>
        <span>Don&apos;t have an account?</span>
        <Link to="/sign-up">Sign up </Link>
      </p>
    </div>
  );
};
