import { Text as RNText, TextProps } from 'react-native';
import React, { ReactNode } from 'react';

import { Typography } from '@themes';
import useStyle from './styles';

type Props = TextProps & {
  type?: keyof Typography;
  children?: ReactNode;
};

const Text = ({ type, ...textProps }: Props) => {
  const styles = useStyle();
  const styleByType = type ? styles[type] : styles.basic;

  return (
    <RNText {...textProps} style={[styleByType, textProps.style]}>
      {textProps.children}
    </RNText>
  );
};

export { Text };
