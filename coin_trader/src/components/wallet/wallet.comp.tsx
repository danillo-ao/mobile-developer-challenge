import * as React from 'react';
import { get } from 'lodash';

import {WalletProps} from '@components/wallet/wallet.types';
import {
  WalletCard,
  WalletComp,
  WalletActions,
  WalletBalanceCoin,
  WalletBalance, WalletUnits,
} from '@components/wallet/wallet.styles';

import Text from '@components/text/text.comp';
import Icon from '@components/icons/icon.comp';
import {Image, TouchableOpacity} from 'react-native';
import {getThemeColor} from '@theme/theme.utils';
import imagesUris from '@values/images.values';
import {currencyFormat} from '@utils/currency.util';


const Wallet: React.FC<WalletProps> = (props: WalletProps): React.FunctionComponentElement<WalletProps> => {

  const [visible, setVisible] = React.useState<boolean>(true);

  const brl: number = get(props, ['brlBalance'], 0);
  const btc: number = get(props, ['btcBalance'], 0);

  return (
    <WalletComp>
      <WalletCard>

        <WalletActions>
          <Image style={{ width: 30, height: 30, tintColor: getThemeColor('secondary') }} source={{ uri: imagesUris.icon }} />
          <TouchableOpacity hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }} onPress={() => { setVisible(!visible); }}>
            <Icon name={visible ? 'eye' : 'eye-off'} color={getThemeColor('white')} />
          </TouchableOpacity>
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
            <Text numberOfLines={1} ellipsizeMode="tail" family="titleBold" size="xxl">
              R$ {visible ? currencyFormat(btc) : '• • • • • •'}
            </Text>
          </WalletBalanceCoin>
        </WalletBalance>

        <WalletUnits>
          <Text size="sm">Unidades</Text>
          <Text size="sm">{visible ? '0,000' : '• • • •' }</Text>
        </WalletUnits>

      </WalletCard>
    </WalletComp>
  );
}

export default Wallet;
