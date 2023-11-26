import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routeConfig } from '@shared/config/routeConfig/routeConfig';

const router = createBrowserRouter(routeConfig);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
