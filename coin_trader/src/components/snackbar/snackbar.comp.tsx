import * as React from 'react';
import {Animated} from 'react-native';

import {
  SnackbarCloser,
  SnackbarContent,
  SnackbarInner,
  SnackbarMessage, SnackbarMessageText
} from '@components/snackbar/snackbar.styles';
import Icon from '@components/icons/icon.comp';
import {
  SnackbarContextProps,
  SnackbarContextValues,
  SnackbarTypes,
  snackbarTypes,
} from '@components/snackbar/snackbar.types';
import {getThemeColor} from '@theme/theme.utils';
export const SnackbarContext = React.createContext<any>(null);



const Snackbar: React.FC<SnackbarContextProps> = (props: SnackbarContextProps): React.FunctionComponentElement<SnackbarContextProps> => {

  let timeoutOpen;
  let timeoutClose;

  const [height, setHeight] = React.useState<number>(70);
  const [message, setMessage] = React.useState<string>('');
  const [type, setType] = React.useState<SnackbarTypes>(snackbarTypes.success);
  const [animation] = React.useState<Animated.Value>(new Animated.Value(0));

  const show = (newMessage: string, newType: SnackbarTypes = snackbarTypes.info) => {
    clearTimeout(timeoutOpen);
    clearTimeout(timeoutClose);

    setMessage(newMessage);
    setType(newType);
    timeoutOpen = setTimeout(() => {
      Animated.spring(animation, { toValue: 1, useNativeDriver: true }).start();
    });

    timeoutClose = setTimeout(close, 5000);
  };

  const close = () => {
    clearTimeout(timeoutOpen);
    clearTimeout(timeoutClose);

    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const contextValue: SnackbarContextValues = { show, close };
  const snackPosition = {
    opacity: animation,
    transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) }],
  };

  const getSnackbarBackground = React.useCallback((_type): string => {
    switch (_type) {
      case snackbarTypes.error:
        return getThemeColor('error');

      case snackbarTypes.success:
        return getThemeColor('success');

      case snackbarTypes.info:
      default:
        return getThemeColor('cyan');
    }
  }, []);

  const background = getSnackbarBackground(type);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {props.children}

      <SnackbarContent
        onLayout={({ nativeEvent }) => setHeight(nativeEvent.layout.height)}
        background={background}
        style={snackPosition}
      >
        <SnackbarInner>
          <SnackbarMessage>
            <SnackbarMessageText>
              {message}
            </SnackbarMessageText>
          </SnackbarMessage>
          <SnackbarCloser activeOpacity={0.7} onPress={close}>
            <Icon name="x" size={24} color={getThemeColor('white')} />
          </SnackbarCloser>
        </SnackbarInner>
      </SnackbarContent>
    </SnackbarContext.Provider>
  );
};

export default Snackbar;
