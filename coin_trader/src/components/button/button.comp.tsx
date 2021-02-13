import * as React from 'react';
import {ButtonProps} from '@components/button/button.types';
import {ButtonComp} from '@components/button/button.styles';
import Text from '@components/text/text.comp';

const Button: React.FC<ButtonProps> = (props: ButtonProps): React.FunctionComponentElement<ButtonProps> => {

  /**
   * used to handle the press function;
   * if it is defined, run it, if isnt, do nothing
   */
  const handlePress = React.useCallback((): void => {
    if (!!props.onPress) {
      props.onPress();
    }
  }, [props]); // handlePress

  /**
   * Render the child element based on the type
   */
  const renderChild = React.useCallback(() => {
    if (typeof props.children === 'string') {
      return <Text color="black" family="defaultBold">{props.children}</Text>;
    }
    return props.children;
  }, [props]); // renderChild

  return (
    <ButtonComp onPress={handlePress} activeOpacity={!!props.onPress ? 0.7 : 1}>
      {renderChild()}
    </ButtonComp>
  );
};

export default Button;
