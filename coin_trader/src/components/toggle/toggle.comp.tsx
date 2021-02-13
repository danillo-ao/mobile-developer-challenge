import * as React from 'react';
import {ToggleBody, ToggleBodyFill, ToggleCircle, ToggleContent} from '@components/toggle/toggle.styles';
import {Animated} from 'react-native';
import {ToggleProps} from '@components/toggle/toggle.types';

const Toggle: React.FC<ToggleProps> = (props: ToggleProps): React.FunctionComponentElement<ToggleProps> => {

  const [selected, setSelected] = React.useState<boolean>(props.selected);
  const [animation] = React.useState<Animated.Value>(new Animated.Value(0));

  /**
   * update the local selected state, everytime when the prop change
   */
  React.useEffect(() => { setSelected(props.selected); }, [props.selected]);

  /**
   * Function to animate the transition
   */
  const animateTransition = React.useCallback((_selected: boolean) => {
    if (!!_selected) {
      // case select
      Animated.spring(animation, { toValue: 100, bounciness: 5, useNativeDriver: true }).start();
    } else {
      // case unselect
      Animated.spring(animation, { toValue: 0, bounciness: 5, useNativeDriver: true }).start();
    }
  }, [animation]);

  /**
   * use effect to call the animate transition function
   */
  React.useEffect(() => { animateTransition(selected); }, [selected, animateTransition]);

  /**
   * used to handle the toggle function and pass the new value to father component
   */
  const handleToggle = React.useCallback((): void => {
    if (!!props.onChange) { props.onChange(!selected); }
    setSelected(!selected);
  }, [selected, props]);

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
