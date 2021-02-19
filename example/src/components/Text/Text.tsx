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

  if (type) {
    //
  }

  return (
    <RNText {...textProps} style={[styles.styleByType, textProps.style]}>
      {textProps.children}
    </RNText>
  );
};

export { Text };
