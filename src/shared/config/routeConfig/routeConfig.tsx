import { RouteObject } from 'react-router-dom';

import { SignInForm } from '_auth/forms/SignInForm';
import { SignUpForm } from '_auth/forms/SignUpForm';
import { RootLayout } from '_root/RootLayout';
import { Home } from '_root/pages';

import { AuthLayout } from '@app/layout/SignInUpLayout/ui/AuthLayout';
import { AuthProvider } from '@app/providers/AuthProvider';

export const enum AppRoutes {
  HOME = 'home',
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.SIGN_IN]: '/sign-in',
  [AppRoutes.SIGN_UP]: '/sign-up',
};

export const routeConfig: RouteObject[] = [
  {
    element: (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/sign-in',
        element: <SignInForm />,
      },
      {
        path: '/sign-up',
        element: <SignUpForm />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];
