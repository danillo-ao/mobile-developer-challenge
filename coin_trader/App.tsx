/**
 * Created by Danillo Alves de Oliveira
 * email: danillo.alves.o@gmail.com
 * github: https://github.com/danillo-ao/
 *
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the DrtYoshi's template
 * https://github.com/danillo-ao/react-native-dino-template
 *
 * This template was created based on react-native-typescript-template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 */
import * as React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import reduxStore, { reduxStorePersisted} from '@redux/store';

import {StatusBar} from 'react-native';
import Router from '@router/router.comp';
import {getThemeColor} from '@theme/theme.utils';
import Snackbar from '@components/snackbar/snackbar.comp';
import ThemeProvider from '@theme/theme.provider';


if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={reduxStorePersisted}>
        <ThemeProvider>

          <Snackbar>
            <StatusBar backgroundColor={getThemeColor('primary')} barStyle="dark-content" />
            <Router />
          </Snackbar>

        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
