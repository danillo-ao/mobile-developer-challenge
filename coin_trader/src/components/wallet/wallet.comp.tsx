import * as React from 'react';
import {WalletProps} from '@components/wallet/wallet.types';
import {
  WalletCard,
  WalletComp,
  WalletActions,
  WalletBalanceCoin,
  WalletBalance
} from '@components/wallet/wallet.styles';

import Text from '@components/text/text.comp';
import Icon from '@components/icons/icon.comp';
import {Image, TouchableOpacity} from 'react-native';
import {getThemeColor} from '@theme/theme.utils';

const Wallet: React.FC<WalletProps> = (props: WalletProps): React.FunctionComponentElement<WalletProps> => {
  return (
    <WalletComp>
      <WalletCard>

        <WalletActions>
          <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://i.ibb.co/T1Tzr1g/icon.png' }} />
          <TouchableOpacity hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Icon name="eye" color={getThemeColor('white')} />
          </TouchableOpacity>
        </WalletActions>


        <WalletBalance>
          <WalletBalanceCoin>
            <Text color="white" >Saldo em Reais</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" color="white" family="titleBold" size="xxl">R$ 10.000,00</Text>
          </WalletBalanceCoin>

          <WalletBalanceCoin toEnd>
            <Text color="white">Saldo em Bitcoins</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" color="white" family="titleBold" size="xxl">R$ 300.000,00</Text>
          </WalletBalanceCoin>
        </WalletBalance>

      </WalletCard>
    </WalletComp>
  );
}

export default Wallet;
