import * as React from 'react';
import {ToggleBody, ToggleBodyFill, ToggleCircle, ToggleContent} from '@components/toggle/toggle.styles';
import {Animated} from 'react-native';
import {ToggleProps} from '@components/toggle/toggle.types';

const Toggle: React.FC<ToggleProps> = (props: ToggleProps): React.FunctionComponentElement<ToggleProps> => {

  const [selected, setSelected] = React.useState<boolean>(props.selected);
  const [animation] = React.useState<Animated.Value>(new Animated.Value(0));

  React.useEffect(() => { setSelected(props.selected); }, [props.selected]);
  React.useEffect(() => {
    if (!!selected) {
      // caso selecione
      Animated.spring(animation, { toValue: 100, bounciness: 5, useNativeDriver: true }).start();
    } else {
      // caso desselecione
      Animated.spring(animation, { toValue: 0, bounciness: 5, useNativeDriver: true }).start();
    }
  }, [selected]);

  const handleToggle = (): void => {
    if (!!props.onChange) { props.onChange(!selected); }
    setSelected(!selected);
  };

  const bodyFill = animation.interpolate({ inputRange: [0, 100], outputRange: [-30, 0] });
  const circle = animation.interpolate({ inputRange: [0, 100], outputRange: [0, 25] });

  return (
    <ToggleContent activeOpacity={1} onPress={handleToggle}>
      <ToggleBody>
        <ToggleBodyFill style={{ transform: [{ translateX: bodyFill }] }} />
      </ToggleBody>
      <ToggleCircle style={{ transform: [{ translateX: circle }] }} />
    </ToggleContent>
  );
};

export default Toggle;
