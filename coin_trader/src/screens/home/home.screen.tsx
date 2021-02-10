import * as React from 'react';
import { Image } from 'react-native';
import {Screen} from '@screens/screen.comp';
import Button from '@components/button/button.comp';
import { useNavigation } from '@react-navigation/native';
import routes from '@router/routes.config';

import Text from '@components/text/text.comp';

const HomeScreen: React.FC<any> = (): React.FunctionComponentElement<any> => {

  const navigation = useNavigation();

  return (
    <Screen center pad>
      <Image style={{ width: 100, height: 100 }} source={{ uri: 'https://i.ibb.co/T1Tzr1g/icon.png' }} />
      <Text family="titleBold" color="white" size="xxl">
        Coin_Trader
      </Text>

      <Button onPress={() => { navigation.navigate(routes.transactions); }}>Entrar</Button>
    </Screen>
  );

};

export default HomeScreen;
