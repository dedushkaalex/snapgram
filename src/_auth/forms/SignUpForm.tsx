import { createPortal } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import cn from 'classnames';
import { signInAccount } from 'lib/appwrite/api';
import { useCreateUserAccount, useSignInAccount } from 'lib/react-query/queriesAndMutations';
import { SignupValidation } from 'lib/validation';

import { useUserContext } from '@app/providers/AuthProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Loader, Toast } from '@shared/ui';

import styles from './SignUpForm.module.css';

type FormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export const SignUpForm = () => {
  const {
    mutateAsync: createUserAccount,
    isPending: isCreatingUser,
    isError: createUserError,
  } = useCreateUserAccount();
  // const { mutateAsync: signInAccount, isLoading: isSigningUser } = useSignInAccount();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
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

  const onSubmit = async (data: FormValues) => {
    const { email, name, password, username } = data;
    const newUser = await createUserAccount({
      email,
      name,
      password,
      username,
    });
    if (!newUser) {
      return <Toast title="we" />;
    }

    const session = await signInAccount({ email, password });

    if (!session) {
      console.log('ошибка');
    }

    const isLoggedIn = await checkAuthUser();

    console.log(isLoggedIn);

    if (isLoggedIn) {
      reset();
      navigate('/');
    } else {
      console.log('Toast');
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
          {isCreatingUser ? (
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
