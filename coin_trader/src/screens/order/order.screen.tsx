import * as React from 'react';
import {ActivityIndicator, Animated} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {get} from 'lodash';
import {useNavigation} from '@react-navigation/native';

import {Screen, ScreenScroll, ScreenScrollInner} from '@screens/screen.comp';
import {RootReducer} from '@redux/reducers';

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
  OrderLineRow, CopyToClipboardAction, BitcoinLastPriceTitle,
} from '@screens/order/order.styles';
import {SnackbarContext} from '@components/snackbar/snackbar.comp';
import {SnackbarContextValues} from '@components/snackbar/snackbar.types';
import Button from '@components/button/button.comp';
import {getDate} from '@utils/date.util';
import {OrderScreenProps} from '@screens/order/order.types';
import {getBitcoinsData} from '@redux/actions/bitcoins.actions';
import {getThemeColor} from '@theme/theme.utils';
import {parseBtc, currencyFormat} from '@utils/currency.util';
import {BitcoinReducer} from '@redux/reducers/bitcoin/bitcoin.types';
import {WalletReducer} from '@redux/reducers/wallet/wallet.types';
import Icon from '@components/icons/icon.comp';
import {OrderTransaction, orderTransactionTypes, TransactionType} from '@redux/reducers/orders/orders.types';
import {buyOrder, sellOrder} from '@redux/actions/orders.actions';

const OrderScreen: React.FC<OrderScreenProps> = (props: OrderScreenProps): React.FunctionComponentElement<OrderScreenProps> => {

  /** COMPONENT VALUES */
  const navigation = useNavigation();
  const bitcoin: BitcoinReducer = get(props, ['store', 'bitcoin']);
  const wallet: WalletReducer = get(props, ['store', 'wallet']);
  /** END OF COMPONENT VALUES */
  /** STATES **/
  const [isSellOrder, setIsSellOrder] = React.useState<boolean>(false);
  const [fetching, setFetching] = React.useState<boolean>(true);
  const [animation] = React.useState<Animated.Value>(new Animated.Value(1));

  const [finishingOrder, setFinishingOrder] = React.useState<boolean>(false);
  const [buyValue, setBuyValue] = React.useState<number>(0);
  const [sellQuantity, setSellQuantity] = React.useState<number>(0);
  const [orderResultSell, setOrderResultSell] = React.useState<number>(0);
  const [orderResultBuy, setOrderResultBuy] = React.useState<number>(0);
  /** END OF STATES **/
  /** CONTEXTS **/
  const snackbar: SnackbarContextValues = React.useContext(SnackbarContext);

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

  /**
   * change the order type and animate the core of the form
   * @param orderType
   */
  const handleOrderType = (orderType): void => {
    // only change the value and run the animation if both as different
    if (orderType !== isSellOrder) {
      Animated.sequence([
        Animated.timing(animation, { toValue: 0.1, duration: 200, useNativeDriver: true }),
        Animated.timing(animation, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
      setTimeout(() => { setIsSellOrder(orderType); }, 100);
    }
  }; // handleOrderType


  /**
   * Used to set a value to sell or buy, using shortcut
   * @param percent
   */
  const shortcutValue = (percent: number): void => {
    // if the order is a sell type, the shortcut must be used to btc units
    if (isSellOrder) {
      const value = ((wallet.btc_unit * percent) / 100);
      setSellQuantity(value);

    } else {
      // if is a buy order, the shortcut must be used to brl
      const value = ((wallet.brl * percent) / 100);
      setBuyValue(value);
    }

  }; // shortcutValue

  /**
   * copy the bitcoin value to clipboard
   */
  const copyToClipboard = (): void => {
    Clipboard.setString(`Cotação atual do Bitcoin: R$ ${currencyFormat(bitcoin.last)}`);
    snackbar.show('Copiado para a área de transferência!');
  }; // copyToClipboard

  /**
   * Used to create the payload and finish the order based on their type
   * if the order is successfully saved, return to the transactions screen
   * @param orderType
   */
  const finishOrder = async (orderType: TransactionType): Promise<void> => {
    setFinishingOrder(true);
    const buyUnits: number = (buyValue / bitcoin.last);
    const payload: OrderTransaction = {
      transaction_units: orderType === orderTransactionTypes.buy ? buyUnits : sellQuantity,
      transaction_amount: orderType === orderTransactionTypes.buy ? buyValue : orderResultSell,
      transaction_date: Date.now(),
      transaction_type: orderType,
    };

    // execute the order based on their type
    let result;
    if (orderType === orderTransactionTypes.buy) {
      result = await props.actions.buyOrder(payload);
    } else {
      result = await props.actions.sellOrder(payload);
    }

    setFinishingOrder(false);

    if (result) {
      snackbar.show('Ordem finalizada com sucesso!', 'success');
      navigation.goBack();
    } else {
      snackbar.show('Não foi possivel finalizar esta ordem. Por favor, tente novamente.', 'error');
    }
  }; // finishOrder


  /**
   * Used to validate the sell conditions and finish the order
   */
  const sellBitcoins = async (): Promise<void> => {
    // minimum quantity to sell
    if (sellQuantity < 0.0000001) {
      snackbar.show('Para vender Bitcoins, você deve preencher um valor de pelo menos 0.0000001');
      return;
    }
    if (sellQuantity > wallet.btc_unit) {
      snackbar.show('Unidades de bitcoin insuficientes', 'error');
      return;
    }

    await finishOrder(orderTransactionTypes.sell);
  }; // sellBitcoins

  /**
   * Used to validate the buy conditions and finish the order
   */
  const buyBitcoins = async (): Promise<void> => {

    if (buyValue < 1) {
      snackbar.show('Para comprar Bitcoins, você deve preencher um valor de pelo menos R$ 1,00');
      return;
    }
    if (buyValue > wallet.brl) {
      snackbar.show('Saldo insuficiente', 'error');
      return;
    }

    await finishOrder(orderTransactionTypes.buy);
  }; // buyBitcoins


  /**
   * ----------------
   * Render Functions
   * ----------------
   */

  /**
   * Render the input for how much the user will buy
   */
  const renderBuyValue = React.useCallback((): React.FunctionComponentElement<any> => (
    <OrderLine>
      <OrderLineRow>
        <Text>Valor</Text>
        <Text style={{ opacity: 0.4 }}>mínimo: R$ 1,00</Text>
      </OrderLineRow>
      <OrderCurrencyInput value={buyValue} unit="R$ " onChangeValue={setBuyValue} />
    </OrderLine>
  ), [buyValue]); // renderBuyValue

  /**
   * Render the input for how much the user will sell
   */
  const renderSellValue = React.useCallback((): React.FunctionComponentElement<any> => (
    <OrderLine>
      <OrderLineRow>
        <Text>Quantidade</Text>
        <Text style={{ opacity: 0.4 }}>unid. {parseBtc(wallet.btc_unit, 8)}</Text>
      </OrderLineRow>
      <OrderCurrencyInput value={sellQuantity} precision={8} onChangeValue={setSellQuantity} />
    </OrderLine>
  ), [sellQuantity, wallet.btc_unit]); // renderSellValue

  /**
   * Render the result of the order in brl
   */
  const renderOrderResultSell = React.useCallback((): React.FunctionComponentElement<any> => (
    <OrderLine lgm>
      <Text color="green">Quantidade em Reais:</Text>
      <Text color="primary" shade="lighter">R$ {currencyFormat(orderResultSell)}</Text>
    </OrderLine>
  ), [orderResultSell]); // renderOrderResultSell

  /**
   * Render the result of the order in bitcoun units
   */
  const renderOrderResultBuy = React.useCallback((): React.FunctionComponentElement<any> => (
    <OrderLine lgm>
      <Text color="green">Quantidade em Bitcoins</Text>
      <Text color="primary" shade="lighter">{parseBtc(orderResultBuy)}</Text>
    </OrderLine>
  ), [orderResultBuy]); // renderOrderResultBuy


  return (
    <Screen>
      <Header title="Nova Ordem" actionIcon="refresh-cw" action={refetchBitcoins} />

      <ScreenScroll>
        <ScreenScrollInner>

          <OrderPrice>

            <BitcoinLastPriceTitle>
              <Text>Ultimo preço</Text>
              {(!fetching) && (
                <CopyToClipboardAction onPress={copyToClipboard}>
                  <Icon name="copy" color={getThemeColor('white')} size={19} />
                </CopyToClipboardAction>
              )}
            </BitcoinLastPriceTitle>

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

          <OrderLine nm>
            <OrderTypes>
              <OrderType onPress={() => { handleOrderType(false); }}>
                <Text size="xl" color={isSellOrder ? 'white' : 'primary'}>Comprar</Text>
              </OrderType>
              <Toggle selected={isSellOrder} onChange={handleOrderType}/>
              <OrderType onPress={() => { handleOrderType(true); }}>
                <Text size="xl" color={!isSellOrder ? 'white' : 'primary'}>Vender</Text>
              </OrderType>
            </OrderTypes>
          </OrderLine>


          <OrderLine lgm>
            <Text>Ativo</Text>
            <Text color="primary" shade="lighter">BTC</Text>
          </OrderLine>

          <Animated.View style={{ opacity: animation }}>
            {isSellOrder ? renderSellValue() : renderBuyValue()}
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

            {isSellOrder ? renderOrderResultSell() : renderOrderResultBuy()}
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
              <Button onPress={isSellOrder ? sellBitcoins : buyBitcoins}>
                {(finishingOrder)
                  ? (<ActivityIndicator size={19} color={getThemeColor('black')} />)
                  : (isSellOrder ? 'Vender' : 'Comprar')
                }
              </Button>
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
    buyOrder,
    sellOrder,
  }, dispatch),
});

const mapStateToProps = (state: RootReducer) => ({
  store: {
    bitcoin: state.bitcoin,
    wallet: state.wallet,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
