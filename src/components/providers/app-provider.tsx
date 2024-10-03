import { AppHeader } from '@components';
import { Outlet } from 'react-router-dom';

export const AppProvider = () => (
  <>
    <AppHeader />
    <Outlet />
  </>
);
