import * as React from 'react';
import {HeaderProps} from '@components/headers/header.types';
import {HeaderAction, HeaderActionPress, HeaderComp, HeaderTitleWrapper} from '@components/headers/header.styles';

import Text from '@components/text/text.comp';
import { useNavigation } from '@react-navigation/native';
import Icon from '@components/icons/icon.comp';

const Header: React.FC<HeaderProps> = (props: HeaderProps): React.FunctionComponentElement<HeaderProps> => {

  const navigation = useNavigation();

  /**
   * Render the go back action if is possible and abled
   */
  const renderGoBack = (): React.FunctionComponentElement<any> => {
    if (navigation.canGoBack() && props.hasGoBack) {
      return (
        <HeaderActionPress onPress={() => { navigation.goBack(); }}>
          <Icon name="arrow-left" />
        </HeaderActionPress>
      );
    }
  }; // renderGoBack

  return (
    <HeaderComp>

      <HeaderAction>
        {renderGoBack()}
      </HeaderAction>
      <HeaderTitleWrapper>
        <Text numberOfLines={1} color="black" family="titleBold">{props.title}</Text>
      </HeaderTitleWrapper>
      <HeaderAction />

    </HeaderComp>
  );
};

Header.defaultProps = {
  hasGoBack: true,
};

export default Header;
