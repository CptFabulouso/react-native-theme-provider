import React, { ReactNode } from 'react';
import { Text as RNText, TextProps } from 'react-native';

import useStyle from './styles';
import { Typography } from '@themes';

type Props = TextProps & {
  type?: keyof Typography;
  children?: ReactNode;
};

const Text = ({ type, ...textProps }: Props) => {
  const styles = useStyle();
  const styleByType = type ? styles[type] : {};

  return (
    <RNText {...textProps} style={[styleByType, textProps.style]}>
      {textProps.children}
    </RNText>
  );
};

export { Text };
