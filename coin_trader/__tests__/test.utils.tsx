import * as React from 'react';
import { render } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ThemeProvider from '@theme/theme.provider';
import {reducers} from '@redux/reducers';
import Snackbar from '@components/snackbar/snackbar.comp';


const INITIAL_STATE = reducers;
const mockStore = configureStore([]);
const store = mockStore(INITIAL_STATE);

const reduxRender = (ui, options = {}) => render(ui, {
  wrapper: ({ children }) => (
    <Provider store={store}>
      <ThemeProvider>
        <Snackbar>
          {children}
        </Snackbar>
      </ThemeProvider>
    </Provider>
  ),
  ...options,
});

// re-export everything for convenience
export * from 'react-native-testing-library';

// override render method
export { reduxRender as render, store };
