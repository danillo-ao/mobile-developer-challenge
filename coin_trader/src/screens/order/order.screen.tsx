import * as React from 'react';
import {Screen, ScreenScroll, ScreenScrollInner} from '@screens/screen.comp';
import { Animated } from 'react-native';

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
  OrderTypes
} from '@screens/order/order.styles';
import Button from '@components/button/button.comp';
import {getDate} from '@utils/date.util';

const OrderScreen: React.FC<any> = (): React.FunctionComponentElement<any> => {

  const [sellOrder, setSellOrder] = React.useState<boolean>(false);
  const [animation] = React.useState<Animated.Value>(new Animated.Value(1));

  const [buyValue, setBuyValue] = React.useState<number>(0);
  const [sellQuantity, setSellQuantity] = React.useState<number>(0);


  const handleOrderType = (orderType): void => {
    // only change the value and run the animation if both as different
    if (orderType !== sellOrder) {
      Animated.sequence([
        Animated.timing(animation, { toValue: 0.1, duration: 200, useNativeDriver: true }),
        Animated.timing(animation, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
      setTimeout(() => { setSellOrder(orderType); }, 100);
    }
  };


  const renderBuyValue = (): React.FunctionComponentElement<any> => (
    <OrderLine>
      <Text>Valor</Text>
      <OrderCurrencyInput value={buyValue} unit="R$ " onChangeValue={setBuyValue} />
    </OrderLine>
  ); // renderBuyValue

  const renderSellValue = (): React.FunctionComponentElement<any> => (
    <OrderLine>
      <Text>Quantidade</Text>
      <OrderCurrencyInput value={sellQuantity} precision={4} onChangeValue={setSellQuantity} />
    </OrderLine>
  ); // renderSellValue

  const renderOrderResultSell = (): React.FunctionComponentElement<any> => (
    <OrderLine largeMargin>
      <Text color="green">Quantidade em Reais:</Text>
      <Text color="primary" shade="lighter">0,00045</Text>
    </OrderLine>
  ); // renderOrderResultSell

  const renderOrderResultBuy = (): React.FunctionComponentElement<any> => (
    <OrderLine largeMargin>
      <Text color="green">Quantidade em Bitcoins</Text>
      <Text color="primary" shade="lighter">R$ 100,00</Text>
    </OrderLine>
  ); // renderOrderResultBuy


  return (
    <Screen>
      <Header title="Vender ou Comprar" />

      <ScreenScroll>
        <ScreenScrollInner>

          <OrderPrice>

            <Text>Ultimo preço</Text>

            <OrderPriceValue>
              <Text size="ssm" style={{ marginRight: 5 }}>R$</Text>
              <Text size="xxxl" family="titleBold">245.000,00</Text>
            </OrderPriceValue>

            <OrderPriceDetails>
              <Text size="ssm">Volume: 309.000</Text>
              <Text size="ssm">12/02/2021 15:00</Text>
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
                <OrderShortcutAction>
                  <Text color="primary">25%</Text>
                </OrderShortcutAction>
              </OrderShortcut>
              <OrderShortcut>
                <OrderShortcutAction>
                  <Text color="primary">50%</Text>
                </OrderShortcutAction>
              </OrderShortcut>
              <OrderShortcut>
                <OrderShortcutAction>
                  <Text color="primary">75%</Text>
                </OrderShortcutAction>
              </OrderShortcut>
              <OrderShortcut>
                <OrderShortcutAction>
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
                <Text size="sm">R$ 10.000,00</Text>
              </OrderResumeCol>
              <OrderResumeCol toEnd>
                <Text size="sm">Unidades Disponíveis</Text>
                <Text size="sm">{getDate(1613081542, true)}</Text>
              </OrderResumeCol>
            </OrderResumeBalanceInner>

            <OrderFinishAction>
              <Button>Comprar/Vender</Button>
            </OrderFinishAction>
          </OrderResumeBalance>

        </ScreenScrollInner>
      </ScreenScroll>

    </Screen>
  );
};

export default OrderScreen;
