import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '_auth/AuthLayout';
import { SignInForm } from '_auth/forms/SignInForm';
import { SignUpForm } from '_auth/forms/SignUpForm';
import { RootLayout } from '_root/RootLayout';
import { Home } from '_root/pages';
import { AuthContextProvider } from 'context/AuthContext';
import { Toast } from 'views/Elements/Toast/Toast';

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <AuthLayout />
      </AuthContextProvider>
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
      <AuthContextProvider>
        <RootLayout />
      </AuthContextProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
