import { createBrowserRouter } from 'react-router-dom';
import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, Register, ResetPassword } from '@pages';
import { AppProvider } from '../../components/providers/app-provider';
import { AuthProvider } from '../../components/providers/auth-provider';
import { AuthGuard } from '../../components/providers/auth-guard';
import { DetailFeed } from '../../pages/detail-feed';
import { DetailIngredient } from '../../pages/detail-ingredient';

export const RouterConfig = createBrowserRouter([
  {
    element: <AppProvider />,
    children: [{
      element: <AuthProvider />,
      children: [
        {
          path: '/',
          element: <ConstructorPage />
        },
        {
          path: '/feed',
          element: <Feed />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/forgot-password',
          element: <ForgotPassword />
        },
        {
          path: '/reset-password',
          element: <ResetPassword />
        },
        {
          path: '/profile',
          element: <AuthGuard><Profile /></AuthGuard>
        },
        {
          path: '/feed/:number',
          element: <DetailFeed />
        },
        {
          path: '/ingredients/:id',
          element: <DetailIngredient />
        },
        {
          path: '*',
          element: <NotFound404 />
        }
      ]
    }]
  }
]);
