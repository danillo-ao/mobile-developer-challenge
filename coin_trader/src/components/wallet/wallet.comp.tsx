import * as React from 'react';
import {get} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';

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
import {getBitcoinsData} from '@redux/actions/bitcoins.actions';


const Wallet: React.FC<WalletProps> = (): React.FunctionComponentElement<WalletProps> => {

  /** COMPONENTS VALUES */
  const dispatch = useDispatch();

  const brl: number = useSelector((state: RootReducer) => state.wallet.brl) ?? 0;
  const btc: number = useSelector((state: RootReducer) => state.wallet.btc) ?? 0;
  const btcUnit: number = useSelector((state: RootReducer) => state.wallet.btc_unit) ?? 0;
  const error: boolean = useSelector((state: RootReducer) => state.bitcoin.error) ?? false;
  /** END OF COMPONENTS VALUES */
  /** STATES */
  const [visible, setVisible] = React.useState<boolean>(true);
  const [refetching, setRefetching] = React.useState<boolean>(false);
  /** END OF STATES */

  const refetchBitcoinsData = async () => {
    if (!refetching) {
      setRefetching(true);
      await dispatch(getBitcoinsData());
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

export default Wallet;
