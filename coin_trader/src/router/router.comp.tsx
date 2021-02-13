import 'react-native-gesture-handler';
import * as React from 'react';
import {Animated} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackCardStyleInterpolator} from '@react-navigation/stack';

import routes from '@router/routes.config';
import HomeScreen from '@screens/home/home.screen';
import TransactionsScreen from '@screens/transactions/transactions.screen';
import OrderScreen from '@screens/order/order.screen';

const Stack = createStackNavigator();
const Router: React.FC<any> = (): React.FunctionComponentElement<any> => {

  /**
   * Used to animate a screen transition
   */
  const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
      current.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
      next ? next.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }) : 0
    );
    return {
      cardStyle: {
        transform: [{
          translateX: Animated.multiply(
            progress.interpolate({ inputRange: [0, 1, 2], outputRange: [screen.width, 0, screen.width * -0.3], extrapolate: 'clamp'}),
            inverted
          ),
        }],
      },
    };
  }; // forSlide

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.index} screenOptions={{ headerShown: false, cardStyleInterpolator: forSlide as StackCardStyleInterpolator }}>
        {/* routes here */}
        <Stack.Screen name={routes.home} component={HomeScreen} />
        <Stack.Screen name={routes.transactions} component={TransactionsScreen} />
        <Stack.Screen name={routes.order} component={OrderScreen} />
        {/* end of routes */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
