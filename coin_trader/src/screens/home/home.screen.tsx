import * as React from 'react';
import {ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {getBitcoinsData} from '@redux/actions/bitcoins.actions';

import routes from '@router/routes.config';
import {Screen} from '@screens/screen.comp';
import {HomeScreenProps} from '@screens/home/home.types';
import Text from '@components/text/text.comp';
import Button from '@components/button/button.comp';
import {getThemeColor} from '@theme/theme.utils';
import {ButtonWrapper, ClearButton, ClearButtonLabel, ImageLogo} from '@screens/home/home.styles';
import Icon from '@components/icons/icon.comp';
import {clearHistory} from '@redux/actions/orders.actions';
import {SnackbarContext} from '@components/snackbar/snackbar.comp';
import {snackbarTypes} from '@components/snackbar/snackbar.types';

const bitcoinIcon = require('@assets/images/bitcoin-science.png');

const HomeScreen: React.FC<HomeScreenProps> = (): React.FunctionComponentElement<HomeScreenProps> => {
  /** COMPONENT VALUES */
  const navigation = useNavigation();
  const dispatch = useDispatch();
  /** END OF COMPONENT VALUES */
  /** CONTEXTS */
  const snackbar = React.useContext(SnackbarContext);
  /** END OF CONTEXTS */
  /** END OF COMPONENT VALUES */
  /** STATES */
  const [fetching, setFetching] = React.useState<boolean>(false);
  /** END OF STATES */


  /**
   * used to clear the wallet and transactions history
   */
  const handleClearHistory = React.useCallback(async () => {
    const clear = await dispatch(clearHistory());
    if (clear) {
      snackbar.show('Carteira e histórico de transações resetados.', snackbarTypes.success);
    } else {
      snackbar.show('Não foi possível limpar os seus dados. Por favor, tente novamente', snackbarTypes.error);
    }
  }, [dispatch, snackbar]);

  /**
   * Used to fetch the bitcoin data and redirect user to the extract
   */
  const handleLogin = React.useCallback(async (): Promise<void> => {
    if (!fetching) {
      setFetching(true);
      // get the bitcoin data
      await dispatch(getBitcoinsData());
      setFetching(false);

      navigation.navigate(routes.transactions);
    }
  }, [fetching, navigation, dispatch]); // handleLogin

  return (
    <Screen center pad>
      <ImageLogo style={{ width: 100, height: 100 }} source={bitcoinIcon} />
      <Text family="titleBold" color="white" size="xxl">
        Coin_Trader
      </Text>

      <ButtonWrapper>
        <Button onPress={handleLogin}>
          {fetching ? <ActivityIndicator size={19} color={getThemeColor('black')} /> : 'Entrar'}
        </Button>
      </ButtonWrapper>

      <ClearButton>
        <Icon name="trash" color={getThemeColor('white')} />
        <ClearButtonLabel onPress={handleClearHistory}>Limpar histórico</ClearButtonLabel>
      </ClearButton>
    </Screen>
  );

};

export default HomeScreen;
