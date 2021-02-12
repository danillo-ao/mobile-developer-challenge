import * as React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useNavigation } from '@react-navigation/native';

import { getBitcoinsData } from '@redux/actions/bitcoins.actions';

import routes from '@router/routes.config';
import { Screen } from '@screens/screen.comp';
import {HomeProps} from '@screens/home/home.types';
import Text from '@components/text/text.comp';
import Button from '@components/button/button.comp';
import imagesUris from '@values/images.values';
import {getThemeColor} from '@theme/theme.utils';
import {SnackbarContext} from '@components/snackbar/snackbar.comp';


const HomeScreen: React.FC<HomeProps> = (props: HomeProps): React.FunctionComponentElement<HomeProps> => {

  const navigation = useNavigation();

  const [fetching, setFetching] = React.useState<boolean>(false);

  const snackbar = React.useContext(SnackbarContext);

  snackbar.show('testeeeee');

  /**
   * Used to fetch the bitcoin data and redirect user to the extract
   */
  const handleLogin = async (): Promise<void> => {
    if (!fetching) {
      setFetching(true);
      // get the bitcoin data
      await props.actions.getBitcoinsData();
      setFetching(false);

      navigation.navigate(routes.transactions);
    }
  }; // handleLogin

  return (
    <Screen center pad>
      <Image style={{ width: 100, height: 100 }} source={{ uri: imagesUris.icon_colored }} />
      <Text family="titleBold" color="white" size="xxl">
        Coin_Trader
      </Text>

      <Button onPress={handleLogin}>
        {fetching ? <ActivityIndicator size={19} color={getThemeColor('black')} /> : 'Entrar'}
      </Button>
    </Screen>
  );

};


const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    getBitcoinsData,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(HomeScreen);
