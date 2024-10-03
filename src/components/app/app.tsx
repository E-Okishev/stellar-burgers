import '../../index.css';
import styles from './app.module.css';

import { AppRouterProvider } from '../providers/app-router-provider';
import { ReduxProvider } from '../providers/redux-provider';

const App = () => (
  <div className={styles.app}>
    <ReduxProvider>
      <AppRouterProvider />
    </ReduxProvider>
  </div>
);

export default App;
