import { Text as RNText, TextProps } from 'react-native';
import React, { ReactNode } from 'react';

import { Typography, useStyle } from '@themes';
import styleCreator from './styles';

type Props = TextProps & {
  type?: keyof Typography;
  children?: ReactNode;
};

const Text = ({ type, ...textProps }: Props) => {
  const styles = useStyle(styleCreator);
  const styleByType = type ? styles[type] : styles.basic;

  return (
    <RNText {...textProps} style={[styleByType, textProps.style]}>
      {textProps.children}
    </RNText>
  );
};

export { Text };
