import * as React from 'react';
import {Screen, ScreenScroll, ScreenScrollInner} from '@screens/screen.comp';
import {ActivityIndicator, Animated} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootReducer } from '@redux/reducers';

import { get } from 'lodash';

import Text from '@components/text/text.comp';
import Header from '@components/headers/header.comp';
import Toggle from '@components/toggle/toggle.comp';
import {
  OrderCurrencyInput,
  OrderFinishAction,
  OrderLine,
  OrderPrice,
  OrderPriceDetails,
  OrderPriceValue,
  OrderResumeBalance,
  OrderResumeBalanceInner,
  OrderResumeCol,
  OrderShortcut,
  OrderShortcutAction,
  OrderShortcutsValues,
  OrderType,
  OrderTypes,
  OrderLineRow,
} from '@screens/order/order.styles';
import Button from '@components/button/button.comp';
import {getDate} from '@utils/date.util';
import {OrderScreenProps} from '@screens/order/order.types';
import {getBitcoinsData} from '@redux/actions/bitcoins.actions';
import {getThemeColor} from '@theme/theme.utils';
import {parseBtc, currencyFormat} from '@utils/currency.util';
import {BitcoinReducer} from '@redux/reducers/bitcoin/bitcoin.types';
import {WalletReducer} from '@redux/reducers/wallet/wallet.types';

const OrderScreen: React.FC<OrderScreenProps> = (props: OrderScreenProps): React.FunctionComponentElement<OrderScreenProps> => {

  const bitcoin: BitcoinReducer = get(props, ['store', 'bitcoin']);
  const wallet: WalletReducer = get(props, ['store', 'wallet']);


  const [sellOrder, setSellOrder] = React.useState<boolean>(false);
  const [fetching, setFetching] = React.useState<boolean>(true);
  const [animation] = React.useState<Animated.Value>(new Animated.Value(1));

  const [buyValue, setBuyValue] = React.useState<number>(0);
  const [sellQuantity, setSellQuantity] = React.useState<number>(0);
  const [orderResultSell, setOrderResultSell] = React.useState<number>(0);
  const [orderResultBuy, setOrderResultBuy] = React.useState<number>(0);

  React.useEffect(() => {
    // btc unit
    if (buyValue >= 1) {
      setOrderResultBuy(buyValue / bitcoin.last);
    } else {
      setOrderResultBuy(0);
    }
  }, [buyValue, bitcoin.last]);

  React.useEffect(() => {
    // brl
    setOrderResultSell(sellQuantity * bitcoin.last);
  }, [sellQuantity, bitcoin.last]);


  /**
   * Used to fetch the bitcoins data again, to keep it updated
   * used once when the screen become focused
   */
  const fetchBitcoins = React.useCallback(async () => {
    await props.actions.getBitcoinsData();
    setFetching(false);
  }, [props.actions]);

  /**
   * Used to manually refetch the bitcoin data
   */
  const refetchBitcoins = () => {
    if (!fetching) {
      setFetching(true);
      fetchBitcoins(); // call the function to get the data
    }
  }; // refetchBitcoins

  React.useEffect(() => { fetchBitcoins(); }, [fetchBitcoins]);

  const handleOrderType = (orderType): void => {
    // only change the value and run the animation if both as different
    if (orderType !== sellOrder) {
      Animated.sequence([
        Animated.timing(animation, { toValue: 0.1, duration: 200, useNativeDriver: true }),
        Animated.timing(animation, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
      setTimeout(() => { setSellOrder(orderType); }, 100);
    }
  }; // handleOrderType


  const shortcutValue = (percent: number): void => {
    // if the order is a sell type, the shortcut must be used to btc units
    if (sellOrder) {
      const value = ((wallet.btc_unit * percent) / 100);
      setSellQuantity(value);

    } else {
      // if is a buy order, the shortcut must be used to brl
      const value = ((wallet.brl * percent) / 100);
      setBuyValue(value);
    }

  }; // shortcutValue

  /**
   * ----------------
   * Render Functions
   * ----------------
   */

  /**
   * Render the input for how much the user will buy
   */
  const renderBuyValue = (): React.FunctionComponentElement<any> => (
    <OrderLine>
      <OrderLineRow>
        <Text>Valor</Text>
        <Text style={{ opacity: 0.4 }}>Valor mínimo: R$ 1,00</Text>
      </OrderLineRow>
      <OrderCurrencyInput value={buyValue} unit="R$ " onChangeValue={setBuyValue} />
    </OrderLine>
  ); // renderBuyValue

  /**
   * Render the input for how much the user will sell
   */
  const renderSellValue = (): React.FunctionComponentElement<any> => (
    <OrderLine>
      <Text>Quantidade</Text>
      <OrderCurrencyInput value={sellQuantity} precision={8} onChangeValue={setSellQuantity} />
    </OrderLine>
  ); // renderSellValue

  /**
   * Render the result of the order in brl
   */
  const renderOrderResultSell = (): React.FunctionComponentElement<any> => (
    <OrderLine largeMargin>
      <Text color="green">Quantidade em Reais:</Text>
      <Text color="primary" shade="lighter">R$ {currencyFormat(orderResultSell)}</Text>
    </OrderLine>
  ); // renderOrderResultSell

  /**
   * Render the result of the order in bitcoun units
   */
  const renderOrderResultBuy = (): React.FunctionComponentElement<any> => (
    <OrderLine largeMargin>
      <Text color="green">Quantidade em Bitcoins</Text>
      <Text color="primary" shade="lighter">{parseBtc(orderResultBuy)}</Text>
    </OrderLine>
  ); // renderOrderResultBuy


  return (
    <Screen>
      <Header
        title="Nova Ordem"
        actionIcon="refresh-cw"
        action={refetchBitcoins}
      />

      <ScreenScroll>
        <ScreenScrollInner>

          <OrderPrice>

            <Text>Ultimo preço</Text>

            <OrderPriceValue>
              <Text size="ssm" style={{ marginRight: 5 }}>R$</Text>
              {fetching
                ? (<ActivityIndicator color={getThemeColor('white')} size={31} />)
                : (<Text size="xxxl" family="titleBold">{currencyFormat(bitcoin.last)}</Text>)
              }
            </OrderPriceValue>

            <OrderPriceDetails>
              <Text size="ssm">Volume: {fetching ? '-' : bitcoin.vol.toFixed(1).toString()}</Text>
              <Text size="ssm">{fetching ? '----' : getDate(bitcoin.date, true)}</Text>
            </OrderPriceDetails>

          </OrderPrice>

          <OrderLine noMargin>
            <OrderTypes>
              <OrderType onPress={() => { handleOrderType(false); }}>
                <Text size="xl" color={sellOrder ? 'white' : 'primary'}>Comprar</Text>
              </OrderType>
              <Toggle selected={sellOrder} onChange={handleOrderType}/>
              <OrderType onPress={() => { handleOrderType(true); }}>
                <Text size="xl" color={!sellOrder ? 'white' : 'primary'}>Vender</Text>
              </OrderType>
            </OrderTypes>
          </OrderLine>


          <OrderLine largeMargin>
            <Text>Ativo</Text>
            <Text color="primary" shade="lighter">BTC</Text>
          </OrderLine>

          <Animated.View style={{ opacity: animation }}>
            {sellOrder ? renderSellValue() : renderBuyValue()}
            <OrderShortcutsValues>
              <OrderShortcut>
                <OrderShortcutAction onPress={() => { shortcutValue(25); }}>
                  <Text color="primary">25%</Text>
                </OrderShortcutAction>
              </OrderShortcut>
              <OrderShortcut>
                <OrderShortcutAction onPress={() => { shortcutValue(50); }}>
                  <Text color="primary">50%</Text>
                </OrderShortcutAction>
              </OrderShortcut>
              <OrderShortcut>
                <OrderShortcutAction onPress={() => { shortcutValue(75); }}>
                  <Text color="primary">75%</Text>
                </OrderShortcutAction>
              </OrderShortcut>
              <OrderShortcut>
                <OrderShortcutAction onPress={() => { shortcutValue(100); }}>
                  <Text color="primary">100%</Text>
                </OrderShortcutAction>
              </OrderShortcut>
            </OrderShortcutsValues>

            {sellOrder ? renderOrderResultSell() : renderOrderResultBuy()}
          </Animated.View>

          <OrderResumeBalance>
            <OrderResumeBalanceInner>
              <OrderResumeCol>
                <Text size="sm">Saldo em Reais</Text>
                <Text size="sm">R$ {currencyFormat(wallet.brl)}</Text>
              </OrderResumeCol>
              <OrderResumeCol toEnd>
                <Text size="sm">Unidades Disponíveis</Text>
                <Text size="sm">{parseBtc(wallet.btc_unit, 8)}</Text>
              </OrderResumeCol>
            </OrderResumeBalanceInner>

            <OrderFinishAction>
              <Button>{sellOrder ? 'Vender' : 'Comprar'}</Button>
            </OrderFinishAction>
          </OrderResumeBalance>

        </ScreenScrollInner>
      </ScreenScroll>

    </Screen>
  );
};


const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    getBitcoinsData,
  }, dispatch),
});

const mapStateToProps = (state: RootReducer) => ({
  store: {
    bitcoin: state.bitcoin,
    wallet: state.wallet,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
