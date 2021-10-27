import { withUseStyle } from '@pavelgric/react-native-theme-provider';
import React, { Component, ReactNode } from 'react';
import { Text as RNText, TextProps } from 'react-native';

import useStyle from './styles';
import { Typography } from '@themes';

type Props = TextProps & {
  styles: ReturnType<typeof useStyle>;
  type?: keyof Typography;
  children?: ReactNode;
};

class Text extends Component<Props> {
  render() {
    const { styles, type, ...textProps } = this.props;
    const styleByType = type ? styles[type] : {};
    return (
      <RNText {...textProps} style={[styleByType, textProps.style]}>
        {textProps.children}
      </RNText>
    );
  }
}

const TextWithStyles = withUseStyle(Text, useStyle);

export { TextWithStyles as ClassText };
