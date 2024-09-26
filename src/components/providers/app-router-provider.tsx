import { RouterProvider } from 'react-router-dom';
import { RouterConfig } from '../../services/models/router-config';

export const AppRouterProvider = () => <RouterProvider router={RouterConfig} />;
