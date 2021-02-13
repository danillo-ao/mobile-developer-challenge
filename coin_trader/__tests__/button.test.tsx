/**
 * @format
 */

import 'react-native';
import React from 'react';

import { render } from './test.utils';
import Button from '@components/button/button.comp';

describe('First test', function () {

  test('renders correctly', () => {
    const button = render(<Button>Teste</Button>);
    expect(true).toBeTruthy();
  });

});
