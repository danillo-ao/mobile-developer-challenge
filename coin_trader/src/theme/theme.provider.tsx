import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import theme from '@theme/theme';

const ThemeProvider: React.FC<any> = (props): React.FunctionComponentElement<any> => {
  return (
    <StyledThemeProvider theme={theme}>
      {props.children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
