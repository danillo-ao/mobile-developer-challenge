import * as React from 'react';
import {get} from 'lodash';
import {connect} from 'react-redux';

import {WalletProps} from '@components/wallet/wallet.types';
import {
  WalletCard,
  WalletComp,
  WalletActions,
  WalletBalanceCoin,
  WalletBalance, WalletUnits, WalletActionsGroup, WalletAction,
} from '@components/wallet/wallet.styles';

import Text from '@components/text/text.comp';
import Icon from '@components/icons/icon.comp';
import {ActivityIndicator, Image} from 'react-native';
import {getThemeColor} from '@theme/theme.utils';
import imagesUris from '@values/images.values';
import {parseBtc, currencyFormat} from '@utils/currency.util';
import {RootReducer} from '@redux/reducers';
import {bindActionCreators, Dispatch} from 'redux';
import {getBitcoinsData} from '@redux/actions/bitcoins.actions';


const Wallet: React.FC<WalletProps> = (props: WalletProps): React.FunctionComponentElement<WalletProps> => {

  const [visible, setVisible] = React.useState<boolean>(true);
  const [refetching, setRefetching] = React.useState<boolean>(false);

  const brl: number = get(props, ['store', 'wallet', 'brl'], 0);
  const btc: number = get(props, ['store', 'wallet', 'btc'], 0);
  const btcUnit: number = get(props, ['store', 'wallet', 'btc_unit'], 0);
  const error: boolean = get(props, ['store', 'errorBtc'], false);

  const refetchBitcoinsData = async () => {
    if (!refetching) {
      setRefetching(true);
      await props.actions.getBitcoinsData();
      setRefetching(false);
    }
  }; // refetchBitcoinsData

  return (
    <WalletComp>
      <WalletCard>

        <WalletActions>
          <Image style={{ width: 30, height: 30, tintColor: getThemeColor('secondary') }} source={{ uri: imagesUris.icon }} />

          <WalletActionsGroup>
            <WalletAction hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }} onPress={refetchBitcoinsData}>
              {(refetching)
                ? (<ActivityIndicator size={24} color={getThemeColor('white')} />)
                : (<Icon name="refresh-cw" color={getThemeColor('white')} />)
              }
            </WalletAction>
            <WalletAction hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }} onPress={() => { setVisible(!visible); }}>
              <Icon name={visible ? 'eye' : 'eye-off'} color={getThemeColor('white')} />
            </WalletAction>
          </WalletActionsGroup>
        </WalletActions>


        <WalletBalance>
          <WalletBalanceCoin>
            <Text>Saldo em Reais</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" family="titleBold" size="xxl">
              R$ {visible ? currencyFormat(brl) : '• • • • • •'}
            </Text>
          </WalletBalanceCoin>

          <WalletBalanceCoin toEnd>
            <Text>Saldo em Bitcoins</Text>
            <Text color={error ? 'error' : 'white'} numberOfLines={1} ellipsizeMode="tail" family="titleBold" size="xxl">
              R$ {visible ? currencyFormat(btc) : '• • • • • •'}
            </Text>
          </WalletBalanceCoin>
        </WalletBalance>

        <WalletUnits>
          <Text size="sm">Unidades</Text>
          <Text size="sm">{visible ? parseBtc(btcUnit, 8) : '• • • •' }</Text>
        </WalletUnits>

      </WalletCard>
    </WalletComp>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    getBitcoinsData,
  }, dispatch),
});

const mapStateToProps = (state: RootReducer) => ({
  store: {
    errorBtc: state.bitcoin.error,
    wallet: state.wallet,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
