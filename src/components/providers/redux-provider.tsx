import { Provider } from 'react-redux';
import store from '../../services/store/store';
import { FC, PropsWithChildren } from 'react';

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
