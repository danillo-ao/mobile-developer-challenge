import * as React from 'react';
import {Screen} from '@screens/screen.comp';
import Button from '@components/button/button.comp';

const HomeScreen: React.FC<any> = (): React.FunctionComponentElement<any> => {

  return (
    <Screen center pad>
      <Button>Entrar</Button>
    </Screen>
  );

};

export default HomeScreen;
